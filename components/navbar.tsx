"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserCircle, Menu, X } from 'lucide-react';
// import { createClient } from '@/lib/supabase/client';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth/login';
  };

  return (
    <nav className="bg-[#F2F2F2] border-b border-[#E4C76B]">
      {/* Desktop Navigation */}
      <div className="container mx-auto hidden md:block">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-4">
            <Image
              src="https://www.stichtingasha.nl/img/home/asha-logo.png"
              alt="Logo"
              width={48}
              height={48}
            />
            <span className="text-xl font-bold text-[#07114D]">Stichting Asha</span>
          </div>
          <div className="flex items-center space-x-6">
            <NavItem href="/" icon="🏠">Home</NavItem>
            <NavItem href="/activiteiten" icon="📋">Activiteiten</NavItem>
            <NavItem href="/agenda" icon="📅">Agenda</NavItem>
            <NavItem href="/contact" icon="✉️">Contact</NavItem>
            <Button
              variant="ghost"
              className="text-[#07114D] hover:text-[#2E376F]"
              onClick={handleLogout}
            >
              <UserCircle className="h-5 w-5 mr-2" />
              Uitloggen
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-2">
            <Image
              src="https://www.stichtingasha.nl/img/home/asha-logo.png"
              alt="Logo"
              width={36}
              height={36}
            />
            <span className="text-lg font-bold text-[#07114D]">Stichting Asha</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#07114D]"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="bg-white border-t border-[#E4C76B] p-4">
            <div className="flex flex-col space-y-4">
              <MobileNavItem href="/" icon="🏠">Home</MobileNavItem>
              <MobileNavItem href="/activiteiten" icon="📋">Activiteiten</MobileNavItem>
              <MobileNavItem href="/agenda" icon="📅">Agenda</MobileNavItem>
              <MobileNavItem href="/contact" icon="✉️">Contact</MobileNavItem>
              <Button
                variant="ghost"
                className="w-full justify-start text-[#07114D] hover:text-[#2E376F]"
                onClick={handleLogout}
              >
                <UserCircle className="h-5 w-5 mr-2" />
                Uitloggen
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavItem({ href, children, icon }: { href: string; children: React.ReactNode; icon: string }) {
  return (
    <Link
      href={href}
      className="text-[#07114D] hover:text-[#2E376F] font-semibold transition-colors flex items-center space-x-2"
    >
      <span>{icon}</span>
      <span>{children}</span>
    </Link>
  );
}

function MobileNavItem({ href, children, icon }: { href: string; children: React.ReactNode; icon: string }) {
  return (
    <Link
      href={href}
      className="text-[#07114D] hover:text-[#2E376F] font-semibold transition-colors flex items-center space-x-2 p-2"
    >
      <span>{icon}</span>
      <span>{children}</span>
    </Link>
  );
}