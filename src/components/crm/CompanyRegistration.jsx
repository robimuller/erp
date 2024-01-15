  import React, { useState } from 'react';
  import { addCompany } from '../../services/crmService';

  const CompanyRegistration = () => {
    const [entityType, setEntityType] = useState('company'); // 'company' or 'contractor'
    const [entity, setEntity] = useState({
      name: '',
      address: '',
      industry: '',
      status: '',
      website: '',
      size: '', // Number of employees
      founded: '', // Year of foundation
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
        <h1 className="display-4">Új kontakt felvétele</h1>
        <p className="lead">Új cég vagy kontakt felvétele</p>

        <form onSubmit={handleSubmit} className="d-flex">
          <div className="company-info flex-grow-1 mr-3">
            {/* Entity Type Selector */}
            <div className="mb-3">
            <label htmlFor="name" className="form-label">Kontakt típusa</label>
              <select className="form-select" value={entityType} onChange={(e) => setEntityType(e.target.value)}>
                <option value="company">Cég</option>
                <option value="contractor">Magánszemély</option>
              </select>
            </div>

            {/* Conditional Company Fields */}
            {entityType === 'company' && (
              <>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Cég neve</label>
                  <input type="text" className="form-control" id="name" name="name" value={entity.name} onChange={handleEntityChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Cím</label>
                  <input type="text" className="form-control" id="address" name="address" value={entity.address} onChange={handleEntityChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="industry" className="form-label">Iparág</label>
                  <input type="text" className="form-control" id="industry" name="industry" value={entity.industry} onChange={handleEntityChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Státusz</label>
                  <select className="form-select" id="status" name="status" value={entity.status} onChange={handleEntityChange}>
                    <option value="">Kapcsolati Státusz</option>
                    <option value="prospect">Friss</option>
                    <option value="active">Aktív</option>
                    <option value="inactive">Inaktív</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="website" className="form-label">Weboldal</label>
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
          </div>

          <div className="contact-info flex-grow-1">
            {/* Contact Person Fields */}
            <div className="mb-3">
              <label htmlFor="contact.firstName" className="form-label">Keresztnév</label>
              <input type="text" className="form-control" id="contact.firstName" name="contact.firstName" value={entity.contact.firstName} onChange={handleEntityChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="contact.lastName" className="form-label">Vezetéknév</label>
              <input type="text" className="form-control" id="contact.lastName" name="contact.lastName" value={entity.contact.lastName} onChange={handleEntityChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="contact.email" className="form-label">Email</label>
              <input type="email" className="form-control" id="contact.email" name="contact.email" value={entity.contact.email} onChange={handleEntityChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="contact.phone" className="form-label">Telefon</label>
              <input type="tel" className="form-control" id="contact.phone" name="contact.phone" value={entity.contact.phone} onChange={handleEntityChange} required />
            </div>
          </div>

        <button type="submit" className="btn btn-primary">Regisztrálás</button>
        </form>
      </div>
    );
  };

  export default CompanyRegistration;
