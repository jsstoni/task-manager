import type { Metadata } from "next";
import { Providers } from "@/utils/libs/redux";
import { ThemeProvider } from "next-themes";

import "@/utils/env";
import "../assets/globals.css";
import { AsideLeft } from "@/components";

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
            <AsideLeft />

            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
