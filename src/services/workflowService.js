import db from '../firebase-config'; // Correct import of the initialized Firestore instance
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';


// Function to add a new workflow
export const addWorkflow = async (workflow, subWorkflows = []) => {
  try {
      const workflowData = {
          ...workflow,
          startDate: new Date(workflow.startDate),
          subWorkflows: subWorkflows.map(sub => ({
              ...sub,
              startDate: new Date(sub.startDate),
              endDate: sub.endDate ? new Date(sub.endDate) : null
          }))
      };
      if (workflow.endDate) {
          workflowData.endDate = new Date(workflow.endDate);
      }

      const docRef = await addDoc(collection(db, 'Workflows'), workflowData);
      return docRef.id;
  } catch (error) {
      console.error("Error adding workflow: ", error);
      throw error;
  }
};


// Function to listen to real-time updates of workflows for a specific user
export const listenToWorkflowsForUser = (userId, setWorkflows) => {
  const q = query(collection(db, 'Workflows'), where('userId', '==', userId));
  
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const workflows = [];
    querySnapshot.forEach((doc) => {
      workflows.push({ id: doc.id, ...doc.data() });
    });
    setWorkflows(workflows);
  });

  return unsubscribe; // Return the unsubscribe function to call when you want to stop listening
};

export const addSubWorkflow = async (subWorkflow) => {
  try {
      const subWorkflowData = {
          ...subWorkflow,
          startDate: new Date(subWorkflow.startDate),
          endDate: subWorkflow.endDate ? new Date(subWorkflow.endDate) : null,
          // Include other necessary data fields
      };

      const docRef = await addDoc(collection(db, 'SubWorkflows'), subWorkflowData);
      return docRef.id;
  } catch (error) {
      console.error("Error adding sub-workflow: ", error);
      throw error;
  }
};