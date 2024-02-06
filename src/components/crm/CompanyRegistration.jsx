import React, { useState } from 'react';
import { addCompany } from '../../services/crmService';

// Assume these are your main categories with some example materials
const materialCategories = {
  'Metals': [
    'Aluminum',
    'Copper',
    'Iron',
    'Lead',
    'Nickel',
    'Tin',
    'Zinc',
    'Titanium',
    'Gold',
    'Silver',
    'Platinum',
    'Palladium',
    'Steel (Various Grades)',
    'Stainless Steel (304, 316, 410, etc.)',
    'Brass',
    'Bronze',
    'Duralumin',
    'Inconel',
    'Monel',
    'Hastelloy',
    'Nimonic',
    'Gunmetal',
    'Solder',
    'Babbitt Metal',
    'Magnalium',
    'Electrum',
    'Amalgam',
    'Titanium-Aluminum Alloy',
    'Nickel-Chromium-Molybdenum Alloy',
    'Copper-Nickel Alloy',
    // Add more alloys here.
    'Iron Slag',
    'Copper Slag',
    'Nickel Slag',
    'Lead Slag',
    'Aluminum Dross',
    'Zinc Dross',
    'Steelmaking Slag',
    'Blast Furnace Slag',
    // Add more specific slag types here.
    'Copper Hydroxide Sludge',
    'Nickel Hydroxide Sludge',
    'Zinc Hydroxide Sludge',
    'Aluminum Hydroxide Sludge',
    'Copper Sulphate Solution',
    'Zinc Sulphate Solution',
    'Nickel Sulphate Solution',
    'Electroplating Sludge',
    'Galvanizing Sludge',
    // Include other sludges and solutions with metal content.
    'Catalytic Converters',
    'Computer Circuit Boards',
    'Mobile Phone Boards',
    'Photographic Sludge',
    'Silver Oxide Batteries',
    'Gold Plated Items',
    // List other items containing precious metals.
    'Uranium (U3O8)',
    'Thorium',
    'Plutonium',
    'Depleted Uranium',
    // Include other radioactive metals if necessary.
    'Neodymium',
    'Dysprosium',
    'Praseodymium',
    'Samarium',
    'Europium',
    'Cerium',
    'Lanthanum',
    'Gadolinium',
    'Yttrium',
    // Add more rare earth metals.
    'Titanium-Aluminum Alloy',
    'Nickel-Chromium-Molybdenum Alloy',
    'Copper-Nickel Alloy',
    // List other unique alloy compositions.
    'Superalloys (e.g., Inconel, Hastelloy)',
    'Tungsten-based Alloys',
    // Add alloys suitable for high-temperature applications.
    'Arsenic',
    'Mercury',
    'Cadmium',
    'Beryllium',
    // Include metals classified as hazardous waste.
  ],
  'Plastics': [
    'Polyethylene (PE)',
    'Polypropylene (PP)',
    'Polyvinyl Chloride (PVC)',
    'Polyethylene Terephthalate (PET)',
    'Polystyrene (PS)',
    'Polycarbonate (PC)',
    'Acrylonitrile Butadiene Styrene (ABS)',
    'Polyurethane (PU)',
    'Polytetrafluoroethylene (PTFE, Teflon)',
  ],
  'Ceramics': [
    'Alumina (Aluminum Oxide, Al2O3)',
    'Zirconia (Zirconium Dioxide, ZrO2)',
    'Silicon Carbide (SiC)',
    'Silicon Nitride (Si3N4)',
    'Titanium Diboride (TiB2)',
    'Sialon (Silicon Aluminum Oxynitride)',
  ],
  'Composites': [
    'Fiber Reinforced Polymers (FRP)',
    'Carbon Fiber Reinforced Polymers (CFRP)',
    'Glass Fiber Reinforced Polymers (GFRP)',
    'Metal Matrix Composites (MMC)',
    'Ceramic Matrix Composites (CMC)',
    'Concrete',
    'Wood Plastic Composite (WPC)',
  ],
  'Textiles': [
    'Cotton',
    'Wool',
    'Silk',
    'Nylon',
    'Polyester',
    'Rayon',
    'Spandex',
    'Acrylic',
  ],
  'Rubbers': [
    'Natural Rubber',
    'Synthetic Rubber',
    'Silicone Rubber',
    'Neoprene',
    'Nitrile Rubber',
    'Butyl Rubber',
    'EPDM Rubber (Ethylene Propylene Diene Monomer Rubber)',
  ],
  'Glass': [
    'Soda-Lime Glass',
    'Borosilicate Glass',
    'Lead Glass',
    'Aluminosilicate Glass',
    'Tempered Glass',
    'Laminated Glass',
  ],
  'Paper': [
    'Kraft Paper',
    'Cardstock',
    'Newsprint',
    'Tissue Paper',
    'Corrugated Cardboard',
    'Parchment Paper',
    'Coated Paper',
  ],
  'Adhesives & Sealants': [
    'Epoxy',
    'Polyurethane Adhesive',
    'Silicone Sealant',
    'Acrylic Adhesive',
    'Cyanoacrylate (Super Glue)',
    'Polyvinyl Acetate (PVA, Wood Glue)',
  ],
  'Coatings & Paints': [
    'Acrylic Paints',
    'Alkyd Paints',
    'Epoxy Coatings',
    'Polyurethane Coatings',
    'Latex Paints',
    'Enamel Paints',
  ],
  'Fuels & Oils': [
    'Gasoline',
    'Diesel',
    'Kerosene',
    'Natural Gas',
    'Crude Oil',
    'Lubricating Oil',
    'Hydraulic Oil',
  ],
  // Add more categories and sub-materials as needed...
};


const CompanyRegistration = () => {
  const [entityType, setEntityType] = useState('company'); // 'company' or 'contractor'
  const [dealsWithMaterials, setDealsWithMaterials] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [materials, setMaterials] = useState({});

  const [company, setCompany] = useState({
    name: '',
    address: '',
    email: '',
    website: '',
  });

  const [contractor, setContractor] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    contactPerson: '',
    contactCompany: '',
  });

  const [contacts, setContacts] = useState([
    {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      contactPerson: '',
      contactCompany: '',
    }
  ]);

  const handleCategoryChange = (category) => {
    const newSelectedCategories = selectedCategories.includes(category) ?
      selectedCategories.filter(c => c !== category) :
      [...selectedCategories, category];

    setSelectedCategories(newSelectedCategories);

    setMaterials(prevMaterials => {
      const updatedMaterials = { ...prevMaterials };
      if (newSelectedCategories.includes(category)) {
        updatedMaterials[category] = materialCategories[category].reduce((acc, material) => {
          acc[material] = { buy: false, sell: false };
          return acc;
        }, {});
      } else {
        delete updatedMaterials[category];
      }
      return updatedMaterials;
    });
  };

  const handleMaterialDetailChange = (category, material, type, checked) => {
    setMaterials(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [material]: { ...prev[category][material], [type]: checked },
      },
    }));
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleContractorChange = (e) => {
    const { name, value } = e.target;
    setContractor({ ...contractor, [name]: value });
  };

  const handleContactChange = (index, e) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][e.target.name] = e.target.value;
    setContacts(updatedContacts);
  };

  const addContact = () => {
    setContacts([...contacts, {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      contactPerson: '',
      contactCompany: '',
    }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      entityType,
      dealsWithMaterials,
      selectedCategories,
      materials,
      ...(entityType === 'company' ? { company, contacts } : { contractor }),
    };

    try {
      const result = await addCompany(payload);
      console.log('Data saved successfully:', result);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const removeContact = (index) => {
    setContacts(contacts.filter((_, contactIndex) => contactIndex !== index));
  };

  return (
    <div className="crm-page container mt-5">
      <h1 className="display-4">{entityType === 'company' ? 'Új cég regisztráció' : 'Új magánszemély regisztráció'}</h1>
      <p className="lead">{entityType === 'company' ? 'Cég és kapcsolattartói információk felvétele' : 'Magánszemély információinak felvétele'}</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="entityType" className="form-label">Regisztráció típusa</label>
          <select className="form-select" value={entityType} onChange={(e) => setEntityType(e.target.value)}>
            <option value="company">Cég</option>
            <option value="contractor">Magánszemély</option>
          </select>
        </div>

        {entityType === 'company' && (
          <>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">Cég neve</label>
                <input type="text" className="form-control" id="name" name="name" value={company.name} onChange={handleCompanyChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="address" className="form-label">Cím</label>
                <input type="text" className="form-control" id="address" name="address" value={company.address} onChange={handleCompanyChange} />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={company.email} onChange={handleCompanyChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="website" className="form-label">Weboldal</label>
                <input type="url" className="form-control" id="website" name="website" value={company.website} onChange={handleCompanyChange} />
              </div>
            </div>


            {contacts.map((contact, index) => (
              <div key={index} className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5>Kapcsolattartó {index + 1}</h5>
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => removeContact(index)}>Remove</button>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor={`firstName-${index}`} className="form-label">Keresztnév</label>
                    <input type="text" className="form-control" id={`firstName-${index}`} name="firstName" value={contact.firstName} onChange={(e) => handleContactChange(index, e)} required />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor={`lastName-${index}`} className="form-label">Vezetéknév</label>
                    <input type="text" className="form-control" id={`lastName-${index}`} name="lastName" value={contact.lastName} onChange={(e) => handleContactChange(index, e)} required />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor={`email-${index}`} className="form-label">Email</label>
                    <input type="email" className="form-control" id={`email-${index}`} name="email" value={contact.email} onChange={(e) => handleContactChange(index, e)} required />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor={`phone-${index}`} className="form-label">Telefonszám</label>
                    <input type="tel" className="form-control" id={`phone-${index}`} name="phone" value={contact.phone} onChange={(e) => handleContactChange(index, e)} required />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor={`position-${index}`} className="form-label">Pozíció</label>
                    <input type="text" className="form-control" id={`position-${index}`} name="position" value={contact.position} onChange={(e) => handleContactChange(index, e)} />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor={`contactPerson-${index}`} className="form-label">Kapcsolattartónk</label>
                    <input type="text" className="form-control" id={`contactPerson-${index}`} name="contactPerson" value={contact.contactPerson} onChange={(e) => handleContactChange(index, e)} required />
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-3">
                    <label htmlFor={`contactCompany-${index}`} className="form-label">Kapcsolódó cégünk</label>
                    <input type="text" className="form-control" id={`contactCompany-${index}`} name="contactCompany" value={contact.contactCompany} onChange={(e) => handleContactChange(index, e)} required />
                  </div>
                </div>
              </div>
            ))}

            <div className="mb-3">
              <button type="button" className="btn btn-secondary" onClick={addContact}>Kapcsolattartó hozzáadása</button>
            </div>
          </>
        )}

        {/* Contractor Information */}
        {entityType === 'contractor' && (
          <>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">Keresztnév</label>
              <input type="text" className="form-control" id="firstName" name="firstName" value={contractor.firstName} onChange={handleContractorChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Vezetéknév</label>
              <input type="text" className="form-control" id="lastName" name="lastName" value={contractor.lastName} onChange={handleContractorChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={contractor.email} onChange={handleContractorChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Telefonszám</label>
              <input type="tel" className="form-control" id="phone" name="phone" value={contractor.phone} onChange={handleContractorChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="position" className="form-label">Pozíció</label>
              <input type="text" className="form-control" id="position" name="position" value={contractor.position} onChange={handleContractorChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="contactPerson" className="form-label">Kapcsolattartónk</label>
              <input type="text" className="form-control" id="contactPerson" name="contactPerson" value={contractor.contactPerson} onChange={handleContractorChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="contactCompany" className="form-label">Kapcsolódó cégünk</label>
              <input type="text" className="form-control" id="contactCompany" name="contactCompany" value={contractor.contactCompany} onChange={handleContractorChange} required />
            </div>
          </>
        )}

        <div className="mb-3">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="dealsWithMaterials" checked={dealsWithMaterials} onChange={() => setDealsWithMaterials(!dealsWithMaterials)} />
            <label className="form-check-label" htmlFor="dealsWithMaterials">Anyag kereskedelem</label>
          </div>
        </div>

        {dealsWithMaterials && (
          <>
            <div className="mb-3">
              <label className="form-label">Anyag kategóriák</label>
              {Object.keys(materialCategories).map(category => (
                <div key={category} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <label className="form-check-label" htmlFor={`category-${category}`}>{category}</label>
                </div>
              ))}
            </div>
            {selectedCategories.map(category => (
              <div key={category} className="mb-3">
                <h5>{category} Materials</h5>
                {Object.keys(materials[category]).map(material => (
                  <div key={material} className="mb-1">
                    <span>{material}: </span>
                    <input type="checkbox" id={`${category}-${material}-buy`} checked={materials[category][material].buy} onChange={(e) => handleMaterialDetailChange(category, material, 'buy', e.target.checked)} /> Buy
                    <input type="checkbox" id={`${category}-${material}-sell`} checked={materials[category][material].sell} onChange={(e) => handleMaterialDetailChange(category, material, 'sell', e.target.checked)} /> Sell
                  </div>
                ))}
              </div>
            ))}
          </>
        )}

        <div className="form-submit mt-3">
          <button type="submit" className="btn btn-primary">Regisztrálás</button>
        </div>
      </form>
    </div>
  );
};

export default CompanyRegistration;
