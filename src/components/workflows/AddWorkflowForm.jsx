import React, { useState } from 'react';
import { addWorkflow } from '../../services/workflowService';

const AddWorkflowForm = ({ userId, onWorkflowAdded }) => {
  const [workflowName, setWorkflowName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(''); // Keep as is, but make optional

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!workflowName || !startDate) return; // Only check for workflowName and startDate

      const newWorkflow = {
          name: workflowName,
          userId,
          startDate: new Date(startDate)
      };
      if (endDate) {
          newWorkflow.endDate = new Date(endDate);
      }

      try {
          await addWorkflow(newWorkflow);
          onWorkflowAdded();
          setWorkflowName('');
          setStartDate('');
          setEndDate('');
      } catch (error) {
          console.error("Error adding workflow: ", error);
          // Handle the error in UI
      }
  };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" value={workflowName} onChange={(e) => setWorkflowName(e.target.value)} placeholder="Enter workflow name" />
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
        <button type="submit">Add Workflow</button>
      </form>
    );
  };
  

export default AddWorkflowForm;
