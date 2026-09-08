import type { Metadata } from "next";
import { CertificateView } from "@/components/certificate/CertificateView";

export const metadata: Metadata = {
  title: "ใบประกาศผ่านหลักสูตร",
  description: "ใบประกาศผ่านหลักสูตร AI สำหรับงานสืบสวน ระดับพื้นฐาน — ออกในเครื่องผู้เรียนเท่านั้น",
};

export default function CertificatePage() {
  return <CertificateView />;
}
