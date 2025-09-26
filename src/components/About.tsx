import { motion } from "framer-motion";
import { CheckCircle, Target, Eye, Award, X } from "lucide-react";
import { companyInfo, fadeInUp, staggerContainer } from "../utils/constants";
import { useState, useEffect } from "react";

interface AboutProps {
  className?: string;
}

export default function About({ className = "" }: AboutProps) {
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);

  // Handle ESC key and disable scroll when modal is open
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isCertificateModalOpen) {
        setIsCertificateModalOpen(false);
      }
    };

    if (isCertificateModalOpen) {
      document.addEventListener("keydown", handleEsc);

      // Store current scroll position
      const scrollY = window.scrollY;

      // Disable scroll completely
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      // Store scroll position for restoration
      document.body.setAttribute("data-scroll-y", scrollY.toString());
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);

      if (document.body.hasAttribute("data-scroll-y")) {
        const scrollY = parseInt(
          document.body.getAttribute("data-scroll-y") || "0"
        );

        // Re-enable scroll
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";

        // Restore scroll position
        window.scrollTo(0, scrollY);
        document.body.removeAttribute("data-scroll-y");
      }
    };
  }, [isCertificateModalOpen]);

  return (
    <>
      <section id="about" className={`section-padding bg-gray-50 ${className}`}>
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              {/* Section Header */}
              <div>
                <motion.span
                  variants={fadeInUp}
                  className="inline-block text-primary-600 font-semibold text-lg mb-3"
                >
                  Tentang Kami
                </motion.span>
                <motion.h2
                  variants={fadeInUp}
                  className="heading-secondary text-gray-900 mb-6"
                >
                  {companyInfo.brandName}
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-sm lg:text-large text-gray-600 leading-relaxed text-left"
                >
                  {companyInfo.description}
                </motion.p>
              </div>

              {/* Mission & Vision */}
              <motion.div variants={fadeInUp} className="space-y-6">
                <div className="text-left text-sm lg:text-large bg-white p-6 rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Misi Kami
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {companyInfo.mission}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-left bg-white p-6 rounded-xl shadow-sm text-sm lg:text-large hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Eye className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Visi Kami
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {companyInfo.vision}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Company Values */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <h3 className="text-xl text-left font-semibold text-gray-900">
                  Nilai-Nilai Perusahaan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {companyInfo.values.map((value, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div
                variants={fadeInUp}
                className="text-left bg-white p-6 rounded-xl shadow-sm text-sm lg:text-large hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => setIsCertificateModalOpen(true)}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Sertifikasi & Standar
                    </h3>
                    <ul className="space-y-2">
                      {companyInfo.certifications.map((cert, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                          <span className="text-gray-600">{cert}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 text-xs text-primary-600 font-medium">
                      Klik untuk melihat sertifikat →
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Images and Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Main Image */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/assets/images/8-gogreen.jpg"
                    alt="Fasilitas Produksi Modern Sembagi Green Resources"
                    className="w-full h-80 lg:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-transparent"></div>
                </div>

                {/* Floating Stats Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-1">
                      10.000+
                    </div>
                    <div className="text-sm text-gray-600">Ton/Bulan</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Kapasitas Produksi
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 pt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="text-2xl font-bold text-primary-600 mb-2">
                    Lokasi
                  </div>
                  <div className="text-sm text-gray-600">Pabrik</div>
                  <div className="text-xs text-gray-500 mt-1">Jepara</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="text-2xl font-bold text-primary-600 mb-2">
                    4300
                  </div>
                  <div className="text-sm text-gray-600">Max Kcal</div>
                  <div className="text-xs text-gray-500 mt-1">Nilai Kalori</div>
                </motion.div>
              </div>

              {/* Secondary Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="relative rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src="/assets/images/16-gogreen.jpg"
                  alt="Bahan Baku Premium Woodchip"
                  className="w-full h-60 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-lg font-semibold">Kualitas Premium</div>
                  <div className="text-sm opacity-90">
                    Standar Internasional
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certificate Popup - Full Screen Overlay */}
      {isCertificateModalOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black bg-opacity-80 flex items-center justify-center p-4"
          onClick={() => setIsCertificateModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-lg shadow-xl max-h-[95vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsCertificateModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Certificate Image - Original Size */}
            <img
              src="/assets/images/7-certificate.jpg"
              alt="Sertifikat Sembagi Green Resources"
              className="max-h-[90vh] lg:max-h-[90vh] rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
