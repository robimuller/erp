// src/services/crmService.js

import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import db from '../firebase-config';

export const getCompanies = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'Companies'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching companies: ", error);
  }
};

export const addCompany = async (companyData) => {
  try {
    const docRef = await addDoc(collection(db, 'Companies'), companyData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding company: ", error);
  }
};

export const updateCompany = async (id, companyData) => {
  try {
    const companyRef = doc(db, 'Companies', id);
    await updateDoc(companyRef, companyData);
  } catch (error) {
    console.error("Error updating company: ", error);
  }
};

// More functions for other CRUD operations
