"use client";

import { store } from "@/utils/libs/redux";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
}
