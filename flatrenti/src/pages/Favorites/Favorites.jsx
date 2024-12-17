import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PropertyCard } from '../../components/PropertyCard/PropertyCard';
import { api } from '../../services/api';
import './Favorites.css';

export const Favorites = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSavedProperties();
    }
  }, [user]);

  const fetchSavedProperties = async () => {
    try {
      setLoading(true);
      const data = await api.getSavedProperties();
      setSavedProperties(data);
    } catch (error) {
      console.error('Error fetching saved properties:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="favorites-page">
        <div className="login-prompt">
          <h2>Please log in to view your saved properties</h2>
          <button onClick={() => navigate('/login')} className="login-button">
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>Your Saved Properties</h1>
        <p>{savedProperties.length} properties saved</p>
      </div>

      {loading ? (
        <div className="loading">Loading saved properties...</div>
      ) : (
        <div className="favorites-grid">
          {savedProperties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              onRemove={() => {
                setSavedProperties(prev => 
                  prev.filter(p => p.id !== property.id)
                );
              }}
            />
          ))}
          {savedProperties.length === 0 && (
            <div className="no-favorites">
              <h3>No saved properties yet</h3>
              <p>Start browsing and save properties you like!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 