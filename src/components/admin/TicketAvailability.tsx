
import React from 'react';
import { getTicketAvailability, TICKET_CONFIG } from '@/utils/ticketUtils';
import { Progress } from '@/components/ui/progress';

const TicketAvailability: React.FC = () => {
  const availability = getTicketAvailability();
  const totalTickets = TICKET_CONFIG.MAX_TICKETS;

  return (
    <div className="bg-white rounded-xl shadow-md border border-magic-light p-6 mb-6">
      <h2 className="text-xl font-bold text-magic-dark mb-4">Estado de Boletos</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Vendidos y Validados */}
        <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-emerald-700">Validados</p>
            <span className="text-lg font-bold text-emerald-600">{availability.validated}</span>
          </div>
          <Progress 
            value={(availability.validated / totalTickets) * 100} 
            className="h-1.5 mt-2 bg-emerald-100" 
          />
        </div>

        {/* Por Validar */}
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-amber-700 font-semibold">Por Validar</h3>
            <span className="text-amber-600 text-2xl font-bold">{availability.pendingValidation}</span>
          </div>
          <Progress 
            value={(availability.pendingValidation / totalTickets) * 100} 
            className="h-2 bg-amber-100" 
          />
        </div>

        {/* Disponibles */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-blue-700 font-semibold">Disponibles</h3>
            <span className="text-blue-600 text-2xl font-bold">{availability.available}</span>
          </div>
          <Progress 
            value={(availability.available / totalTickets) * 100} 
            className="h-2 bg-blue-100" 
          />
        </div>

        {/* Total Vendidos */}
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-purple-700 font-semibold">Total Vendidos</h3>
            <span className="text-purple-600 text-2xl font-bold">{availability.sold}</span>
          </div>
          <Progress 
            value={(availability.sold / totalTickets) * 100} 
            className="h-2 bg-purple-100" 
          />
        </div>

        {/* Pendientes de Pago */}
        <div className="bg-rose-50 rounded-lg p-4 border border-rose-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-rose-700 font-semibold">Pendientes de Pago</h3>
            <span className="text-rose-600 text-2xl font-bold">{availability.pending}</span>
          </div>
          <Progress 
            value={(availability.pending / totalTickets) * 100} 
            className="h-2 bg-rose-100" 
          />
        </div>

        {/* Total Permitido */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-700 font-semibold">Total Permitido</h3>
            <span className="text-gray-600 text-2xl font-bold">{totalTickets}</span>
          </div>
          <div className="text-sm text-gray-500">Capacidad máxima del evento</div>
        </div>
      </div>
    </div>
  );
};

export default TicketAvailability;
