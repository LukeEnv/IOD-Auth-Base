import { UserProvider } from "@/lib/contexts/user";
import { DarkModeProvider } from "@/lib/contexts/darkmode";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background">
      <body className={poppins.variable}>
        <DarkModeProvider>
          <UserProvider>
            <div className="flex h-screen w-screen flex-col">{children}</div>
          </UserProvider>
        </DarkModeProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
