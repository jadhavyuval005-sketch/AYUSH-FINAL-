import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, requestOtp } from "../lib/api";
import useLanguage from "../hooks/useLanguage";
import "./Signup.css";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const INDIAN_UTS = [
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

function Signup() {
  const navigate = useNavigate();
  const { isHindi, toggleLanguage } = useLanguage();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [errorField, setErrorField] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobile, setMobile] = useState("+91 ");
  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [ayushSector, setAyushSector] = useState([]);
  const [startupName, setStartupName] = useState("");
  const [stateUt, setStateUt] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [ayushDropdownOpen, setAyushDropdownOpen] = useState(false);
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const emailOtpRef = useRef(null);
  const mobileOtpRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const startupNameRef = useRef(null);
  const ayushSectorRef = useRef(null);
  const ayushDropdownRef = useRef(null);
  const stateUtRef = useRef(null);
  const declarationRef = useRef(null);

  const msg = (en, hi) => (isHindi ? hi : en);

  const copy = isHindi
    ? {
        subtitle: "लॉगिन क्रेडेंशियल बनाने के लिए आवश्यक विवरण भरें।",
        section1: "खंड 1 - मूल खाता जानकारी (अनिवार्य)",
        fullName: "पूरा नाम (संस्थापक / अधिकृत व्यक्ति)",
        officialEmail: "आधिकारिक ईमेल पता",
        emailOtp: "ईमेल ओटीपी",
        mobileNumber: "मोबाइल नंबर",
        mobileOtp: "मोबाइल ओटीपी",
        password: "पासवर्ड",
        confirmPassword: "पासवर्ड की पुष्टि करें",
        section1Hint1: "कम से कम 8 अक्षर, जिनमें 1 बड़ा अक्षर, 1 छोटा अक्षर, 1 संख्या और 1 विशेष चिन्ह शामिल हो।",
        section1Hint2: "लगातार 3 अक्षर (abc), 3 अंक (123) या समान अक्षर (aaa) नहीं होने चाहिए।",
        section2: "खंड 2 - स्टार्टअप पहचान",
        startupName: "स्टार्टअप का नाम",
        ayushSector: "आयुष क्षेत्र",
        selectSector: "क्षेत्र चुनें",
        stateUt: "राज्य / केंद्र शासित प्रदेश",
        selectStateUt: "राज्य / केंद्र शासित प्रदेश चुनें",
        startupHint1: "3-100 अक्षर, केवल अक्षर, अंक, स्पेस, डॉट (.), एम्परसैंड (&), और हाइफ़न (-)।",
        startupHint2: "केवल अंक नहीं, विशेष चिन्ह से शुरुआत नहीं, और 3 लगातार विशेष चिन्ह नहीं।",
        startupHint3: "शुरुआत और अंत के अतिरिक्त स्पेस स्वतः हटाए जाएंगे।",
        documentNote: "यहाँ दस्तावेज़ अपलोड न करें। दस्तावेज़ संग्रहण पंजीकरण चरण का भाग है।",
        statesLabel: "राज्य",
        utsLabel: "केंद्र शासित प्रदेश",
        passwordMismatch: "पासवर्ड और पुष्टि पासवर्ड समान होने चाहिए।",
        section3: "खंड 3 - घोषणा",
        declaration:
          "मैं पुष्टि करता/करती हूँ कि प्रदान की गई जानकारी सही एवं प्रामाणिक है। मैं पंजीकरण एवं सत्यापन उद्देश्यों के लिए भारत सरकार तथा संबंधित प्राधिकरणों के साथ प्रदान किए गए डेटा को साझा करने के लिए सहमत हूँ। मैंने नियम एवं शर्तें तथा गोपनीयता नीति को पढ़ लिया है और स्वीकार करता/करती हूँ।",
        createAccount: "अकाउंट बनाएं",
        alreadyRegistered: "पहले से पंजीकृत? लॉगिन",
        sendOtp: "ओटीपी भेजें",
        creating: "अकाउंट बनाया जा रहा है...",
      }
    : {
        subtitle: "Complete the required details to create your login credentials.",
        section1: "Section 1 - Basic Account Information (Required)",
        fullName: "Full Name (Founder / Authorized Person)",
        officialEmail: "Official Email Address",
        emailOtp: "Email OTP",
        mobileNumber: "Mobile Number",
        mobileOtp: "Mobile OTP",
        password: "Password",
        confirmPassword: "Confirm Password",
        section1Hint1: "Minimum 8 characters, including 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
        section1Hint2: "No 3 consecutive letters (abc), numbers (123), or identical characters (aaa).",
        section2: "Section 2 - Startup Identity",
        startupName: "Startup Name",
        ayushSector: "AYUSH Sector",
        selectSector: "Select sector(s)",
        stateUt: "State / UT",
        selectStateUt: "Select State / UT",
        startupHint1: "3-100 characters, using only letters, numbers, spaces, dot (.), ampersand (&), and hyphen (-).",
        startupHint2: "Must not be only numbers, start with a special character, or contain 3 consecutive special characters.",
        startupHint3: "Leading/trailing spaces will be trimmed automatically.",
        documentNote: "Do not upload documents here. Document collection is part of the registration stage.",
        statesLabel: "States",
        utsLabel: "Union Territories",
        passwordMismatch: "Password and Confirm Password must match.",
        section3: "Section 3 - Declaration",
        declaration:
          "I confirm that the information provided is accurate and authentic. I agree to share the provided data with the Government of India and relevant authorities for registration and verification purposes. I have read and accept the Terms & Conditions and Privacy Policy.",
        createAccount: "Create Account",
        alreadyRegistered: "Already Registered? Login",
        sendOtp: "Send OTP",
        creating: "Creating Account...",
      };

  const hasIncreasingLetterTriplet = (value) => {
    const normalized = value.toLowerCase();
    for (let i = 0; i < normalized.length - 2; i += 1) {
      const a = normalized.charCodeAt(i);
      const b = normalized.charCodeAt(i + 1);
      const c = normalized.charCodeAt(i + 2);
      const isLetter = a >= 97 && a <= 122 && b >= 97 && b <= 122 && c >= 97 && c <= 122;
      if (isLetter && b === a + 1 && c === b + 1) {
        return true;
      }
    }
    return false;
  };

  const hasIncreasingNumberTriplet = (value) => {
    for (let i = 0; i < value.length - 2; i += 1) {
      const a = value.charCodeAt(i);
      const b = value.charCodeAt(i + 1);
      const c = value.charCodeAt(i + 2);
      const isDigit = a >= 48 && a <= 57 && b >= 48 && b <= 57 && c >= 48 && c <= 57;
      if (isDigit && b === a + 1 && c === b + 1) {
        return true;
      }
    }
    return false;
  };

  const hasThreeIdenticalInRow = (value) => /(.)\1\1/.test(value);

  const handleMobileChange = (event) => {
    let nextValue = event.target.value;
    if (!nextValue.startsWith("+91")) {
      nextValue = `+91 ${nextValue.replace(/^\+?91\s*/, "")}`;
    }
    const digitsOnly = nextValue.slice(4).replace(/\D/g, "");
    setMobile(`+91 ${digitsOnly}`);
  };

  const validatePassword = (password) => {
    const rules = getPasswordRuleStatus(password);
    if (!rules.minLength) return msg("Password must be at least 8 characters.", "पासवर्ड कम से कम 8 अक्षरों का होना चाहिए।");
    if (!rules.uppercase) return msg("Password must include at least 1 uppercase letter.", "पासवर्ड में कम से कम 1 बड़ा अक्षर होना चाहिए।");
    if (!rules.lowercase) return msg("Password must include at least 1 lowercase letter.", "पासवर्ड में कम से कम 1 छोटा अक्षर होना चाहिए।");
    if (!rules.number) return msg("Password must include at least 1 number.", "पासवर्ड में कम से कम 1 संख्या होना चाहिए।");
    if (!rules.special) return msg("Password must include at least 1 special character.", "पासवर्ड में कम से कम 1 विशेष चिन्ह होना चाहिए।");
    if (!rules.noIncreasingLetters) return msg("Password must not contain 3 consecutive increasing letters (abc, xyz).", "पासवर्ड में लगातार बढ़ते हुए 3 अक्षर (abc, xyz) नहीं होने चाहिए।");
    if (!rules.noIncreasingNumbers) return msg("Password must not contain 3 consecutive increasing numbers (123, 456).", "पासवर्ड में लगातार बढ़ते हुए 3 अंक (123, 456) नहीं होने चाहिए।");
    if (!rules.noTripleSame) return msg("Password must not contain 3 identical characters in a row (aaa, 111).", "पासवर्ड में लगातार 3 समान अक्षर या अंक (aaa, 111) नहीं होने चाहिए।");
    return "";
  };

  const validateStartupName = (value) => {
    const trimmed = value.trim();
    if (trimmed.length < 3) return msg("Startup Name must be at least 3 characters.", "स्टार्टअप नाम कम से कम 3 अक्षरों का होना चाहिए।");
    if (trimmed.length > 100) return msg("Startup Name must be 100 characters or fewer.", "स्टार्टअप नाम 100 अक्षरों से अधिक नहीं होना चाहिए।");
    if (!/^[A-Za-z0-9 .&-]+$/.test(trimmed)) {
      return msg("Startup Name can only include letters, numbers, spaces, dot (.), ampersand (&), and hyphen (-).", "स्टार्टअप नाम में केवल अक्षर, अंक, स्पेस, डॉट (.), एम्परसैंड (&), और हाइफ़न (-) हो सकते हैं।");
    }
    if (/^[0-9]+$/.test(trimmed)) return msg("Startup Name must not contain only numbers.", "स्टार्टअप नाम केवल अंकों का नहीं होना चाहिए।");
    if (!/^[A-Za-z0-9]/.test(trimmed)) return msg("Startup Name cannot start with a special character.", "स्टार्टअप नाम विशेष चिन्ह से शुरू नहीं होना चाहिए।");
    if (/[.&-]{3,}/.test(trimmed)) return msg("Startup Name cannot contain 3 consecutive special characters.", "स्टार्टअप नाम में लगातार 3 विशेष चिन्ह नहीं होने चाहिए।");
    return "";
  };

  const getStartupNameRuleStatus = (value) => {
    const trimmed = value.trim();
    return {
      minLength: trimmed.length >= 3,
      maxLength: trimmed.length <= 100,
      allowedChars: /^[A-Za-z0-9 .&-]+$/.test(trimmed || " "),
      notOnlyNumbers: !/^[0-9]+$/.test(trimmed || ""),
      validStart: trimmed.length > 0 ? /^[A-Za-z0-9]/.test(trimmed) : false,
      noThreeSpecials: !/[.&-]{3,}/.test(trimmed),
      trimmed: value === trimmed,
    };
  };

  const getPasswordRuleStatus = (value) => ({
    minLength: value.length >= 8,
    uppercase: /[A-Z]/.test(value),
    lowercase: /[a-z]/.test(value),
    number: /[0-9]/.test(value),
    special: /[^A-Za-z0-9]/.test(value),
    noIncreasingLetters: !hasIncreasingLetterTriplet(value),
    noIncreasingNumbers: !hasIncreasingNumberTriplet(value),
    noTripleSame: !hasThreeIdenticalInRow(value),
  });

  const passwordRuleStatus = getPasswordRuleStatus(password);
  const startupNameRuleStatus = getStartupNameRuleStatus(startupName);

  const setErrorAndFocus = (message, fieldRef, fieldKey) => {
    setError(message);
    setErrorField(fieldKey);
    if (fieldRef?.current) {
      fieldRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        window.scrollBy({ top: -280, behavior: "smooth" });
        fieldRef.current.focus({ preventScroll: true });
      }, 120);
    }
  };

  const sendOtp = async (channel) => {
    setError("");
    setSuccess("");
    setInfoMessage("");

    const value = channel === "email" ? emailRef.current?.value?.trim() : mobileRef.current?.value?.trim();

    if (!value) {
      setError(channel === "email" ? msg("Official Email Address is required before sending OTP.", "ओटीपी भेजने से पहले आधिकारिक ईमेल पता आवश्यक है।") : msg("Mobile Number is required before sending OTP.", "ओटीपी भेजने से पहले मोबाइल नंबर आवश्यक है।"));
      return;
    }

    try {
      const response = await requestOtp({
        channel,
        value,
        purpose: "signup",
      });
      setInfoMessage(response.otp ? `${response.message} OTP: ${response.otp}` : response.message || msg("OTP sent successfully.", "ओटीपी सफलतापूर्वक भेजा गया।"));
    } catch (apiError) {
      setError(apiError.message || msg("Unable to send OTP.", "ओटीपी भेजा नहीं जा सका।"));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setInfoMessage("");
    setErrorField("");

    const mobileValue = mobile.trim();
    const startupNameValue = startupName.trim();
    const passwordValue = password;
    const confirmPasswordValue = confirmPassword;

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      if (!fullNameRef.current?.value?.trim()) return setErrorAndFocus(msg("Full Name is required.", "पूरा नाम आवश्यक है।"), fullNameRef, "fullName");
      if (!emailRef.current?.value?.trim()) return setErrorAndFocus(msg("Official Email Address is required.", "आधिकारिक ईमेल पता आवश्यक है।"), emailRef, "email");
      if (!mobileValue) return setErrorAndFocus(msg("Mobile Number is required.", "मोबाइल नंबर आवश्यक है।"), mobileRef, "mobile");
      if (!emailOtp.trim()) return setErrorAndFocus(msg("Email OTP is required.", "ईमेल ओटीपी आवश्यक है।"), emailOtpRef, "emailOtp");
      if (!mobileOtp.trim()) return setErrorAndFocus(msg("Mobile OTP is required.", "मोबाइल ओटीपी आवश्यक है।"), mobileOtpRef, "mobileOtp");
      if (!passwordValue) return setErrorAndFocus(msg("Password is required.", "पासवर्ड आवश्यक है।"), passwordRef, "password");
      if (!confirmPasswordValue) return setErrorAndFocus(msg("Confirm Password is required.", "पासवर्ड की पुष्टि आवश्यक है।"), confirmPasswordRef, "confirmPassword");
      if (!startupNameValue) return setErrorAndFocus(msg("Startup Name is required.", "स्टार्टअप नाम आवश्यक है।"), startupNameRef, "startupName");
      if (!ayushSector.length) return setErrorAndFocus(msg("AYUSH Sector is required.", "आयुष क्षेत्र आवश्यक है।"), ayushSectorRef, "ayushSector");
      if (!stateUt) return setErrorAndFocus(msg("State / UT is required.", "राज्य / केंद्र शासित प्रदेश आवश्यक है।"), stateUtRef, "stateUt");
      if (!declarationAccepted) return setErrorAndFocus(msg("Please accept the declaration to continue.", "जारी रखने के लिए कृपया घोषणा स्वीकार करें।"), declarationRef, "declaration");
    }

    if (!mobileValue.startsWith("+91")) {
      setErrorAndFocus(msg("Mobile number must start with +91.", "मोबाइल नंबर +91 से शुरू होना चाहिए।"), mobileRef, "mobile");
      return;
    }

    const startupNameError = validateStartupName(startupNameValue);
    if (startupNameError) {
      setErrorAndFocus(startupNameError, startupNameRef, "startupName");
      return;
    }

    const allLocations = new Set([...INDIAN_STATES, ...INDIAN_UTS]);
    if (!allLocations.has(stateUt)) {
      setErrorAndFocus(msg("Please select a valid State / UT.", "कृपया वैध राज्य / केंद्र शासित प्रदेश चुनें।"), stateUtRef, "stateUt");
      return;
    }
    const passwordError = validatePassword(String(passwordValue || ""));
    if (passwordError) {
      setErrorAndFocus(passwordError, passwordRef, "password");
      return;
    }

    if (passwordValue !== confirmPasswordValue) {
      setErrorAndFocus(msg("Password and Confirm Password must match.", "पासवर्ड और पुष्टि पासवर्ड समान होने चाहिए।"), confirmPasswordRef, "confirmPassword");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData(event.currentTarget);

      const response = await registerUser({
        fullName: String(formData.get("fullName") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        mobile: mobileValue,
        emailOtp: String(emailOtp || "").trim(),
        mobileOtp: String(mobileOtp || "").trim(),
        password: passwordValue,
        confirmPassword: confirmPasswordValue,
        startupName: startupNameValue,
        ayushSector,
        stateUt,
        declarationAccepted,
      });

      try {
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("authUser", JSON.stringify(response.user));
      } catch {
        // Ignore storage failures so signup still succeeds.
      }

      setSuccess("Account created successfully. Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 900);
    } catch (apiError) {
      setError(apiError.message || msg("Unable to create account.", "अकाउंट बनाया नहीं जा सका।"));
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!ayushDropdownOpen) return;
    const handleClickOutside = (event) => {
      if (ayushDropdownRef.current && !ayushDropdownRef.current.contains(event.target)) {
        setAyushDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ayushDropdownOpen]);

  return (
    <div className="signup-page">
      <div className="signup-card">
        <header className="signup-header">
          <div className="portal-logo-box">
            <img src="/logo1.png" alt="AYUSH Logo" className="portal-brand-logo" />
          </div>

          <h1 className="portal-title">
            {isHindi ? (
              <>
                <span>आयुष</span> स्टार्टअप पंजीकरण एवं प्रबंधन पोर्टल
              </>
            ) : (
              <>
                <span>AYUSH</span> Startup Registration &amp; Management Portal
              </>
            )}
          </h1>

          <div className="portal-controls">
            <button
              className="portal-lang-switch-btn"
              onClick={toggleLanguage}
              aria-label="Language toggle"
            >
              <span className={`portal-lang-pill ${isHindi ? "active" : ""}`}>
                <span className="portal-lang-knob">{isHindi ? "हि" : "En"}</span>
              </span>
            </button>
          </div>

          <div className="portal-logo-box">
            <img src="/logo3.png" alt="Partner Logo" className="portal-logo-right" />
          </div>
        </header>
        <p className="signup-subtitle">{copy.subtitle}</p>
        {infoMessage ? <p className="form-success">{infoMessage}</p> : null}
        <div className="signup-divider" />

        <form className="signup-form" onSubmit={handleSubmit}>
          {error ? <p className="form-error">{error}</p> : null}
          {success ? <p className="form-success">{success}</p> : null}

          <section className="form-section">
            <h2>{copy.section1}</h2>
            <div className="form-grid">
              <label className="full-row">
                {copy.fullName}
                <input type="text" name="fullName" ref={fullNameRef} className={errorField === "fullName" ? "input-error" : ""} required />
              </label>

              <label>
                {copy.officialEmail}
                <input type="email" name="email" ref={emailRef} className={errorField === "email" ? "input-error" : ""} required />
              </label>

              <label>
                {copy.emailOtp}
                <div className="otp-row">
                  <input
                    type="text"
                    name="emailOtp"
                    value={emailOtp}
                    onChange={(event) => setEmailOtp(event.target.value)}
                    ref={emailOtpRef}
                    className={errorField === "emailOtp" ? "input-error" : ""}
                    required
                  />
                  <button type="button" className="otp-btn" onClick={() => sendOtp("email")}>{copy.sendOtp}</button>
                </div>
              </label>

              <label>
                {copy.mobileNumber}
                <input
                  type="tel"
                  name="mobile"
                  value={mobile}
                  onChange={handleMobileChange}
                  inputMode="numeric"
                  autoComplete="tel"
                  ref={mobileRef}
                  className={errorField === "mobile" ? "input-error" : ""}
                  required
                />
              </label>

              <label>
                {copy.mobileOtp}
                <div className="otp-row">
                  <input
                    type="text"
                    name="mobileOtp"
                    value={mobileOtp}
                    onChange={(event) => setMobileOtp(event.target.value)}
                    ref={mobileOtpRef}
                    className={errorField === "mobileOtp" ? "input-error" : ""}
                    required
                  />
                  <button type="button" className="otp-btn" onClick={() => sendOtp("mobile")}>{copy.sendOtp}</button>
                </div>
              </label>

              <label>
                {copy.password}
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  ref={passwordRef}
                  className={errorField === "password" ? "input-error" : ""}
                  required
                />
              </label>

              <label>
                {confirmTouched && confirmPassword && password !== confirmPassword ? (
                  <p className="inline-error">{copy.passwordMismatch}</p>
                ) : null}
                {copy.confirmPassword}
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmTouched(true);
                    setConfirmPassword(event.target.value);
                  }}
                  onBlur={() => setConfirmTouched(true)}
                  disabled={!password}
                  ref={confirmPasswordRef}
                  className={errorField === "confirmPassword" ? "input-error" : ""}
                  required
                />
              </label>
            </div>
            <div className="password-rules">
              <p className={passwordRuleStatus.minLength && passwordRuleStatus.uppercase && passwordRuleStatus.lowercase && passwordRuleStatus.number && passwordRuleStatus.special ? "rule-done" : ""}>
                <span className="rule-mark" aria-hidden="true">
                  {passwordRuleStatus.minLength && passwordRuleStatus.uppercase && passwordRuleStatus.lowercase && passwordRuleStatus.number && passwordRuleStatus.special ? "\u2713" : "\u2717"}
                </span>
                <span>{copy.section1Hint1}</span>
              </p>
              <p className={passwordRuleStatus.noIncreasingLetters && passwordRuleStatus.noIncreasingNumbers && passwordRuleStatus.noTripleSame ? "rule-done" : ""}>
                <span className="rule-mark" aria-hidden="true">
                  {passwordRuleStatus.noIncreasingLetters && passwordRuleStatus.noIncreasingNumbers && passwordRuleStatus.noTripleSame ? "\u2713" : "\u2717"}
                </span>
                <span>{copy.section1Hint2}</span>
              </p>
            </div>
          </section>

          <section className="form-section">
            <h2>{copy.section2}</h2>

            <div className="form-grid">
              <label className="full-row">
                {copy.startupName}
                <input
                  type="text"
                  name="startupName"
                  value={startupName}
                  onChange={(event) => setStartupName(event.target.value)}
                  onBlur={() => setStartupName((prev) => prev.trim())}
                  maxLength={100}
                  ref={startupNameRef}
                  className={errorField === "startupName" ? "input-error" : ""}
                  required
                />
              </label>

              <div
                className={`ayush-sector-field ${errorField === "ayushSector" ? "input-error" : ""}`}
                ref={ayushSectorRef}
              >
                <span className="ayush-sector-label">{copy.ayushSector}</span>
                <div className="ayush-dropdown" ref={ayushDropdownRef}>
                  <button
                    type="button"
                    className="ayush-dropdown-trigger"
                    onClick={() => setAyushDropdownOpen((prev) => !prev)}
                    aria-expanded={ayushDropdownOpen}
                  >
                    <span>
                      {ayushSector.length === 0
                        ? copy.selectSector
                        : ayushSector.join(", ")}
                    </span>
                    <span className="ayush-dropdown-caret">▾</span>
                  </button>
                  {ayushDropdownOpen && (
                    <div className="ayush-dropdown-menu">
                      {["Ayurveda", "Yoga", "Unani", "Siddha", "Homeopathy"].map(
                        (sector) => {
                          const isChecked = ayushSector.includes(sector);

                          return (
                            <label key={sector} className="ayush-sector-option">
                              <input
                                type="checkbox"
                                value={sector}
                                checked={isChecked}
                                onChange={() =>
                                  setAyushSector((prev) =>
                                    isChecked
                                      ? prev.filter((item) => item !== sector)
                                      : [...prev, sector]
                                  )
                                }
                              />
                              <span>{sector}</span>
                            </label>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              </div>

              <label>
                {copy.stateUt}
                <select
                  name="state"
                  className={`state-ut-input-lg ${errorField === "stateUt" ? "input-error" : ""}`}
                  value={stateUt}
                  onChange={(event) => setStateUt(event.target.value)}
                  ref={stateUtRef}
                  required
                >
                  <option value="" disabled>
                    {copy.selectStateUt}
                  </option>
                  <optgroup label={copy.statesLabel}>
                    {INDIAN_STATES.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label={copy.utsLabel}>
                    {INDIAN_UTS.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </label>
            </div>

            <div className="startup-rules">
              <p className={startupNameRuleStatus.minLength && startupNameRuleStatus.maxLength && startupNameRuleStatus.allowedChars ? "rule-done" : ""}>
                <span className="rule-mark" aria-hidden="true">
                  {startupNameRuleStatus.minLength && startupNameRuleStatus.maxLength && startupNameRuleStatus.allowedChars ? "\u2713" : "\u2717"}
                </span>
                <span>{copy.startupHint1}</span>
              </p>
              <p className={startupNameRuleStatus.notOnlyNumbers && startupNameRuleStatus.validStart && startupNameRuleStatus.noThreeSpecials ? "rule-done" : ""}>
                <span className="rule-mark" aria-hidden="true">
                  {startupNameRuleStatus.notOnlyNumbers && startupNameRuleStatus.validStart && startupNameRuleStatus.noThreeSpecials ? "\u2713" : "\u2717"}
                </span>
                <span>{copy.startupHint2}</span>
              </p>
              <p className={startupNameRuleStatus.trimmed ? "rule-done" : ""}>
                <span className="rule-mark" aria-hidden="true">
                  {startupNameRuleStatus.trimmed ? "\u2713" : "\u2717"}
                </span>
                <span>{copy.startupHint3}</span>
              </p>
            </div>

            <p className="section-note">{copy.documentNote}</p>
          </section>

          <section className="form-section">
            <h2>{copy.section3}</h2>
            <label className="declaration-row">
              <input
                type="checkbox"
                name="declaration"
                checked={declarationAccepted}
                onChange={(event) => setDeclarationAccepted(event.target.checked)}
                ref={declarationRef}
                required
              />
              <span>
                {copy.declaration}              </span>
            </label>
          </section>

          <div className="action-row">
            <button type="submit" className="primary-btn" disabled={isSubmitting}>
              {isSubmitting ? copy.creating : copy.createAccount}
            </button>
            <button type="button" className="secondary-btn" onClick={() => navigate("/login")}>{copy.alreadyRegistered}</button>
          </div>
        </form>
      </div>
      <footer className="page-footer">
        <p>Â© 2026 Ministry of AYUSH, Government of India. All rights reserved.</p>
        <span className="version-badge">Version 1.0</span>
      </footer>
    </div>
  );
}

export default Signup;
