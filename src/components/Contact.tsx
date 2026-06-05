import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import ForgeCore from "./ForgeCore";
import { submitLead } from "./leadservice";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [botField, setBotField] = useState("");
  const [cooldown, setCooldown] = useState(false);

  // Check if the user is locked out from a recent submission
  useEffect(() => {
    const lastSubmit = localStorage.getItem("forge_cooldown");
    if (lastSubmit && Date.now() - parseInt(lastSubmit) < 60000) {
      setCooldown(true);
      setTimeout(() => setCooldown(false), 60000 - (Date.now() - parseInt(lastSubmit)));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TRAP 1: The Honeypot (Silent bot rejection)
    if (botField !== "") {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setFormState({ name: "", email: "", phone: "", message: "" });
        setBotField("");
        alert("Inquiry sent! We'll forge a connection soon."); // Fake success so bots move on
      }, 1000);
      return;
    }

    // TRAP 2: The Cooldown Lock
    if (cooldown) {
      alert("The forge is cooling down. Please wait a minute before sending another request.");
      return;
    }

    setIsSubmitting(true);
    
    // Calls your external service (e.g. Google Sheets webhook)
    const result = await submitLead(formState);
    
    setIsSubmitting(false);

    if (result.success) {
      setFormState({ name: "", email: "", phone: "", message: "" });
      
      // Engage the 60-second cooldown lock
      localStorage.setItem("forge_cooldown", Date.now().toString());
      setCooldown(true);
      setTimeout(() => setCooldown(false), 60000);

      alert("Inquiry sent! We'll forge a connection soon.");
    } else {
      alert(result.error || "Failed to forge connection. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden bg-[#0A0A0A]">
      
      {/* 3D Forge Core Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-60">
        <ForgeCore />
      </div>

      {/* Ambient Glows */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#FF4D00]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#FF8A00]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Contact Details */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#FF4D00] font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
            >
              Get In Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-white"
            >
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A00] to-[#FF4D00]">Forge</span> Together
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-neutral-400 text-lg mb-16 max-w-lg leading-relaxed font-medium"
            >
              Ready to bring your vision to life? Fill out the form below and let's start crafting your digital future in the heart of the forge.
            </motion.p>

            <div className="space-y-10">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-6 group"
              >
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#FF4D00]/10 group-hover:border-[#FF4D00]/30 transition-colors duration-300">
                  <Mail className="text-[#FF4D00]" size={24} />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] font-bold mb-1">Email Us</p>
                  <p className="text-xl font-bold text-white">getflowforged@gmail.com</p>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-6 group"
              >
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#FF4D00]/10 group-hover:border-[#FF4D00]/30 transition-colors duration-300">
                  <Phone className="text-[#FF4D00]" size={24} />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] font-bold mb-1">Call Us</p>
                  <p className="text-xl font-bold text-white">+91 8975006446</p>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-6 group"
              >
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#FF4D00]/10 group-hover:border-[#FF4D00]/30 transition-colors duration-300">
                  <MapPin className="text-[#FF4D00]" size={24} />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] font-bold mb-1">Location</p>
                  <p className="text-xl font-bold text-white">India</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#111111]/80 border border-white/10 p-8 md:p-10 rounded-[2rem] relative backdrop-blur-xl shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* INVISIBLE HONEYPOT FIELD (BOT TRAP) */}
              <input 
                type="text" 
                name="honey_contact" 
                value={botField} 
                onChange={(e) => setBotField(e.target.value)} 
                style={{ display: "none" }} 
                tabIndex={-1} 
                autoComplete="off" 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em]">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-4 py-4 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-all text-white placeholder-neutral-600"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em]">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-4 py-4 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-all text-white placeholder-neutral-600"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em]">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 1234567890"
                  className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-4 py-4 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-all text-white placeholder-neutral-600"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em]">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-4 py-4 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-all text-white placeholder-neutral-600 resize-none"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                />
              </div>
              
              <button 
                className="w-full py-5 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(255,77,0,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Forging..." : <>Forge Connection <Send size={20} /></>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}