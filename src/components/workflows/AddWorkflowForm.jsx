import React, { useState } from 'react';
import { addWorkflow } from '../../services/workflowService';
import './AddWorkflowForm.css';

const AddWorkflowForm = ({ userId}) => {
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
          setWorkflowName('');
          setStartDate('');
          setEndDate('');
      } catch (error) {
          console.error("Error adding workflow: ", error);
          // Handle the error in UI
      }
  };
  
  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="row g-3 align-items-end">
        <div className="col-md-4">
          <label htmlFor="workflowName" className="form-label">Munkamenet neve</label>
          <input 
            type="text" 
            className="form-control" 
            id="workflowName" 
            value={workflowName} 
            onChange={(e) => setWorkflowName(e.target.value)} 
            placeholder="Munkamenet neve" 
          />
        </div>
  
        <div className="col-md-3">
          <label htmlFor="startDate" className="form-label">Projekt Kezdete</label>
          <input 
            type="date" 
            className="form-control" 
            id="startDate" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
          />
        </div>
  
        <div className="col-md-3">
          <label htmlFor="endDate" className="form-label">Projekt vége</label>
          <input 
            type="date" 
            className="form-control" 
            id="endDate" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
          />
        </div>
  
        <div className="col-md-2">
          <button type="submit" className="btn-primary">Munkamenet megkezdése</button>
        </div>
      </div>
    </form>
  );
  
  
  };
  

export default AddWorkflowForm;
