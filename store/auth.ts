import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "@/firebase/init";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

/**
 * User interface - defines the structure of user data
 * Contains essential user information from Firebase Auth
 *
 */
export interface User {
  uid: string; // Unique user identifier from Firebase
  email: string; // User's email address
  displayName: string; // User's display name
  photoURL?: string; // Optional profile photo URL
}

/**
 * Auth state interface - manages all authentication-related state
 * Tracks user data, loading states, errors, and modal visibility
 */
interface AuthState {
  user: User | null; // Current logged-in user (null if not logged in)
  isLoading: boolean; // Loading state for async operations
  isInitializing: boolean; // Loading state for initial auth check
  error: string | null; // Error messages from auth operations
  isLoginOpen: boolean; // Controls login modal visibility
  isSignupOpen: boolean; // Controls signup modal visibility
  isLoggedIn: boolean; // Boolean flag for login status
}

// Initial state - default values when app starts
const initialState: AuthState = {
  user: null, // No user logged in initially
  isLoading: false, // Not loading initially
  isInitializing: true, // Initially checking auth state
  error: null, // No errors initially
  isLoginOpen: false, // Login modal closed initially
  isSignupOpen: false, // Signup modal closed initially
  isLoggedIn: false, // Not logged in initially
};

/**
 * Helper function to convert Firebase user to our simplified User type
 * Extracts only the essential user data we need from Firebase Auth
 * @param firebaseUser - Raw user object from Firebase Auth
 * @returns Simplified User object with only necessary fields
 */
const createUser = (firebaseUser: any): User => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email || "",
  displayName: firebaseUser.displayName || "",
  photoURL: firebaseUser.photoURL || "",
});

/**
 * ASYNC THUNKS - Handle Firebase authentication operations
 * These functions make actual calls to Firebase Auth and return user data
 */

/**
 * Login with email and password
 * Uses Firebase signInWithEmailAndPassword to authenticate user
 * @param email - User's email address
 * @param password - User's password
 * @returns User object if successful, throws error if failed
 */
export const loginWithEmail = createAsyncThunk(
  "auth/loginWithEmail",
  async ({ email, password }: { email: string; password: string }) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return createUser(result.user);
  }
);

/**
 * Create new user account with email and password
 * Uses Firebase createUserWithEmailAndPassword to register new user
 * @param email - User's email address
 * @param password - User's password
 * @returns User object if successful, throws error if failed
 */
export const signupWithEmail = createAsyncThunk(
  "auth/signupWithEmail",
  async ({ email, password }: { email: string; password: string }) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return createUser(result.user);
  }
);

/**
 * Login with Google OAuth
 * Uses Firebase signInWithPopup with Google provider for social login
 * @returns User object if successful, throws error if failed
 */
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return createUser(result.user);
  }
);

/**
 * Logout current user
 * Uses Firebase signOut to end user session
 * @returns null (clears user from state)
 */
export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
  console.log("User logged out");
  return null;
});

/**
 * Send password reset email
 * Uses Firebase sendPasswordResetEmail to send reset link to user's email
 * @param email - User's email address
 * @returns void if successful, throws error if failed
 */
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email: string) => {
    await sendPasswordResetEmail(auth, email);
    return email; // Return email for confirmation message
  }
);

/**
 * REDUX SLICE - Manages authentication state and actions
 * Handles both synchronous state updates and async thunk results
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * UI STATE ACTIONS - Control modal visibility and basic state
     */

    /**
     * Open login modal and close signup modal
     * Clears any existing errors when opening login
     */
    openLogin: (state) => {
      state.isLoginOpen = true;
      state.isSignupOpen = false;
      state.error = null;
    },

    /**
     * Open signup modal and close login modal
     * Clears any existing errors when opening signup
     */
    openSignup: (state) => {
      state.isSignupOpen = true;
      state.isLoginOpen = false;
      state.error = null;
    },

    /**
     * Close both login and signup modals
     * Clears any existing errors
     */
    closeModals: (state) => {
      state.isLoginOpen = false;
      state.isSignupOpen = false;
      state.error = null;
    },

    /**
     * Set user data in state
     * Used by Firebase auth state listener to update user info
     * @param action.payload - User object or null
     */
    setUser: (state, action) => {
      state.user = action.payload;
      state.isInitializing = false; // Auth check is complete
    },

    /**
     * Clear error messages
     * Removes any error state from the store
     */
    clearError: (state) => {
      state.error = null;
    },
  },
  /**
   * EXTRA REDUCERS - Handle async thunk states (pending, fulfilled, rejected)
   * These automatically update state based on async operation results
   */
  extraReducers: (builder) => {
    builder
      /**
       * LOGIN WITH EMAIL - Handle email/password authentication
       */
      .addCase(loginWithEmail.pending, (state) => {
        state.isLoading = true; // Show loading state
        state.error = null; // Clear previous errors
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.isLoading = false; // Stop loading
        state.user = action.payload; // Set user data
        state.isLoginOpen = false; // Close login modal
        state.isLoggedIn = true; // Mark as logged in
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.isLoading = false;
        // Convert Firebase error codes to user-friendly messages
        const errorCode = action.error.code;
        if (
          errorCode === "auth/user-not-found" ||
          errorCode === "auth/wrong-password"
        ) {
          state.error =
            "Invalid email or password. Please check your credentials and try again.";
        } else if (errorCode === "auth/invalid-email") {
          state.error = "Please enter a valid email address.";
        } else if (errorCode === "auth/user-disabled") {
          state.error =
            "This account has been disabled. Please contact support.";
        } else if (errorCode === "auth/too-many-requests") {
          state.error = "Too many failed attempts. Please try again later.";
        } else {
          state.error =
            action.error.message || "Login failed. Please try again.";
        }
      })
      /**
       * SIGNUP WITH EMAIL - Handle new user registration
       */
      .addCase(signupWithEmail.pending, (state) => {
        state.isLoading = true; // Show loading state
        state.error = null; // Clear previous errors
      })
      .addCase(signupWithEmail.fulfilled, (state, action) => {
        state.isLoading = false; // Stop loading
        state.user = action.payload; // Set user data
        state.isSignupOpen = false; // Close signup modal
        state.isLoggedIn = true; // Mark as logged in
      })
      .addCase(signupWithEmail.rejected, (state, action) => {
        state.isLoading = false;
        // Convert Firebase error codes to user-friendly messages for signup
        const errorCode = action.error.code;
        if (errorCode === "auth/email-already-in-use") {
          state.error =
            "An account with this email already exists. Please sign in instead.";
        } else if (errorCode === "auth/invalid-email") {
          state.error = "Please enter a valid email address.";
        } else if (errorCode === "auth/weak-password") {
          state.error = "Password should be at least 6 characters long.";
        } else {
          state.error =
            action.error.message || "Signup failed. Please try again.";
        }
      })
      /**
       * GOOGLE LOGIN - Handle OAuth authentication
       */
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true; // Show loading state
        state.error = null; // Clear previous errors
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false; // Stop loading
        state.user = action.payload; // Set user data
        state.isLoginOpen = false; // Close login modal
        state.isSignupOpen = false; // Close signup modal
        state.isLoggedIn = true; // Mark as logged in
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Google login failed";
      })

      /**
       * PASSWORD RESET - Handle password reset email sending
       */
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true; // Show loading state
        state.error = null; // Clear previous errors
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false; // Stop loading
        // You might want to add a success message here
        // For now, we'll just clear any errors
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        // Convert Firebase error codes to user-friendly messages
        const errorCode = action.error.code;
        if (errorCode === "auth/user-not-found") {
          state.error = "No account found with this email address.";
        } else if (errorCode === "auth/invalid-email") {
          state.error = "Please enter a valid email address.";
        } else if (errorCode === "auth/too-many-requests") {
          state.error = "Too many requests. Please try again later.";
        } else {
          state.error =
            action.error.message ||
            "Failed to send reset email. Please try again.";
        }
      })
      /**
       * LOGOUT - Handle user logout
       */
      .addCase(logout.fulfilled, (state) => {
        state.user = null; // Clear user data
        state.isLoading = false; // Stop loading
        state.isLoggedIn = false; // Mark as logged out
      });
  },
});

/**
 * EXPORTS - Make actions and reducer available to other parts of the app
 */

// Export all action creators for use in components
export const { openLogin, openSignup, closeModals, setUser, clearError } =
  authSlice.actions;

// Export the reducer for use in Redux store configuration
export default authSlice.reducer;
