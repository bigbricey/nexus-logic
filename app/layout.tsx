import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Theokoles AI | Premium MCP Server Bundle",
  description: "Give your AI agents super-intelligence with our curated bundle of 5 high-performance MCP servers. SEC insights, Scientific research, Lead generation, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased selection:bg-accent/30`}>
        {children}
      </body>
    </html>
  );
}
