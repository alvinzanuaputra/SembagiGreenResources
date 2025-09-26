import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, MapPin, Phone, Clock } from "lucide-react";
import { contactInfo, fadeInUp, staggerContainer } from "../utils/constants";

// Form validation schema
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  company: z
    .string()
    .min(2, "Nama perusahaan minimal 2 karakter")
    .max(100, "Nama perusahaan maksimal 100 karakter"),
  email: z
    .string()
    .email("Email tidak valid")
    .max(255, "Email maksimal 255 karakter"),
  phone: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit")
    .max(15, "Nomor telepon maksimal 15 digit"),
  message: z
    .string()
    .min(10, "Pesan minimal 10 karakter")
    .max(1000, "Pesan maksimal 1000 karakter"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactProps {
  className?: string;
}

export default function Contact({ className = "" }: ContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Send via WhatsApp Business
      const whatsappNumber = "6282150617811"; // Same number as QuoteForm

      // Format message untuk WhatsApp tanpa emoji
      const whatsappMessage = `*PESAN KONTAK - GO GREEN*

*INFORMASI KONTAK:*
Nama: ${data.name}
Perusahaan: ${data.company}
Email: ${data.email}
Telepon: ${data.phone}

*PESAN:*
${data.message}

Pesan otomatis dari website Go Green`;

      // Encode message untuk WhatsApp URL
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // Buat WhatsApp link
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      console.log("Opening WhatsApp with contact message...");

      try {
        // Buka WhatsApp di tab baru
        const whatsappWindow = window.open(whatsappUrl, "_blank");

        // Check jika popup blocked
        if (
          !whatsappWindow ||
          whatsappWindow.closed ||
          typeof whatsappWindow.closed == "undefined"
        ) {
          throw new Error("Popup blocked");
        }

        setIsSubmitted(true);
      } catch (error) {
        console.error("Failed to open WhatsApp:", error);

        // Fallback: copy ke clipboard dan show alert dengan link
        if (navigator.clipboard) {
          navigator.clipboard
            .writeText(whatsappMessage)
            .then(() => {
              alert(`WhatsApp tidak dapat dibuka otomatis. 

Pesan telah disalin ke clipboard!

Silakan:
1. Buka WhatsApp di HP/Desktop
2. Chat ke nomor: +${whatsappNumber}
3. Paste pesan (Ctrl+V)

Atau klik link ini:
${whatsappUrl}`);
            })
            .catch(() => {
              showFallbackMessage();
            });
        } else {
          showFallbackMessage();
        }

        function showFallbackMessage() {
          alert(`Silakan kirim pesan berikut via WhatsApp ke nomor: +${whatsappNumber}

${whatsappMessage}

Link WhatsApp: ${whatsappUrl}`);
        }

        setIsSubmitted(true);
      }

      // Reset form after showing success
      setTimeout(() => {
        reset();
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message =
      "*INQUIRY - GO GREEN*\n\nHalo, saya tertarik untuk mengetahui lebih lanjut tentang produk woodchip Sembagi Green Resources.\n\nPesan otomatis dari website Go Green";
    const whatsappUrl = `https://wa.me/6282150617811?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="contact" className={`section-padding bg-gray-50 ${className}`}>
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
            className="inline-block text-primary-600 font-semibold text-lg mb-3"
          >
            Hubungi Kami
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="heading-secondary text-gray-900 mb-6"
          >
            Mari Diskusikan Kebutuhan Anda
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-md lg:text-large text-left lg:text-center text-gray-600 max-w-3xl mx-auto"
          >
            Tim ahli kami siap membantu Anda menemukan solusi woodchip yang
            tepat untuk kebutuhan energi terbarukan perusahaan Anda.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Informasi Kontak
              </h3>

              {/* WhatsApp */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 cursor-pointer"
                onClick={handleWhatsAppClick}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      WhatsApp
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">
                      {contactInfo.whatsapp}
                    </p>
                    <p className="text-green-600 text-sm font-medium">
                      Contact: {contactInfo.whatsappName}
                    </p>
                  </div>
                </div>
              </motion.div>
              {/* Location (Single) */}
              <div className="bg-white p-6 mb-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-100">
                    <MapPin className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {contactInfo.locations[0].name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {contactInfo.locations[0].address}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {contactInfo.locations[0].city},{" "}
                      {contactInfo.locations[0].province}
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Jam Operasional
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Senin - Jumat: 08:00 - 17:00 WIB</div>
                      <div>Sabtu: 08:00 - 12:00 WIB</div>
                      <div>Minggu: Tutup</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 text-left"
          >
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Kirim Pesan
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Pesan Terkirim!
                  </h4>
                  <p className="text-gray-600">
                    Terima kasih telah menghubungi kami. Tim kami akan segera
                    merespons pesan Anda.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="form-label">Nama Lengkap *</label>
                      <input
                        {...register("name")}
                        type="text"
                        className={`form-input ${
                          errors.name ? "border-red-500" : ""
                        }`}
                        placeholder="Masukkan nama lengkap"
                      />
                      {errors.name && (
                        <p className="form-error">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Company */}
                    <div>
                      <label className="form-label">Nama Perusahaan *</label>
                      <input
                        {...register("company")}
                        type="text"
                        className={`form-input ${
                          errors.company ? "border-red-500" : ""
                        }`}
                        placeholder="Masukkan nama perusahaan"
                      />
                      {errors.company && (
                        <p className="form-error">{errors.company.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="form-label">Email *</label>
                      <input
                        {...register("email")}
                        type="email"
                        className={`form-input ${
                          errors.email ? "border-red-500" : ""
                        }`}
                        placeholder="nama@perusahaan.com"
                      />
                      {errors.email && (
                        <p className="form-error">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="form-label">Nomor Telepon *</label>
                      <input
                        {...register("phone")}
                        type="tel"
                        className={`form-input ${
                          errors.phone ? "border-red-500" : ""
                        }`}
                        placeholder="0812-3456-7890"
                      />
                      {errors.phone && (
                        <p className="form-error">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="form-label">Pesan *</label>
                    <textarea
                      {...register("message")}
                      className={`form-textarea h-32 ${
                        errors.message ? "border-red-500" : ""
                      }`}
                      placeholder="Ceritakan kebutuhan Anda atau pertanyaan tentang produk woodchip kami..."
                    />
                    {errors.message && (
                      <p className="form-error">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn btn-primary btn-lg group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Kirim Pesan
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
