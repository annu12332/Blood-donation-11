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

  // ১. রেজিস্ট্রেশন
  const registerWithEmailPassword = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  // ২. লগইন
  const loginWithEmailPassword = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  // ৩. গুগল লগইন
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ৪. প্রোফাইল আপডেট (নাম এবং ফটো)
  const updateUserProfile = (name, photo) => {
    setLoading(true);
    return firebaseUpdateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // ৫. লগআউট
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ৬. ইউজার স্টেট পর্যবেক্ষণ
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    loading,
    setLoading,
    registerWithEmailPassword,
    loginWithEmailPassword,
    googleLogin,
    logout,
    updateUserProfile, // নাম আপডেট করে দিলাম যাতে আপনার সাইনআপের সাথে মিলে
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);