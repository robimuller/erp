// src/services/authService.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import db from '../firebase-config'; // Assuming this is your Firestore initialization

const auth = getAuth();

// Enhanced User Registration
const registerUser = async (email, password, additionalInfo) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Create a user document in Firestore
        const userDocRef = doc(db, "Users", user.uid);
        await setDoc(userDocRef, {
            email: user.email,
            ...additionalInfo, // firstName, lastName, role, etc.
            createdAt: new Date()
        });


        return user;
    } catch (error) {
        throw error;
    }
};

// User Login
const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

// User Logout
const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
};

// Send Password Reset Email
const sendResetPasswordEmail = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        throw error;
    }
};

export { registerUser, loginUser, logoutUser, sendResetPasswordEmail };
