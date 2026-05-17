"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── Arabic text detector ──────────────────────────────────── */
const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);
const arabicSafe = (text: string): React.CSSProperties =>
  isArabic(text) ? { letterSpacing: "0", direction: "rtl" } : {};

/* ─── Field ─────────────────────────────────────────────────── */
function Field({
  label,
  required,
  name,
  focused,
  value,
  children,
}: {
  label: string;
  required?: boolean;
  name: string;
  focused: string | null;
  value?: string;
  children: React.ReactNode;
}) {
  const isActive =
    focused === name || (value !== undefined && value.length > 0);
  return (
    <div className="relative pb-px">
      <label
        className="block font-condensed text-[14px] tracking-[0.5em] uppercase mb-3 transition-colors duration-300 font-semibold"
        style={{ color: isActive ? "#FF1A1A" : "rgba(255,255,255,0.9)" }}
      >
        {label}
        {required && (
          <span style={{ color: "#CC0000" }} className="ml-1">
            *
          </span>
        )}
      </label>
      {children}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/40" />
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-red"
        animate={{ width: focused === name ? "100%" : "0%" }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ─── Quiz Option Button ────────────────────────────────────── */
function QuizOption({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string;
  icon?: string;
  selected: boolean;
  onClick: () => void;
}) {
  const arabic = isArabic(label);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-3 px-5 py-4 font-condensed uppercase transition-all duration-300 border text-left font-semibold"
      style={{
        borderColor: selected ? "#FF1A1A" : "rgba(255,255,255,0.28)",
        color: selected ? "#fff" : "rgba(255,255,255,0.7)",
        background: selected ? "rgba(204,0,0,0.14)" : "rgba(255,255,255,0.03)",
        /* ── FIX: Arabic gets zero letter-spacing ── */
        letterSpacing: arabic ? "0" : "0.25em",
        direction: arabic ? "rtl" : "ltr",
        fontFamily: arabic ? "var(--font-barlow)" : undefined,
        fontSize: arabic ? "16px" : "13px", // ← كبّرنا من 12px
      }}
    >
      {icon && (
        <span
          className="text-lg transition-all duration-300"
          style={{ color: selected ? "#FF1A1A" : "rgba(255,255,255,0.4)" }}
        >
          {icon}
        </span>
      )}
      {label}
      {selected && (
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="ml-auto text-sm"
          style={{ color: "#CC0000" }}
        >
          ✓
        </motion.span>
      )}
    </motion.button>
  );
}

/* ─── Quiz Question Block ────────────────────────────────────── */
function QuizBlock({
  number,
  label,
  sublabel,
  children,
}: {
  number: number;
  label: string;
  sublabel?: string;
  children: React.ReactNode;
}) {
  const arabic = isArabic(label);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: number * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex items-center gap-3 flex-wrap">
        <span
          className="font-bebas flex items-center justify-center w-7 h-7 rounded-full shrink-0 text-[13px] font-bold"
          style={{
            border: "1.5px solid rgba(255,26,26,0.7)",
            color: "#FF1A1A",
            background: "rgba(204,0,0,0.12)",
          }}
        >
          {number}
        </span>
        <span
          className="font-condensed uppercase font-semibold"
          style={{
            color: "rgba(255,255,255,0.85)",
            /* ── FIX: Arabic gets zero letter-spacing ── */
            letterSpacing: arabic ? "0" : "0.4em",
            fontFamily: arabic ? "var(--font-barlow)" : undefined,
            fontSize: arabic ? "17px" : "15px", // ← كبّرنا من 13px
          }}
        >
          {label}
        </span>
        {sublabel && (
          <span
            className="font-barlow text-sm normal-case tracking-normal font-medium"
            style={{
              color: "rgba(255,255,255,0.25)",
              ...arabicSafe(sublabel),
            }}
          >
            — {sublabel}
          </span>
        )}
      </div>
      {children}
    </motion.div>
  );
}

const shootTypes = [
  { id: "ad", label: "إعلان", icon: "◈" },
  { id: "product", label: "منتجات", icon: "◎" },
  { id: "content", label: "محتوى ليك", icon: "◐" },
  { id: "promo", label: "برومو", icon: "◉" },
];

/* ─── WhatsApp Section ───────────────────────────────────────── */
function WhatsAppSection() {
  return (
    <section className="pb-16 pt-6 flex flex-col items-center justify-center gap-5">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-[12px] tracking-[0.55em] uppercase text-white font-semibold"
        style={{ fontFamily: "var(--font-condensed)" }}
      >
        connect to whatsApp
      </motion.p>

      <motion.a
        href="https://wa.me/201227957008"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.15 }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex items-center justify-center w-20 h-20 rounded-full"
          style={{
            background: "rgba(37,211,102,0.12)",
            border: "1px solid rgba(37,211,102,0.25)",
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid rgba(37,211,102,0.4)" }}
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid rgba(37,211,102,0.3)" }}
            animate={{ scale: [1, 1.8, 1.8], opacity: [0.4, 0, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.3,
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="#25D366"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </motion.div>
      </motion.a>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
  });
  const [shootGoal, setShootGoal] = useState("");
  const [shootType, setShootType] = useState("");
  const [badExperience, setBadExperience] = useState<"yes" | "no" | "">("");
  const [badExpDetail, setBadExpDetail] = useState("");
  const [hasScript, setHasScript] = useState<"yes" | "no" | "">("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          to_email: "andrewaymanstore@gmail.com",
          subject: `[RED EDE] ${form.subject} — ${form.name}`,
          from_name: form.name,
          reply_to: form.email,
          phone: form.phone,
          shoot_goal: shootGoal,
          shoot_type: shootType,
          bad_experience:
            badExperience === "yes" ? `Yes — ${badExpDetail}` : "No",
          has_script: hasScript,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setForm({ name: "", email: "", phone: "", subject: "" });
        setShootGoal("");
        setShootType("");
        setBadExperience("");
        setHasScript("");
      } else throw new Error();
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-transparent text-white text-base outline-none placeholder:text-white/[0.28] py-3 caret-red font-barlow font-medium";

  return (
    <>
      <Navbar />
      <div
        style={{
          background: `
            radial-gradient(ellipse 75% 40% at 100% 0%, rgba(200,0,0,0.40) 0%, transparent 60%),
            radial-gradient(ellipse 55% 35% at 0% 60%, rgba(170,0,0,0.28) 0%, transparent 55%),
            radial-gradient(ellipse 40% 30% at 50% 40%, rgba(130,0,0,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 30% 20% at 80% 80%, rgba(120,0,0,0.18) 0%, transparent 50%),
            linear-gradient(170deg, #180000 0%, #060000 50%, #030000 100%)
          `,
        }}
      >
        <main
          className="min-h-screen grain pt-20 md:pt-[100px]"
          style={{ background: "transparent" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-10 md:mb-16"
            >
              <div className="h-px w-8 bg-red" />
              <span className="font-condensed text-[13px] tracking-[0.6em] text-red uppercase font-semibold">
                Get In <span className="text-red-600">Touch</span>
              </span>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-24 items-start">
              {/* ══ LEFT ══ */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col gap-10"
              >
                <div>
                  <h1
                    className="font-bebas leading-[0.92] mb-6 font-bold"
                    style={{
                      fontSize: "clamp(52px, 7vw, 96px)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    <span className="block text-white">Lets</span>
                    <span className="block text-red-700">Connect</span>
                  </h1>
                  <p className="font-barlow text-base text-white/40 leading-relaxed max-w-sm font-medium">
                    Have a vision or an idea? Fill in the form and I will get
                    back to you within 24 hours. Every great photo starts with a
                    conversation.
                  </p>
                </div>
                <div className="h-px bg-white/20" />
                <div>
                  {[
                    { label: "Phone", value: "+201227957008" },
                    { label: "Based in", value: "Cairo, Egypt" },
                    { label: "Available", value: "Worldwide" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-6 py-5 border-b border-white/35"
                    >
                      <span className="font-condensed text-[12px] tracking-[0.45em] text-red/80 uppercase w-24 shrink-0 font-semibold">
                        {item.label}
                      </span>
                      <span className="font-barlow text-base text-white/60 font-medium">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* ══ RIGHT ══ */}
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
                        <span className="text-red text-2xl font-bold">✓</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bebas text-5xl md:text-6xl text-white tracking-widest mb-3 font-bold">
                        Message Sent!
                      </h3>
                      <p className="font-barlow text-base text-white/35 leading-relaxed max-w-sm font-medium">
                        We have received your message and will be in touch
                        within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setSent(false)}
                      className="font-condensed text-xs tracking-[0.5em] uppercase px-8 py-3 border border-red/30 text-white/40 hover:text-white hover:border-red transition-all duration-300 font-semibold"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="flex flex-col gap-0"
                  >
                    {/* ── QUIZ ── */}
                    <div className="flex flex-col gap-8 pb-12">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-4"
                      >
                        <div
                          className="h-[1.5px] flex-1"
                          style={{
                            background:
                              "linear-gradient(to right, rgba(255,30,30,0.75), transparent)",
                          }}
                        />
                        <span
                          className="font-condensed text-[13px] tracking-[0.6em] uppercase shrink-0 font-semibold"
                          style={{ color: "rgba(255,50,50,0.9)" }}
                        >
                          Project Brief
                        </span>
                        <div
                          className="h-[1.5px] flex-1"
                          style={{
                            background:
                              "linear-gradient(to left, rgba(255,30,30,0.75), transparent)",
                          }}
                        />
                      </motion.div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Q1 */}
                        <QuizBlock number={1} label="هدفك ايه من التصوير؟">
                          <div className="relative pb-px">
                            <textarea
                              rows={3}
                              value={shootGoal}
                              onChange={(e) => setShootGoal(e.target.value)}
                              placeholder="مثلاً: كامبين لمنتج جديد، محتوى لسوشيال ميديا..."
                              onFocus={() => setFocused("shootGoal")}
                              onBlur={() => setFocused(null)}
                              className={`${inputCls} resize-none text-sm placeholder:text-sm`}
                              style={{ direction: "rtl", letterSpacing: "0" }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/35" />
                            <motion.div
                              className="absolute bottom-0 left-0 h-[2px] bg-red"
                              animate={{
                                width: focused === "shootGoal" ? "100%" : "0%",
                              }}
                              transition={{ duration: 0.35, ease: "easeInOut" }}
                            />
                          </div>
                        </QuizBlock>

                        {/* Q2 */}
                        <QuizBlock number={2} label="ايه نوع التصوير؟">
                          <div className="flex flex-wrap gap-2">
                            {shootTypes.map((t) => (
                              <QuizOption
                                key={t.id}
                                label={t.label}
                                icon={t.icon}
                                selected={shootType === t.id}
                                onClick={() => setShootType(t.id)}
                              />
                            ))}
                          </div>
                        </QuizBlock>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Q3 */}
                        <QuizBlock number={3} label="حصل حاجة ضايقتك قبل كده؟">
                          <div className="flex flex-col gap-3">
                            <div className="flex flex-wrap gap-2">
                              <QuizOption
                                label="أيوه، حصل"
                                icon="◈"
                                selected={badExperience === "yes"}
                                onClick={() => setBadExperience("yes")}
                              />
                              <QuizOption
                                label="لأ، أول مرة"
                                icon="◎"
                                selected={badExperience === "no"}
                                onClick={() => setBadExperience("no")}
                              />
                            </div>
                            <AnimatePresence>
                              {badExperience === "yes" && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.35 }}
                                  className="overflow-hidden"
                                >
                                  <div className="relative pb-px mt-1">
                                    <textarea
                                      rows={2}
                                      value={badExpDetail}
                                      onChange={(e) =>
                                        setBadExpDetail(e.target.value)
                                      }
                                      placeholder="قولي ايه اللي حصل..."
                                      onFocus={() => setFocused("badExp")}
                                      onBlur={() => setFocused(null)}
                                      className={`${inputCls} resize-none text-sm placeholder:text-sm`}
                                      style={{
                                        direction: "rtl",
                                        letterSpacing: "0",
                                      }}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/35" />
                                    <motion.div
                                      className="absolute bottom-0 left-0 h-[2px] bg-red"
                                      animate={{
                                        width:
                                          focused === "badExp" ? "100%" : "0%",
                                      }}
                                      transition={{
                                        duration: 0.35,
                                        ease: "easeInOut",
                                      }}
                                    />
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </QuizBlock>

                        {/* Q4 */}
                        <QuizBlock
                          number={4}
                          label="عندك اسكريبت جاهز؟"
                          sublabel="ولا نشتغل مع بعض"
                        >
                          <div className="flex flex-wrap gap-2">
                            <QuizOption
                              label="أيوه، جاهز"
                              icon="✦"
                              selected={hasScript === "yes"}
                              onClick={() => setHasScript("yes")}
                            />
                            <QuizOption
                              label="ساعدني نعمل حاجة"
                              icon="◐"
                              selected={hasScript === "no"}
                              onClick={() => setHasScript("no")}
                            />
                          </div>
                        </QuizBlock>
                      </div>
                    </div>

                    {/* ── DIVIDER ── */}
                    <div className="relative flex items-center gap-5 my-2 mb-12">
                      <div
                        className="flex-1 h-[1.5px]"
                        style={{
                          background:
                            "linear-gradient(to right, transparent, rgba(255,255,255,0.3), rgba(255,30,30,0.65))",
                        }}
                      />
                      <span
                        className="font-condensed text-[12px] tracking-[0.65em] uppercase font-semibold shrink-0"
                        style={{ color: "rgba(255,255,255,0.55)" }}
                      >
                        Your Details
                      </span>
                      <div
                        className="flex-1 h-[1.5px]"
                        style={{
                          background:
                            "linear-gradient(to left, transparent, rgba(255,255,255,0.3), rgba(255,30,30,0.65))",
                        }}
                      />
                    </div>

                    {/* ── FORM ── */}
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-8"
                    >
                      <Field
                        label="Full Name"
                        required
                        name="name"
                        focused={focused}
                        value={form.name}
                      >
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused(null)}
                          className={inputCls}
                        />
                      </Field>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Field
                          label="Email"
                          required
                          name="email"
                          focused={focused}
                          value={form.email}
                        >
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="your@email.com"
                            onFocus={() => setFocused("email")}
                            onBlur={() => setFocused(null)}
                            className={inputCls}
                          />
                        </Field>
                        <Field
                          label="Phone"
                          name="phone"
                          focused={focused}
                          value={form.phone}
                        >
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+20 ..."
                            onFocus={() => setFocused("phone")}
                            onBlur={() => setFocused(null)}
                            className={inputCls}
                          />
                        </Field>
                      </div>

                      <Field
                        label="Subject"
                        required
                        name="subject"
                        focused={focused}
                        value={form.subject}
                      >
                        <input
                          type="text"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          required
                          placeholder="What's this about?"
                          onFocus={() => setFocused("subject")}
                          onBlur={() => setFocused(null)}
                          className={inputCls}
                        />
                      </Field>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={!loading ? "hover" : undefined}
                        whileTap={!loading ? { scale: 0.98 } : undefined}
                        className="relative group w-full overflow-hidden font-condensed tracking-[0.5em] uppercase text-sm py-5 border border-red text-white transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed font-semibold"
                      >
                        {!loading && (
                          <motion.span
                            className="absolute inset-0 bg-red"
                            initial={{ scaleX: 1, originX: 0 }}
                            variants={{ hover: { scaleX: 0 } }}
                            transition={{
                              duration: 0.45,
                              ease: [0.76, 0, 0.24, 1],
                            }}
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
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              />
                              Sending…
                            </motion.span>
                          ) : (
                            <motion.span
                              key="idle"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="relative z-10 flex items-center justify-center gap-4"
                            >
                              Send Message
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

                      <p className="font-condensed text-[11px] tracking-[0.5em] text-white/20 text-center uppercase font-semibold">
                        We respond within 24 hours
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
        <WhatsAppSection />
      </div>
      <Footer />
    </>
  );
}
