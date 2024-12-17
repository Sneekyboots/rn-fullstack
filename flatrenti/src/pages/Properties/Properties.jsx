import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { PropertyCard } from '../../components/PropertyCard/PropertyCard';
import './Properties.css';

export const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    minPrice: '',
    maxPrice: '',
    beds: '',
    baths: '',
    amenities: []
  });

  const amenitiesList = [
    { id: 'ac', label: 'Air Conditioning', icon: '❄️' },
    { id: 'parking', label: 'Parking', icon: '🅿️' },
    { id: 'gym', label: 'Gym', icon: '💪' },
    { id: 'pool', label: 'Swimming Pool', icon: '🏊‍♂️' },
    { id: 'internet', label: 'High Speed Internet', icon: '🌐' },
    { id: 'laundry', label: 'Laundry', icon: '🧺' },
    { id: 'garden', label: 'Garden', icon: '🌳' },
    { id: 'garage', label: 'Garage', icon: '🚗' },
    { id: 'smart', label: 'Smart Home System', icon: '🏠' },
    { id: 'security', label: 'Security System', icon: '🔒' },
    { id: 'view', label: 'Ocean View', icon: '🌊' },
    { id: 'terrace', label: 'Private Terrace', icon: '🏞️' },
    { id: 'concierge', label: 'Concierge', icon: '👨‍💼' },
    { id: 'ceilings', label: 'High Ceilings', icon: '📐' },
    { id: 'brick', label: 'Exposed Brick', icon: '🧱' },
    { id: 'studio', label: 'Artist Studio Space', icon: '🎨' }
  ];

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getProperties(filters);
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format');
      }
      
      const validProperties = data.filter(property => {
        const isValid = property && property.id && property.title && property.price;
        if (!isValid) {
          console.warn('Invalid property data:', property);
        }
        return isValid;
      });

      setProperties(validProperties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Failed to load properties. Please try again later.');
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAmenityToggle = (amenityId) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(a => a !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const renderFilterSection = () => (
    <aside className="filters-sidebar">
      <div className="filter-section">
        <h3>🏠 Property Type</h3>
        <select 
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
        >
          <option value="all">All Properties</option>
          <option value="rental">For Rent</option>
          <option value="sale">For Sale</option>
        </select>
      </div>

      <div className="filter-section">
        <h3>💰 Price Range</h3>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            min="0"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            min="0"
          />
        </div>
      </div>

      <div className="filter-section">
        <h3>🛏️ Bedrooms</h3>
        <select
          value={filters.beds}
          onChange={(e) => handleFilterChange('beds', e.target.value)}
        >
          <option value="">Any</option>
          <option value="1">1+ Bed</option>
          <option value="2">2+ Beds</option>
          <option value="3">3+ Beds</option>
          <option value="4">4+ Beds</option>
        </select>
      </div>

      <div className="filter-section">
        <h3>🚿 Bathrooms</h3>
        <select
          value={filters.baths}
          onChange={(e) => handleFilterChange('baths', e.target.value)}
        >
          <option value="">Any</option>
          <option value="1">1+ Bath</option>
          <option value="2">2+ Baths</option>
          <option value="3">3+ Baths</option>
        </select>
      </div>

      <div className="filter-section">
        <h3>✨ Amenities</h3>
        <div className="amenities-list">
          {amenitiesList.map(({ id, label, icon }) => (
            <label key={id} className="amenity-checkbox">
              <input
                type="checkbox"
                checked={filters.amenities.includes(id)}
                onChange={() => handleAmenityToggle(id)}
              />
              <span>{icon} {label}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );

  const renderProperties = () => {
    if (loading) {
      return <div className="loading">Loading properties...</div>;
    }

    if (error) {
      return <div className="error-message">{error}</div>;
    }

    return (
      <>
        <div className="properties-header">
          <h2>Available Properties</h2>
          <span>{properties.length} {properties.length === 1 ? 'property' : 'properties'} found</span>
        </div>
        <div className="properties-list">
          {properties.length > 0 ? (
            properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="no-results">
              No properties found matching your criteria. Try adjusting your filters.
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="properties-page">
      {renderFilterSection()}
      <main className="properties-grid">
        {renderProperties()}
      </main>
    </div>
  );
}; 