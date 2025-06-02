import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "گلدک - سامانه نظارت بر معاملات طلای آب‌شده",
  description: "سامانه نظارت بر معاملات طلای آب‌شده با شفافیت، امنیت و اعتماد",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
