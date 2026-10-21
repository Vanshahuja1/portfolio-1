import { useState } from "react";
import { Mail, Linkedin, Github, Instagram, Zap, Handshake, Lightbulb } from "lucide-react";

import TitleHeader from "../components/TitleHeader";
import { LIMITS, validateContact } from "../lib/contactValidation";

// `hp` is the honeypot, see the hidden field below.
const EMPTY_FORM = { name: "", email: "", message: "", hp: "" };
const SEND_FAILED = "Failed to send message. Please try again or email me directly.";

const Contact = () => {
  const [startedAt] = useState(Date.now); // the server rejects submits made too soon after load
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    const clientError = Object.values(validateContact(form)).join(" ");
    setError(clientError);
    if (clientError) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, elapsedMs: Date.now() - startedAt }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || SEND_FAILED);
        return;
      }
      setForm(EMPTY_FORM);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch {
      setError(SEND_FAILED);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "vanshahuja318@gmail.com",
      link: "mailto:vanshahuja318@gmail.com"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "Connect with me",
      link: "https://www.linkedin.com/in/vanshahuja1/"
    },
    {
      icon: Github,
      title: "GitHub",
      value: "View my work",
      link: "https://github.com/Vanshahuja1"
    },
    {
      icon: Instagram,
      title: "Instagram",
      value: "Follow me",
      link: "https://www.instagram.com/vansh_ahuja1/"
    }
  ];

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch – Let's Connect"
          sub="Have questions or ideas? Let's talk!"
        />

        <div className="grid-12-cols mt-16 gap-8">
          {/* Contact Form */}
          <div className="xl:col-span-6 lg:col-span-12">
            <div className="flex-center card-border rounded-xl p-10 flex-col gap-6 h-full">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="relative w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your good name?"
                    maxLength={LIMITS.name}
                    className="w-full px-4 py-3 rounded-lg bg-transparent border border-black-50 focus:border-white-50 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What's your email address?"
                    maxLength={LIMITS.email}
                    className="w-full px-4 py-3 rounded-lg bg-transparent border border-black-50 focus:border-white-50 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 font-medium">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    maxLength={LIMITS.message}
                    className="w-full px-4 py-3 rounded-lg bg-transparent border border-black-50 focus:border-white-50 focus:outline-none transition-colors resize-none"
                    required
                  />
                </div>

                {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
                <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
                  <label htmlFor="hp">Leave this field empty</label>
                  <input
                    id="hp"
                    name="hp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.hp}
                    onChange={handleChange}
                  />
                </div>

                {success && (
                  <div role="status" className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {error && (
                  <div role="alert" className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading} className="w-full">
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & Social Links */}
          <div className="xl:col-span-6 lg:col-span-12 flex flex-col gap-8">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <a
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-border rounded-xl p-6 hover:border-white-50/60 transition-all duration-300 hover:scale-105 flex flex-col items-center text-center gap-3 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-white-50/10 flex items-center justify-center group-hover:bg-white-50/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-white-50 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="font-semibold text-lg">{info.title}</h3>
                    <p className="text-sm text-white-50/70 group-hover:text-white-50 transition-colors">
                      {info.value}
                    </p>
                  </a>
                );
              })}
            </div>

            {/* Call to Action Card */}
            <div className="card-border rounded-xl p-8 bg-gradient-to-br from-white-50/10 to-transparent border-white-50/20">
              <h3 className="text-2xl font-bold mb-4">Let's Build Something Amazing</h3>
              <p className="text-white-50/70 mb-6">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-white-50/10 text-sm border border-white-50/20 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Quick Response
                </span>
                <span className="px-4 py-2 rounded-full bg-white-50/10 text-sm border border-white-50/20 flex items-center gap-2">
                  <Handshake className="w-4 h-4" />
                  Collaboration Ready
                </span>
                <span className="px-4 py-2 rounded-full bg-white-50/10 text-sm border border-white-50/20 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Open to Ideas
                </span>
              </div>
            </div>

            {/* Availability Status */}
            <div className="card-border rounded-xl p-6 flex items-center gap-4">
              <div className="relative">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div className="w-4 h-4 bg-green-500 rounded-full absolute top-0 left-0 animate-ping"></div>
              </div>
              <div>
                <h3 className="font-semibold">Currently Available</h3>
                <p className="text-sm text-white-50/70">Open for freelance projects & collaborations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
