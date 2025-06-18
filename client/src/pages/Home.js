import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
  const navigate = useNavigate();

  const createNewDoc = () => {
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    navigate(`/documents/${id}`);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title animate-fade-in">
            Collaborate & Create <span>in Real-Time</span>
          </h1>
          <p className="hero-subtitle animate-fade-in-delay">
            The most powerful online document editor with real-time collaboration
          </p>
          <button
            onClick={createNewDoc}
            className="cta-button animate-pop-in"
          >
            Start Writing Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <h2 className="section-title animate-slide-up">
            Powerful Features
          </h2>
          <p className="section-description animate-slide-up">
            Everything you need to create, collaborate, and manage your documents
          </p>

          <div className="feature-grid">
            <div 
              className="feature-card animate-card"
              onClick={createNewDoc}
            >
              <div className="feature-icon">➕</div>
              <h3>Real-Time Editing</h3>
              <p>Collaborate with others instantly with live updates</p>
            </div>

            <div 
              className="feature-card animate-card"
              onClick={() => navigate('/templates')}
            >
              <div className="feature-icon">📑</div>
              <h3>Professional Templates</h3>
              <p>Jumpstart your work with beautifully designed templates</p>
            </div>

            <div 
              className="feature-card animate-card"
              onClick={() => navigate('/word-counter')}
            >
              <div className="feature-icon">🔤</div>
              <h3>Advanced Analytics</h3>
              <p>Get detailed insights about your writing</p>
            </div>

            <div 
              className="feature-card animate-card"
              onClick={() => navigate('/planner')}
            >
              <div className="feature-icon">📅</div>
              <h3>Productivity Tools</h3>
              <p>Plan and organize your work efficiently</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="steps-section">
        <div className="section-container">
          <h2 className="section-title animate-slide-up">How It Works</h2>
          <div className="steps-container">
            <div className="step-card animate-card">
              <div className="step-number">1</div>
              <h3>Create or Join</h3>
              <p>Start a new document or join an existing one with a shareable link</p>
            </div>
            <div className="step-card animate-card">
              <div className="step-number">2</div>
              <h3>Collaborate</h3>
              <p>Work together with your team in real-time with live cursors</p>
            </div>
            <div className="step-card animate-card">
              <div className="step-number">3</div>
              <h3>Save & Export</h3>
              <p>Your work auto-saves and can be exported in multiple formats</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="blog-section">
        <h2 className="section-title">📚 Blogs & Webinars</h2>
        <div className="blog-cards">
          <div className="blog-card">
            <h3>🔍 How Real-Time Collaboration Works</h3>
            <p>Understand the magic behind socket.io and real-time syncing in collaborative apps.</p>
            <span className="blog-date">🗓️ June 2025</span>
          </div>
          <div className="blog-card">
            <h3>🎥 Webinar: Build a Doc Editor from Scratch</h3>
            <p>Watch our full walkthrough session with live coding and setup tips!</p>
            <span className="blog-date">🗓️ May 2025</span>
          </div>
          <div className="blog-card">
            <h3>🧠 Productivity Tips for Remote Teams</h3>
            <p>Boost your remote collaboration with effective tools and daily practices used by top teams.</p>
            <span className="blog-date">🗓️ May 2025</span>
          </div>

          <div className="blog-card">
            <h3>💡 Top 5 Features Every Editor Should Have</h3>
            <p>Explore must-have features like live sync, templates, PDF export, and how they help users.</p>
            <span className="blog-date">🗓️ June 2025</span>
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title animate-slide-up">Trusted by Thousands</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card animate-card">
              <p>This tool has made my teaching workflow smoother and more interactive. It’s a must-have for modern educators.</p>
              <div className="quote-icon">❝</div>
              <div className="testimonial-author">
                <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="Amit Verma" />
                <div>
                  <strong>Amit Verma</strong>
                  <span>Professor, Delhi University</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card animate-card">
              <div className="quote-icon">❝</div>
              <p>I use it daily for writing proposals and letters. The templates and real-time editing are just brilliant!</p>
              <div className="testimonial-author">
                <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="Neha Sharma" />
                <div>
                  <strong>Neha Sharma</strong>
                  <span>Freelance Consultant, Mumbai</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card animate-card">
              <div className="quote-icon">❝</div>
              <p>As a startup founder, this has been an essential tool for preparing investor decks and internal notes quickly.</p>
              <div className="testimonial-author">
                <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="Rohan Mehta" />
                <div>
                  <strong>Rohan Mehta</strong>
                  <span>Founder, StartupX Bangalore</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card animate-card">
              <div className="quote-icon">❝</div>
              <p>This platform is perfect for school and college students. My notes are always saved and easy to access.</p>
              <div className="testimonial-author">
                <img src="https://randomuser.me/api/portraits/women/58.jpg" alt="Priya Singh" />
                <div>
                  <strong>Priya Singh</strong>
                  <span>B.Tech Student, IIT Kanpur</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card animate-card">
              <div className="quote-icon">❝</div>
              <p>This app helps me maintain my client documentation with zero hassle. It’s fast, reliable, and secure.</p>
              <div className="testimonial-author">
                <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Rajeev Nair" />
                <div>
                  <strong>Rajeev Nair</strong>
                  <span>Legal Advisor, Kochi</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card animate-card">
              <div className="quote-icon">❝</div>
              <p>Managing assignments and project reports is now easier than ever. A must-have tool for every student!</p>
              <div className="testimonial-author">
                <img src="https://randomuser.me/api/portraits/women/47.jpg" alt="Ananya Das" />
                <div>
                  <strong>Ananya Das</strong>
                  <span>MBA Student, IIM Calcutta</span>
                </div>
              </div>
            </div>
                  
 
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="section-container">
          <h2 className="section-title animate-slide-up">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-card animate-card">
              <h3>Is my data secure?</h3>
              <p>Yes, we use end-to-end encryption for all documents and regular backups to ensure your data is always safe.</p>
            </div>
            <div className="faq-card animate-card">
              <h3>How many people can collaborate at once?</h3>
              <p>Our platform supports unlimited collaborators in real-time on a single document.</p>
            </div>
            <div className="faq-card animate-card">
              <h3>What formats can I export to?</h3>
              <p>You can export to PDF, Word, TXT, and HTML formats with all formatting preserved.</p>
            </div>
            <div className="faq-card animate-card">
              <h3>Can I use this offline?</h3>
              <p>Currently we require an internet connection for real-time collaboration, but offline mode is coming soon.</p>
            </div>
            <div className="faq-card animate-card">
              <h3>Is the app free to use?</h3>
              <p>Yes! The core features are completely free. Premium features may be introduced in the future.</p>
            </div>
            <div className="faq-card animate-card">
              <h3>Do I need to create an account?</h3>
              <p>No sign-up is required to create or edit documents. Just share the document link to collaborate instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <h2 className="animate-slide-up">Ready to Transform Your Workflow?</h2>
          <p className="animate-slide-up">Join thousands of professionals who collaborate better with our platform</p>
          <div className="cta-buttons animate-slide-up">
            <button
              onClick={createNewDoc}
              className="cta-button primary"
            >
              Start For Free
            </button>
            <button className="cta-button secondary">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
      <section className="contact-section">
        <h2>📬 Get in Touch</h2>
        <p>Have questions or suggestions? We'd love to hear from you!</p>

        <div className="contact-icons">
          <a href="mailto:example@gmail.com" className="contact-icon">
            <i className="fas fa-envelope"></i>
            <span>Email Us</span>
          </a>
          <a href="https://facebook.com/" className="contact-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
            <span>Facebook</span>
          </a>
        </div>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message..." rows="4" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>


      {/* Footer */}
      <footer className="simple-footer">
       <div className="footer-container">
          <h2>📝 Real-Time Doc Editor</h2>
          <p>Collaborate. Write. Export. All in real-time.</p>
          <p className="footer-copy">© {new Date().getFullYear()} Real-Time Doc Editor</p>
        </div>
      </footer>

    </div>
  );
}