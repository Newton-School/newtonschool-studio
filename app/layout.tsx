import type { Metadata } from "next";
import "./globals.css";

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
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "NewtonSchool Studio: From a hard problem to software in production." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NewtonSchool Studio | Problem-to-production engineering",
    description: "A problem-to-production engineering studio that turns important product and operational problems into dependable software in production.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
