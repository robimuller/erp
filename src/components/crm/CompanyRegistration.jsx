 
import React, { useState } from 'react';
import { addCompany } from '../../services/crmService';

const CompanyRegistration = () => {
  const [entityType, setEntityType] = useState('company'); // 'company' or 'contractor'
  const [entity, setEntity] = useState({
    // Company specific fields
    name: '',
    address: '',
    industry: '',
    status: '',
    website: '',
    size: '', // Number of employees
    founded: '', // Year of foundation
    // Contact person fields
    contact: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  });

  const handleEntityChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('contact.')) {
      const contactField = name.split('.')[1];
      setEntity({
        ...entity,
        contact: {
          ...entity.contact,
          [contactField]: value
        }
      });
    } else {
      setEntity({ ...entity, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addCompany(entity);
    // Handle the result
  };

  return (
    <div className="crm-page container mt-5">
      <h1 className="display-4">Entity Registration</h1>
      <p className="lead">Register a new company or independent contractor.</p>

      <div className="mb-3">
        <select className="form-select" value={entityType} onChange={(e) => setEntityType(e.target.value)}>
          <option value="company">Company</option>
          <option value="contractor">Independent Contractor</option>
        </select>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Conditional Company Fields */}
        {entityType === 'company' && (
          <>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Company Name</label>
              <input type="text" className="form-control" id="name" name="name" value={entity.name} onChange={handleEntityChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" name="address" value={entity.address} onChange={handleEntityChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="industry" className="form-label">Industry</label>
              <input type="text" className="form-control" id="industry" name="industry" value={entity.industry} onChange={handleEntityChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select className="form-select" id="status" name="status" value={entity.status} onChange={handleEntityChange}>
                <option value="">Select Status</option>
                <option value="prospect">Prospect</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="website" className="form-label">Website</label>
              <input type="url" className="form-control" id="website" name="website" value={entity.website} onChange={handleEntityChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="size" className="form-label">Size (Number of Employees)</label>
              <input type="number" className="form-control" id="size" name="size" value={entity.size} onChange={handleEntityChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="founded" className="form-label">Founded (Year)</label>
              <input type="number" className="form-control" id="founded" name="founded" value={entity.founded} onChange={handleEntityChange} />
            </div>
          </>
        )}

        {/* Contact Person Fields (Common for both) */}
        <div className="mb-3">
          <label htmlFor="contact.firstName" className="form-label">First Name</label>
          <input type="text" className="form-control" id="contact.firstName" name="contact.firstName" value={entity.contact.firstName} onChange={handleEntityChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="contact.lastName" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="contact.lastName" name="contact.lastName" value={entity.contact.lastName} onChange={handleEntityChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="contact.email" className="form-label">Email</label>
          <input type="email" className="form-control" id="contact.email" name="contact.email" value={entity.contact.email} onChange={handleEntityChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="contact.phone" className="form-label">Phone</label>
          <input type="tel" className="form-control" id="contact.phone" name="contact.phone" value={entity.contact.phone} onChange={handleEntityChange} required />
        </div>
        
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default CompanyRegistration
