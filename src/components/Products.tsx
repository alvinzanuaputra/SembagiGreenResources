import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { fadeInRight, fadeInUp, staggerContainer } from "../utils/constants";
import CategoryCard from "./CategoryCard";
import QuoteForm from "./QuoteForm";

// Data kategori produk woodchip
const categories = [
  {
    id: "premium-woodchip",
    title: "Premium Woodchip",
    description:
      "Woodchip premium berkualitas tinggi dengan kadar air terkontrol untuk kebutuhan industri besar. Diproduksi dari kayu keras pilihan dengan proses yang terjaga.",
    image: "/assets/images/2-gogreen.jpg",
  },
  {
    id: "industrial-biomass",
    title: "Industrial Biomass",
    description:
      "Biomassa industri dengan kalori tinggi dan konsistensi terjamin. Cocok untuk pembangkit listrik dan pabrik yang membutuhkan energi terbarukan berkelanjutan.",
    image: "/assets/images/4-gogreen.jpg",
  },
  {
    id: "sustainable-fuel",
    title: "Sustainable Fuel",
    description:
      "Bahan bakar berkelanjutan ramah lingkungan pengganti batubara. Mendukung program net-zero emission dengan kualitas pembakaran optimal dan emisi rendah.",
    image: "/assets/images/6-gogreen.jpg",
  },
];

interface ProductsProps {
  className?: string;
}

export default function Products({ className = "" }: ProductsProps) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Handle ESC key and disable scroll when modal is open
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isQuoteModalOpen) {
        setIsQuoteModalOpen(false);
        setSelectedCategory(null);
      }
    };

    if (isQuoteModalOpen) {
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
  }, [isQuoteModalOpen]);

  const handleLearnMore = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsQuoteModalOpen(true);
  };

  const closeModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <>
      <section
        id="products"
        className={`section-padding bg-white ${className}`}
      >
        <div className="container-responsive">
          {/* Section Header */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-amber-700 font-semibold text-lg mb-3"
            >
              Our Product
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-amber-800 mb-6"
            >
              Categories
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-md lg:text-large lg:text-center text-left text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Partner energi terbarukan yang menyediakan woodchips berkualitas,
              pasokan stabil, dan solusi keberlanjutan bagi industri yang ingin
              mengurangi emisi sekaligus menekan biaya energi.
            </motion.p>
            {/* <motion.button
            variants={fadeInUp}
            onClick={handleDownloadCatalog}
            className="btn btn-outline btn-lg group mb-12"
          >
            <Download className="w-5 h-5 mr-2" />
            <span>Download Katalog</span>
          </motion.button> */}
            <motion.div
              variants={fadeInRight}
              className="text-left overflow-x-auto mb-12"
            >
              <table className="min-w-full table-auto border-collapse text-[13px] lg:text-sm">
                <tbody>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left font-medium">
                      Fungsi Produk
                    </th>
                    <td className="px-4 py-2">
                      Biomassa – Energi Terbarukan pengganti Fossil Fuel
                      (Batubara)
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left font-medium">
                      Ukuran Produk
                    </th>
                    <td className="px-4 py-2">
                      Tebal 2-10 mm, Lebar 50-100mm, Panjang Random
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left font-medium">
                      Bentuk Produk
                    </th>
                    <td className="px-4 py-2">
                      Pipih dengan ukuran campur sesuai permintaan pembeli
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left font-medium">
                      Kadar Air Produk
                    </th>
                    <td className="px-4 py-2">
                      25-45% sesuai dengan permintaan pembeli
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left font-medium">
                      Jenis Kayu
                    </th>
                    <td className="px-4 py-2">
                      Campuran Kayu Keras Kelas II seperti Kayu Rimba Campur,
                      Kayu Meranti, Kayu Seru, dll.
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left font-medium">
                      Area Terbang
                    </th>
                    <td className="px-4 py-2">
                      Jawa Barat, Jawa Tengah, Jawa Timur, dan Kalimantan
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left font-medium">
                      Kadar Kalori
                    </th>
                    <td className="px-4 py-2">
                      2.300 Kcal – 4.300 Kcal sesuai kebutuhan
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left font-medium">
                      Satuan Jual
                    </th>
                    <td className="px-4 py-2">Tonase (Ton)</td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left font-medium">
                      Minimal Kapasitas
                    </th>
                    <td className="px-4 py-2">
                      10.000+ Ton per bulan dengan ketersediaan bahan yang
                      stabil dan terjamin
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left font-medium">
                      Penyuplai Bahan
                    </th>
                    <td className="px-4 py-2">
                      Petani dan Limbah Kayu Industri
                    </td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
          </motion.div>

          {/* Video & Production Showcase */}
          <motion.div variants={fadeInUp} className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-amber-800 mb-4">
                Proses Produksi & Fasilitas
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Dokumentasi proses produksi modern dan hasil berkualitas tinggi
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Video Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden shadow-xl"
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-120 lg:h-80 object-cover"
                  poster="/assets/images/8-gogreen.jpg"
                >
                  <source
                    src="/assets/images/15.gogreen.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg">
                  <h4 className="font-semibold">Video Produk</h4>
                  <p className="text-sm">Hasil produk woodchip</p>
                </div>
              </motion.div>

              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src="/assets/images/9-gogreen.jpg"
                    alt="Bahan Baku Berkualitas"
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 text-white text-xs">
                    <p className="font-medium">Bahan Baku Premium</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src="/assets/images/16-gogreen.jpg"
                    alt="Hasil Produksi"
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 text-white text-xs">
                    <p className="font-medium">Hasil Berkualitas</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src="/assets/images/8-gogreen.jpg"
                    alt="Teknologi Modern"
                    className="w-full h-36 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 text-white text-xs">
                    <p className="font-medium">Teknologi Modern</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src="/assets/images/1-logo-navbar.png"
                    alt="Sertifikat Terdaftar"
                    className="w-full h-36 object-cover group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 text-white text-xs">
                    <p className="font-medium">Logo Perusahaan</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Categories Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <CategoryCard
                  title={category.title}
                  description={category.description}
                  image={category.image}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 lg:p-12 text-white">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Butuh Spesifikasi Khusus?
              </h3>
              <p className="text-md lg:text-lg text-left mb-8 opacity-90">
                Kami dapat menyesuaikan produk woodchip sesuai kebutuhan
                spesifik industri Anda. Hubungi tim kami untuk konsultasi dan
                penawaran khusus.
              </p>
              <button
                onClick={() => handleLearnMore("custom")}
                className="btn bg-white text-primary-600 hover:bg-gray-100 btn-lg group"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                <span>Konsultasi Gratis</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote Modal - Full Screen Overlay */}
      {isQuoteModalOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black bg-opacity-80 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Request Penawaran
              </h2>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <QuoteForm productId={selectedCategory} onClose={closeModal} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
