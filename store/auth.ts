/**
 * Redux slice managing authentication state, Firebase auth operations, and UI modals.
 * Handles login, signup, logout, password reset, and Google OAuth.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "@/firebase/init";
import { signInAnonymously } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  plan: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isInitializing: boolean;
  error: string | null;
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isInitializing: true,
  error: null,
  isLoginOpen: false,
  isSignupOpen: false,
  isLoggedIn: false,
};

const createUser = (firebaseUser: any): User => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email || "",
  displayName: firebaseUser.displayName || "",
  photoURL: firebaseUser.photoURL || "",
  plan: firebaseUser.plan || "",
});

export const loginWithEmail = createAsyncThunk(
  "auth/loginWithEmail",
  async ({ email, password }: { email: string; password: string }) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return createUser(result.user);
  }
);

export const signupWithEmail = createAsyncThunk(
  "auth/signupWithEmail",
  async ({ email, password }: { email: string; password: string }) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return createUser(result.user);
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return createUser(result.user);
  }
);

export const loginAnonymously = createAsyncThunk(
  "auth/loginAnonymously",
  async () => {
    const result = await signInAnonymously(auth);
    return createUser(result.user);
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
  return null;
});

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email: string) => {
    await sendPasswordResetEmail(auth, email);
    return email;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openLogin: (state) => {
      state.isLoginOpen = true;
      state.isSignupOpen = false;
      state.error = null;
    },
    openSignup: (state) => {
      state.isSignupOpen = true;
      state.isLoginOpen = false;
      state.error = null;
    },
    closeModals: (state) => {
      state.isLoginOpen = false;
      state.isSignupOpen = false;
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isInitializing = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoginOpen = false;
        state.isLoggedIn = true;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.isLoading = false;
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
      .addCase(signupWithEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupWithEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSignupOpen = false;
        state.isLoggedIn = true;
      })
      .addCase(signupWithEmail.rejected, (state, action) => {
        state.isLoading = false;
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
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoginOpen = false;
        state.isSignupOpen = false;
        state.isLoggedIn = true;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Google login failed";
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
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
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(loginAnonymously.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAnonymously.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoginOpen = false;
        state.isLoggedIn = true;
      })
      .addCase(loginAnonymously.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Anonymous login failed";
      });
  },
});

export const { openLogin, openSignup, closeModals, setUser, clearError } =
  authSlice.actions;

export default authSlice.reducer;
