
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { getEvent } from '@/data/events';
import { Button } from '@/components/ui/button';
import { getTicketAvailability, TICKET_CONFIG } from '@/utils/ticketUtils';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Tag, 
  Ticket, 
  ArrowLeft,
  Share2
} from 'lucide-react';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event = getEvent(id || '');
  const [availability, setAvailability] = useState(getTicketAvailability());
  
  useEffect(() => {
    // Update availability data when component mounts
    setAvailability(getTicketAvailability());
  }, []);

  if (!event) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-magic-dark mb-4">Evento no encontrado</h1>
            <p className="text-magic-dark/70 mb-6">El evento que buscas no existe o ha sido removido.</p>
            <Button asChild variant="outline" className="border-magic hover:bg-magic-light transition-colors">
              <Link to="/events">Ver todos los eventos</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gradient-to-b from-magic-light/50 to-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <Button
            variant="ghost"
            className="mb-6 text-magic hover:text-magic-dark hover:bg-magic-light/50"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Event image and info */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-magic-light">
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-auto object-contain max-h-[600px]"
                  />
                  <div className="absolute top-0 right-0 bg-magic text-white text-sm font-medium px-3 py-1 rounded-bl-lg">
                    {event.date.split(',')[0]}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-xs bg-magic-light text-magic-dark px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h1 className="text-3xl font-bold text-magic-dark mb-4">{event.title}</h1>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-magic-dark/80">
                      <Calendar className="h-5 w-5 mr-3 text-magic" />
                      <div>
                        <div className="font-medium">Fecha</div>
                        <div>{event.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-magic-dark/80">
                      <Clock className="h-5 w-5 mr-3 text-magic" />
                      <div>
                        <div className="font-medium">Horario</div>
                        <div>{event.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-magic-dark/80">
                      <MapPin className="h-5 w-5 mr-3 text-magic" />
                      <div>
                        <div className="font-medium">Ubicación</div>
                        <div>{event.location}</div>
                        <div className="text-sm">{event.address}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-magic-dark/80">
                      <Users className="h-5 w-5 mr-3 text-magic" />
                      <div>
                        <div className="font-medium">Instructor</div>
                        <div>{event.instructor}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="prose max-w-none text-magic-dark/80">
                    <h3 className="text-xl font-semibold text-magic-dark">Acerca del evento</h3>
                    {event.longDescription.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-between items-center">
                    <Button asChild variant="outline" className="flex items-center gap-2 border-magic hover:bg-magic-light">
                      <button>
                        <Share2 className="h-4 w-4" />
                        Compartir
                      </button>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Ticket purchase */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md border border-magic-light sticky top-24">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-magic-dark mb-4">Información de Boletos</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-magic-dark">Precio por boleto:</span>
                      <span className="text-xl font-bold text-magic">${event.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-magic-dark">Disponibilidad:</span>
                      <span className="text-magic-dark">
                        {availability.available} boletos disponibles
                      </span>
                    </div>
                    <div className="w-full bg-magic-light/50 rounded-full h-2.5">
                      <div 
                        className="bg-magic h-2.5 rounded-full" 
                        style={{ width: `${(availability.available / TICKET_CONFIG.MAX_TICKETS) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-magic-light/50 rounded-lg mb-6">
                    <div className="flex items-start">
                      <Ticket className="h-5 w-5 mr-2 text-magic mt-0.5" />
                      <div className="text-sm text-magic-dark/80">
                        Cada boleto incluye acceso completo al evento.
                      </div>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full magic-button">
                    <Link to={`/buy?event=${event.id}`}>
                      Comprar Boletos
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;
