
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "María Luz",
    role: "Asistente frecuente",
    content: "MagicTicket ha transformado mi experiencia de asistir a eventos espirituales. La plataforma es intuitiva y segura, y los códigos QR funcionan a la perfección.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=32"
  },
  {
    name: "Carlos Sereno",
    role: "Instructor de meditación",
    content: "Como organizador de eventos, puedo dar fe de la eficiencia y seguridad del sistema. MagicTicket ha mejorado la experiencia tanto para nosotros como para nuestros asistentes.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=68"
  },
  {
    name: "Laura Paz",
    role: "Asistente ocasional",
    content: "La primera vez que usé MagicTicket me sorprendió lo fácil que fue. Compré mis boletos en minutos y recibí mi código QR de inmediato. Totalmente recomendado.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?img=47"
  }
];

const Testimonials = () => {
  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-magic-light/30 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-magic-dark mb-4">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-magic-dark/70 max-w-2xl mx-auto">
            Experiencias reales de personas que han usado MagicTicket para sus eventos espirituales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="magic-card"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4 border-2 border-magic-light"
                />
                <div>
                  <h4 className="font-bold text-magic-dark">{testimonial.name}</h4>
                  <p className="text-sm text-magic-dark/70">{testimonial.role}</p>
                </div>
              </div>
              
              <p className="text-magic-dark/80 mb-4">"{testimonial.content}"</p>
              
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < testimonial.rating ? 'text-magic-gold fill-magic-gold' : 'text-magic-gray'}`} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
