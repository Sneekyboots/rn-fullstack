import { Link } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Find Your Perfect Home</h1>
        <p>Discover the best properties for rent and sale</p>
        <div className="search-bar">
          <input type="text" placeholder="Search by location..." />
          <button className="search-button">Search</button>
        </div>
      </div>

      <section className="featured-section">
        <h2>Featured Properties</h2>
        <Link to="/properties" className="view-all-button">
          View All Properties
        </Link>
      </section>
    </div>
  );
}; 