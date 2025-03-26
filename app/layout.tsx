import "@radix-ui/themes/styles.css";
import "./globals.css";
import "./theme-config.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./Navbar";
import { Container, Theme } from "@radix-ui/themes";
import AuthProvider from "./api/auth/providers/AuthProvider";
import QueryClientProvider from "./components/QueryClientProvider";
import Footer from "./Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Track It",
  description: "An issue tracking platform",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="teal">
              <Navbar />
              <main className="p-5">
                <Container>{children}</Container>
              </main>
              <Footer />
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
