import React from 'react';
import { Ticket, ShieldCheck, QrCode, CalendarCheck } from 'lucide-react';

const features = [
  {
    title: 'Compra Segura',
    description: 'Sistema de pago cifrado y protegido para garantizar transacciones seguras.',
    icon: ShieldCheck,
    color: 'bg-magic-pink'
  },
  {
    title: 'Códigos QR Únicos',
    description: 'Cada boleto incluye un código QR único que garantiza su autenticidad.',
    icon: QrCode,
    color: 'bg-magic-blue'
  },
  {
    title: 'Boletos Digitales',
    description: 'Recibe tus boletos por correo electrónico, sin necesidad de imprimirlos.',
    icon: Ticket,
    color: 'bg-magic-peach'
  },
  {
    title: 'Eventos Espirituales',
    description: 'Accede a una amplia variedad de eventos para nutrir tu alma y espíritu.',
    icon: CalendarCheck,
    color: 'bg-magic-light'
  }
];

const Features = () => {
  return (
    <section className="py-12 md:py-24 bg-magic-light/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-magic-dark mb-4">
            ¿Por qué comprar con MagicTicket?
          </h2>
          <p className="text-magic-dark/70 max-w-2xl mx-auto">
            Te ofrecemos una experiencia segura y confiable para que disfrutes de "Entre Diosas y Volcanes" sin preocupaciones
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="magic-card hover:translate-y-[-5px]"
            >
              <div className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6 text-magic-dark" />
              </div>
              <h3 className="text-xl font-bold text-magic-dark mb-2">{feature.title}</h3>
              <p className="text-magic-dark/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;