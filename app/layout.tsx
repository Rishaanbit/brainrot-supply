import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Brainrot Supply — Products",
  description: "Meme-themed T-shirts, hoodies, and mugs. Product catalog with prices, sizes, and meme filters.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
