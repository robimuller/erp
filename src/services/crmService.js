// src/services/crmService.js

import { collection, getDocs, addDoc } from 'firebase/firestore';
import db from '../firebase-config';

export const getCompanies = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'companies'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching companies: ", error);
  }
};

export const addCompany = async (companyData) => {
  try {
    const docRef = await addDoc(collection(db, 'companies'), companyData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding company: ", error);
  }
};

// More functions for other CRUD operations
