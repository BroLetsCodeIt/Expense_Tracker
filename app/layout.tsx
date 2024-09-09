import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Tracker your personal expenses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

    <html lang="en">
      <ThemeProvider defaultTheme="light" attribute="class" enableSystem disableTransitionOnChange>
            <body className={inter.className}>
              <Toaster/>
              {children}
            </body>
      </ThemeProvider>
    </html>
    </ClerkProvider>
  );
}
