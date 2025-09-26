import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "../utils/constants";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href) as HTMLElement;
      if (element) {
        const navbarHeight = 0; // Account for fixed navbar
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ease-in-out bg-primary-50 ${
        isNavbarVisible ? "translate-y-0" : "-translate-y-full"
      } ${className}`}
    >
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <img
              src="/assets/images/14-logo-navbar.png"
              alt="Sembagi Green Resources"
              className="h-12 lg:h-14 w-auto"
              // priority={true}
            />
            <div className="text-left">
              <h1 className="text-sm lg:text-xl font-bold text-primary-600">
                Sembagi Green Resources
              </h1>
              <p className="text-xs text-gray-600 hidden lg:block">
                Go Green with Renewable Energy
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 0.95 }}
                transition={{ delay: index * 0.1, duration: 0.2 }}
                className="relative text-gray-700 hover:text-primary-600 font-medium transition-all duration-200 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Contact Info & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleMobileMenu}
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden p-2 text-gray-700 hover:text-primary-600 transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="container-responsive py-4">
              <div className="flex flex-col space-y-4">
                {/* Navigation Links */}
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 0.95, x: 10 }}
                    transition={{ delay: index * 0.1, duration: 0.2 }}
                    className="text-gray-700 hover:text-primary-600 font-medium transition-all duration-200 py-2"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
