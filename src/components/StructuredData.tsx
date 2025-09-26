import React from "react";
import { Helmet } from "react-helmet-async";

const StructuredData: React.FC = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PT Sembagi Alam Sukses",
    alternateName: "Sembagi Green Resources",
    legalName: "PT Sembagi Alam Sukses",
    description:
      "Go Green Resources menyediakan solusi wood chip berkualitas tinggi yang ramah lingkungan untuk kebutuhan industri dan energi terbarukan.",
    url: "https://sembagigreenresources.com",
    logo: "https://sembagigreenresources.com/assets/images/14-logo-navbar.png",
    image: "https://sembagigreenresources.com/assets/images/2-gogreen.jpg",
    sameAs: [
      "https://www.instagram.com/sembagigreenresources",
      "https://www.linkedin.com/company/sembagigreenresources",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+62-812-2710-5235",
        contactType: "Customer Service",
        areaServed: "ID",
        availableLanguage: ["Indonesian", "English"],
      },
      {
        "@type": "ContactPoint",
        email: "info@sembagigreenresources.com",
        contactType: "Customer Support",
        areaServed: "ID",
        availableLanguage: ["Indonesian", "English"],
      },
    ],
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Jepara",
        addressRegion: "Jawa Tengah",
        addressCountry: "ID",
        name: "Kantor Jepara",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Purworejo",
        addressRegion: "Jawa Tengah",
        addressCountry: "ID",
        name: "Kantor Purworejo",
      },
    ],
    founder: {
      "@type": "Person",
      name: "Sembagi Green Resources Management",
    },
    foundingDate: "2020",
    numberOfEmployees: "10-50",
    industry: "Renewable Energy",
    naics: "113310",
    keywords:
      "woodchip, biomassa, energi terbarukan, sustainability, wood chip indonesia, biomass supplier, sustainable forestry",
    slogan: "Solusi Biomassa Berkelanjutan untuk Masa Depan Hijau",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Go Green Resources",
    url: "https://sembagigreenresources.com",
    description:
      "PT Sembagi Alam Sukses menyediakan woodchip berkualitas tinggi untuk kebutuhan energi dan industri dengan praktik berkelanjutan.",
    publisher: {
      "@type": "Organization",
      name: "PT Sembagi Alam Sukses",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://sembagigreenresources.com/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "id-ID",
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Woodchip Premium Grade",
    description:
      "Woodchip berkualitas tinggi dari kayu berkelanjutan untuk kebutuhan energi terbarukan dan industri. Diproduksi dengan standar internasional dan ramah lingkungan.",
    brand: {
      "@type": "Brand",
      name: "Sembagi Green Resources",
    },
    manufacturer: {
      "@type": "Organization",
      name: "PT Sembagi Alam Sukses",
    },
    category: "Renewable Energy Materials",
    material: "Wood",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Moisture Content",
        value: "< 15%",
      },
      {
        "@type": "PropertyValue",
        name: "Size Range",
        value: "2-5 cm",
      },
      {
        "@type": "PropertyValue",
        name: "Certification",
        value: "Sustainable Forestry",
      },
    ],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "IDR",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "IDR",
        valueAddedTaxIncluded: true,
      },
      seller: {
        "@type": "Organization",
        name: "PT Sembagi Alam Sukses",
      },
      areaServed: {
        "@type": "Country",
        name: "Indonesia",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "47",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
