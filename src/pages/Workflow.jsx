import React, { useState, useEffect } from 'react';
import AddWorkflowForm from '../components/workflows/AddWorkflowForm';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import GanttChart from '../components/workflows/GanttChart';
import { listenToWorkflowsForUser } from '../services/workflowService';

const WorkflowPage = () => {
    const [workflows, setWorkflows] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            if (user) {
                // Setting up the listener for real-time updates
                const unsubscribeWorkflows = listenToWorkflowsForUser(user.uid, (newWorkflows) => {
                    setWorkflows(newWorkflows);
                    setIsLoading(false); // Set loading to false after initial data is loaded
                });
    
                return () => {
                    unsubscribeWorkflows();
                };
            } else {
                setIsLoading(false); // Also set loading to false if there's no user
            }
        });
    
        return () => {
            unsubscribeAuth();
        };
    }, []);

    if (isLoading) return <div className="container">Loading...</div>;
    if (error) return <div className="container">Error: {error}</div>;
    if (!currentUser) return <div className="container">Please log in to view this page.</div>;

    return (
        <div className="container workflow-page">
            <div className="add-workflow-form">
                <AddWorkflowForm userId={currentUser?.uid} />
            </div>
            <br />
            <div className="row">
                <div className="col-md-12">
                    <GanttChart/>
                </div>

            </div>
        </div>
    );
};

export default WorkflowPage;
