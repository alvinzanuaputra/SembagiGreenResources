import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@/components': resolve(__dirname, 'src/components'),
            '@/types': resolve(__dirname, 'src/types'),
            '@/utils': resolve(__dirname, 'src/utils'),
            '@/hooks': resolve(__dirname, 'src/hooks'),
        },
    },
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info'],
            },
        },
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        if (id.includes('react') || id.includes('react-dom')) {
                            return 'react-vendor';
                        }
                        if (id.includes('framer-motion')) {
                            return 'motion';
                        }
                        if (id.includes('react-hook-form') || id.includes('zod')) {
                            return 'forms';
                        }
                        if (id.includes('react-helmet')) {
                            return 'helmet';
                        }
                        return 'vendor';
                    }
                },
                assetFileNames: (assetInfo) => {
                    const info = assetInfo.name?.split('.') || [];
                    const ext = info[info.length - 1];
                    if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif)$/i.test(assetInfo.name || '')) {
                        return `assets/images/[name]-[hash][extname]`;
                    }
                    if (ext === 'css') {
                        return `assets/css/[name]-[hash][extname]`;
                    }
                    return `assets/[name]-[hash][extname]`;
                },
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
            },
        },
        chunkSizeWarningLimit: 500,
        assetsInlineLimit: 4096,
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'framer-motion'],
    },
})