import { motion } from "framer-motion";

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
}

export default function CategoryCard({
  title,
  description,
  image,
}: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Category Image */}
      <div className="relative h-64 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Category Content */}
      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold text-amber-800 mb-3">{title}</h3>
        <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
