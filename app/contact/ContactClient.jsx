"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

const CONTACT_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzG0ug3rWotNj6snWHnWkKV8FjI1i_ya5M98w4uM0C40kWevaC5jNKJXX2C3la75lEQjA/exec";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "support@sayzo.in",
    href: "mailto:support@sayzo.in",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 93355 81408",
    href: "tel:+919335581408",
  },
  // {
  //   icon: MapPin,
  //   label: "Visit Us",
  //   value: "New Delhi, India",
  //   href: null,
  // },
];

const ContactClient = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(CONTACT_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(form).toString(),
      });
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-16 md:py-24 mt-20 lg:mt-22 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#10A37F]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#10A37F]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center mb-16"
        >
         
          {/* Heading */}
          <motion.h1
            variants={item}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-4 text-lg text-gray-500 max-w-xl"
          >
            Have a question, feedback, or need help? We&apos;d love to hear from
            you. Our team is here to assist.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 grid-cols-1 gap-12 lg:gap-16">
          {/* Contact Info — Left Column */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {contactInfo.map((info) => (
              <motion.div
                key={info.label}
                variants={item}
                className="group flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-white hover:border-[#10A37F]/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#10A37F]/10 flex items-center justify-center group-hover:bg-[#10A37F]/20 transition-colors">
                  <info.icon className="w-5 h-5 text-[#10A37F]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    {info.label}
                  </p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-base font-semibold text-gray-900 hover:text-[#10A37F] transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-base font-semibold text-gray-900">
                      {info.value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Extra info card */}
            <motion.div
              variants={item}
              className="mt-2 p-6 rounded-2xl bg-gray-50 border border-gray-100"
            >
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Frequently Asked Questions
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Before reaching out, you might find your answer in our{" "}
                <a
                  href="/faq"
                  className="text-[#10A37F] font-medium hover:underline"
                >
                  FAQ section
                </a>
                . We&apos;ve covered the most common questions there.
              </p>
            </motion.div>
          </motion.div>

          {/* Form — Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#10A37F]/10 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-[#10A37F]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 mb-8 max-w-sm">
                    Thanks for reaching out. We&apos;ll get back to you within
                    24 hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    size="sayzobtn"
                    className="bg-[#10A37F] hover:bg-[#0f8c6e] text-white"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#10A37F] focus:ring-2 focus:ring-[#10A37F]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#10A37F] focus:ring-2 focus:ring-[#10A37F]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      type="tel"
                      placeholder="+91 00000 00000"
                      className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#10A37F] focus:ring-2 focus:ring-[#10A37F]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="How can we help you?"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 resize-none focus:outline-none focus:border-[#10A37F] focus:ring-2 focus:ring-[#10A37F]/20 transition-all"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    size="xl"
                    className="w-full rounded-full bg-[#10A37F] hover:bg-[#0f8c6e] text-white shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactClient;
