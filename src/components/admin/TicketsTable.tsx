import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Trash2, Eye } from 'lucide-react';
import { Ticket, deleteTicket } from '@/utils/ticketUtils';
import { useToast } from '@/hooks/use-toast';

interface TicketsTableProps {
  tickets: Ticket[];
  onDelete: () => void;
}

const TicketsTable: React.FC<TicketsTableProps> = ({ tickets, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState<Record<string, boolean>>({});
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showTicketDetailDialog, setShowTicketDetailDialog] = useState(false);
  const { toast } = useToast();

  const filteredTickets = tickets.filter(ticket => 
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteTicket = (ticketId: string) => {
    setIsDeleting({...isDeleting, [ticketId]: true});

    try {
      const success = deleteTicket(ticketId);

      if (success) {
        toast({
          title: "Boleto eliminado",
          description: "El boleto ha sido eliminado correctamente",
        });
        onDelete(); // Actualizar la lista de boletos
      } else {
        toast({
          title: "Error",
          description: "No se pudo eliminar el boleto",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al eliminar el boleto",
        variant: "destructive"
      });
    } finally {
      setIsDeleting({...isDeleting, [ticketId]: false});
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-magic-light p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-magic-dark">Todos los Boletos</h2>
          <div className="flex gap-4 mt-2 text-sm">
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-green-500"></span>
              <span className="text-black">Validados: {tickets.filter(t => t.used).length}</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-red-500"></span>
              <span className="text-black">No Validados: {tickets.filter(t => !t.used).length}</span>
            </span>
          </div>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-magic-dark/50 h-4 w-4" />
          <Input
            placeholder="Buscar boletos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-magic-light"
          />
        </div>
      </div>

      {filteredTickets.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-magic-light/30 text-magic-dark">
              <tr>
                <th className="px-4 py-3 text-left">ID Boleto</th>
                <th className="px-4 py-3 text-left">Evento</th>
                <th className="px-4 py-3 text-left">Asistente</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Fecha de Compra</th>
                <th className="px-4 py-3 text-left">Estado</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-magic-light/50">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-magic-light/20">
                  <td className="px-4 py-3 font-mono text-black">{ticket.id}</td>
                  <td className="px-4 py-3 text-black">{ticket.eventName}</td>
                  <td className="px-4 py-3 text-black">{ticket.customerName}</td>
                  <td className="px-4 py-3 text-black">{ticket.customerEmail}</td>
                  <td className="px-4 py-3 text-black">{new Date(ticket.purchaseDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${ticket.used ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {ticket.used ? 'Utilizado' : 'No utilizado'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700"
                        onClick={() => {
                          setSelectedTicket(ticket);
                          setShowTicketDetailDialog(true);
                        }}
                      >
                        <Eye className="h-3 w-3" />
                        Ver
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 bg-red-50 border-red-200 hover:bg-red-100 text-red-700"
                        onClick={() => handleDeleteTicket(ticket.id)}
                        disabled={isDeleting[ticket.id]}
                      >
                        <Trash2 className="h-3 w-3" />
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-magic-dark/50">
          No se encontraron boletos. {searchTerm ? 'Intenta con otra búsqueda.' : ''}
        </div>
      )}
    </div>
  );
};

export default TicketsTable;