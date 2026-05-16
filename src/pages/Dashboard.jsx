import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLanguage from "../hooks/useLanguage";
import "./Dashboard.css";

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("authUser");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

function Dashboard() {
  const navigate = useNavigate();
  const { isHindi, toggleLanguage } = useLanguage();
  const [user, setUser] = useState(() => getStoredUser());

  const copy = isHindi
    ? {
        welcomeBack: "वापसी पर स्वागत है",
        loggedIn: "सफलतापूर्वक लॉगिन हुआ",
        hello: (name) => `नमस्ते ${name}, आपका स्टार्टअप वर्कस्पेस तैयार है`,
        description:
          "यह आपकी व्यक्तिगत आयुष पोर्टल स्क्रीन है. यहां से प्रोफाइल, स्थिति और आगे के अपडेट देख सकते हैं।",
        registerAnother: "एक और खाता पंजीकृत करें",
        goHome: "मुख्य पृष्ठ",
        startupAccount: "स्टार्टअप खाता",
        noEmail: "ईमेल उपलब्ध नहीं है",
        noMobile: "मोबाइल उपलब्ध नहीं है",
        founder: "संस्थापक",
        founderDesc: "पोर्टल पहुंच के लिए अधिकृत खाता धारक।",
        startup: "स्टार्टअप",
        startupDesc: "पोर्टल में पंजीकृत स्टार्टअप पहचान।",
        sector: "आयुष क्षेत्र",
        sectorDesc: "आपके आवेदन से जुड़ा प्राथमिक अभ्यास क्षेत्र।",
        location: "स्थान",
        locationDesc: "पंजीकरण के समय चुना गया राज्य / केंद्र शासित प्रदेश।",
        nextStep: "अगला चरण",
        nextStepTitle: "प्रोफ़ाइल समीक्षा और दस्तावेज़ जमा करना",
        nextStepDesc: "अगला चरण दस्तावेज़ अपलोड, प्रोफ़ाइल सत्यापन और आवेदन स्थिति की निगरानी है।",
        status: "प्रगति में",
        logout: "लॉग आउट",
        ourTeam: "हमारी टीम",
        dashboardTitle: "आयुष पोर्टल डैशबोर्ड",
      }
    : {
        welcomeBack: "Welcome back",
        loggedIn: "Logged in successfully",
        hello: (name) => `Hello ${name}, your startup workspace is ready`,
        description:
          "This is your personalized AYUSH portal screen. Use it to review your profile, status, and next steps.",
        registerAnother: "Register Another Account",
        goHome: "Go Home",
        startupAccount: "Startup Account",
        noEmail: "No email stored",
        noMobile: "No mobile stored",
        founder: "Founder",
        founderDesc: "Authorized account holder for portal access.",
        startup: "Startup",
        startupDesc: "Registered startup identity inside the portal.",
        sector: "AYUSH Sector",
        sectorDesc: "Primary practice area linked to your application.",
        location: "Location",
        locationDesc: "State / UT chosen during registration.",
        nextStep: "Next Step",
        nextStepTitle: "Profile review and document submission",
        nextStepDesc: "The next stage is document upload, profile verification, and monitoring your application status.",
        status: "In progress",
        logout: "Logout",
        ourTeam: "Our Team",
        dashboardTitle: "AYUSH Portal Dashboard",
      };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = getStoredUser();

    if (!token || !storedUser) {
      navigate("/login");
      return;
    }

    setUser(storedUser);
  }, [navigate]);

  const sectorList = useMemo(() => user?.ayushSector || [], [user]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    } catch {
      // Ignore storage failures.
    }

    navigate("/");
  };

  const shortName = user?.fullName?.split(" ")[0] || "User";

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <div className="header-logo-box">
            <img src="/logo1.png" alt="AYUSH Logo" className="brand-logo" />
          </div>

          <div className="dashboard-header-copy">
            <p className="dashboard-kicker">{copy.welcomeBack}</p>
            <h1 className="dashboard-title">
              {isHindi ? (
                <>
                  <span>आयुष</span> पोर्टल डैशबोर्ड
                </>
              ) : (
                <>
                  <span>AYUSH</span> Portal Dashboard
                </>
              )}
            </h1>
          </div>

          <div className="dashboard-header-actions">
            <button
              className="lang-switch-btn"
              onClick={toggleLanguage}
              aria-label="Language toggle"
            >
              <span className={`lang-pill ${isHindi ? "active" : ""}`}>
                <span className="lang-knob">{isHindi ? "हि" : "En"}</span>
              </span>
            </button>
            <button className="btn btn-light header-action-btn" onClick={() => navigate("/our-team")}>{copy.ourTeam}</button>
            <button className="btn btn-green header-action-btn" onClick={handleLogout}>{copy.logout}</button>
          </div>
        </header>

        <main className="dashboard-main">
          <section className="dashboard-hero">
            <div className="dashboard-hero-left">
              <p className="dashboard-badge">{copy.loggedIn}</p>
              <h2>
                {copy.hello(shortName)}
              </h2>
              <p className="dashboard-hero-text">
                {copy.description}
              </p>
              <div className="dashboard-actions-row">
                <button className="btn btn-green" onClick={() => navigate("/signup")}>{copy.registerAnother}</button>
                <button className="btn btn-light" onClick={() => navigate("/")}>{copy.goHome}</button>
              </div>
            </div>

            <div className="dashboard-hero-card">
              <div className="dashboard-profile-ring">
                <span>{shortName.charAt(0).toUpperCase()}</span>
              </div>
              <h3>{user?.startupName || copy.startupAccount}</h3>
              <p>{user?.email || copy.noEmail}</p>
              <p>{user?.mobile || copy.noMobile}</p>
            </div>
          </section>

          <section className="dashboard-grid">
            <article className="dashboard-card">
              <span className="card-label">{copy.founder}</span>
              <h4>{user?.fullName || "Not available"}</h4>
              <p>{copy.founderDesc}</p>
            </article>

            <article className="dashboard-card">
              <span className="card-label">{copy.startup}</span>
              <h4>{user?.startupName || "Not available"}</h4>
              <p>{copy.startupDesc}</p>
            </article>

            <article className="dashboard-card">
              <span className="card-label">{copy.sector}</span>
              <h4>{sectorList.length ? sectorList.join(", ") : "Not selected"}</h4>
              <p>{copy.sectorDesc}</p>
            </article>

            <article className="dashboard-card">
              <span className="card-label">{copy.location}</span>
              <h4>{user?.stateUt || "Not available"}</h4>
              <p>{copy.locationDesc}</p>
            </article>
          </section>

          <section className="dashboard-panel">
            <div>
              <p className="card-label">{copy.nextStep}</p>
              <h3>{copy.nextStepTitle}</h3>
              <p>{copy.nextStepDesc}</p>
            </div>
            <div className="dashboard-status-pill">{copy.status}</div>
          </section>
        </main>

        <footer className="dashboard-footer page-footer">
          <p>© 2026 Ministry of AYUSH, Government of India. All rights reserved.</p>
          <span className="version-badge">Version 1.0</span>
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;