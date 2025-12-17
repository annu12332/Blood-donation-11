import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/Firebase.config";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerWithEmailPassword = async (email, pass) => {
    setLoading(true);
    try {
      return await createUserWithEmailAndPassword(auth, email, pass);
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmailPassword = async (email, pass) => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, pass);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, googleProvider);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    try {
      if (!auth.currentUser) throw new Error("No user is logged in");
      await firebaseUpdateProfile(auth.currentUser, profileData);
      setUser({ ...auth.currentUser });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const authData = {
    user,
    loading,
    registerWithEmailPassword,
    loginWithEmailPassword,
    googleLogin,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
