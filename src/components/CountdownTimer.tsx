
import React from 'react';
import Countdown from 'react-countdown';
import { WandSparkles } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string; // Formato: 'YYYY-MM-DD'
  className?: string;
}

interface TimeDisplayProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Componente para mostrar el contador regresivo
const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, className = '' }) => {
  // Renderer personalizado para el countdown
  const renderer = ({ days, hours, minutes, seconds, completed }: TimeDisplayProps & { completed: boolean }) => {
    if (completed) {
      // Cuando el contador llega a cero
      return <div className="text-magic-gold font-bold text-xl">¡El evento ha comenzado!</div>;
    } else {
      // Mientras el tiempo sigue corriendo
      return (
        <div className={`flex flex-col items-center ${className}`}>
          <div className="flex items-center gap-2 mb-2">
            <WandSparkles className="h-5 w-5 text-magic-gold animate-pulse-soft" />
            <h3 className="font-medium text-white">Cuenta regresiva para el evento</h3>
          </div>
          
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="flex flex-col">
              <div className="bg-magic-dark/60 backdrop-blur-md border border-magic/30 rounded-lg px-3 py-2 text-magic-gold font-bold text-2xl">
                {days}
              </div>
              <span className="text-sm text-white/70 mt-1">Días</span>
            </div>
            <div className="flex flex-col">
              <div className="bg-magic-dark/60 backdrop-blur-md border border-magic/30 rounded-lg px-3 py-2 text-magic-gold font-bold text-2xl">
                {hours}
              </div>
              <span className="text-sm text-white/70 mt-1">Horas</span>
            </div>
            <div className="flex flex-col">
              <div className="bg-magic-dark/60 backdrop-blur-md border border-magic/30 rounded-lg px-3 py-2 text-magic-gold font-bold text-2xl">
                {minutes}
              </div>
              <span className="text-sm text-white/70 mt-1">Minutos</span>
            </div>
            <div className="flex flex-col">
              <div className="bg-magic-dark/60 backdrop-blur-md border border-magic/30 rounded-lg px-3 py-2 text-magic-gold font-bold text-2xl animate-pulse-soft">
                {seconds}
              </div>
              <span className="text-sm text-white/70 mt-1">Segundos</span>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <Countdown 
      date={new Date(targetDate)} 
      renderer={renderer} 
    />
  );
};

export default CountdownTimer;
