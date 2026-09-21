import type { Metadata } from "next";
import { Outfit, Public_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { GA_MEASUREMENT_ID, SITE_URL } from "@/lib/site";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const TITLE = "Legado Digital — Preserve a história da sua família";
const DESCRIPTION =
  "Plataforma para preservar a história da sua família: organize fotos, histórias, documentos e árvore genealógica em um só lugar, com segurança e simplicidade.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Legado Digital",
  },
  description: DESCRIPTION,
  keywords: [
    "árvore genealógica",
    "genealogia familiar",
    "preservar história da família",
    "organizar fotos de família",
    "livro de família",
    "memórias da família",
    "plataforma de genealogia",
  ],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "AJaSKqlqKcOBzffIVA0KpprQ-MyjY4d09_qrDEPllTQ",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Legado Digital",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-body font-sans">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
