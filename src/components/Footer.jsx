import { Link } from "react-router-dom";
import "./Components.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <img
                src="https://img.icons8.com/?size=160&id=112604&format=png"
                alt="DataGram logo"
              />
              <h2 className="footer-name">DataGram</h2>
            </div>
            <p className="footer-tagline">
              AI-powered data analysis made simple
            </p>
          </div>

          <div className="footer-nav-container">
            <div className="footer-nav">
              <h3>Product</h3>
              <ul>
                <li>
                  <Link to="/analyse-csv">Analyze Data</Link>
                </li>
                <li>
                  <Link to="/extract-insight">Get Insights</Link>
                </li>
                <li>
                  <Link to="/generate-graph">Create Visualizations</Link>
                </li>
                <li>
                  <Link to="/pricing">Pricing</Link>
                </li>
              </ul>
            </div>

            <div className="footer-nav">
              <h3>Company</h3>
              <ul>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/careers">Careers</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div className="footer-nav">
              <h3>Resources</h3>
              <ul>
                <li>
                  <Link to="/documentation">Documentation</Link>
                </li>
                <li>
                  <Link to="/tutorials">Tutorials</Link>
                </li>
                <li>
                  <Link to="/api">API</Link>
                </li>
                <li>
                  <Link to="/help">Help Center</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="social-links">
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="social-link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="social-link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a
              href="https://github.com"
              aria-label="GitHub"
              className="social-link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>

          <div className="footer-legal">
            <div className="copyright">
              &copy; {currentYear} DataGram. All rights reserved.
            </div>
            <div className="legal-links">
              <Link to="/terms">Terms</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/cookies">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
