import { motion } from "framer-motion";
import {
  Leaf,
  Globe,
  Users,
  Recycle,
  ArrowRight,
  TreePine,
  Factory,
  Lightbulb,
} from "lucide-react";
import {
  sustainabilityFeatures,
  fadeInUp,
  staggerContainer,
} from "../utils/constants";

interface SustainabilityProps {
  className?: string;
}

// Icon mapping
const iconMap = {
  leaf: Leaf,
  globe: Globe,
  users: Users,
  recycle: Recycle,
  tree: TreePine,
  factory: Factory,
  lightbulb: Lightbulb,
};

export default function Sustainability({
  className = "",
}: SustainabilityProps) {
  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href) as HTMLElement;
      if (element) {
        const navbarHeight = 0; // Account for fixed navbar - same as Navbar component
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

  return (
    <section
      id="sustainability"
      className={`section-padding bg-gradient-to-br from-primary-50 to-accent-50 ${className}`}
    >
      <div className="text-left container-responsive">
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
            Komitmen Keberlanjutan
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="heading-secondary text-gray-900 mb-6"
          >
            Berkontribusi untuk Masa Depan Berkelanjutan
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-md lg:text-large text-left lg:text-center text-gray-600 max-w-3xl mx-auto"
          >
            Melalui praktik bisnis yang bertanggung jawab, kami berkomitmen
            mendukung transisi energi terbarukan dan pembangunan berkelanjutan
            di Indonesia.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16"
        >
          {sustainabilityFeatures.map((feature) => {
            const IconComponent =
              iconMap[feature.icon as keyof typeof iconMap] || Leaf;

            return (
              <motion.div
                key={feature.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.03 }}
                className="card card-hover p-8 group"
              >
                <div className="flex items-start space-x-6">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors duration-300">
                    <IconComponent className="w-7 h-7 text-primary-600" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Benefits List */}
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li
                          key={benefitIndex}
                          className="flex items-start space-x-2 text-sm"
                        >
                          <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl mb-16"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Stat 1 */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2"
              >
                100%
              </motion.div>
              <div className="text-sm text-gray-600">
                <div className="font-medium">Legal Kayu</div>
                <div>Bersertifikat</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2"
              >
                50+
              </motion.div>
              <div className="text-sm text-gray-600">
                <div className="font-medium">Petani Mitra</div>
                <div>Lokal</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2"
              >
                80%
              </motion.div>
              <div className="text-sm text-gray-600">
                <div className="font-medium">Pengurangan</div>
                <div>Emisi CO₂</div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2"
              >
                95%
              </motion.div>
              <div className="text-sm text-gray-600">
                <div className="font-medium">Pemanfaatan</div>
                <div>Limbah Kayu</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-md lg:text-large text-left lg:text-centerbg-white rounded-2xl p-8 lg:p-12 shadow-xl mb-16"
        >
          <div className="text-center mb-12 gap-x-0">
            <h3 className="heading-tertiary text-gray-900 mb-4">
              Proses Produksi Berkelanjutan
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dari hutan hingga energi, setiap tahap dipantau untuk memastikan
              keberlanjutan
            </p>
          </div>

          <div className="lg:flex grid gap-8 gap-y-10">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TreePine className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Sumber Legal</h4>
              <p className="text-sm text-gray-600">
                Kayu dari hutan bersertifikat dan limbah industri
              </p>
            </motion.div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Factory className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Produksi</h4>
              <p className="text-sm text-gray-600">
                Pengolahan dengan teknologi ramah lingkungan
              </p>
            </motion.div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Energi Bersih
              </h4>
              <p className="text-sm text-gray-600">
                Woodchip untuk biomassa dan energi terbarukan
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Mari Bersama Membangun Masa Depan Berkelanjutan
            </h3>
            <p className="mb-8 opacity-90 max-w-2xl mx-auto text-md lg:text-large text-left lg:text-center">
              Bergabunglah dengan misi kami untuk menciptakan solusi energi yang
              ramah lingkungan dan mendukung ekonomi lokal melalui praktik
              bisnis yang bertanggung jawab.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => handleNavClick("#contact")}
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="btn bg-white text-primary-600 hover:bg-gray-100 btn-lg transition-all duration-200"
              >
                Hubungi Kami
              </motion.button>
              <motion.a
                href="/assets/doc/Katalog Woodchip.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 btn-lg transition-all duration-200"
              >
                Download Katalog
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
