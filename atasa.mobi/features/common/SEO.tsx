import React from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords = "atasa danışmanlık, ikamet izni, çalışma izni, vatandaşlık, göç idaresi, türkiye oturum izni, yabancı danışmanlık",
  image = "https://upload-service-production-dd42.up.railway.app/files/1766848410852-874645202.png"
}) => {
  const fullTitle = `${title} | Atasa Danışmanlık`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Atasa Danışmanlık" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Atasa Danışmanlık" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={window.location.origin + window.location.pathname} />
    </>
  );
};