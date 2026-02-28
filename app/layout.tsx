import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/app/providers";
import { NavBar } from "@/components/custom/nav-bar";
import { Footer } from "@/components/custom/footer";
import "./globals.css";

const montSerrat = Montserrat({ variable: '--font-sans' })


export const metadata: Metadata = {
  title: { default: "MyAnimeList Clone", template: "%s | MyAnimeList Clone" },
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
        className={`${montSerrat.variable} antialiased flex min-h-svh flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-6">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
