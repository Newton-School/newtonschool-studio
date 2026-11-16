import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NewtonSchool Studio | Problem-to-production engineering",
  description: "A problem-to-production engineering studio that turns important product and operational problems into dependable software in production.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
