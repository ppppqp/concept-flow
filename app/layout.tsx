import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "reactflow/dist/style.css";

import "./layout.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-10 w-full flex justify-end text-base pr-10 pt-2 sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50">
          <div className="flex gap-10">
            <span className='underline underline-offset-4 cursor-pointer'><a className='text-black' href='/'>Home</a></span>
            <span className='underline underline-offset-4 cursor-pointer'><a className='text-black' href='/playground'>Playground</a></span>
            <span className='underline underline-offset-4 cursor-pointer'><a className='text-black' href='https://github.com/ppppqp/concept-flow' target='_blank'>Github</a></span>

          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
