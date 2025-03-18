import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stichting Asha',
  description: 'Stichting Asha - Vrijwilligersorganisatie van Surinaamse Hindostanen in Utrecht',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster />
          <footer className="bg-background py-6 border-t">
            <div className="container mx-auto text-center">
              <p className="text-muted-foreground">&copy; 2025 Stichting Asha</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}