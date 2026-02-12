"use client";
import { useState } from "react";

const CONTACT_SHEET_URL = "https://script.google.com/macros/s/AKfycbzG0ug3rWotNj6snWHnWkKV8FjI1i_ya5M98w4uM0C40kWevaC5jNKJXX2C3la75lEQjA/exec";

const ContactClient = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(CONTACT_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      alert("Message sent successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-24">
          <div className="flex items-center lg:mb-0 mb-10">
            <div>
              <h4 className="text-indigo-600 text-base font-medium mb-4 lg:text-left text-center">Contact Us</h4>
              <h2 className="text-gray-900 text-4xl font-semibold mb-9 lg:text-left text-center">Talk to our Support Team</h2>
              <form onSubmit={handleSubmit}>
                <input name="name" value={form.name} onChange={handleChange} type="text" className="w-full h-14 shadow-sm text-gray-600 text-lg rounded-full border border-gray-200 px-4 mb-8 focus:outline-none" placeholder="Name" required />
                <input name="email" value={form.email} onChange={handleChange} type="email" className="w-full h-14 shadow-sm text-gray-600 text-lg rounded-full border border-gray-200 px-4 mb-8 focus:outline-none" placeholder="Email" required />
                <input name="phone" value={form.phone} onChange={handleChange} type="tel" className="w-full h-14 shadow-sm text-gray-600 text-lg rounded-full border border-gray-200 px-4 mb-8 focus:outline-none" placeholder="Phone Number" />
                <textarea name="message" value={form.message} onChange={handleChange} className="w-full h-48 shadow-sm resize-none text-gray-600 text-lg rounded-2xl border border-gray-200 px-4 py-4 mb-8 focus:outline-none" placeholder="How can we help you?" required />
                <button type="submit" disabled={loading} className="w-full h-12 text-white text-base font-semibold rounded-full bg-indigo-600 hover:bg-indigo-800 transition disabled:opacity-50">
                  {loading ? "Sending..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
          <div className="lg:max-w-xl lg:block hidden w-full h-[600px] bg-cover bg-no-repeat" style={{ backgroundImage: "url('https://pagedone.io/asset/uploads/1696245837.png')" }} />
        </div>
      </div>
    </section>
  );
};

export default ContactClient;