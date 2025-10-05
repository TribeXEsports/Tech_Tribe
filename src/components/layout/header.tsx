
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useUser } from '@/firebase';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/founder', label: 'Founder' },
  { href: '/service', label: 'Service' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/partners', label: 'Partners' },
  { href: '/events', label: 'Events' },
  { href: '/chapter', label: 'Chapter' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/faq', label: 'FAQ' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled || mobileMenuOpen ? "bg-background/80 backdrop-blur-sm border-b border-border/50" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/icon.png" alt="Tech Tribex Logo" width={40} height={40} className="rounded-full" data-ai-hint="logo" />
            <span className="text-xl font-bold font-headline text-foreground">
              Tech Tribex
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
             <Link href="/contact" className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/contact" ? "text-primary" : "text-muted-foreground"
                )}>Contact</Link>
          </nav>
          <div className="flex items-center gap-2">
             {user ? (
                <Button asChild className="hidden md:flex font-bold">
                    <Link href="/admin">Admin</Link>
                </Button>
            ) : (
                 <Button asChild className="hidden md:flex font-bold">
                    <Link href="/login">Login</Link>
                </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 h-[calc(100vh-5rem)] bg-background/95 backdrop-blur-sm">
          <nav className="flex flex-col gap-6 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
             <Link href="/contact" className={cn(
                  "text-lg font-medium transition-colors hover:text-primary",
                  pathname === "/contact" ? "text-primary" : "text-foreground"
                )}>Contact</Link>
             {user ? (
                <Button asChild className="font-bold w-full mt-4">
                    <Link href="/admin">Admin</Link>
                </Button>
            ) : (
                <Button asChild className="font-bold w-full mt-4">
                    <Link href="/login">Login</Link>
                </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
