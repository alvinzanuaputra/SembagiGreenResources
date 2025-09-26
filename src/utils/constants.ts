import { Product, SustainabilityFeature, ContactInfo, NavItem } from '../types';

// Navigation menu items
export const navItems: NavItem[] = [
    { label: 'Beranda', href: '#home' },
    { label: 'Tentang Kami', href: '#about' },
    { label: 'Produk', href: '#products' },
    { label: 'Keberlanjutan', href: '#sustainability' },
    { label: 'Kontak', href: '#contact' },
];

// Company contact information
export const contactInfo: ContactInfo = {
    whatsapp: '+62 821 5061 7811',
    whatsappName: 'WhatsApp Brevi',
    locations: [
        {
            type: 'factory',
            name: 'Kantor Woodchip',
            address: '',
            city: 'Kab. Purworejo',
            province: 'Jawa Tengah',
            provincedetails: '',
            provincedetailsSec: '',
        },
        {
            type: 'office',
            name: 'Lokasi Detail Kantor',
            address: 'Kab. Purworejo',
            city: 'Kab. Purworejo',
            province: 'Jawa Tengah',
            provincedetails: 'Jl. Tentara Pelajar Nomor 61, RT 001,',
            provincedetailsSec: 'RW 001, Pangenjurutengah,',
        },
    ],
};

// Product data based on PDF specifications
export const products: Product[] = [
    {
        id: 'woodchip-premium',
        name: 'Woodchip Premium',
        description: 'Woodchip berkualitas tinggi dengan spesifikasi terbaik untuk kebutuhan industri energi terbarukan dan biomassa.',
        specs: {
            thickness: '2–10 mm',
            width: '50–100 mm',
            length: 'Random',
            shape: 'Pipih',
            moistureContent: '25–45%',
            woodTypes: [
                'Kayu Rimba Campur Jawa Tengah',
                'Eucalyptus',
                'Meranti',
                'Jati',
                'Akasia'
            ],
            calorificValue: '2.300-4.300 Kcal',
            capacity: '10.000+ ton/bulan',
            unit: 'Tonase',
            suppliers: ['Petani Lokal', 'Limbah Kayu Industri'],
        },
        images: [
            '/assets/images/2-gogreen.jpg',
            '/assets/images/3-gogreen.jpg',
            '/assets/images/4-gogreen.jpg',
            '/assets/images/5-gogreen.jpg',
            '/assets/images/6-gogreen.jpg',
        ],
        featured: true,
    },
];

// Sustainability features
export const sustainabilityFeatures: SustainabilityFeature[] = [
    {
        id: 'renewable-energy',
        title: 'Energi Terbarukan',
        description: 'Woodchip sebagai sumber energi biomassa yang dapat diperbaharui, menggantikan bahan bakar fosil untuk mengurangi emisi karbon.',
        icon: 'leaf',
        benefits: [
            'Mengurangi ketergantungan pada bahan bakar fosil',
            'Emisi karbon yang lebih rendah',
            'Sumber energi yang dapat diperbaharui',
            'Mendukung target net zero emission',
        ],
    },
    {
        id: 'carbon-reduction',
        title: 'Pengurangan Karbon',
        description: 'Pemanfaatan biomassa woodchip membantu mengurangi jejak karbon industri dan mendukung program mitigasi perubahan iklim.',
        icon: 'globe',
        benefits: [
            'Berkontribusi pada pengurangan emisi CO2',
            'Mendukung program carbon offset',
            'Membantu pencapaian target iklim',
            'Teknologi ramah lingkungan',
        ],
    },
    {
        id: 'local-farmers',
        title: 'Dukungan Petani Lokal',
        description: 'Memberdayakan petani dan komunitas lokal melalui program kemitraan yang berkelanjutan dan adil.',
        icon: 'users',
        benefits: [
            'Peningkatan pendapatan petani lokal',
            'Pemberdayaan ekonomi masyarakat',
            'Program kemitraan yang berkelanjutan',
            'Pelatihan dan edukasi pertanian',
        ],
    },
    {
        id: 'waste-utilization',
        title: 'Pemanfaatan Limbah Kayu',
        description: 'Mengoptimalkan limbah kayu industri menjadi produk bernilai tinggi, mendukung konsep ekonomi sirkular.',
        icon: 'recycle',
        benefits: [
            'Mengurangi limbah kayu yang tidak terpakai',
            'Optimalisasi sumber daya alam',
            'Dukungan ekonomi sirkular',
            'Inovasi pemanfaatan limbah',
        ],
    },
];

// Company information
export const companyInfo = {
    name: 'PT Sembagi Alam Sukses',
    brandName: 'Sembagi Green Resources',
    description: 'PT Sembagi Alam Sukses adalah perusahaan penyedia woodchip berkualitas tinggi untuk kebutuhan energi dan industri. Kami berkomitmen pada praktik berkelanjutan dan legalitas kayu, serta menjamin suplai yang stabil dengan standar internasional.',
    mission: 'Menyediakan solusi biomassa berkelanjutan yang mendukung transisi energi terbarukan Indonesia sambil memberdayakan petani dan masyarakat lokal.',
    vision: 'Menjadi perusahaan terdepan dalam penyediaan biomassa woodchip berkelanjutan di Indonesia dan Asia Tenggara.',
    values: [
        'Berkelanjutan dan Ramah Lingkungan',
        'Kualitas Produk Terjamin',
        'Kemitraan yang Adil',
        'Inovasi Berkelanjutan',
        'Transparansi dan Akuntabilitas',
    ],
    certifications: [
        'Sertifikat Legalitas Kayu',
        'ISO 14001 Environmental Management',
        'Standar Kualitas Internasional',
    ],
};

// Animation variants for Framer Motion
export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
};

export const fadeInLeft = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 }
};

export const fadeInRight = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 }
};

export const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 }
};

export const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

// Default WhatsApp message templates
export const whatsappMessages = {
    contact: 'Halo, saya tertarik untuk mengetahui lebih lanjut tentang produk woodchip Sembagi Green Resources.',
    quote: 'Halo, saya ingin meminta penawaran untuk produk woodchip. Mohon informasi lebih lanjut.',
};