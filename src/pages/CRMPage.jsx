import React, { useState, useEffect } from 'react';
import { Link, useRoutes } from 'react-router-dom';
import { getCompanies, updateCompany } from '../services/crmService'; // Import updateCompany here
import CompanyRegistration from '../components/crm/CompanyRegistration';
import './CRMPage.css';
import { Dropdown, DropdownButton, DropdownItem } from 'react-bootstrap'; // Import from react-bootstrap


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

const CRMContent = ({ companies, searchTerm, handleSearchChange }) => {
  const [selectedColumns, setSelectedColumns] = useState(['name']);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });


  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setEditableCompany({ ...company }); // Create a copy of the company object
    setIsEditMode(false);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const sortedCompanies = React.useMemo(() => {
    let sortableCompanies = [...companies];
    if (sortConfig.key !== null) {
      sortableCompanies.sort((a, b) => {
        const aValue = getNestedValue(a, sortConfig.key);
        const bValue = getNestedValue(b, sortConfig.key);
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCompanies;
  }, [companies, sortConfig]);




  const columnOptions = [
    { label: 'Company Name', value: 'name' },
    { label: 'Phone Number', value: 'contact.phone' },
    { label: 'First Name', value: 'contact.firstName' },
    { label: 'Last Name', value: 'contact.lastName' },
    { label: 'Email', value: 'contact.email' },
    // Add other options here
  ];

  const CustomDropdown = () => {
    const toggleColumn = (value) => {
      if (selectedColumns.includes(value)) {
        setSelectedColumns(selectedColumns.filter(col => col !== value));
      } else {
        setSelectedColumns([...selectedColumns, value]);
      }
    };

    return (
      <DropdownButton id="dropdown-basic-button" title="Oszlopok" className="ms-2">
        {columnOptions.map(option => (
          <Dropdown.Item
            key={option.value}
            onClick={() => toggleColumn(option.value)}
            active={selectedColumns.includes(option.value)}
          >
            {selectedColumns.includes(option.value) && <span className="me-2">✔</span>}
            {option.label}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  };

  return (
    <>
      <div className="container">

        <div className="d-flex justify-content-between align-items-center bg-light p-3 sticky-top">
          <div className="input-group flex-grow-1">
            <span className="input-group-text">
              <i className="bi bi-search"></i> {/* Bootstrap Icons Search Icon */}
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          &nbsp; {/* Non-breaking space */}
          {/* Dropdown for selecting columns */}
          <CustomDropdown /> {/* Use the custom dropdown */}

          <Link to="register-company" className="btn btn-light bg-white ms-2 d-flex align-items-center">
            <i className="bi bi-plus-circle"></i>
            &nbsp; {/* Non-breaking space */}
            <span>Adatfelvétel</span>
          </Link>
        </div>
      </div>


      <div className="container mt-3">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              {selectedColumns.includes('name') &&
                <th onClick={() => requestSort('name')}>
                  Company Name &nbsp;
                  <i className={`bi bi-arrow-${sortConfig.key === 'name' && sortConfig.direction === 'ascending' ? 'down' : 'up'}`}></i>
                </th>}
              {selectedColumns.includes('contact.phone') &&
                <th onClick={() => requestSort('contact.phone')}>
                  Phone Number &nbsp;
                  <i className={`bi bi-arrow-${sortConfig.key === 'contact.phone' && sortConfig.direction === 'ascending' ? 'down' : 'up'}`}></i>
                </th>}
              {selectedColumns.includes('contact.firstName') &&
                <th onClick={() => requestSort('contact.firstName')}>
                  First Name &nbsp;
                  <i className={`bi bi-arrow-${sortConfig.key === 'contact.firstName' && sortConfig.direction === 'ascending' ? 'down' : 'up'}`}></i>
                </th>}
              {selectedColumns.includes('contact.lastName') &&
                <th onClick={() => requestSort('contact.lastName')}>
                  Last Name &nbsp;
                  <i className={`bi bi-arrow-${sortConfig.key === 'contact.lastName' && sortConfig.direction === 'ascending' ? 'down' : 'up'}`}></i>
                </th>}
              {selectedColumns.includes('contact.email') &&
                <th onClick={() => requestSort('contact.email')}>
                  Email &nbsp;
                  <i className={`bi bi-arrow-${sortConfig.key === 'contact.email' && sortConfig.direction === 'ascending' ? 'down' : 'up'}`}></i>
                </th>}
            </tr>
          </thead>
          <tbody>
            {sortedCompanies.map(company => (
              <tr key={company.id} onClick={() => handleCompanyClick(company)}>
                {selectedColumns.map(column => (
                  <td key={column}>{getNestedValue(company, column)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  );
};

export default CRMPage;
