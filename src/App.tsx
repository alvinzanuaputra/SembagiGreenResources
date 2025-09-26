import React, { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";

// Import SEO components
import SEO from "./components/SEO";
import StructuredData from "./components/StructuredData";

// Lazy load components for better performance
const Navbar = lazy(() => import("./components/Navbar"));
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Products = lazy(() => import("./components/Products"));
const Sustainability = lazy(() => import("./components/Sustainability"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

// Loading component
const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <div className="App">
        <SEO />
        <StructuredData />

        {/* Navigation */}
        <Suspense fallback={<LoadingSpinner />}>
          <Navbar />
        </Suspense>

        {/* Hero Section */}
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>

        {/* About Section */}
        <Suspense fallback={<LoadingSpinner />}>
          <About />
        </Suspense>

        {/* Products Section */}
        <Suspense fallback={<LoadingSpinner />}>
          <Products />
        </Suspense>

        {/* Sustainability Section */}
        <Suspense fallback={<LoadingSpinner />}>
          <Sustainability />
        </Suspense>

        {/* Contact Section */}
        <Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </Suspense>

        {/* Footer */}
        <Suspense fallback={<LoadingSpinner />}>
          <Footer />
        </Suspense>
      </div>
    </HelmetProvider>
  );
};

export default App;
