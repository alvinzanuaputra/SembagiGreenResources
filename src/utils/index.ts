import { clsx, type ClassValue } from 'clsx';

/**
 * Combines class names using clsx
 */
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

/**
 * Formats phone number for WhatsApp link
 */
export function formatWhatsAppLink(phoneNumber: string, message?: string): string {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const waNumber = cleanNumber.startsWith('62') ? cleanNumber : `62${cleanNumber.substring(1)}`;
    const encodedMessage = message ? encodeURIComponent(message) : '';
    return `https://wa.me/${waNumber}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
}

/**
 * Validates Indonesian phone number
 */
export function validatePhoneNumber(phone: string): boolean {
    const cleanPhone = phone.replace(/\D/g, '');
    return /^(\+?62|0)[0-9]{9,12}$/.test(phone) || /^[0-9]{10,13}$/.test(cleanPhone);
}

/**
 * Validates email address
 */
export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


export function formatNumber(num: number): string {
    return new Intl.NumberFormat('id-ID').format(num);
}

export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: number;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = window.setTimeout(() => func(...args), wait);
    };
}

export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}


export function scrollToElement(elementId: string, offset = 80): void {
    const element = document.getElementById(elementId.replace('#', ''));
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
}

/**
 * Simple smooth scroll to element (fallback)
 */
export function scrollToElementSimple(elementId: string, offset = 80): void {
    const element = document.getElementById(elementId.replace('#', ''));
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: Element): boolean {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Generate random ID
 */
export function generateId(length = 8): string {
    return Math.random().toString(36).substring(2, length + 2);
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Sleep function for delays
 */
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}