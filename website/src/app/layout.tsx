import { UserProvider } from "@/lib/contexts/user";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <div className="flex justify-center items-center h-screen w-screen">
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
