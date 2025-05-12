import React from 'react';
import { 
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { 
  User, 
  Calendar, 
  MapPin, 
  Fingerprint,
  Download
} from 'lucide-react';
import { Ticket } from '@/utils/ticketUtils';
import html2canvas from 'html2canvas';

interface TicketDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTicket: Ticket | null;
}

const TicketDetailDialog: React.FC<TicketDetailDialogProps> = ({ 
  open, 
  onOpenChange, 
  selectedTicket 
}) => {
  if (!selectedTicket) return null;

  const handleDownloadTicket = async () => {
    const ticketElement = document.getElementById('ticket-content');
    if (ticketElement) {
      const canvas = await html2canvas(ticketElement);
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `ticket-${selectedTicket.id}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Boleto: {selectedTicket.id}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div id="ticket-content" className="bg-gradient-to-br from-magic/10 via-white to-magic-light/20 p-6 rounded-lg shadow-lg border border-magic/30">
            <div className="flex items-center gap-4">
              <div className="w-32 h-32">
                <img src={selectedTicket.qrCode} alt="Código QR" className="w-full h-full object-contain p-2 bg-white rounded-lg shadow-inner" />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-black mb-2">
                  {selectedTicket.eventName}
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-magic" />
                    <span className="font-medium text-black">{selectedTicket.customerName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-magic" />
                    <span className="text-black">
                      17 de mayo de 2025
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-magic" />
                    <span className="text-black">{selectedTicket.eventLocation}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-dashed border-magic-light/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Fingerprint className="h-4 w-4 text-magic" />
                  <span className="text-xs text-black">ID del Boleto:</span>
                </div>
                <span className="font-mono text-sm font-semibold text-black">{selectedTicket.id}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button 
              onClick={handleDownloadTicket}
              className="magic-button flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Descargar Boleto
            </Button>
            <Button 
              onClick={() => onOpenChange(false)}
              variant="outline"
            >
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDetailDialog;