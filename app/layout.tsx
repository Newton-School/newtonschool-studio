import type { Metadata } from "next";
import { JetBrains_Mono, Mona_Sans, Silkscreen } from "next/font/google";
import "./globals.css";

const sans = Mona_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const pixel = Silkscreen({ subsets: ["latin"], weight: "400", variable: "--font-silkscreen", display: "swap" });

export const metadata: Metadata = {
  title: "NewtonSchool Studio | Problem-to-production engineering",
  description: "A problem-to-production engineering studio that turns important product and operational problems into dependable software in production.",
  metadataBase: new URL("https://newtonschool-studio.newtonschool.co"),
  openGraph: {
    title: "NewtonSchool Studio | Problem-to-production engineering",
    description: "A problem-to-production engineering studio that turns important product and operational problems into dependable software in production.",
    url: "https://newtonschool-studio.newtonschool.co",
    siteName: "NewtonSchool Studio",
    type: "website",
    images: [{ url: "/og-pixel.png", width: 1200, height: 630, alt: "NewtonSchool Studio: Hard problems. Software in production. Pixel art of a student engineering pod and a launching rocket." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NewtonSchool Studio | Problem-to-production engineering",
    description: "A problem-to-production engineering studio that turns important product and operational problems into dependable software in production.",
    images: ["/og-pixel.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${pixel.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
