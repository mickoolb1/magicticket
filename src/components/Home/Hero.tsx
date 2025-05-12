import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import { events } from '@/data/events';
import CountdownTimer from '@/components/CountdownTimer';

const featuredEvent = events[0];

const Hero = () => {
  // Referencia para crear partículas
  const particlesRef = useRef<HTMLDivElement>(null);

  // Función para crear partículas de luz flotantes
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    // Limpiar partículas existentes
    container.innerHTML = '';

    // Crear nuevas partículas
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      // Posición aleatoria
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.bottom = `${posY}%`;

      // Tamaño aleatorio
      const size = Math.random() * 6 + 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Animación con retraso aleatorio
      particle.style.animationDelay = `${Math.random() * 5}s`;

      container.appendChild(particle);
    }
  }, []);

  return (
    <div className="relative overflow-hidden pb-8">
      {/* Background elements - Ajustados para evitar problemas de superposición */}
      <div className="mandala-bg w-[800px] h-[800px] top-[-400px] right-[-400px]"></div>
      <div className="mandala-bg w-[600px] h-[600px] bottom-[-300px] left-[-300px]"></div>

      {/* Particles container */}
      <div ref={particlesRef} className="magic-particles"></div>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 z-10 relative">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-magic-light text-magic">
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Evento Especial en Chile</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Entre{' '}
              <span className="bg-gradient-to-r from-[#7a42ff] via-[#f2c300] to-[#ff69b4] bg-clip-text text-transparent animate-pulse-soft">
                Diosas
              </span>{' '}
              y{' '}
              <span className="bg-gradient-to-r from-[#f2c300] via-[#ff69b4] to-[#7a42ff] bg-clip-text text-transparent animate-pulse-soft">
                Volcanes
              </span>
            </h1>

            <p className="text-lg text-white/90 max-w-lg mb-4">
              ¡No dejes pasar esta oportunidad única! Vive la experiencia de 'Entre Diosas y Volcanes'. Asegura tu lugar para el 17 de mayo de 2025 y Atrévete a ganar un premio mostrando tu arte en el Micrófono Abierto. ¡Te esperamos para una noche inolvidable!
            </p>
            
            <div className="bg-magic/20 backdrop-blur-sm rounded-xl p-4 border border-magic/30 inline-block mb-4">
              <p className="text-xl font-semibold text-white">Precio Especial:</p>
              <div className="text-4xl font-bold bg-gradient-to-r from-magic-gold via-magic to-magic-light bg-clip-text text-transparent animate-pulse">
                $5.000
              </div>
            </div>

            <div className="mb-6">
              <CountdownTimer targetDate="2025-05-17" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="magic-button shadow-lg shadow-magic/30 hover:animate-pulse-soft">
                <Link to="/buy?event=1">
                  Comprar Boleto
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-magic-gold text-magic-gold hover:bg-magic-dark/50 transition-colors">
                <Link to="/events/1">
                  <Star className="mr-2 h-4 w-4" />
                  Ver Detalles
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative z-10">
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-magic-light shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="aspect-[3/4] rounded-lg overflow-hidden max-w-xl mx-auto">
                <img 
                  src="/images/10.jpeg" 
                  alt="Entre Diosas y Volcanes" 
                  className="w-full h-full object-contain rounded-lg hover:object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-magic-dark/40 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">Entre Diosas y Volcanes</h3>
                    <p className="opacity-90">{featuredEvent.date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="mt-12 relative z-10">
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-magic-light shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="aspect-[9/16] rounded-lg overflow-hidden max-w-sm mx-auto">
                <video 
                  src="/videos/video2.mp4" 
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover rounded-lg"
                >
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;