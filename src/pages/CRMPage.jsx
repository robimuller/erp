// src/pages/CRMPage.jsx

import React, { useState } from 'react';
import { addCompany } from '../services/crmService';

const CRMPage = () => {
  const initialCompanyState = {
    name: '',
    address: '',
    contactInfo: { phone: '', email: '' },
    industry: '',
    status: '',
    website: '',
    size: '', // Number of employees
    founded: '', // Year of foundation
  };

  const [company, setCompany] = useState(initialCompanyState);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "phone" || name === "email") {
      setCompany({
        ...company,
        contactInfo: {
          ...company.contactInfo,
          [name]: value
        }
      });
    } else {
      setCompany({ ...company, [name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const companyId = await addCompany(company);
    if (companyId) {
      // Handle successful registration
      setCompany(initialCompanyState); // Reset form after submission
    }
  };

  return (
    <div className="crm-page container mt-5">
      <h1 className="display-4">Register New Company</h1>
      <p className="lead">
        Add company details to your CRM system.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Company Name</label>
          <input type="text" className="form-control" id="name" name="name" value={company.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" id="address" name="address" value={company.address} onChange={handleChange} required />
        </div>

        {/* Contact Information */}
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="tel" className="form-control" id="phone" name="phone" value={company.contactInfo.phone} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={company.contactInfo.email} onChange={handleChange} />
        </div>

        {/* Additional Details */}
        <div className="mb-3">
          <label htmlFor="industry" className="form-label">Industry</label>
          <input type="text" className="form-control" id="industry" name="industry" value={company.industry} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select className="form-select" id="status" name="status" value={company.status} onChange={handleChange}>
            <option value="">Select Status</option>
            <option value="prospect">Prospect</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="website" className="form-label">Website</label>
          <input type="url" className="form-control" id="website" name="website" value={company.website} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="size" className="form-label">Size (Number of Employees)</label>
          <input type="number" className="form-control" id="size" name="size" value={company.size} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="founded" className="form-label">Founded (Year)</label>
          <input type="number" className="form-control" id="founded" name="founded" value={company.founded} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary">Register Company</button>
      </form>
    </div>
  );
};

export default CRMPage;
