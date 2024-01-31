import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Questrial} from 'next/font/google'
 
const questrial = Questrial({
  subsets: [],
  weight: "400"
})

export const metadata: Metadata = {
  title: "Les Éléctions Infos",
  description: "Référence du journalisme éléctoral en Afrique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={questrial.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
