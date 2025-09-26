import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, User, Package, Hash } from "lucide-react";
import { products } from "../utils/constants";

// Form validation schema
const quoteFormSchema = z.object({
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
  quantity: z.string().optional(),
  specifications: z.string().optional(),
  message: z
    .string()
    .min(10, "Pesan minimal 10 karakter")
    .max(1000, "Pesan maksimal 1000 karakter"),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

interface QuoteFormProps {
  productId?: string | null;
  onClose: () => void;
}

export default function QuoteForm({ productId, onClose }: QuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedProduct = productId
    ? products.find((p) => p.id === productId)
    : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
  });

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);

    try {
      // Send via WhatsApp Business
      const whatsappNumber = "6282150617811"; // Ganti dengan nomor WhatsApp bisnis GoGreen

      // Format message untuk WhatsApp tanpa emoji
      const whatsappMessage = `*PERMINTAAN QUOTATION - GO GREEN*

*INFORMASI KONTAK:*
Nama: ${data.name}
Perusahaan: ${data.company}
Email: ${data.email}
Telepon: ${data.phone}

*DETAIL PRODUK:*
Jenis: ${selectedProduct?.name || "Spesifikasi Khusus"}
Kuantitas: ${data.quantity || "Akan dibahas"}
Spesifikasi: ${data.specifications || "Sesuai standar"}

*PESAN:*
${data.message}

Mohon penawaran terbaik untuk kebutuhan kami. Terima kasih.

Pesan otomatis dari website Go Green`;

      // Encode message untuk WhatsApp URL
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // Buat WhatsApp link
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      console.log("Opening WhatsApp with message...");

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

✅ Pesan telah disalin ke clipboard!

Silakan:
1. Buka WhatsApp di HP/Desktop
2. Chat ke nomor: +${whatsappNumber}
3. Paste pesan (Ctrl+V)

Atau klik link ini:
${whatsappUrl}`);
            })
            .catch(() => {
              // Jika clipboard juga gagal
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

      // Reset form after a delay
      setTimeout(() => {
        reset();
        setIsSubmitted(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
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
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Email Client Dibuka!
        </h3>
        <p className="text-gray-600 mb-2">
          Email dengan detail permintaan Anda telah disiapkan.
        </p>
        <p className="text-sm text-gray-500">
          Silakan kirim email dari aplikasi email Anda untuk menyelesaikan
          request penawaran.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Selected Product Info */}
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary-50 border border-primary-200 rounded-lg p-4"
        >
          <div className="flex items-center space-x-3">
            <Package className="w-5 h-5 text-primary-600" />
            <div>
              <h4 className="font-semibold text-primary-900">
                {selectedProduct.name}
              </h4>
              <p className="text-sm text-primary-700">
                Produk yang dipilih untuk penawaran
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 flex items-center">
            <User className="w-4 h-4 mr-2" />
            Informasi Personal
          </h4>

          {/* Name */}
          <div>
            <label className="form-label">Nama Lengkap *</label>
            <input
              {...register("name")}
              type="text"
              className={`form-input ${errors.name ? "border-red-500" : ""}`}
              placeholder="Masukkan nama lengkap"
            />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>

          {/* Company */}
          <div>
            <label className="form-label">Nama Perusahaan *</label>
            <input
              {...register("company")}
              type="text"
              className={`form-input ${errors.company ? "border-red-500" : ""}`}
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
              className={`form-input ${errors.email ? "border-red-500" : ""}`}
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
              className={`form-input ${errors.phone ? "border-red-500" : ""}`}
              placeholder="0812-3456-7890"
            />
            {errors.phone && (
              <p className="form-error">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Product Requirements */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 flex items-center">
            <Hash className="w-4 h-4 mr-2" />
            Kebutuhan Produk
          </h4>

          {/* Quantity */}
          <div>
            <label className="form-label">Kuantitas yang Dibutuhkan</label>
            <input
              {...register("quantity")}
              type="text"
              className="form-input"
              placeholder="Contoh: 1000 ton/bulan"
            />
          </div>

          {/* Specifications */}
          <div>
            <label className="form-label">Spesifikasi Khusus</label>
            <textarea
              {...register("specifications")}
              className="form-textarea h-24"
              placeholder="Deskripsikan spesifikasi khusus yang dibutuhkan..."
            />
          </div>

          {/* Message */}
          <div>
            <label className="form-label">Pesan Tambahan *</label>
            <textarea
              {...register("message")}
              className={`form-textarea h-28 ${
                errors.message ? "border-red-500" : ""
              }`}
              placeholder="Jelaskan kebutuhan Anda secara detail atau pertanyaan lainnya..."
            />
            {errors.message && (
              <p className="form-error">{errors.message.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-secondary btn-lg order-2 sm:order-1"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary btn-lg group order-1 sm:order-2 flex-1"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Mengirim...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Kirim Permintaan Penawaran
            </>
          )}
        </button>
      </div>

      {/* Contact Info Footer */}
      <div className="bg-gray-50 rounded-lg p-4 text-center text-sm text-gray-600">
        <p>
          Atau hubungi langsung via WhatsApp:{" "}
          <a
            href="https://wa.me/6282150617811?text=Halo, saya ingin request penawaran woodchip"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            +62 821 5061 7811
          </a>
        </p>
      </div>
    </form>
  );
}
