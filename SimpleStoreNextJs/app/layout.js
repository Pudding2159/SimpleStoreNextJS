import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '../context/AuthContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Simple Store",
  icons: {
    icon: '/image/logo-1.png',
    apple: '/image/logo-1.png',
    shortcut: '/image/logo-1.png',
  }
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}