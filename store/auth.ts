import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "@/firebase/init";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Simple user type - just what we need
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

// Auth state - simple and clear
interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isLoginOpen: boolean;
  isSignupOpen: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isLoginOpen: false,
  isSignupOpen: false,
};

// Helper function to convert Firebase user to our simple User type
const createUser = (firebaseUser: any): User => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email || "",
  displayName: firebaseUser.displayName || "",
  photoURL: firebaseUser.photoURL || "",
});

// Async actions - these handle the actual Firebase calls
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

export const loginWithGoogle = createAsyncThunk("auth/loginWithGoogle", async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return createUser(result.user);
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
  console.log("User logged out");
  return null;
});

// The slice - this manages our state
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Simple actions for UI state
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
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login with email
      .addCase(loginWithEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoginOpen = false;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      })
      // Signup with email
      .addCase(signupWithEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupWithEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSignupOpen = false;
      })
      .addCase(signupWithEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Signup failed";
      })
      // Google login
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoginOpen = false;
        state.isSignupOpen = false;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Google login failed";
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      });
  },
});

// Export actions
export const { openLogin, openSignup, closeModals, setUser, clearError } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
