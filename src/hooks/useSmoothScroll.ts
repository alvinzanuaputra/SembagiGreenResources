import { useCallback } from 'react';

/**
 * Custom hook for smooth scrolling functionality
 */
export const useSmoothScroll = () => {
  const scrollToSection = useCallback((sectionId: string, offset = 80) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      const navbarHeight = offset;
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

      smoothScrollTo(elementPosition);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return {
    scrollToSection,
    scrollToTop,
  };
};

export default useSmoothScroll;