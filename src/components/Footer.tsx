import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Leaf, Globe, Award, X, Send } from "lucide-react";
import { CaretDownIcon, SmileyIcon, WhatsappLogo } from "@phosphor-icons/react";
import { companyInfo, contactInfo, navItems } from "../utils/constants";
import { useState } from "react";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Popular emojis for quick access
  const popularEmojis = [
    "😊",
    "😂",
    "😍",
    "🥰",
    "😘",
    "😉",
    "😎",
    "😭",
    "😅",
    "😏",
    "👍",
    "👎",
    "👏",
    "🙌",
    "👋",
    "✋",
    "🤝",
    "🙏",
    "💪",
    "✨",
    "❤️",
    "💕",
    "💖",
    "💯",
    "🔥",
    "⭐",
    "🎉",
    "🎊",
    "🌟",
    "💫",
    "🌸",
    "🌺",
    "🌻",
    "🌹",
    "🌷",
    "🌱",
    "🌿",
    "🍀",
    "🌳",
    "🌲",
    "📞",
    "💬",
    "📱",
    "💻",
    "📧",
    "📩",
    "📋",
    "📝",
    "💼",
    "🏢",
  ];

  const handleWhatsAppToggle = () => {
    setIsWhatsAppOpen(!isWhatsAppOpen);
    setShowEmojiPicker(false); // Close emoji picker when closing chat
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const whatsappUrl = `https://wa.me/6282150617811?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");
      setMessage("");
      setIsWhatsAppOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href) as HTMLElement;
      if (element) {
        const navbarHeight = 80; // Account for fixed navbar
        const elementPosition = element.offsetTop - navbarHeight;

        const smoothScrollTo = (targetPosition: number) => {
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          const duration = 1000;
          let startTime: number | null = null;

          const easeInOutCubic = (t: number): number => {
            return t < 0.5
              ? 4 * t * t * t
              : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
          };

          const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutCubic(timeElapsed / duration);
            window.scrollTo(0, startPosition + distance * run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
          };

          requestAnimationFrame(animation);
        };

        // Use custom smooth scroll for better effect
        smoothScrollTo(elementPosition);
      }
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-gray-900 text-white ${className}`}>
      {/* Main Footer Content */}
      <div className="container-responsive py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="text-left lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Logo & Brand */}
              <div className="flex items-center space-x-3">
                <img
                  src="/assets/images/13-logo-navbar.png"
                  alt="Sembagi Green Resources"
                  className="h-10 w-auto"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {companyInfo.brandName}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Go Green with Renewable Energy
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed text-sm lg:text-md">
                {companyInfo.description}
              </p>

              {/* Key Features */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-accent-200">
                  <Leaf className="w-4 h-4" />
                  <span className="text-sm">100% Berkelanjutan</span>
                </div>
                <div className="flex items-center space-x-2 text-accent-200">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">Bersertifikat</span>
                </div>
                <div className="flex items-center space-x-2 text-accent-200">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">Standar Internasional</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-left"
          >
            <h4 className="text-lg font-semibold mb-6">Menu</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <motion.button
                    onClick={() => handleNavClick(item.href)}
                    whileHover={{ scale: 0.95, x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-300 hover:text-accent-200 transition-all duration-200 text-sm text-left"
                  >
                    {item.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-left text-lg font-semibold mb-6">Kontak</h4>
            <div className="text-left space-y-4">
              {/* WhatsApp */}
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <div className="">
                  <a
                    href={`https://wa.me/6282150617811?text=Halo, saya tertarik dengan produk woodchip Sembagi Green Resources`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                  >
                    {contactInfo.whatsapp}
                  </a>
                  <p className="text-gray-400 text-xs">
                    ({contactInfo.whatsappName})
                  </p>
                </div>
              </div>

              {/* Locations */}
              {contactInfo.locations.map((location, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-primary-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm font-medium">
                      {location.name}
                    </p>
                    <p className="text-gray-400 text-xs">
                      <span>{location.provincedetails}</span>{" "}
                      <span>{location.provincedetailsSec}</span> {location.city}
                      , {location.province}
                      <span className="mx-1"> </span>
                    </p>
                  </div>
                </div>
              ))}

              {/* Email placeholder */}
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0"/>
                <div>
                  <a
                    href="https://mail.google.com/mail/u/0/?tf=cm&fs=1&to=sembagigreen@gmail.com"
                    target="_blank"
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    sembagigreen@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-responsive py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm text-center md:text-left"
            >
              <p>
                © {currentYear} {companyInfo.name}. Hak cipta dilindungi.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* WhatsApp Chat Widget */}
      <div className="fixed bottom-6 right-4 z-50">
        {/* Chat Widget */}
        <AnimatePresence>
          {isWhatsAppOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute bottom-14 right-0 w-80 bg-white rounded-lg shadow-xl  overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#128c7e] text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <WhatsappLogo className="w-6 h-6 text-[#128c7e]" />
                    </div>
                    <p className="font-medium text-sm">
                      Sembagi Green Resources
                    </p>
                  </div>
                  <button
                    onClick={handleWhatsAppToggle}
                    className="text-white hover:text-green-100 transition-colors"
                  >
                    <CaretDownIcon size={20} />
                  </button>
                </div>
              </div>

              {/* Chat Area with WhatsApp Background */}
              <div
                className="p-4 min-h-[250px] max-h-80 overflow-y-auto relative"
                style={{
                  backgroundImage: `url("/assets/images/12-whatsappbg.png")`,
                  backgroundColor: "#e5ddd9",
                }}
              >
                <div className="space-y-3 relative z-10">
                  {/* Welcome Message */}
                  <div className="flex justify-start">
                    <div className="text-left bg-white p-3 rounded-lg max-w-[85%] shadow-sm">
                      <p className="text-xs text-gray-800">
                        Halo! 👋 Selamat datang di Sembagi Green Resources.
                      </p>
                      <p className="text-xs text-gray-800 mt-2">
                        Kami adalah penyedia woodchip berkualitas tinggi untuk
                        kebutuhan biomassa Anda. Ada yang bisa kami bantu? 😊
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[8px] text-gray-500">
                          Tim Support
                        </span>
                        <span className="text-[8px] text-gray-400">11:40</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="p-3 bg-[#f0f0f0] border-t border-gray-200 relative">
                {/* Emoji Picker */}
                <AnimatePresence>
                  {showEmojiPicker && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full right-0 mb-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-20"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-sm font-medium text-gray-700">
                          Pilih Emoji
                        </h4>
                        <button
                          onClick={() => setShowEmojiPicker(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-10 gap-2 max-h-48 overflow-y-auto">
                        {popularEmojis.map((emoji, index) => (
                          <button
                            key={index}
                            onClick={() => handleEmojiSelect(emoji)}
                            className="w-8 h-8 text-lg hover:bg-gray-100 rounded flex items-center justify-center transition-colors"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-end space-x-2">
                  <div className="flex-1 bg-white rounded-full border border-gray-300 flex items-center px-4 py-2 relative">
                    <button
                      onClick={toggleEmojiPicker}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <SmileyIcon size={22} />
                    </button>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ketik pesan..."
                      className="ml-2 flex-1 outline-none text-sm bg-transparent text-gray-500 placeholder:text-gray-500"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="py-1.5 px-3 bg-[#128c7e] text-white rounded-full hover:bg-[#0f7a6e] focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Send className="w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWhatsAppToggle}
          className="w-10 h-10 bg-[#13a191] text-white rounded-full shadow-xl hover:bg-[#10aa98] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center relative"
          aria-label="Chat via WhatsApp"
        >
          <AnimatePresence mode="wait">
            {!isWhatsAppOpen ? (
              <motion.div
                key="whatsapp"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex items-center justify-center"
              >
                <WhatsappLogo className="w-7 h-7" weight="fill" />
              </motion.div>
            ) : (
              <motion.div
                key="close"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notification Badge */}
          {!isWhatsAppOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
            >
              1
            </motion.div>
          )}
        </motion.button>
      </div>
    </footer>
  );
}
