"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function Field({
  label, required, name, focused, children,
}: {
  label: string; required?: boolean; name: string;
  focused: string | null; children: React.ReactNode;
}) {
  return (
    <div className="relative pb-px">
      <label
        className="block font-condensed text-[10px] tracking-[0.5em] uppercase mb-2 transition-colors duration-300"
        style={{ color: focused === name ? "#CC0000" : "rgba(255,255,255,0.22)" }}
      >
        {label}{required && <span style={{ color: "#CC0000" }} className="ml-1">*</span>}
      </label>
      {children}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.07]" />
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-red"
        animate={{ width: focused === name ? "100%" : "0%" }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      />
    </div>
  );
}

const services = [
  { id: "wedding",     label: "Wedding",    icon: "◆" },
  { id: "portrait",   label: "Portrait",   icon: "◉" },
  { id: "fashion",    label: "Fashion",    icon: "✦" },
  { id: "commercial", label: "Commercial", icon: "▲" },
  { id: "other",      label: "Other",      icon: "●" },
];

export default function ContactPage() {
  const [loading, setLoading]                 = useState(false);
  const [sent, setSent]                       = useState(false);
  const [focused, setFocused]                 = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          to_email:   "andrewaymanstore@gmail.com",
          subject:    `[RED EDE] ${form.subject} — ${selectedService} — ${form.name}`,
          from_name:  form.name,
          reply_to:   form.email,
          phone:      form.phone,
          service:    selectedService,
          message:    form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
        setSelectedService("");
      } else throw new Error();
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-transparent text-white text-sm outline-none placeholder:text-white/[0.15] py-3 caret-red font-barlow";

  return (
    <>
      <Navbar />

      <main className="bg-black min-h-screen grain" style={{ paddingTop: "100px" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-16 py-20">

          {/* label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-16"
          >
            <div className="h-px w-7 bg-red" />
            <span className="font-condensed text-[10px] tracking-[0.6em] text-red uppercase">
              Get In Touch
            </span>
          </motion.div>

          {/* grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start">

            {/* ══ LEFT ══ */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-10"
            >
              <div>
                <h1
                  className="font-bebas leading-[0.92] mb-6"
                  style={{ fontSize: "clamp(52px, 6vw, 80px)", letterSpacing: "0.04em" }}
                >
                  <span className="block text-white">Lets</span>
                  <span className="block text-red">Connect</span>
                </h1>
                <p className="font-barlow text-sm text-white/35 leading-relaxed max-w-70">
                  Have a vision or an idea? Fill in the form and ll get back
                  to you within 24 hours. Every great photo starts with a
                  conversation.
                </p>
              </div>

              <div className="h-px bg-white/6" />

              <div>
                {[
                  { label: "Phone",     value: "+20 100 000 0000" },
                  { label: "Based in",  value: "Cairo, Egypt" },
                  { label: "Available", value: "Worldwide" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-8 py-4 border-b border-white/5">
                    <span className="font-condensed text-[9px] tracking-[0.45em] text-red/50 uppercase w-24 shrink-0">
                      {item.label}
                    </span>
                    <span className="font-barlow text-sm text-white/35">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-white/6" />

              <div>
                <p className="font-condensed text-[10px] tracking-[0.5em] text-white/20 uppercase mb-5">
                  What to Expect
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    "Reply within 24 hours",
                    "Free initial consultation",
                    "Custom packages available",
                    "Worldwide travel available",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-red shrink-0" />
                      <span className="font-barlow text-sm text-white/30">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ══ RIGHT — form ══ */}
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center text-center gap-8 py-24"
                >
                  <div className="relative w-20 h-20">
                    <motion.div
                      className="absolute inset-0 border-2 border-red rotate-45"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(204,0,0,0.3)",
                          "0 0 50px rgba(204,0,0,0.6)",
                          "0 0 20px rgba(204,0,0,0.3)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-red text-2xl">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bebas text-5xl text-white tracking-widest mb-3">Message Sent!</h3>
                    <p className="font-barlow text-sm text-white/35 leading-relaxed max-w-65">
                      ve received your message and will be in touch within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setSent(false)}
                    className="font-condensed text-xs tracking-[0.5em] uppercase px-8 py-3 border border-red/30 text-white/40 hover:text-white hover:border-red transition-all duration-300"
                  >
                    Send Another
                  </button>
                </motion.div>

              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="flex flex-col gap-8"
                >
                  {/* Full Name */}
                  <Field label="Full Name" required name="name" focused={focused}>
                    <input
                      type="text" name="name" value={form.name}
                      onChange={handleChange} required
                      placeholder="Your full name"
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className={inputCls}
                    />
                  </Field>

                  {/* Email + Phone جنب بعض */}
                  <div className="grid grid-cols-2 gap-6">
                    <Field label="Email" required name="email" focused={focused}>
                      <input
                        type="email" name="email" value={form.email}
                        onChange={handleChange} required
                        placeholder="your@email.com"
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        className={inputCls}
                      />
                    </Field>

                    <Field label="Phone" name="phone" focused={focused}>
                      <input
                        type="tel" name="phone" value={form.phone}
                        onChange={handleChange}
                        placeholder="+20 ..."
                        onFocus={() => setFocused("phone")}
                        onBlur={() => setFocused(null)}
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  {/* Subject */}
                  <Field label="Subject" required name="subject" focused={focused}>
                    <input
                      type="text" name="subject" value={form.subject}
                      onChange={handleChange} required
                      placeholder="What's this about?"
                      onFocus={() => setFocused("subject")}
                      onBlur={() => setFocused(null)}
                      className={inputCls}
                    />
                  </Field>

                  {/* Service */}
                  <div>
                    <p
                      className="font-condensed text-[10px] tracking-[0.5em] uppercase mb-4"
                      style={{ color: "rgba(255,255,255,0.22)" }}
                    >
                      Service Type <span style={{ color: "#CC0000" }} className="ml-1">*</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {services.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSelectedService(s.id)}
                          className="flex items-center gap-2 px-4 py-2 font-condensed text-xs tracking-[0.3em] uppercase transition-all duration-300 border"
                          style={{
                            borderColor: selectedService === s.id ? "#CC0000" : "rgba(255,255,255,0.08)",
                            color:       selectedService === s.id ? "#fff"    : "rgba(255,255,255,0.35)",
                            background:  selectedService === s.id ? "rgba(204,0,0,0.08)" : "transparent",
                          }}
                        >
                          <span style={{ color: "#CC0000" }}>{s.icon}</span>
                          {s.label}
                        </button>
                      ))}
                    </div>
                    {!selectedService && (
                      <p className="font-condensed text-[9px] tracking-[0.4em] text-red/40 uppercase mt-3">
                        Please select a service type
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <Field label="Your Message / Vision" required name="message" focused={focused}>
                    <textarea
                      name="message" value={form.message}
                      onChange={handleChange} required rows={5}
                      placeholder="Describe your vision, ideas, or questions..."
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      className={`${inputCls} resize-none`}
                    />
                  </Field>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading || !selectedService}
                    whileHover={!loading && !!selectedService ? "hover" : undefined}
                    whileTap={!loading && !!selectedService ? { scale: 0.98 } : undefined}
                    className="relative group w-full overflow-hidden font-condensed tracking-[0.5em] uppercase text-sm py-5 border border-red text-white transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {!loading && !!selectedService && (
                      <motion.span
                        className="absolute inset-0 bg-red"
                        initial={{ scaleX: 1, originX: 0 }}
                        variants={{ hover: { scaleX: 0 } }}
                        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                      />
                    )}
                    <AnimatePresence mode="wait">
                      {loading ? (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="relative z-10 flex items-center justify-center gap-3 text-red"
                        >
                          <motion.span
                            className="w-4 h-4 border border-red/40 border-t-red rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          />
                          Sending…
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="relative z-10 flex items-center justify-center gap-4"
                        >
                          Send Message
                          <motion.span variants={{ hover: { x: 6 } }} transition={{ duration: 0.25 }}>→</motion.span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <p className="font-condensed text-[9px] tracking-[0.5em] text-white/12 text-center uppercase">
                    We typically respond within 24 hours
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
