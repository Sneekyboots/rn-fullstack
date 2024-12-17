import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import './PropertyCard.css';

export const PropertyCard = ({ property }) => {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(property?.isSaved || false);

  // Get the first image from the images array
  const mainImage = property?.images?.[0]?.images || 'https://via.placeholder.com/300x200';

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) {
      // TODO: Implement redirect to login
      console.log('Please login to save properties');
      return;
    }

    try {
      await api.saveProperty(property.id);
      setIsSaved(!isSaved);
    } catch (error) {
      console.error('Failed to save property:', error);
    }
  };

  if (!property) {
    return null;
  }

  return (
    <div className="property-card">
      <img 
        src={mainImage}
        alt={property.title || 'Property'} 
        className="property-image"
      />
      {property.type && (
        <span className="property-type">{property.type}</span>
      )}
      <div className="property-content">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-price">
          ${typeof property.price === 'number' ? property.price.toLocaleString() : property.price}
          {property.type === 'rental' ? '/month' : ''}
        </p>
        <div className="property-details">
          {property.beds !== undefined && (
            <div className="property-detail">
              <i className="fas fa-bed"></i>
              <span>{property.beds} beds</span>
            </div>
          )}
          {property.baths !== undefined && (
            <div className="property-detail">
              <i className="fas fa-bath"></i>
              <span>{property.baths} baths</span>
            </div>
          )}
          {property.sqft !== undefined && (
            <div className="property-detail">
              <i className="fas fa-ruler-combined"></i>
              <span>{typeof property.sqft === 'number' ? property.sqft.toLocaleString() : property.sqft} sqft</span>
            </div>
          )}
        </div>
        {property.address && (
          <p className="property-location">
            <i className="fas fa-map-marker-alt"></i>
            {property.address}
          </p>
        )}
        <div className="property-actions">
          <Link 
            to={`/property/${property.id}`} 
            className="action-button view-details"
          >
            View Details
          </Link>
          <button 
            className={`action-button favorite-button ${isSaved ? 'active' : ''}`}
            onClick={handleSave}
          >
            <i className={`fas fa-heart`}></i>
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};
// ... rest of the code 