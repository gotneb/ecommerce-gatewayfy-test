import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "Loja Legal - E-commerce Completo com Pagamentos Seguros",
    template: "%s | Loja Legal"
  },
  description: "Plataforma completa de e-commerce com pagamentos Stripe, autenticação segura e dashboard administrativo. Venda e compre produtos online de forma segura e eficiente.",
  keywords: [
    "e-commerce",
    "loja online",
    "pagamentos online",
    "Stripe",
    "Supabase",
    "Next.js",
    "vendas online",
    "compras seguras",
    "dashboard administrativo",
    "plataforma de vendas"
  ],
  authors: [{ name: "Loja Legal" }],
  creator: "Loja Legal",
  publisher: "Loja Legal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: defaultUrl,
    title: "Loja Legal - E-commerce Completo com Pagamentos Seguros",
    description: "Plataforma completa de e-commerce com pagamentos Stripe, autenticação segura e dashboard administrativo.",
    siteName: "Loja Legal",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Loja Legal - E-commerce Completo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loja Legal - E-commerce Completo com Pagamentos Seguros",
    description: "Plataforma completa de e-commerce com pagamentos Stripe, autenticação segura e dashboard administrativo.",
    images: ["/og-image.png"],
    creator: "@lojalegal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
