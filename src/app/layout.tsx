import type { Metadata } from "next";
import { Sarabun, IBM_Plex_Sans_Thai, Playfair_Display, Noto_Serif_Thai } from "next/font/google";
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

// canonical brand display pair — Playfair Display (EN) + Noto Serif Thai (TH)
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const notoSerifThai = Noto_Serif_Thai({
  subsets: ["thai"],
  weight: ["500", "600", "700"],
  variable: "--font-noto-serif-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — ห้องทดลองฝึกสืบสวน`,
    template: `%s · ${APP_NAME}`,
  },
  description: APP_TAGLINE,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: `${APP_NAME} — ห้องทดลองฝึกสืบสวน`,
    description: APP_TAGLINE,
    type: "website",
    locale: "th_TH",
  },
  twitter: { card: "summary_large_image", title: APP_NAME, description: APP_TAGLINE },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${sarabun.variable} ${ibmThai.variable} ${playfair.variable} ${notoSerifThai.variable}`}>
      <body className="font-sans antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}