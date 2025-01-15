import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2025",
  description: "Welcome to 2025",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
