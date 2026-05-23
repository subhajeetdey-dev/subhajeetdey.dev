import React, {useState} from "react";
import type { PortfolioData } from "../../types/portfolio.types";
import {useReveal} from "../../hooks/useReveal";
import { FaCheck } from "react-icons/fa";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { X } from 'lucide-react';

interface ContactSectionProps {
  data: PortfolioData;
  dark: boolean;
  contactSent: boolean;
  handleContact: (name: string, email: string, message: string) => Promise<void>;
  contactLoading: boolean;
  borderCol: string;
  mutedCol: string;
  textCol: string;
}

export function ContactSection({
  data,
  dark,
  contactSent,
  handleContact,
  contactLoading,
  borderCol,
  mutedCol,
  textCol,
}: ContactSectionProps) {

  const {ref, visible} = useReveal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const inputBg = dark ? "#141414": "#f4f4f5";
  const inputBorder = dark ? "#1f1f1f": "#e5e7eb";

  const validate = () => {
    const e: Record<string, string> = {};
    if(!name.trim()) e.name = "Name is required";
    if(!email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))   e.email   = "Invalid email address";
    if(!message.trim()) e.message = "Message is required";
    else if (message.trim().length < 10 )  e.message = "Message is too short";
    setErrors(e);
    return Object.keys(e).length === 0;    
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if(!validate() || contactLoading) return;
    await handleContact(name, email, message);
    if(contactSent && name){
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
    }
  };

  
  return (
    <section
      id="contact"
      className="px-6 py-32 text-center"
      style={{
        background: dark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.02)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 font-mono text-sm" style={{ color: mutedCol }}>
          <span style={{ color: "#ef233c" }}>await</span>{" "}
          <span style={{ color: dark ? "#60a5fa" : "#2563eb" }}>
            sendMessage
          </span>
          <span style={{ color: mutedCol }}>(</span>
          <span style={{ color: dark ? "#f59e0b" : "#d97706" }}>
            "subhajeetwork@gmail.com"
          </span>
          <span style={{ color: mutedCol }}>)</span>
        </div>
        <h2
          className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl"
          style={{
            color: textCol,
            letterSpacing: "-0.04em",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Let's <span style={{ color: "#ef233c" }}>Build</span> Together Beyond{" "}
          <span style={{ color: "#ef233c" }}>Technology</span>
        </h2>

        <p
          className="mb-12 text-xl whitespace-nowrap"
          style={{ color: mutedCol }}
        >
          Open to full-time roles, freelance contracts, and interesting
          collaborations.
          <br />I respond within 24 hours
        </p>

        <div
        ref={ref}
          className="p-8 mb-10 text-left border rounded-2xl"
          style={{
            background: dark? "#0d0d0d": "#fff",
            borderColor: inputBorder,
            boxShadow: dark ? "none": "0 4px 32px rgba(0,0,0,0.06)",
            opacity: visible ? 1: 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease"
          }
          }
        >
            {contactSent ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div
                className="flex items-center justify-center w-16 h-16 mb-5 text-2xl rounded-full"
                style={{ background: "rgba(34,197,94,0.1)", border: "2px solid #22c55e", color: "#22c55e"
                }}
                >
                  <FaCheck/>
                </div>
                <h3
                className="mb-2 text-2xl font-bold"
                style={{color:textCol, fontFamily: "'Space Grotesk', sans-serif"}}
                >
                  Message Sent
                </h3>
                <p className="text-sm" style={{color: mutedCol}}>
                  Thanks for reaching out. I'll get back to you within 24 hours.                  
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <h3
                  className="text-xl font-bold mb-0.5"
                  style={{color: textCol, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em"}}
                  >
                    Send a Message                    
                  </h3>
                  <p className="font-mono text-xs" style={{color: mutedCol}}>
                    // fill in the details below                    
                  </p>
                  </div>
                   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest mb-1.5"
                      style={{color: mutedCol}}>
                        Full Name
                      </label>
                      <input type="text"
                      placeholder="Enter Your Name"
                      value={name}
                      onChange={(e) => {setName(e.target.value); setErrors((p) => ({...p, name: ""}));}}
                      className="w-full px-4 py-3 font-sans text-sm transition-all border outline-none rounded-xl"
                      style={{
                        background: inputBg,
                        color: textCol,
                        borderColor: errors.name ? "#ef233c": inputBorder,
                      }}
                       />
                       {errors.name && (
                        <p className="text-[11px] font-mono mt-1" style={{ color: "#ef233c"}}>
                          <span className="flex items-center justify-center gap-1"><X />{errors.name}</span>
                        </p>
                       )}
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest mb-1.5"
                      style={{ color: mutedCol }}>
                        Email Address
                      </label>
                      <input type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => {setEmail(e.target.value); setErrors((p) => ({...p, email: ""}));}}
                      className="w-full px-4 py-3 font-sans text-sm transition-all border outline-none rounded-xl"
                      style={{
                        background: inputBg,
                        color: textCol,
                        borderColor: errors.email ? "#ef233c": inputBorder,
                      }}
                      />
                      {errors.email && (
                        <p className="text-[11px] font-mono mt-1" style={{ color: "#ef233c"}}>
                          <span className="flex items-center justify-center gap-1"><X />{errors.name}</span>
                        </p>
                      )}
                    </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest mb-1.5"
                      style={{ color: mutedCol }}>
                        Message
                      </label>
                      <textarea 
                      rows={5} 
                      placeholder="Tell me about your project or just say hi..."
                      value={message}
                      onChange={(e) => { setMessage(e.target.value); setErrors((p) => ({...p, message: ""}));}}
                      className="w-full px-4 py-3 font-sans text-sm transition-all border outline-none rounded-xl"
                      style={{
                        background: inputBg,
                        color: textCol,
                        borderColor: errors.message ? "#ef233c" : inputBorder,
                        resize: "none",
                      }}
                      />
                      <div className="flex items-center justify-between mt-1">
                        {errors.message
                         ? <p className="flex items-center justify-center gap-1 text-red-600"><X />{errors.message}</p>
                         : <span/>
                        }
                        <p className="text-[11px] font-mono" style={{color: mutedCol}}>
                          {message.length} chars
                          </p>                       
                      </div>
                      </div>
                      
                      <button
                      type="submit"
                      disabled={contactLoading}
                      className="w-full py-4 text-sm font-bold text-white transition-all rounded-xl"
                      style={{
                        background: contactLoading ? "#52525b": "#ef233c",
                        cursor: contactLoading ? "not-allowed": "pointer",
                        fontFamily: "'Space Grotesk', sans-serif",
                        letterSpacing: "-0.01em",
                      }}
                      >
                        {
                          contactLoading ? (
                            <span className="flex items-center justify-center gap-2">
                              <span className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                              Sending...
                            </span>
                          ): (
                            "Send Message →"
                          )
                        }
                        </button>           
              </form>
            )}
        </div>

        <div className="flex justify-center gap-3">
          {[
            { icon: <FaGithub size={18}/>, href: data.meta.github, title: "GitHub" },
            {
              icon: <FaLinkedin size={18}/>,
              href: data.meta.linkedin,
              title: "LinkedIn",
            },
            { icon: <FaXTwitter size={18}/>, href: data.meta.x, title: "X" },
            {
              icon: <CiMail size={18}/>,
              href: `mailto:${data.meta.email}`,
              title: "Email",
            },
          ].map(({ icon, href, title }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              title={title}
              className="flex items-center justify-center w-12 h-12 font-mono text-sm font-bold transition-all border rounded-full"
              style={{ borderColor: borderCol, color: mutedCol }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ef233c";
                e.currentTarget.style.borderColor = "#ef233c";
                e.currentTarget.style.background = "rgba(239,35,60,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = mutedCol;
                e.currentTarget.style.borderColor = borderCol;
                e.currentTarget.style.background = "transparent";
              }}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
