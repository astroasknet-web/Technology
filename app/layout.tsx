import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Inter, Space_Grotesk } from "next/font/google";
import "@/components/yugtytechnology/base.css";
import "@/components/yugtytechnology/division.css";
import "@/components/yugtytechnology/yugtytechnology.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--vl-display", display: "swap" });
const text = Inter({ subsets: ["latin"], variable: "--vl-text", display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const viewport: Viewport = { themeColor: "#04060f", width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "YugtyTechnology: Websites, apps and AI-powered software", template: "%s | YugtyTechnology" },
  description: "We turn ideas into websites, web applications, Android and iOS apps, AI-powered solutions and scalable digital products.",
  icons: { icon: "/yugty-logo.svg" },
  openGraph: { title: "YugtyTechnology", description: "Imagine it. We engineer it.", type: "website", siteName: "YugtyTechnology" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className={`vl ${display.variable} ${text.variable}`}>
          <a className="vl-skip" href="#main-content">Skip to content</a>
          {children}
          <Script src="/yugtytechnology/fx.js" strategy="afterInteractive" />
          <Script src="/yugtytechnology/division.js" strategy="afterInteractive" />
          <Script src="/yugtytechnology/tech-studio.js" strategy="afterInteractive" />
        </div>
      </body>
    </html>
  );
}
