import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLanguage from "../hooks/useLanguage";
import "./OurTeam.css";

function OurTeam() {
  const [activeTab, setActiveTab] = useState("who");
  const location = useLocation();
  const navigate = useNavigate();
  const tabsRef = useRef(null);
  const tabRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, transform: "translateX(0)" });
  const { isHindi, toggleLanguage } = useLanguage();

  const copy = isHindi
    ? {
        headerKicker: "पोर्टल के बारे में",
        headerTitle: "आयुष टीम और संगठन पृष्ठ",
        home: "मुख्य पृष्ठ",
        dashboard: "डैशबोर्ड",
        breadcrumb: "हमारे बारे में / कौन-कौन है",
        heroTitle: "मंत्रालय की भूमिकाओं, विभागों और प्रदर्शन का साफ़ दृश्य",
        heroCopy: "मंत्रालय, नेतृत्व, आयुष क्षेत्रों, संगठन चार्ट और वार्षिक रिपोर्ट का सुव्यवस्थित अवलोकन।",
        tabAbout: "मंत्रालय के बारे में",
        tabWho: "कौन-कौन है?",
        tabDomains: "आयुष क्षेत्र",
        tabMinister: "मंत्री के बारे में",
        tabOrgChart: "संगठनात्मक चार्ट",
        tabPerformance: "हमारा प्रदर्शन",
        aboutHeading: "आयुष मंत्रालय के बारे में",
        aboutBody:
          "आयुष मंत्रालय का गठन 9 नवंबर 2014 को भारत की पारंपरिक स्वास्थ्य प्रणालियों के समग्र विकास और प्रसार के लिए किया गया था। यह आयुर्वेद, योग, प्राकृतिक चिकित्सा, यूनानी, सिद्ध और होम्योपैथी पर केंद्रित है, साथ ही प्रमाण-आधारित अभ्यास, गुणवत्ता मानकों और आधुनिक स्वास्थ्य सेवा के साथ एकीकरण को बढ़ावा देता है।",
        vision: "दृष्टि",
        visionBody: "आयुष प्रणालियों को वैज्ञानिक, सुलभ और वैश्विक रूप से स्वीकार्य स्वास्थ्य समाधान के रूप में स्थापित करना।",
        mission: "उद्देश्य",
        missionItems: [
          "आयुष प्रणालियों में शिक्षा, अनुसंधान और प्रमाण-आधारित अभ्यास को मजबूत करना।",
          "आयुष औषधियों और सेवाओं की गुणवत्ता, सुरक्षा और मानकीकरण सुनिश्चित करना।",
          "निवारक स्वास्थ्य, कल्याण और जीवनशैली प्रबंधन को बढ़ावा देना।",
          "सार्वजनिक कार्यक्रमों, बुनियादी ढांचे और डिजिटल प्लेटफॉर्म के माध्यम से पहुंच बढ़ाना।",
        ],
        priorities: "प्रमुख प्राथमिकताएँ",
        priorityItems: [
          "प्रैक्टिशनरों के लिए क्षमता निर्माण और कौशल विकास।",
          "नैदानिक सत्यापन और राष्ट्रीय स्वास्थ्य कार्यक्रमों के साथ एकीकरण।",
          "जन-जागरूकता और अंतरराष्ट्रीय सहयोग।",
          "आयुष स्टार्टअप में उद्यमिता और नवाचार।",
        ],
        whoTitle: "माननीय राज्य मंत्री",
        whoSub1: "(स्वतंत्र प्रभार) का",
        whoSub2: "आयुष मंत्रालय और स्वास्थ्य एवं परिवार कल्याण मंत्रालय में राज्य मंत्री",
        whoGov: "भारत सरकार",
        secretary: "सचिव",
        domainsHeading: "आयुष क्षेत्र",
        domainsBody:
          "AYUSH छह पारंपरिक स्वास्थ्य प्रणालियों को सम्मिलित करता है जो समग्र कल्याण, रोकथाम और जीवनशैली प्रबंधन पर केंद्रित हैं। प्रत्येक क्षेत्र निदान, उपचार और कल्याण के लिए अलग दृष्टिकोण प्रदान करता है।",
        annualReport: "वार्षिक रिपोर्ट",
        sectionAbout: "मंत्रालय के बारे में",
        sectionWho: "कौन-कौन है?",
        sectionDomains: "आयुष क्षेत्र",
        sectionMinister: "मंत्री के बारे में",
        sectionOrgChart: "संगठनात्मक चार्ट",
        sectionPerformance: "हमारा प्रदर्शन",
      }
    : {
        headerKicker: "About the portal",
        headerTitle: "AYUSH Team and Organisation Page",
        home: "Home",
        dashboard: "Dashboard",
        breadcrumb: "About Us / Who's who",
        heroTitle: "A cleaner view of ministry roles, domains, and performance",
        heroCopy: "A structured overview of the ministry, leadership, AYUSH domains, organisation chart, and annual reports.",
        tabAbout: "About Ministry",
        tabWho: "Who's who?",
        tabDomains: "Ayush Domains",
        tabMinister: "Know the Minister",
        tabOrgChart: "Organisational Chart",
        tabPerformance: "Our Performance",
        aboutHeading: "About Ministry of Ayush",
        aboutBody:
          "The Ministry of Ayush was formed on 9 November 2014 to drive the optimal development and propagation of India’s traditional systems of healthcare. It focuses on Ayurveda, Yoga, Naturopathy, Unani, Siddha, and Homeopathy, while promoting evidence-based practice, quality standards, and integration with modern healthcare.",
        vision: "Vision",
        visionBody: "To position Ayush systems as globally accepted, scientifically validated, and accessible healthcare solutions that improve public health and wellness.",
        mission: "Mission",
        missionItems: [
          "Strengthen education, research, and evidence-based practice across Ayush systems.",
          "Ensure quality, safety, and standardization of Ayush drugs and services.",
          "Promote preventive healthcare, wellness, and lifestyle management.",
          "Expand access through public programs, infrastructure, and digital platforms.",
        ],
        priorities: "Key Priorities",
        priorityItems: [
          "Capacity building and skill development for practitioners.",
          "Clinical validation and integration with national health programs.",
          "Public awareness and international collaboration.",
          "Entrepreneurship and innovation in Ayush startups.",
        ],
        whoTitle: "Hon'ble Minister of State",
        whoSub1: "(Independent Charge) of",
        whoSub2: "Ministry of Ayush and Minister of State in Ministry of Health and Family Welfare",
        whoGov: "Government of India",
        secretary: "Secretary",
        domainsHeading: "Ayush Domains",
        domainsBody:
          "AYUSH encompasses six systems of traditional healthcare that focus on holistic well-being, prevention, and lifestyle management. Each domain offers distinct approaches to diagnosis, treatment, and wellness.",
        annualReport: "Annual Report",
        sectionAbout: "About Ministry",
        sectionWho: "Who's who?",
        sectionDomains: "Ayush Domains",
        sectionMinister: "Know the Minister",
        sectionOrgChart: "Organisational Chart",
        sectionPerformance: "Our Performance",
      };

  const performanceReports = [
    {
      session: "Departmental Submit 2025 Report",
      ministry: "National Ayush Mission, Ministry of Ayush",
      size: "4.23 MB",
    },
    {
      session: "NAM Conclave 2025 Report",
      ministry: "National Ayush Mission, Ministry of Ayush",
      size: "1.19 MB",
    },
    {
      session: "Annual session 2024-25",
      ministry: "Ministry of Ayush",
      size: "12.07 MB",
    },
    {
      session: "Annual session 2023-24",
      ministry: "Ministry of Ayush",
      size: "3.34 MB",
    },
    {
      session: "A Decade of Transformative Growth in Ayush 2014-2024",
      ministry: "Ministry of Ayush",
      size: "71.7 MB",
    },
    {
      session: "Annual session 2022-23",
      ministry: "Ministry of Ayush",
      size: "7.41 MB",
    },
    {
      session: "Annual session 2020-21",
      ministry: "Ministry of Ayush",
      size: "10.5 MB",
    },
    {
      session: "Annual session 2019-20",
      ministry: "Ministry of Ayush",
      size: "4.44 MB",
    },
    {
      session: "Annual session 2018-19",
      ministry: "Ministry of Ayush",
      size: "20.0 MB",
    },
    {
      session: "Annual session 2017-18",
      ministry: "Ministry of Ayush",
      size: "2.11 MB",
    },
    {
      session: "Annual session 2016-17",
      ministry: "Ministry of Ayush",
      size: "9.02 MB",
    },
    {
      session: "Annual session 2015-16",
      ministry: "Ministry of Ayush",
      size: "5.59 MB",
    },
    {
      session: "Annual session 2014-15",
      ministry: "Ministry of Ayush",
      size: "10.02 MB",
    },
    {
      session: "Annual session 2013-14",
      ministry: "Ministry of Ayush",
      size: "3.04 MB",
    },
    {
      session: "Annual session 2012-13",
      ministry: "Ministry of Ayush",
      size: "4.66 MB",
    },
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  useLayoutEffect(() => {
    const container = tabsRef.current;
    const activeEl = tabRefs.current[activeTab];
    if (!container || !activeEl) return;
    const containerRect = container.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();
    const left = activeRect.left - containerRect.left;
    setIndicatorStyle({
      width: activeRect.width,
      transform: `translateX(${left}px)`,
    });
  }, [activeTab]);

  return (
    <div className="our-team-page">
      <header className="our-team-header">
        <div className="header-logo-box">
          <img src="/logo1.png" alt="AYUSH Logo" className="brand-logo" />
        </div>

        <div className="our-team-header-copy">
          <p className="our-team-kicker">{copy.headerKicker}</p>
          <h1 className="our-team-title">
            <span>{isHindi ? "आयुष" : "AYUSH"}</span> {isHindi ? "टीम और संगठन पृष्ठ" : "Team and Organisation Page"}
          </h1>
        </div>

        <div className="our-team-header-actions">
          <button type="button" className="btn btn-light" onClick={() => navigate("/")}>{copy.home}</button>
          <button type="button" className="btn btn-green" onClick={() => navigate("/dashboard")}>{copy.dashboard}</button>
        </div>
      </header>

      <section className="our-team-hero">
        <div>
          <p className="our-team-breadcrumb">{copy.breadcrumb}</p>
          <h2 className="our-team-hero-title">{copy.heroTitle}</h2>
          <p className="our-team-hero-copy">{copy.heroCopy}</p>
        </div>
      </section>

      <nav className="our-team-tabs" ref={tabsRef}>
        <button
          type="button"
          ref={(el) => { tabRefs.current.about = el; }}
          className={`team-tab ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          {copy.tabAbout}
        </button>
        <button
          type="button"
          ref={(el) => { tabRefs.current.who = el; }}
          className={`team-tab ${activeTab === "who" ? "active" : ""}`}
          onClick={() => setActiveTab("who")}
        >
          {copy.tabWho}
        </button>
        <button
          type="button"
          ref={(el) => { tabRefs.current.domains = el; }}
          className={`team-tab ${activeTab === "domains" ? "active" : ""}`}
          onClick={() => setActiveTab("domains")}
        >
          {copy.tabDomains}
        </button>
        <button
          type="button"
          ref={(el) => { tabRefs.current.minister = el; }}
          className={`team-tab ${activeTab === "minister" ? "active" : ""}`}
          onClick={() => setActiveTab("minister")}
        >
          {copy.tabMinister}
        </button>
        <button
          type="button"
          ref={(el) => { tabRefs.current.orgchart = el; }}
          className={`team-tab ${activeTab === "orgchart" ? "active" : ""}`}
          onClick={() => setActiveTab("orgchart")}
        >
          {copy.tabOrgChart}
        </button>
        <button
          type="button"
          ref={(el) => { tabRefs.current.performance = el; }}
          className={`team-tab ${activeTab === "performance" ? "active" : ""}`}
          onClick={() => setActiveTab("performance")}
        >
          {copy.tabPerformance}
        </button>
        <span className="team-tab-indicator" style={indicatorStyle} />
        <div className="team-tab-actions">
          <button
            type="button"
            className="lang-switch-btn"
            onClick={toggleLanguage}
            aria-label="Language toggle"
          >
            <span className={`lang-pill ${isHindi ? "active" : ""}`}>
              <span className="lang-knob">{isHindi ? "हि" : "En"}</span>
            </span>
          </button>
        </div>
      </nav>

      {activeTab === "who" ? (
        <section className="who-card-wrap">
          <article className="who-main-card">
            <div className="who-main-photo">
              <img src="/Prataprao-Jadhav.jpeg" alt="Shri Prataprao Jadhav" />
            </div>
            <h1>{copy.whoTitle}</h1>
            <p>{copy.whoSub1}</p>
            <p className="who-bold">{isHindi ? "आयुष मंत्रालय और स्वास्थ्य एवं परिवार कल्याण मंत्रालय" : "Ministry of Ayush and Minister of State in Ministry of Health and Family Welfare"}</p>
            <p className="who-bold">{copy.whoGov}</p>
            <h2>Shri Prataprao Jadhav</h2>
          </article>

          <div className="who-link-line top" />

          <article className="who-secretary-card">
            <h3>{copy.secretary.toUpperCase()}</h3>
            <p>Vaidya Rajesh Kotecha</p>
          </article>

          <div className="who-link-line bottom" />

          <div className="who-officers-row">
            <article className="who-officer-card">
              <h4>JS</h4>
              <p>Ms. Monalisa Dash</p>
            </article>
            <article className="who-officer-card">
              <h4>JS</h4>
              <p>Dr. Kavita Jain</p>
            </article>
            <article className="who-officer-card">
              <h4>AS&amp;FA</h4>
              <p>Sh. Hoveyda Abbas</p>
            </article>
            <article className="who-officer-card">
              <h4>DDG</h4>
              <p>Shri Satyajit Paul</p>
            </article>
            <article className="who-officer-card">
              <h4>JS</h4>
              <p>Ms. Alarmelmangai D</p>
            </article>
          </div>
        </section>
      ) : null}

      {activeTab === "about" ? (
        <section className="about-wrap">
          <div className="about-card">
            <h2>{copy.aboutHeading}</h2>
            <p>{copy.aboutBody}</p>
            <div className="about-grid">
              <div className="about-block">
                <h3>{copy.vision}</h3>
                <p>{copy.visionBody}</p>
              </div>
              <div className="about-block">
                <h3>{copy.mission}</h3>
                <ul>
                  {copy.missionItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="about-block">
                <h3>{copy.priorities}</h3>
                <ul>
                  {copy.priorityItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === "minister" ? (
        <section className="minister-wrap">
          <div className="minister-card">
            <div className="minister-photo-large">
              <img src="/Prataprao-Jadhav.jpeg" alt="Shri Prataprao Jadhav" />
            </div>
            <div className="minister-info">
              <h2>{copy.tabMinister}</h2>
              <h3>Shri Prataprao Jadhav</h3>
              <p>
                {isHindi
                  ? "आयुष मंत्रालय में राज्य मंत्री (स्वतंत्र प्रभार) तथा भारत सरकार के स्वास्थ्य एवं परिवार कल्याण मंत्रालय में राज्य मंत्री।"
                  : "Hon'ble Minister of State (Independent Charge), Ministry of Ayush and Minister of State in the Ministry of Health and Family Welfare, Government of India."}
              </p>
              <div className="minister-details">
                <div>
                  <span className="label">{isHindi ? "भूमिका" : "Role Focus"}</span>
                  <span>{isHindi ? "नीतिगत नेतृत्व, आयुष एकीकरण और सार्वजनिक स्वास्थ्य कार्यक्रम" : "Policy leadership, Ayush integration, and public health programs"}</span>
                </div>
                <div>
                  <span className="label">{isHindi ? "मुख्य रुचियाँ" : "Key Interests"}</span>
                  <span>{isHindi ? "पारंपरिक चिकित्सा, कल्याण संवर्धन, गुणवत्ता और अनुसंधान" : "Traditional medicine, wellness promotion, quality and research"}</span>
                </div>
                <div>
                  <span className="label">{isHindi ? "कार्यालय" : "Office"}</span>
                  <span>{isHindi ? "आयुष मंत्रालय, भारत सरकार" : "Ministry of Ayush, Government of India"}</span>
                </div>
              </div>
              <div className="minister-quote">
                <p>
                  {isHindi
                    ? "आयुष प्रणालियाँ भारत की कल्याण विरासत को दर्शाती हैं। हमारा लक्ष्य इन्हें वैज्ञानिक, सुलभ और वैश्विक रूप से विश्वसनीय बनाना है।"
                    : "Ayush systems carry India’s heritage of wellness. Our focus is to make them scientific, accessible, and globally trusted."}
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === "domains" ? (
        <section className="domains-wrap">
          <div className="domains-card">
            <h2>{copy.domainsHeading}</h2>
            <p>{copy.domainsBody}</p>
            <div className="domains-grid">
              <article className="domain-item">
                <h3>Ayurveda</h3>
                <p>
                  {isHindi
                    ? "दोषों के संतुलन, व्यक्तिगत आहार, औषधीय फॉर्मूलेशन और दीर्घकालिक कल्याण पर आधारित भारत की प्राचीन प्रणाली।"
                    : "India’s ancient system emphasizing balance of doshas, personalized diet, herbal formulations, and therapies for long-term wellness."}
                </p>
              </article>
              <article className="domain-item">
                <h3>Yoga</h3>
                <p>
                  {isHindi
                    ? "आसन, प्राणायाम और ध्यान को जोड़ने वाला मन-शरीर अनुशासन, जो शारीरिक शक्ति और मानसिक स्पष्टता बढ़ाता है।"
                    : "A mind-body discipline combining postures, breath control, and meditation to enhance physical strength, mental clarity, and resilience."}
                </p>
              </article>
              <article className="domain-item">
                <h3>Naturopathy</h3>
                <p>
                  {isHindi
                    ? "पोषण, हाइड्रोथेरेपी, जीवनशैली सुधार और गैर-आक्रामक उपचारों के माध्यम से शरीर की स्वयं-चिकित्सा क्षमता पर केंद्रित।"
                    : "Focuses on the body’s self-healing capacity through nutrition, hydrotherapy, lifestyle correction, and non-invasive therapies."}
                </p>
              </article>
              <article className="domain-item">
                <h3>Unani</h3>
                <p>
                  {isHindi
                    ? "स्वभाव और हास्य सिद्धांत पर आधारित, जो शरीर में संतुलन लौटाने के लिए जड़ी-बूटी, खनिज और नियामक उपचारों का उपयोग करती है।"
                    : "Based on temperament and humor theory, using herbal, mineral, and regimen-based therapies to restore harmony in the body."}
                </p>
              </article>
              <article className="domain-item">
                <h3>Siddha</h3>
                <p>
                  {isHindi
                    ? "दक्षिण भारत की पारंपरिक प्रणाली, जो तत्वीय संतुलन, जड़ी-बूटी-खनिज तैयारियों और कायाकल्प पर केंद्रित है।"
                    : "A traditional system from South India focusing on elemental balance, herbal-mineral preparations, and rejuvenation practices."}
                </p>
              </article>
              <article className="domain-item">
                <h3>Homeopathy</h3>
                <p>
                  {isHindi
                    ? "‘समान से समान का उपचार’ सिद्धांत पर आधारित चिकित्सा प्रणाली, जो उपचार प्रतिक्रिया को प्रोत्साहित करने के लिए अत्यंत पतले पदार्थों का उपयोग करती है।"
                    : "A system of medicine based on the principle of “like cures like,” using highly diluted substances to stimulate healing responses."}
                </p>
              </article>
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === "orgchart" ? (
        <section className="who-card-wrap orgchart-wrap org-chart-wrap">
          <article className="who-main-card orgchart-card">
            <div className="who-main-photo">
              <img src="/Prataprao-Jadhav.jpeg" alt="Shri Prataprao Jadhav" />
            </div>
            <h1>Minister of Ayush</h1>
          </article>

          <div className="who-link-line top" />

          <article className="who-secretary-card orgchart-card">
            <h3>Minister of State</h3>
          </article>

          <div className="who-link-line bottom" />

          <article className="who-secretary-card orgchart-card">
            <h3>Secretary</h3>
          </article>

          <div className="who-link-line bottom" />

          <div className="who-officers-row">
            <article className="who-officer-card">
              <h4>JS (Dr. Kavita Jain)</h4>
            </article>
            <article className="who-officer-card">
              <h4>JS (Ms. Monalisa Dash)</h4>
            </article>
            <article className="who-officer-card">
              <h4>AS &amp; FA</h4>
            </article>
            <article className="who-officer-card">
              <h4>DDG (Satyajit Paul)</h4>
            </article>
            <article className="who-officer-card">
              <h4>JS (Ms. Alarmelmangai D)</h4>
            </article>
          </div>

        </section>
      ) : null}

      {activeTab === "performance" ? (
        <section className="performance-report-wrap">
          <div className="performance-report-card">
            <h2 className="performance-title">{copy.annualReport}</h2>
            <div className="performance-table-wrap">
              <table className="performance-table">
                <thead>
                  <tr>
                    <th>{isHindi ? "क्रमांक" : "Sl.No."}</th>
                    <th>{isHindi ? "सत्र" : "Session"}</th>
                    <th>{isHindi ? "मंत्रालय" : "Ministry"}</th>
                    <th>{isHindi ? "रिपोर्ट" : "Report"}</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceReports.map((report, index) => (
                    <tr key={`${report.session}-${report.size}`}>
                      <td>{index + 1}.</td>
                      <td>{report.session}</td>
                      <td>{report.ministry}</td>
                      <td>
                        <a className="report-link" href="#" onClick={(event) => event.preventDefault()}>
                          PDF ({report.size})
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default OurTeam;
