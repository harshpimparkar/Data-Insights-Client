import { Link } from "react-router-dom";
import { useAuth } from "../../context/UseAuth";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import {
  FaChartBar,
  FaStar,
  FaBolt,
  FaArrowRight,
  FaQuoteLeft,
} from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <FaChartBar size={24} />,
      title: "Data Visualization",
      description: "Turn complex data into clear, actionable visualizations",
    },
    {
      icon: <FaStar size={24} />,
      title: "AI-Powered Analysis",
      description: "Get expert insights from our advanced AI algorithms",
    },
    {
      icon: <FaBolt size={24} />,
      title: "Instant Results",
      description: "From raw data to meaningful insights in seconds",
    },
  ];

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="home-container">
      {user && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="welcome-banner"
        >
          Welcome back, {user.name.split(" ")[0]}!
        </motion.div>
      )}

      <div className="main-content">
        <div className="hero-section">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="hero-text"
          >
            <h1 className="hero-headline">
              Analyze your data like an expert with AI.
            </h1>
            <p className="hero-description">
              <div>Turn complex data into clear, actionable visualizations</div>
              <div>Get expert-level insights in seconds.</div>
              <div>Visualize your data on the go.</div>
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={user ? "/analyse-csv" : "/signup"}
                className="cta-button"
              >
                {user ? "Try it out" : "Get Started"}{" "}
                <FaArrowRight className="icon-right" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-visual"
          >
            <div className="preview-card">
              <div className="card-header">
                <div className="window-dots">
                  <div className="dot red"></div>
                  <div className="dot yellow"></div>
                  <div className="dot green"></div>
                </div>
                <div className="card-title">Analysing your data</div>
              </div>
              <div className="card-content">
                <div className="code-line">$ Analyzing data trends...</div>
                <div className="code-line">$ Identifying patterns...</div>
                <div className="code-line highlight">
                  <span className="prompt">#</span> Here's what I found!
                  <span className="cursor">▌</span>
                </div>
                <div className="chart-preview">
                  <div className="chart-bars">
                    <div className="chart-bar bar-1"></div>
                    <div className="chart-bar bar-2"></div>
                    <div className="chart-bar bar-3"></div>
                    <div className="chart-bar bar-4"></div>
                    <div className="chart-bar bar-5"></div>
                    <div className="chart-bar bar-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <hr />
        <div className="hero-cards">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="features-section"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="feature-card"
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <div className={`feature-icon icon-${index + 1}`}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="testimonial-section"
        >
          <div className="testimonial-card">
            <FaQuoteLeft className="quote-mark" />
            <p className="testimonial-text">
              This tool helped me understand my business data in ways I never
              thought possible. What used to take days now takes minutes!
            </p>
            <div className="testimonial-author">
              <p className="author-name">Sarah Johnson</p>
              <p className="author-title">Data Analyst</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="action-section"
        >
          <h2 className="action-title">
            Ready to transform your data analysis?
          </h2>
          <p className="action-description">
            Join thousands of data professionals who have already revolutionized
            their workflow.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={user ? "/analyse-csv" : "/signup"}
              className="action-button"
            >
              {user ? "Analyze your data now" : "Start your free trial"}{" "}
              <FaArrowRight className="icon-right" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
