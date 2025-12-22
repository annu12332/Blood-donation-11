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
import axios from "axios";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerWithEmailPassword = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const loginWithEmailPassword = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (name, photo) => {
    return firebaseUpdateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          // ফায়ারবেস থেকে সরাসরি টোকেন নেওয়া হচ্ছে
          const token = await currentUser.getIdToken();
          localStorage.setItem('access-token', token);
          
          // ব্যাকএন্ডে ইউজার ইনফো আপডেট রাখার জন্য রিকোয়েস্ট (স্ল্যাশ ফিক্স করা হয়েছে)
          const userInfo = { email: currentUser.email };
          await axios.post('https://blood-donation-backentd-11.vercel.app/jwt', userInfo);
          
          setLoading(false);
        } catch (err) {
          console.error("Token handling error:", err);
          setLoading(false);
        }
      } else {
        localStorage.removeItem('access-token');
        setLoading(false);
      }
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
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);