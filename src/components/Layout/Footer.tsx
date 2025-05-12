
import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-magic-light to-white border-t border-magic-light mt-12">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo and About */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <Ticket className="h-6 w-6 text-magic mr-2" />
              <span className="text-xl font-bold bg-gradient-to-r from-magic to-magic-dark bg-clip-text text-transparent">
                MagicTicket
              </span>
            </div>
            <p className="text-sm text-magic-dark/80 mb-4">
              Tu plataforma espiritual para eventos transformadores y experiencias únicas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-magic hover:text-magic-dark transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-magic hover:text-magic-dark transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-magic hover:text-magic-dark transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-magic-dark">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-4 w-4 text-magic mr-2" />
                <a href="mailto:patagonia.luztribal@gmail.com" className="text-magic-dark/80 hover:text-magic transition-colors">
                  magicticket.soporte@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 text-magic mr-2" />
                <a href="tel:+56945835342" className="text-magic-dark/80 hover:text-magic transition-colors">
                  +56 945 835 342
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 text-magic mr-2 mt-1" />
                <span className="text-magic-dark/80">
                  Santiago de Chile, Metropolitana
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-magic-light/50">
          <p className="text-center text-sm text-magic-dark/70">
            © {new Date().getFullYear()} MagicTicket. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
