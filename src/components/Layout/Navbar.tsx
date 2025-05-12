import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Ticket, Calendar, Users, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-magic-dark/80 backdrop-blur-md border-b border-magic/20 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center">
              <Ticket className="h-8 w-8 text-magic mr-2" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#f2c300] via-[#ff69b4] to-[#7a42ff] bg-clip-text text-transparent">
                MagicTicket
              </span>
            </Link>
            <Link to="/artists" className="font-medium transition-colors duration-300">
              <span className="bg-gradient-to-r from-[#f2c300] via-[#ff69b4] to-[#7a42ff] bg-clip-text text-transparent hover:from-magic-gold hover:to-magic-gold">
                Artistas Invitad@s
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/artists" className="font-medium transition-colors duration-300">
              <span className="bg-gradient-to-r from-[#f2c300] via-[#ff69b4] to-[#7a42ff] bg-clip-text text-transparent hover:from-magic-gold hover:to-magic-gold">
                Artistas Invitad@s
              </span>
            </Link>
            <Button asChild className="magic-button scale-100 hover:scale-105 transition-transform duration-300">
              <Link to="/buy?event=1">Comprar Boletos</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-magic-dark focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md pt-4 pb-6 px-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            
            <Button asChild className="magic-button mt-2">
              <Link to="/buy?event=1" onClick={() => setIsMenuOpen(false)}>
                Comprar Boletos
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;