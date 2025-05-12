
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Ticket } from '@/utils/ticketUtils';

interface CustomerTicketsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTickets: Ticket[];
  customerEmail: string;
  onViewTicketDetail: (ticket: Ticket) => void;
}

const CustomerTicketsDialog: React.FC<CustomerTicketsDialogProps> = ({ 
  open, 
  onOpenChange, 
  selectedTickets, 
  customerEmail, 
  onViewTicketDetail 
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Boletos Generados</DialogTitle>
          <DialogDescription>
            Boletos generados para: {customerEmail}
          </DialogDescription>
        </DialogHeader>
        
        {selectedTickets.length > 0 ? (
          <div className="overflow-y-auto max-h-[70vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Boleto</TableHead>
                  <TableHead>Evento</TableHead>
                  <TableHead>Fecha Evento</TableHead>
                  <TableHead>Lugar</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-mono text-xs">{ticket.id}</TableCell>
                    <TableCell>{ticket.eventName}</TableCell>
                    <TableCell>{new Date(ticket.eventDate).toLocaleDateString()}</TableCell>
                    <TableCell>{ticket.eventLocation}</TableCell>
                    <TableCell>${ticket.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${ticket.used ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {ticket.used ? 'Utilizado' : 'No utilizado'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1 bg-magic-light border-magic hover:bg-magic/10 text-magic-dark"
                        onClick={() => onViewTicketDetail(ticket)}
                      >
                        <Eye className="h-3 w-3" />
                        Ver Detalle
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="py-8 text-center text-magic-dark/70">
            No se encontraron boletos para este cliente.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CustomerTicketsDialog;
