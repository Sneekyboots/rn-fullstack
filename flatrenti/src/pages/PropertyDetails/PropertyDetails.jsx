import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import './PropertyDetails.css';

export const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      const data = await api.getPropertyById(id);
      setProperty(data);
    };
    fetchProperty();
  }, [id]);

  if (!property) return <div className="loading">Loading...</div>;

  return (
    <div className="property-details-page">
      <div className="property-details-container">
        <div className="image-gallery">
          <div className="main-image">
            <img src={property.images[activeImage]?.images || 'https://via.placeholder.com/800x500'} alt={property.title} />
          </div>
          <div className="image-thumbnails">
            {property.images.map((img, index) => (
              <img
                key={index}
                src={img.images}
                alt={`View ${index + 1}`}
                className={activeImage === index ? 'active' : ''}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="property-info-container">
          <div className="property-header">
            <div className="title-section">
              <h1>{property.title}</h1>
              <p className="address">{property.address}</p>
              <p className="price">
                ${typeof property.price === 'number' ? property.price.toLocaleString() : property.price}
                {property.type === 'rental' ? '/month' : ''}
              </p>
            </div>
            <div className="key-features">
              <div className="feature">
                <span className="icon">🛏️</span>
                <span className="value">{property.beds}</span>
                <span className="label">Beds</span>
              </div>
              <div className="feature">
                <span className="icon">🚿</span>
                <span className="value">{property.baths}</span>
                <span className="label">Baths</span>
              </div>
              <div className="feature">
                <span className="icon">📏</span>
                <span className="value">{property.sqft}</span>
                <span className="label">Sq Ft</span>
              </div>
            </div>
          </div>

          <section className="description">
            <h2>About this property</h2>
            <p>{property.description}</p>
          </section>

          <section className="amenities">
            <h2>Amenities</h2>
            <div className="amenities-grid">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  <span className="amenity-icon">✓</span>
                  <span className="amenity-name">{amenity.amenities}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="contact-section">
            <div className="contact-card">
              <h3>Interested in this property?</h3>
              <button className="contact-button">Contact Agent</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}; 