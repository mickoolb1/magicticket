
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ThumbsUp, ThumbsDown, Eye, Trash2 } from 'lucide-react';
import { 
  PendingTicket, 
  approvePendingTicket, 
  rejectPendingTicket, 
  deletePendingTicket,
  getAllTickets, 
  getPendingTickets 
} from '@/utils/ticketUtils';
import { useToast } from '@/hooks/use-toast';

interface PendingTicketsProps {
  pendingTickets: PendingTicket[];
  setPendingTickets: React.Dispatch<React.SetStateAction<PendingTicket[]>>;
  setTickets: React.Dispatch<React.SetStateAction<any[]>>;
  viewGeneratedTickets: (customerEmail: string) => void;
}

const PendingTickets: React.FC<PendingTicketsProps> = ({ 
  pendingTickets,
  setPendingTickets,
  setTickets,
  viewGeneratedTickets
}) => {
  const { toast } = useToast();
  const [pendingSearchTerm, setPendingSearchTerm] = useState('');
  const [isApproving, setIsApproving] = useState<{[key: string]: boolean}>({});
  const [isDeleting, setIsDeleting] = useState<{[key: string]: boolean}>({});

  const handleApproveTicket = async (pendingTicket: PendingTicket) => {
    setIsApproving({...isApproving, [pendingTicket.id]: true});
    
    try {
      await approvePendingTicket(pendingTicket.id);
      
      const loadedTickets = getAllTickets();
      const loadedPendingTickets = getPendingTickets();
      setTickets(loadedTickets);
      setPendingTickets(loadedPendingTickets);
      
      toast({
        title: "Pago aprobado",
        description: `Se han generado ${pendingTicket.quantity} boleto(s) para ${pendingTicket.customerName}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al aprobar el pago",
        variant: "destructive"
      });
    } finally {
      setIsApproving({...isApproving, [pendingTicket.id]: false});
    }
  };

  const handleRejectTicket = async (pendingTicket: PendingTicket) => {
    setIsApproving({...isApproving, [pendingTicket.id]: true});
    
    try {
      await rejectPendingTicket(pendingTicket.id);
      
      const loadedPendingTickets = getPendingTickets();
      setPendingTickets(loadedPendingTickets);
      
      toast({
        title: "Pago rechazado",
        description: `La solicitud de ${pendingTicket.customerName} ha sido rechazada`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al rechazar el pago",
        variant: "destructive"
      });
    } finally {
      setIsApproving({...isApproving, [pendingTicket.id]: false});
    }
  };

  const handleDeletePendingTicket = (pendingTicket: PendingTicket) => {
    setIsDeleting({...isDeleting, [pendingTicket.id]: true});
    
    try {
      const success = deletePendingTicket(pendingTicket.id);
      
      if (success) {
        const loadedPendingTickets = getPendingTickets();
        setPendingTickets(loadedPendingTickets);
        
        toast({
          title: "Solicitud eliminada",
          description: `La solicitud ha sido eliminada correctamente`,
        });
      } else {
        toast({
          title: "Error",
          description: "No se pudo eliminar la solicitud",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al eliminar la solicitud",
        variant: "destructive"
      });
    } finally {
      setIsDeleting({...isDeleting, [pendingTicket.id]: false});
    }
  };

  const filteredPendingTickets = pendingTickets.filter(ticket => 
    ticket.id.toLowerCase().includes(pendingSearchTerm.toLowerCase()) ||
    ticket.customerName.toLowerCase().includes(pendingSearchTerm.toLowerCase()) ||
    ticket.customerEmail.toLowerCase().includes(pendingSearchTerm.toLowerCase()) ||
    ticket.eventName.toLowerCase().includes(pendingSearchTerm.toLowerCase()) ||
    ticket.paymentReference.toLowerCase().includes(pendingSearchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-md border border-magic-light p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-magic-dark">Pagos Pendientes de Aprobación</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-magic-dark/50 h-4 w-4" />
          <Input
            placeholder="Buscar solicitudes..."
            value={pendingSearchTerm}
            onChange={(e) => setPendingSearchTerm(e.target.value)}
            className="pl-10 border-magic-light"
          />
        </div>
      </div>
      
      {filteredPendingTickets.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-magic-light/30">
              <tr>
                <th className="px-4 py-3 text-left text-black font-bold">Referencia</th>
                <th className="px-4 py-3 text-left text-black font-bold">Evento</th>
                <th className="px-4 py-3 text-left text-black font-bold">Cliente</th>
                <th className="px-4 py-3 text-left text-black font-bold">Email</th>
                <th className="px-4 py-3 text-left text-black font-bold">Cantidad</th>
                <th className="px-4 py-3 text-left text-black font-bold">Monto</th>
                <th className="px-4 py-3 text-left text-black font-bold">Fecha Solicitud</th>
                <th className="px-4 py-3 text-center text-black font-bold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-magic-light/50">
              {filteredPendingTickets.map((pendingTicket) => (
                <tr key={pendingTicket.id} className="hover:bg-magic-light/20">
                  <td className="px-4 py-3 font-mono text-black">{pendingTicket.paymentReference}</td>
                  <td className="px-4 py-3 text-black">{pendingTicket.eventName}</td>
                  <td className="px-4 py-3 text-black">{pendingTicket.customerName}</td>
                  <td className="px-4 py-3 text-black">{pendingTicket.customerEmail}</td>
                  <td className="px-4 py-3 text-center text-black">{pendingTicket.quantity}</td>
                  <td className="px-4 py-3 text-black">${(pendingTicket.price * pendingTicket.quantity).toLocaleString()}</td>
                  <td className="px-4 py-3 text-black">{new Date(pendingTicket.requestDate).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      {pendingTicket.status === 'pending' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 bg-green-50 border-green-200 hover:bg-green-100 text-green-700"
                            onClick={() => handleApproveTicket(pendingTicket)}
                            disabled={isApproving[pendingTicket.id]}
                          >
                            <ThumbsUp className="h-3 w-3" />
                            {isApproving[pendingTicket.id] ? 'Procesando' : 'Aprobar'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 bg-red-50 border-red-200 hover:bg-red-100 text-red-700"
                            onClick={() => handleRejectTicket(pendingTicket)}
                            disabled={isApproving[pendingTicket.id]}
                          >
                            <ThumbsDown className="h-3 w-3" />
                            Rechazar
                          </Button>
                        </>
                      )}
                      {pendingTicket.status === 'approved' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700"
                          onClick={() => viewGeneratedTickets(pendingTicket.customerEmail)}
                        >
                          <Eye className="h-3 w-3" />
                          Ver Boletos
                        </Button>
                      )}
                      {pendingTicket.status === 'rejected' && (
                        <span className="text-red-500 text-xs">Rechazado</span>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700"
                        onClick={() => handleDeletePendingTicket(pendingTicket)}
                        disabled={isDeleting[pendingTicket.id]}
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
          No hay pagos pendientes de aprobación. {pendingSearchTerm ? 'Intenta con otra búsqueda.' : ''}
        </div>
      )}
    </div>
  );
};

export default PendingTickets;
