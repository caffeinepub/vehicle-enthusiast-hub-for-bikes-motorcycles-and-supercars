import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import AuthButton from './AuthButton';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', path: '/' as const, params: undefined },
    { label: 'Bikes', path: '/category/$type' as const, params: { type: 'Bike' } },
    { label: 'Motorcycles', path: '/category/$type' as const, params: { type: 'Motorcycle' } },
    { label: 'Supercars', path: '/category/$type' as const, params: { type: 'Car' } },
    { label: 'Favorites', path: '/favorites' as const, params: undefined },
    { label: 'About', path: '/about' as const, params: undefined },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/assets/generated/logo.dim_512x512.png"
            alt="Vehicle Enthusiast Hub"
            className="h-10 w-10"
          />
          <span className="hidden font-bold text-xl sm:inline-block">
            VehicleHub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              params={link.params as any}
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: 'text-primary' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/add-vehicle"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
            activeProps={{ className: 'text-primary' }}
          >
            <Plus className="h-4 w-4" />
            Add Vehicle
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <AuthButton />

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    params={link.params as any}
                    className="text-lg font-medium transition-colors hover:text-primary"
                    activeProps={{ className: 'text-primary' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/add-vehicle"
                  className="text-lg font-medium transition-colors hover:text-primary flex items-center gap-2"
                  activeProps={{ className: 'text-primary' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Plus className="h-5 w-5" />
                  Add Vehicle
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
