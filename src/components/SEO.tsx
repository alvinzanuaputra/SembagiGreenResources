import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Sembagi Green Resources - Penyedia Woodchip Berkualitas Tinggi",
  description = "PT Sembagi Alam Sukses menyediakan woodchip berkualitas tinggi untuk kebutuhan energi dan industri dengan praktik berkelanjutan. Solusi biomassa terpercaya di Indonesia.",
  keywords = "woodchip, biomassa, energi terbarukan, sustainability, kayu, Jepara, Purworejo, wood chip indonesia, biomass indonesia, sustainable energy, green resources",
  ogImage = import.meta.env.VITE_OG_IMAGE || "/assets/images/2-gogreen.jpg",
  url = import.meta.env.VITE_SITE_URL ||
    "https://www.sembagigreenresources.com",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Go Green Resources" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Sembagi Green Resources" />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta
        name="twitter:site"
        content={import.meta.env.VITE_TWITTER_HANDLE || "@SembagiGreen"}
      />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#1E7A3A" />
      <meta name="msapplication-TileColor" content="#1E7A3A" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />

      {/* Google Search Console Verification */}
      {import.meta.env.VITE_GOOGLE_SITE_VERIFICATION && (
        <meta
          name="google-site-verification"
          content={import.meta.env.VITE_GOOGLE_SITE_VERIFICATION}
        />
      )}

      <link rel="canonical" href={url} />

      {/* Favicon and Icons */}
      <link
        rel="icon"
        type="image/png"
        href="/assets/images/14-logo-navbar.png"
      />
      <link
        rel="shortcut icon"
        type="image/png"
        href="/assets/images/14-logo-navbar.png"
      />
      <link rel="apple-touch-icon" href="/assets/images/14-logo-navbar.png" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/assets/images/14-logo-navbar.png"
      />
      <link rel="manifest" href="/manifest.json" />

      {/* Preload critical resources */}
      <link rel="preload" href="/assets/images/14-logo-navbar.png" as="image" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
    </Helmet>
  );
};

export default SEO;
