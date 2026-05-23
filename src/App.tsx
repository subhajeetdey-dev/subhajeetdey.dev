import { useState, useEffect } from "react";
import { useDarkMode } from "./hooks/useDarkMode";
import { usePortfolioData} from "./hooks/usePortfolioData"
import { Navbar } from "./components/Navbar";
import { useAuth } from "./hooks/useAuth";
import { LoginModel } from "./components/LoginModel";
import { AdminDashboard } from "./components/AdminDashboard";
import { HeroSection } from "./components/sections/HeroSection";
import { WorkSection } from "./components/sections/WorkSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { AboutSection } from "./components/sections/AboutSection";
import { ContactSection } from "./components/sections/ContactSection";
import { sendEmail } from './utils/sendEmail';
import { Footer } from "./components/Footer";

export default function Portfolio() {
  const { dark, toggle } = useDarkMode();  
  const {data, setData, loading, resetData } = usePortfolioData();
  const { authed, login, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [dashOpen, setDashOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [contactSent, setContactSent] = useState(false);
  const [ contactLoading, setContactLoading ] = useState(false);
  const [skillFilter, setSkillFilter] = useState<
    "all" | "fullstack" | "backend" | "frontend"
  >("all");  

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = () => {
      const sections = ["hero", "work", "skills", "about", "contact"];
      const pos = window.scrollY + 200;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const handleContact = async (name: string, email: string, message: string) => {
  if (contactLoading) return;
  setContactLoading(true);

  const success = await sendEmail(name, email, message);

  if (success) {
    setContactSent(true);
    setTimeout(() => setContactSent(false), 5000);
  } else {
    alert("Failed to send. Please email me directly at deysubhajeetwork@gmail.com");
  }

  setContactLoading(false);
};

  const openAdmin = () => {
    if (authed) setDashOpen(true);
    else setLoginOpen(true);
  };

  const handleLogin = (password: string): boolean => {
    const success = login(password);
    if (success) {
      setLoginOpen(false);
      setDashOpen(true);
    }
    return success;
  };

  const handleLogout = () => {
    logout();
    setDashOpen(false);
  };

  const bg = dark ? "#080808" : "#f7f7f5";
  const textCol = dark ? "#fafafa" : "#0a0a0a";
  const mutedCol = dark ? "#71717a" : "#737373";
  const borderCol = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";

  if(loading){
    return(
      <div
      style={{
        minHeight: "100vh",
        background: "#080808",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "monospace",
        color: "#ef233c",
        fontSize: 14,
        letterSpacing: "0.05em",
      }}
      >
        // loading portfolio...
      </div>
    )
  }

  return (    
    <div
      style={{
        background: bg,
        color: mutedCol,
        minHeight: "100vh",
        fontFamily: "'DM Sans', 'Space Drotesk', system-ui, sans-serif",
        overflowX: "hidden",
        transition: "background 0.3s, color 0.3s",
      }}
    >     
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute inset-0"
          style={{
            background: dark
              ? "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(239,35,60,0.06), transparent)"
              : "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(239,35,60,0.04), transparent)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.04)"} 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
        />
      </div>
      <Navbar
        dark={dark}
        toggle={toggle}
        scrolled={scrolled}
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        setAdminOpen={openAdmin}
        scrollTo={scrollTo}
        data={data}
        borderCol={borderCol}
        mutedCol={mutedCol}
        textCol={textCol}
      />

      <main>
        <HeroSection
          data={data}
          dark={dark}
          scrollTo={scrollTo}
          textCol={textCol}
          mutedCol={mutedCol}
          borderCol={borderCol}
        />

        <WorkSection
          projects={data.projects}
          dark={dark}
          skillFilter={skillFilter}
          setSkillFilter={setSkillFilter}
          borderCol={borderCol}
          mutedCol={mutedCol}
        />

        <SkillsSection
          skills={data.skills}
          dark={dark}
          bg={bg}
          borderCol={borderCol}
          mutedCol={mutedCol}
        />

        <AboutSection
          data={data}
          dark={dark}
          borderCol={borderCol}
          mutedCol={mutedCol}
          textCol={textCol}
        />

        <ContactSection
          data={data}
          dark={dark}
          contactSent={contactSent}
          handleContact={handleContact}
          contactLoading={contactLoading}
          borderCol={borderCol}
          mutedCol={mutedCol}
          textCol={textCol}
        />
      </main>

      <Footer
        data={data}
        dark={dark}
        scrollTo={scrollTo}
        borderCol={borderCol}
        mutedCol={mutedCol}
        textCol={textCol}
      />
      {loginOpen && (
        <LoginModel
          onLogin={handleLogin}
          onClose={() => setLoginOpen(false)}
          dark={dark}
        />
      )}
      {dashOpen && authed && (
        <AdminDashboard
          data={data}
          setData={setData}
          onClose={() => setDashOpen(false)}
          onLogout={handleLogout}
          onReset= {resetData}
          dark={dark}
        />
      )}

      <style>
        {`
         @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
          
         @keyframes fadeUp {
          from {opacity: 0; transfrom: translateY(22px);}
          to {opacity: 1; transform: translateY(0);}
         }
          @keyframes ping{
            75%, 100% {transform: scale(2); opacity: 0;}
          }

          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-marquee {
            animation: marquee 30s linear infinite;
            will-change: transform;
          }

          

          .animate-ping {animation: ping 1.4s cubic-bezier(0,0,0.2,1) infinite;}
          .animate-marquee {animation: marquee 30s linear infinite;}

          *{ box-sizing: border-box; }
          ::-webkit-scrollbar {width: 6px;}
          ::-webkit-scrollbar-track {background: transparent;}
          ::-webkit-scrollbar-thumb {background: rgba(239,35,60,0.3); border-radius: 3px; }
          ::selection {background: #ef233c; color: #fff}         
          html {scroll-behavior: smooth;}
        `}
      </style>
    </div>
  );
}


//TODO: Make the email section work and after every refresh the projects disnot save as there is no backend, i have to work on these