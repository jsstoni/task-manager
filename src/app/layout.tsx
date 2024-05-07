import type { Metadata } from "next";
import { Providers } from "@/redux";
import { ThemeProvider } from "next-themes";

import "./assets/globals.css";

export const metadata: Metadata = {
  title: "Vanto",
  description: "Vanto template kanban board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider defaultTheme="dark" attribute="class">
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
