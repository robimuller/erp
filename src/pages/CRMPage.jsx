import React, { useState, useEffect } from 'react';
import { Link, useRoutes } from 'react-router-dom';
import { getCompanies, updateCompany } from '../services/crmService'; // Import updateCompany here
import CompanyRegistration from '../components/crm/CompanyRegistration';
import './CRMPage.css';

const CRMPage = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      const data = await getCompanies();
      setCompanies(data);
    };
    fetchCompanies();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const routes = useRoutes([
    {
      path: '/',
      element: <CRMContent
        companies={filteredCompanies}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        setCompanies={setCompanies}  // Pass setCompanies as a prop
      />
    },
    { path: 'register-company', element: <CompanyRegistration /> }
  ]);


  return (
    <div>
      {routes}
    </div>
  );
};

const CRMContent = ({ companies, searchTerm, handleSearchChange, setCompanies }) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableCompany, setEditableCompany] = useState(null);

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setEditableCompany({ ...company }); // Create a copy of the company object
    setIsEditMode(false);
  };

  const handleSave = async () => {
    if (isEditMode && editableCompany) {
      try {
        await updateCompany(selectedCompany.id, editableCompany);
        // Update the local state to reflect changes
        setCompanies(companies.map(comp => comp.id === selectedCompany.id ? editableCompany : comp));
        setSelectedCompany(editableCompany);
        setIsEditMode(false);
      } catch (error) {
        console.error("Error saving company: ", error);
        // Handle the error appropriately
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center bg-light p-3 sticky-top">
        <input
          type="text"
          className="form-control me-2 flex-grow-1"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Link to="register-company" className="btn btn-primary ms-2 btn-sm d-flex align-items-center">
          <i className="bi bi-plus-circle"></i>
        </Link>
      </div>

      <div className="d-flex">
        <ul className="list-group list-group-flush flex-grow-1">
          {companies.map(company => (
            <li key={company.id} className="list-group-item" onClick={() => handleCompanyClick(company)}>
              {company.name}
            </li>
          ))}
        </ul>

        {selectedCompany && (
          <div className="company-details-panel border-start p-3 bg-light">
            <h3>{isEditMode ? <input type="text"       className="edit-mode-input"
 value={editableCompany.name} onChange={e => setEditableCompany({ ...editableCompany, name: e.target.value })} /> : selectedCompany.name}</h3>
            <p>Address: {isEditMode ? <input type="text"       className="edit-mode-input"
 value={editableCompany.address} onChange={e => setEditableCompany({ ...editableCompany, address: e.target.value })} /> : selectedCompany.address}</p>
            <p>Email: {isEditMode ? <input type="text"       className="edit-mode-input"
 value={editableCompany.contact.email} onChange={e => setEditableCompany({ ...editableCompany, contact: { ...editableCompany.contact, email: e.target.value } })} /> : selectedCompany.contact.email}</p>
            <button className="btn btn-secondary" onClick={() => setSelectedCompany(null)}>Close</button>
            &nbsp;
            <button className="btn btn-primary" onClick={isEditMode ? handleSave : () => setIsEditMode(true)}>
              {isEditMode ? 'Save' : 'Edit'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CRMPage;
