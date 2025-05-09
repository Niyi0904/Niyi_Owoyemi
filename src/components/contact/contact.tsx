import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { useRef, useState } from "react";
import api from "../utils/api";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    err: unknown;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      message: messageRef.current?.value
    };

    try {
      const response = await api.post('/send-email', formData);
      console.log(response.data);
      setSubmitStatus({
        success: true,
        err: null,
        message: 'Message sent successfully!',
      });
      formRef.current?.reset();
    } catch (error: unknown) {
      setSubmitStatus({
        success: false,
        err: error,
        message: 'Failed to send message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-delugia italic mb-4">
            <span className="text-blue-500">Get</span> In Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Reach out and let&apos;s build something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  ref={nameRef}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  ref={emailRef}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  ref={messageRef}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Hello Niyi, I'd like to talk about..."
                  required
                ></textarea>
              </div>

              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-4 rounded-md ${
                    submitStatus.success
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full ${
                  isSubmitting
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white font-medium py-3 px-6 rounded-lg transition-colors`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </div>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FaEnvelope className="text-blue-500" />
                <span>Contact Information</span>
              </h3>
              <div className="space-y-4">
                <p className="flex items-start gap-4">
                  <svg className="w-5 h-5 mt-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">
                    <a href="mailto:owoyeminiyi2@gmail.com" className="hover:text-blue-500 transition-colors">
                      owoyeminiyi2@gmail.com
                    </a>
                  </span>
                </p>                
              </div>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold mb-6">Connect Online</h3>
              <div className="grid grid-cols-2 gap-4">
                <SocialLink 
                  icon={<FaGithub />}
                  platform="GitHub"
                  handle="@Niyi0904"
                  href="https://github.com/Niyi0904"
                  color="gray"
                />
                <SocialLink 
                  icon={<FaLinkedin />}
                  platform="LinkedIn"
                  handle="Owoyemi Niyi"
                  href="http://linkedin.com/in/owoyeminiyi"
                  color="blue"
                />
                <SocialLink 
                  icon={<FaTwitter />}
                  platform="Twitter"
                  handle="@nidav_dhev"
                  href="https://x.com/nidav_dhev?s=21"
                  color="sky"
                />
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl border border-blue-200 dark:border-blue-800"
            >
              <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2">Current Availability</h4>
              <p className="text-gray-600 dark:text-gray-300">
                I&apos;m currently available for freelance work and full-time opportunities. 
                Let&apos;s discuss how I can contribute to your project!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface SocialLinkProps {
  icon: React.ReactNode;
  platform: string;
  handle: string;
  href: string;
  color: string;
}

const SocialLink = ({ icon, platform, handle, href, color }: SocialLinkProps) => (
  <motion.a
    whileHover={{ y: -3 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-${color}-50 dark:hover:bg-${color}-900/10 transition-colors`}
  >
    <div className="flex items-center gap-3">
      <span className={`text-${color}-500 text-xl`}>{icon}</span>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{platform}</p>
        <p className="font-medium">{handle}</p>
      </div>
    </div>
  </motion.a>
);