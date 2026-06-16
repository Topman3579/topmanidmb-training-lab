import type { Metadata } from "next";
import { Sarabun, IBM_Plex_Sans_Thai } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";
import "./globals.css";

const sarabun = Sarabun({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sarabun",
  display: "swap",
});

const ibmThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — ห้องทดลองฝึกสืบสวน`,
    template: `%s · ${APP_NAME}`,
  },
  description: APP_TAGLINE,
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${sarabun.variable} ${ibmThai.variable}`}>
      <body className="font-sans antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}