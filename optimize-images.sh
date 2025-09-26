# Image Optimization Script
# Run ini untuk compress semua gambar before deployment

echo "🖼️  Optimizing images for better performance..."

# Install sharp if not exists
if ! command -v sharp &> /dev/null; then
    echo "Installing sharp for image optimization..."
    npm install -g sharp-cli
fi

# Convert and compress images
echo "Converting JPG to WebP..."
find public/assets/images -name "*.jpg" -exec sh -c 'sharp resize 1200 --webp --quality 80 "$1" --output "${1%.*}.webp"' _ {} \;

echo "Converting PNG to WebP..."
find public/assets/images -name "*.png" -exec sh -c 'sharp resize 800 --webp --quality 90 "$1" --output "${1%.*}.webp"' _ {} \;

echo "Compressing original JPG files..."
find public/assets/images -name "*.jpg" -exec sharp resize 1200 --jpeg --quality 85 {} --output {} \;

echo "Compressing original PNG files..."
find public/assets/images -name "*.png" -exec sharp resize 800 --png --quality 90 {} --output {} \;

echo "✅ Image optimization complete!"

# Optional: Generate AVIF format for even better compression
echo "Generating AVIF format for modern browsers..."
find public/assets/images -name "*.jpg" -exec sh -c 'sharp resize 1200 --avif --quality 70 "$1" --output "${1%.*}.avif"' _ {} \;
find public/assets/images -name "*.png" -exec sh -c 'sharp resize 800 --avif --quality 80 "$1" --output "${1%.*}.avif"' _ {} \;

echo "🚀 All images optimized for web performance!"