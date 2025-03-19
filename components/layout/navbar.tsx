"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Activiteiten", href: "/activiteiten" },
  { name: "Agenda", href: "/agenda" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <header className="bg-surface">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-4 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Image
              src="https://www.stichtingasha.nl/img/home/asha-logo.png"
              alt="Logo"
              width={48}
              height={48}
              className="h-12 w-auto"
            />
            <span className="text-secondary text-xl font-bold">Stichting Asha</span>
          </div>
        </div>
      </header>
      <div className="container mx-auto p-4">
        <ul className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "text-secondary hover:text-primary font-semibold",
                  pathname === item.href && "text-primary"
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li className="md:ml-auto">
            <Link
              href="/login"
              className="flex items-center text-primary hover:text-primary-dark-text"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Log in</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}