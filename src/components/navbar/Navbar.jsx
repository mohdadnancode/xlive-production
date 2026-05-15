import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useNavScroll } from "../../hooks/useNavScroll";
import { xliveLogo as XliveLogo } from "../../assets";

const NAV_ITEMS = [
  { label: "Racing", href: "#RACE" },
  { label: "Services", href: "#SERVICES" },
  { label: "Gallery", href: "#GALLERY" },
  { label: "Production", href: "#PRODUCTION" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  useNavScroll(navRef);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setMobileOpen(false);

  return (
    <>
      {/* ── NAV BAR ── */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-1000 flex items-center justify-between transition-all duration-300"
        style={{ padding: "1.2rem 4rem" }}
      >
        {/* Scroll-active style injected once */}
        <style>{`
          nav.sc {
            background: rgba(4,6,14,.97);
            border-bottom: 1px solid rgba(0,200,255,.08);
            backdrop-filter: blur(16px);
          }
          @media (max-width: 768px) {
            nav { padding: 0.9rem 1.5rem !important; }
          }
        `}</style>

        {/* Logo */}
        <a href="#HERO" className="flex items-center no-underline shrink-0">
          <img
            src={XliveLogo}
            alt="XLIVE — ZARNEX"
            style={{
              height: "34px",
              width: "auto",
              display: "block",
              transition: "filter .3s",
              filter: "brightness(1) drop-shadow(0 0 8px rgba(0,200,255,0))",
            }}
            onMouseEnter={(e) =>
            (e.currentTarget.style.filter =
              "brightness(1.1) drop-shadow(0 0 12px rgba(0,200,255,0.4))")
            }
            onMouseLeave={(e) =>
            (e.currentTarget.style.filter =
              "brightness(1) drop-shadow(0 0 8px rgba(0,200,255,0))")
            }
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10 list-none m-0 p-0">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="no-underline text-[0.78rem] tracking-[.12em] uppercase transition-colors duration-200"
                style={{
                  fontFamily: "Space Mono,monospace",
                  color: "rgba(255,255,255,.72)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#ffffff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,.72)")
                }
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          to="/contact"
          className="hidden md:inline-block text-[0.78rem] tracking-[.15em] uppercase px-5 py-2 border no-underline transition-all duration-200"
          style={{
            fontFamily: "Space Mono,monospace",
            borderColor: "rgba(255,255,255,.18)",
            color: "#fff",
            background: "rgba(255,255,255,.03)",
            backdropFilter: "blur(10px)",
            padding: "0.8rem 1rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#02050c";
            e.currentTarget.style.borderColor = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,.03)";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = "rgba(255,255,255,.18)";
          }}
        >
          CONTACT US ›
        </Link>

        {/* Mobile hamburger — only visible on small screens */}
        <button
          className="flex md:hidden items-center justify-center w-9 h-9 border transition-colors duration-200"
          style={{
            borderColor: "rgba(0,200,255,.3)",
            color: "var(--blue)",
            background: "transparent",
            cursor: "pointer",
          }}
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
      </nav>

      {/* ── MOBILE FULL-SCREEN MENU ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-9999 flex flex-col"
          style={{
            background: "rgba(3,5,12,.985)",
            backdropFilter: "blur(20px)",
            animation: "fadeIn .3s ease",
          }}
        >
          {/* TOP BAR */}
          <div
            className="flex items-center justify-between px-5 py-5"
            style={{
              borderBottom: "1px solid rgba(0,200,255,.08)",
            }}
          >
            <img
              src={XliveLogo}
              alt="XLIVE"
              style={{
                height: "35px",
                width: "auto",
                marginLeft: "10px",
              }}
            />

            <button
              onClick={close}
              aria-label="Close Menu"
              className="flex items-center justify-center transition-all duration-300"
              style={{
                width: "48px",
                height: "48px",
                border: "1px solid rgba(0,200,255,.18)",
                background: "rgba(0,200,255,.03)",
                color: "var(--blue)",
                cursor: "pointer",
              }}
            >
              <X size={24} strokeWidth={2.2} />
            </button>
          </div>

          {/* CENTER CONTENT */}
          <div
            className="flex-1 flex flex-col justify-center"
            style={{
              padding: "2rem 2rem 3rem",
            }}
          >
            {/* NAV LINKS */}
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item, i) => {
                const linkStyle = {
                  textDecoration: "none",
                  padding: "1.1rem 0",
                  borderBottom: "1px solid rgba(255,255,255,.04)",
                  animation: `fadeUp .45s ${i * 0.06}s both`,
                  display: "block",
                };
                const spanContent = (
                  <span
                    style={{
                      fontFamily: "Barlow Condensed,sans-serif",
                      fontSize: "clamp(2rem,7vw,3rem)",
                      fontWeight: "900",
                      fontStyle: "italic",
                      letterSpacing: ".05em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,.95)",
                      transition: ".3s ease",
                      display: "block",
                    }}
                  >
                    {item.label}
                  </span>
                );
                return item.isRoute ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={close}
                    className="group relative overflow-hidden"
                    style={linkStyle}
                  >
                    {spanContent}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={close}
                    className="group relative overflow-hidden"
                    style={linkStyle}
                  >
                    {spanContent}
                  </a>
                );
              })}
            </div>

            {/* CTA AREA */}
            <div
              style={{
                marginTop: "2.8rem",
              }}
            >
              <Link
                to="/contact"
                onClick={close}
                className="block text-center"
                style={{
                  textDecoration: "none",
                  fontFamily: "Space Mono, monospace",
                  fontSize: ".78rem",
                  letterSpacing: ".28em",
                  textTransform: "uppercase",
                  background: "var(--blue)",
                  color: "#02050c",
                  padding: "1rem 1rem",
                  clipPath:
                    "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))",
                  fontWeight: "700",
                }}
              >
                IGNITE THE RACE ›
              </Link>

              <p
                style={{
                  marginTop: "1.4rem",
                  textAlign: "center",
                  fontFamily: "Space Mono, monospace",
                  fontSize: ".62rem",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,.35)",
                }}
              >
                RIYADH · JEDDAH · DUBAI
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
