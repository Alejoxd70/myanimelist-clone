import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { ThemeProvider } from "@/app/providers";
import "./globals.css";
import { NavBar } from "@/components/custom/nav-bar";

const notoSans = Noto_Sans({ variable: '--font-sans' });


export const metadata: Metadata = {
  title: {default: "MyAnimeList Clone", template: "%s | MyAnimeList Clone"},
  description: "Just a project to practice Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${notoSans.variable}  antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <div className="w-full p-2 md:p-3 lg:w-8/9 xl:w-7/9 mx-auto border border-primary">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
