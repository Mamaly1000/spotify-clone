import type { Metadata } from "next";
import "./globals.css";
import EncodeFont from "@/fonts/encode";
import SupabaseProvider from "@/Providers/SupaBaseProvider";
import UserProvider from "@/Providers/UserProvider";
import ModalProvider from "@/Providers/ModalProvider";
import ToastProvider from "@/Providers/ToastProvider";
import CustomThemeProvider from "@/Providers/CustomThemeProvider";
import Player from "@/components/Player/Player";
import fav from "@/app/favicon.ico";
export const metadata: Metadata = {
  title: "wellcome to your spotify",
  description: "begin a great musical adventure with us.",
  icons: fav.src,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          EncodeFont.className +
          " bg-background text-text  min-w-full max-w-full overflow-y-auto overflow-x-hidden max-h-screen"
        }
      >
        <ToastProvider />
        <SupabaseProvider>
          <UserProvider>
            <CustomThemeProvider>
              <ModalProvider />
              <Player>{children}</Player>
            </CustomThemeProvider>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
