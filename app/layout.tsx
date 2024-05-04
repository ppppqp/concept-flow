import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import "reactflow/dist/style.css";

import "./layout.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Concept Flow",
  description: "An LGUI interaction paradigm for systematic knowledge retrieval.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-10 w-full flex justify-end text-base pr-10 pt-2 sticky top-0 z-40 w-full">
          <img
            className="invisible md:visible absolute right-1/2 translate-x-1/2	 top-2 h-6 "
            src="https://i.imgur.com/x0V1inJ.png"
            alt="logo"
          />
          <div className="flex gap-10">
            <span className="underline underline-offset-4 cursor-pointer">
              <a className="text-black" href="/">
                Home
              </a>
            </span>
            <span className="underline underline-offset-4 cursor-pointer">
              <a className="text-black" href="/playground">
                Playground
              </a>
            </span>
            <span className="underline underline-offset-4 cursor-pointer">
              <a
                className="text-black"
                href="https://github.com/ppppqp/concept-flow"
                target="_blank"
              >
                Github
              </a>
            </span>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
