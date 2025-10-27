import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Linkedin, Github, Twitter, Zap, Handshake, Lightbulb } from "lucide-react";

import TitleHeader from "../components/TitleHeader";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
      setForm({ name: "", email: "", message: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@vanshahuja.com",
      link: "mailto:hello@vanshahuja.com"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "Connect with me",
      link: "https://linkedin.com/in/vanshahuja"
    },
    {
      icon: Github,
      title: "GitHub",
      value: "View my work",
      link: "https://github.com/vanshahuja"
    },
    {
      icon: Twitter,
      title: "Twitter",
      value: "Follow me",
      link: "https://twitter.com/vanshahuja"
    }
  ];

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch – Let's Connect"
          sub="💬 Have questions or ideas? Let's talk! 🚀"
        />
        
        <div className="grid-12-cols mt-16 gap-8">
          {/* Contact Form */}
          <div className="xl:col-span-6 lg:col-span-12">
            <div className="flex-center card-border rounded-xl p-10 flex-col gap-6 h-full">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
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
                    className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-700 focus:border-[#cd7c2e] focus:outline-none transition-colors"
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
                    className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-700 focus:border-[#cd7c2e] focus:outline-none transition-colors"
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
                    className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-700 focus:border-[#cd7c2e] focus:outline-none transition-colors resize-none"
                    required
                  />
                </div>

                {success && (
                  <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg">
                    ✅ Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                <button type="submit" disabled={loading} className="w-full">
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>

              {/* Download CV Button */}
              <a
                href="/files/Vansh_Ahuja_CV.pdf"
                download="Vansh_Ahuja_CV.pdf"
                className="w-full"
              >
                <div className="cta-button group">
                  <div className="bg-circle" />
                  <p className="text">Download My CV</p>
                  <div className="arrow-wrapper">
                    <img src="/images/arrow-down.svg" alt="arrow" />
                  </div>
                </div>
              </a>
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
                    className="card-border rounded-xl p-6 hover:border-[#cd7c2e] transition-all duration-300 hover:scale-105 flex flex-col items-center text-center gap-3 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#cd7c2e]/10 flex items-center justify-center group-hover:bg-[#cd7c2e]/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-[#cd7c2e] group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="font-semibold text-lg">{info.title}</h3>
                    <p className="text-sm text-gray-400 group-hover:text-[#cd7c2e] transition-colors">
                      {info.value}
                    </p>
                  </a>
                );
              })}
            </div>

            {/* Call to Action Card */}
            <div className="card-border rounded-xl p-8 bg-gradient-to-br from-[#cd7c2e]/10 to-transparent border-[#cd7c2e]/30">
              <h3 className="text-2xl font-bold mb-4">Let's Build Something Amazing</h3>
              <p className="text-gray-400 mb-6">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-[#cd7c2e]/20 text-sm border border-[#cd7c2e]/30 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Quick Response
                </span>
                <span className="px-4 py-2 rounded-full bg-[#cd7c2e]/20 text-sm border border-[#cd7c2e]/30 flex items-center gap-2">
                  <Handshake className="w-4 h-4" />
                  Collaboration Ready
                </span>
                <span className="px-4 py-2 rounded-full bg-[#cd7c2e]/20 text-sm border border-[#cd7c2e]/30 flex items-center gap-2">
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
                <h4 className="font-semibold">Currently Available</h4>
                <p className="text-sm text-gray-400">Open for freelance projects & collaborations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;