import { ReactNode } from 'react';

// Product types
export interface ProductSpecs {
    thickness: string;
    width: string;
    length: string;
    shape: string;
    moistureContent: string;
    woodTypes: string[];
    calorificValue: string;
    capacity: string;
    unit: string;
    suppliers: string[];
}

export interface Product {
    id: string;
    name: string;
    description: string;
    specs: ProductSpecs;
    images: string[];
    featured?: boolean;
}

// Contact form types
export interface ContactFormData {
    name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
}

export interface QuoteFormData extends ContactFormData {
    productId?: string;
    quantity?: string;
    specifications?: string;
}

// Company info types
export interface CompanyLocation {
    type: 'factory' | 'office';
    name: string;
    address: string;
    city: string;
    province: string;
    provincedetails: string;
    provincedetailsSec: string;
}

export interface ContactInfo {
    whatsapp: string;
    whatsappName: string;
    locations: CompanyLocation[];
}

// Sustainability features
export interface SustainabilityFeature {
    id: string;
    title: string;
    description: string;
    icon: string;
    benefits: string[];
}

// Navigation types
export interface NavItem {
    label: string;
    href: string;
    subItems?: NavItem[];
}

// Animation types
export interface AnimationConfig {
    initial: object;
    animate: object;
    exit?: object;
    transition?: object;
}

// Modal types
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

// API Response types
export interface APIResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
}

export interface FormSubmissionResponse extends APIResponse {
    submissionId?: string;
}