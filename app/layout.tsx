import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Brainrot Supply — Internet culture, offline.",
  description: "Bad memes. Good fits. Explore meme-inspired shirts, hoodies, and mugs for Gen Alpha, Gen Z, and millennial internet kids.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
