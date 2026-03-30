"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { toast } from "react-toastify";

const services = ["Wedding", "Portrait", "Fashion", "Commercial", "Other"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function BookingForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", date: "", message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: `New Booking — ${form.service} — ${form.name}`,
          from_name: form.name,
          ...form,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Sent! We'll be in touch within 24 hours.", { icon: "📷" });
        setForm({ name: "", email: "", phone: "", service: "", date: "", message: "" });
      } else throw new Error();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const Field = ({
    index, label, required, children, name,
  }: {
    index: number; label: string; required?: boolean; children: React.ReactNode; name: string;
  }) => (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="relative"
    >
      <label className="block font-condensed text-[10px] tracking-[0.5em] uppercase mb-2 transition-colors duration-300"
        style={{ color: focused === name ? "#CC0000" : "rgba(255,255,255,0.25)" }}
      >
        {label}{required && <span className="text-red ml-1">*</span>}
      </label>
      {children}
      {/* animated bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-red"
        animate={{ width: focused === name ? "100%" : "0%" }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      />
    </motion.div>
  );

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "none",
    color: "#ffffff",
    fontFamily: "var(--font-barlow)",
    fontSize: "14px",
    padding: "10px 0 14px",
    outline: "none",
    caretColor: "#CC0000",
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-black relative overflow-hidden"
      style={{ paddingTop: "100px", paddingBottom: "80px" }}
    >
      {/* background large text */}
      <span className="absolute top-32 right-0 font-bebas text-[160px] md:text-[220px] text-white/[0.025] leading-none select-none pointer-events-none">
        BOOK
      </span>

      {/* vertical red line accent */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-red/20"
        initial={{ scaleY: 0, originY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
      />

      <div className="max-w-6xl mx-auto px-10 md:px-20 grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-20 items-start">

        {/* ── Left col ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* label */}
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                className="h-px bg-red"
                initial={{ width: 0 }}
                animate={inView ? { width: 28 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
              <span className="font-condensed text-[10px] tracking-[0.6em] text-red uppercase">
                Let's Create
              </span>
            </div>

            {/* headline */}
            <h1 className="font-bebas leading-none mb-10" style={{ fontSize: "clamp(64px, 9vw, 104px)", letterSpacing: "0.04em" }}>
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Book a
              </motion.span>
              <motion.span
                className="block text-red"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Session
              </motion.span>
            </h1>

            <motion.p
              className="font-barlow text-sm text-white/35 leading-relaxed max-w-[280px] mb-14"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              Ready to capture something extraordinary? Fill in the form and we'll
              be in touch within 24 hours.
            </motion.p>

            {/* contact rows */}
            {[
              { label: "Email",     value: "hello@redede.com" },
              { label: "Phone",     value: "+20 100 000 0000" },
              { label: "Based in",  value: "Cairo, Egypt" },
              { label: "Available", value: "Worldwide" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="flex items-center gap-8 py-4 border-b border-white/[0.06]"
              >
                <span className="font-condensed text-[10px] tracking-[0.4em] text-red/60 uppercase w-20 shrink-0">
                  {item.label}
                </span>
                <span className="font-barlow text-sm text-white/40">{item.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Right col: Form ── */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-8 pt-2"
        >
          {/* Name */}
          <Field index={0} label="Full Name" required name="name">
            <input
              type="text" name="name" value={form.name} onChange={handleChange}
              required placeholder="Your full name"
              onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
              style={{ ...inputStyle, color: "#fff" }}
              className="placeholder:text-white/15"
            />
          </Field>

          {/* Email + Phone */}
          <div className="grid grid-cols-2 gap-8">
            <Field index={1} label="Email" required name="email">
              <input
                type="email" name="email" value={form.email} onChange={handleChange}
                required placeholder="your@email.com"
                onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                style={inputStyle} className="placeholder:text-white/15"
              />
            </Field>
            <Field index={2} label="Phone" name="phone">
              <input
                type="tel" name="phone" value={form.phone} onChange={handleChange}
                placeholder="+20 ..."
                onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                style={inputStyle} className="placeholder:text-white/15"
              />
            </Field>
          </div>

          {/* Service */}
          <Field index={3} label="Service" required name="service">
            <select
              name="service" value={form.service} onChange={handleChange} required
              onFocus={() => setFocused("service")} onBlur={() => setFocused(null)}
              style={{ ...inputStyle, appearance: "none" as const }}
              className="placeholder:text-white/15"
            >
              <option value="" disabled style={{ background: "#0A0A0A" }}>Select service type</option>
              {services.map((s) => (
                <option key={s} value={s} style={{ background: "#141414" }}>{s}</option>
              ))}
            </select>
          </Field>

          {/* Date */}
          <Field index={4} label="Preferred Date" name="date">
            <input
              type="date" name="date" value={form.date} onChange={handleChange}
              onFocus={() => setFocused("date")} onBlur={() => setFocused(null)}
              style={inputStyle}
              className="[color-scheme:dark]"
            />
          </Field>

          {/* Message */}
          <Field index={5} label="Your Vision" required name="message">
            <textarea
              name="message" value={form.message} onChange={handleChange}
              required rows={4}
              placeholder="Describe your ideal session..."
              onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
              style={{ ...inputStyle, resize: "none" }}
              className="placeholder:text-white/15"
            />
          </Field>

          {/* Submit */}
          <motion.div
            custom={6}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="pt-2"
          >
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? "hover" : undefined}
              whileTap={!loading ? { scale: 0.98 } : undefined}
              className="relative group w-full overflow-hidden font-condensed tracking-[0.5em] uppercase text-sm py-5 border border-red text-white transition-colors duration-500"
            >
              {/* red wipe — starts filled, wipes away on hover */}
              {!loading && (
                <motion.span
                  className="absolute inset-0 bg-red"
                  initial={{ scaleX: 1, originX: 0 }}
                  variants={{ hover: { scaleX: 0 } }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                />
              )}

              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative z-10 flex items-center justify-center gap-3 text-red"
                  >
                    <motion.span
                      className="w-4 h-4 border border-red/40 border-t-red rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                    Sending
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative z-10 flex items-center justify-center gap-4"
                  >
                    Send Request
                    <motion.span
                      variants={{ hover: { x: 6 } }}
                      transition={{ duration: 0.25 }}
                    >
                      →
                    </motion.span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <p className="font-condensed text-[9px] tracking-[0.5em] text-white/15 text-center uppercase mt-4">
              We typically respond within 24 hours
            </p>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}