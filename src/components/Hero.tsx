import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { fadeInUp } from "../utils/constants";
import { useState, useEffect } from "react";

interface HeroProps {
  className?: string;
}

export default function Hero({ className = "" }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/assets/images/2-gogreen.jpg",
      title: "Woodchip Berkualitas",
      subtitle: "Energi Terbarukan Terpercaya",
      description:
        "Produksi woodchip berkualitas tinggi dengan standar internasional untuk kebutuhan energi berkelanjutan.",
    },
    {
      image: "/assets/images/3-gogreen.jpg",
      title: "Praktik Berkelanjutan",
      subtitle: "Ramah Lingkungan",
      description:
        "Menggunakan bahan baku dengan legalitas terjamin dan praktik ramah lingkungan yang bertanggung jawab.",
    },
    {
      image: "/assets/images/4-gogreen.jpg",
      title: "Kapasitas Produksi",
      subtitle: "Skala Industrial",
      description:
        "Kapasitas produksi 1.000-5.000 ton per bulan untuk memenuhi kebutuhan industri besar.",
    },
    {
      image: "/assets/images/7-certificate.jpg",
      title: "Sertifikat Resmi",
      subtitle: "Hak Merek Dagang",
      description:
        "Memiliki sertifikat resmi dan hak merek dagang yang terdaftar di Kementerian Hukum dan HAM.",
    },
    {
      image: "/assets/images/6-gogreen.jpg",
      title: "Jaringan Distribusi",
      subtitle: "Suplai Stabil",
      description:
        "Jaringan petani lokal dan industri yang kuat untuk menjamin kontinuitas produksi dan distribusi.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    // Preload images
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      id="home"
      className={`relative h-screen flex items-center justify-center overflow-hidden lg:bg-gradient-to-br lg:from-green-600 lg:to-green-800 ${className}`}
    >
      {/* Mobile Background Image Slider */}
      <div className="absolute inset-0 lg:hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.image}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/70"></div>
          </motion.div>
        ))}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Leaves Animation */}
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1200),
              y:
                (typeof window !== "undefined" ? window.innerHeight : 800) +
                100,
            }}
            animate={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: -100,
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          >
            <Leaf
              className="w-4 h-4 md:w-6 md:h-6 text-green-300 opacity-20"
              style={{
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 text-white w-full h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-1 lg:order-1 text-center lg:text-left">
              <motion.h1
                {...fadeInUp}
                className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
                key={currentSlide}
              >
                <span className="block text-white">
                  {slides[currentSlide].title}
                </span>
                <span className="block text-yellow-300">
                  {slides[currentSlide].subtitle}
                </span>
              </motion.h1>
              <motion.p
                {...fadeInUp}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-base sm:text-lg md:text-xl mb-8 text-green-100 leading-relaxed"
                key={`desc-${currentSlide}`}
              >
                {slides[currentSlide].description}
              </motion.p>
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-yellow-300">
                  PT Sembagi Alam Sukses
                </h3>
                <p className="text-sm sm:text-base text-green-100">
                  Penyedia solusi biomassa berkelanjutan dengan standar
                  internasional untuk kebutuhan energi terbarukan Indonesia.
                </p>
              </motion.div>
            </div>

            {/* Right Side - Image Slider Box */}
            <div className="order-1 lg:order-2 hidden lg:flex justify-center lg:mt-20 mt-48 lg:ml-28">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="relative w-full max-w-md lg:max-w-lg"
              >
                {/* Image Container */}
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-white/20">
                  {/* Image Slider */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-200">
                    {slides.map((slide, index) => (
                      <motion.div
                        key={slide.image}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: index === currentSlide ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.8,
                          ease: "easeInOut",
                        }}
                      >
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover z-10 relative"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = "none";
                            // Show fallback
                            const fallback =
                              target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                        {/* Fallback placeholder */}
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white z-0"
                          style={{ display: "none" }}
                        >
                          <div className="text-center">
                            <Leaf className="w-12 h-12 mx-auto mb-2" />
                            <p className="text-sm font-medium">{slide.title}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Image Caption */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <motion.h4
                      className="text-white font-semibold text-sm sm:text-base"
                      key={`caption-${currentSlide}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {slides[currentSlide].title}
                    </motion.h4>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2"
      >
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-yellow-300 w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
          />
        ))}
      </motion.div>
    </section>
  );
}