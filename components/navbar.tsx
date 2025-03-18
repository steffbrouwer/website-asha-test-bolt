"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-background border-b">
      <header className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center p-4 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Image
              src="https://www.stichtingasha.nl/img/home/asha-logo.png"
              alt="Logo"
              width={48}
              height={48}
            />
            <span className="text-xl font-bold">Stichting Asha</span>
          </div>
        </div>
      </header>
      <div className="container mx-auto p-4">
        <ul className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/activiteiten">Activiteiten</NavItem>
          <NavItem href="/agenda">Agenda</NavItem>
          <NavItem href="/contact">Contact</NavItem>
          <li className="md:ml-auto">
            <Button variant="ghost" asChild>
              <Link href="/login" className="flex items-center space-x-2">
                <UserCircle className="h-5 w-5" />
                <span>Log in</span>
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-foreground/60 hover:text-foreground font-semibold transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}