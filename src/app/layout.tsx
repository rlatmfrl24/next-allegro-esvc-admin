import type { Metadata } from "next";
import "./globals.css";
import { pretendard } from "@/util/font";
import Providers from "@/util/provider";

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
      <body className={pretendard.variable}>
        <Providers>
          <main
            id="main-container"
            className="flex flex-col min-h-screen overflow-hidden"
          >
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
