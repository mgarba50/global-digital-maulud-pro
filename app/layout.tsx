import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Digital Maulud 1447H – A Night of Light & Remembrance ﷺ",
  description: "Join the first Global Digital Maulud from anywhere in the world.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
