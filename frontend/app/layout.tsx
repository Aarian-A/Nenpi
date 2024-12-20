import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} style={{overflow: "auto", scrollbarWidth: "none", msOverflowStyle: "none"}}>
      <body style={{overflow: "auto", scrollbarWidth: "none", msOverflowStyle: "none"}}>
        {children}
      </body>
    </html>
  );
}
