import type { Metadata } from "next";
import { Providers } from "@/utils/libs/redux";

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
          <AsideLeft />
          {children}
        </Providers>
      </body>
    </html>
  );
}
