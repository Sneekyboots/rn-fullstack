import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Properties } from './pages/Properties/Properties';
import { PropertyDetails } from './pages/PropertyDetails/PropertyDetails';
import { Favorites } from './pages/Favorites/Favorites';
import { Home } from './pages/Home/Home';
import './App.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <header>
            <nav className="navbar">
              <div className="logo">HomeMate</div>
              <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/properties">Properties</Link>
                <Link to="/favorites">Favorites</Link>
                <Link to="/contact">Contact</Link>
              </div>
            </nav>
          </header>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>

          <footer className="footer">
            <div className="footer-content">
              <div className="footer-section">
                <h3>HomeMate</h3>
                <p>Your trusted partner in finding the perfect home.</p>
              </div>
              <div className="footer-section">
                <h4>Contact</h4>
                <p>Email: info@homemate.com</p>
                <p>Phone: (555) 123-4567</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 HomeMate. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
