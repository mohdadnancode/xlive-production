import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  MapPin,
  ArrowLeft,
} from "lucide-react";
import { xliveLogo } from "../../assets";
import { useCursor } from "../../hooks/useCursor";
import SuccessModal from "./SuccessModal";
import "./ContactPage.css";

const LOCATIONS = [
  { tag: "Riyadh Office", city: "Riyadh, Saudi Arabia" },
  { tag: "Jeddah Office", city: "Jeddah, Saudi Arabia" },
  { tag: "Dubai Office", city: "Dubai, UAE" },
];

export default function ContactPage() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Custom cursor
  useCursor();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ── Validation helpers ── */
  const validate = (values) => {
    const errs = {};
    if (!values.name.trim()) errs.name = "Name is required";
    else if (values.name.trim().length < 2)
      errs.name = "Name must be at least 2 characters";

    if (!values.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      errs.email = "Enter a valid email address";

    if (!values.message.trim()) errs.message = "Message is required";
    else if (values.message.trim().length < 10)
      errs.message = "Message must be at least 10 characters";

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        const fieldErr = validate({ ...form, [name]: value })[name];
        if (fieldErr) next[name] = fieldErr;
        else delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    const fieldErr = validate(form)[name];
    setErrors((prev) => {
      const next = { ...prev };
      if (fieldErr) next[name] = fieldErr;
      else delete next[name];
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setSubmittedName(form.name.trim());
      setModalOpen(true);
      setForm({ name: "", email: "", message: "" });
      setTouched({});
      setErrors({});
    }
  };

  return (
    <>
      {/* Custom cursor elements */}
      <div id="CUR" />
      <div id="CRING" />

      <div className="contact-page">
        {/* Animated grid background */}
        <div className="contact-grid-bg" />

        {/* Top nav bar */}
        <div className="contact-topbar">
          <button
            className="contact-back-btn"
            onClick={() => navigate("/")}
            aria-label="Back to home"
          >
            <ArrowLeft size={16} />
            <span>BACK</span>
          </button>
          <a href="/" className="contact-logo">
            <img src={xliveLogo} alt="XLIVE — ZARNEX" />
          </a>
        </div>

        {/* Main content */}
        <div className="contact-wrapper">
          {/* Left column — Info */}
          <div className="contact-info">
            <div className="contact-info-inner">
              <div className="sec-eyebrow">Get In Touch</div>
              <h1 className="contact-heading">
                Contact <em>Us</em>
              </h1>
              <p className="contact-desc">
                Whether you're planning the next world-class event, need
                broadcast infrastructure, or want to collaborate — our
                operations center is standing by.
              </p>

              {/* Location cards */}
              <div className="contact-locations">
                {LOCATIONS.map((loc) => (
                  <div key={loc.tag} className="contact-loc-item">
                    <MapPin size={14} className="contact-loc-icon" />
                    <div>
                      <div className="contact-loc-tag">{loc.tag}</div>
                      <div className="contact-loc-city">{loc.city}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Email */}
              <div className="contact-email-row">
                <Mail size={14} style={{ color: "rgba(255, 255, 255, 0.8)", flexShrink: 0 }} />
                <a href="mailto:hello@zarnex.com" className="contact-email-link">
                  hello@zarnex.com
                </a>
              </div>
            </div>
          </div>

          {/* Right column — Form */}
          <div className="contact-form-col">
            <form
              ref={formRef}
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="cf-header">
                <h2 className="cf-header-title">Contact Form</h2>
              </div>

              {/* Name */}
              <div className={`cf-field ${errors.name && touched.name ? "cf-field--error" : ""}`}>
                <label htmlFor="contact-name" className="cf-label">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="name"
                  className="cf-input"
                />
                {errors.name && touched.name && (
                  <span className="cf-error">{errors.name}</span>
                )}
              </div>

              {/* Email */}
              <div className={`cf-field ${errors.email && touched.email ? "cf-field--error" : ""}`}>
                <label htmlFor="contact-email" className="cf-label">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                  className="cf-input"
                />
                {errors.email && touched.email && (
                  <span className="cf-error">{errors.email}</span>
                )}
              </div>

              {/* Message */}
              <div className={`cf-field ${errors.message && touched.message ? "cf-field--error" : ""}`}>
                <label htmlFor="contact-message" className="cf-label">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Your message..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="cf-input cf-textarea"
                />
                {errors.message && touched.message && (
                  <span className="cf-error">{errors.message}</span>
                )}
              </div>

              {/* Submit */}
              <button type="submit" className="cf-submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success modal */}
      <SuccessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        userName={submittedName}
      />
    </>
  );
}
