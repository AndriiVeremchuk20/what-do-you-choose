import "~/styles/globals.css";

import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Footer from "~/components/footer";
import Sound from "~/components/sound";

export const metadata: Metadata = {
  title: "What do you choose?",
  description:
    "A game that will turn on your imagination, where every choice leads to a unique adventure. With auto-generated storylines, each decision shapes your journey and determines your fate. What path will you choose? The story is in your hands!",
  icons: [{ rel: "icon", url: "/logo.svg" }],
};

// load font
const googleGEO = localFont({
  src: "../../public/fonts/Geo-Regular.ttf",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${googleGEO.className} bg-black text-2xl text-white`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Footer />
        <Sound />
      </body>
    </html>
  );
}
