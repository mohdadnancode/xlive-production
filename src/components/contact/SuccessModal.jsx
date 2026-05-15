import { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";
import "./ContactPage.css";

export default function SuccessModal({ isOpen, onClose, userName }) {
  // Lock body scroll & close on Escape
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={18} strokeWidth={2.2} />
        </button>

        {/* Animated checkmark */}
        <div className="modal-icon-wrap">
          <CheckCircle size={48} strokeWidth={1.5} />
        </div>

        {/* Content */}
        <div className="modal-eyebrow">Message Sent</div>
        <h3 className="modal-title">
          Thank <em>You</em>
        </h3>
        <p className="modal-body">
          {userName ? (
            <>
              Thank you, <span className="modal-highlight">{userName}</span>.
            </>
          ) : (
            "Thank you."
          )}{" "}
          Your message has been successfully received. Our team will be in touch with you shortly.
        </p>

        {/* CTA */}
        <button className="modal-cta cf-submit" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
