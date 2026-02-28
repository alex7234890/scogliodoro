import "./globals.css";

export const metadata = {
  title: "Agriturismo Scoglio d'Oro - Toscana",
  description:
    "Agriturismo di lusso nel cuore della Toscana. Appartamenti panoramici, piscina a sfioro e sauna finlandese a Pescia (PT).",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Montserrat:wght@600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
