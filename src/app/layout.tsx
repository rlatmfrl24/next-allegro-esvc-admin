import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Allegro E-Service Admin",
  description: "Next Allegro E-Service Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
