
import React, { useState } from 'react';
import { PendingTicket } from '@/utils/ticketUtils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, FileImage, AlertCircle, CheckCircle, XCircle, Trash2, Download } from 'lucide-react';
import { toast } from 'sonner';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PaymentScreenshotsProps {
  pendingTickets: PendingTicket[];
  onDelete?: (ticketId: string) => void;
}

const PaymentScreenshots: React.FC<PaymentScreenshotsProps> = ({ pendingTickets, onDelete }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // Filter tickets that have payment proof
  const ticketsWithProof = pendingTickets.filter(ticket => ticket.paymentProof);

  const viewImage = (imageData: string, ticketId: string) => {
    setSelectedImage(imageData);
    setSelectedTicketId(ticketId);
    setOpenDialog(true);
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTicketId && onDelete) {
      onDelete(selectedTicketId);
      setOpenDialog(false);
      setOpenDeleteDialog(false);
      toast.success("Comprobante eliminado correctamente");
    }
  };

  const handleImageError = () => {
    toast.error("Error al cargar la imagen. El formato podría no ser compatible.", {
      description: "Intente con otro formato de imagen como JPG o PNG."
    });
  };

  const downloadImage = () => {
    if (!selectedImage) return;
    
    // Creating a temporary link to download the image
    const link = document.createElement('a');
    link.href = selectedImage;
    link.download = `comprobante-pago-${selectedTicketId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Imagen descargada correctamente");
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-magic-light p-6">
      <h2 className="text-xl font-bold text-magic-dark mb-4">Comprobantes de Pago</h2>
      
      {ticketsWithProof.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Referencia</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Comprobante</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ticketsWithProof.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-mono">{ticket.paymentReference}</TableCell>
                <TableCell>{ticket.customerName}</TableCell>
                <TableCell>{ticket.customerEmail}</TableCell>
                <TableCell>{new Date(ticket.requestDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit
                    ${ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      ticket.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {ticket.status === 'pending' ? (
                      <>
                        <AlertCircle className="h-3 w-3" />
                        Pendiente
                      </>
                    ) : ticket.status === 'approved' ? (
                      <>
                        <CheckCircle className="h-3 w-3" />
                        Aprobado
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3" />
                        Rechazado
                      </>
                    )}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => viewImage(ticket.paymentProof!, ticket.id)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <FileImage className="h-3.5 w-3.5" />
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8 text-magic-dark/50 flex flex-col items-center">
          <FileImage className="h-12 w-12 text-magic-dark/30 mb-3" />
          <p>No hay comprobantes de pago disponibles.</p>
          <p className="text-sm text-magic-dark/40 max-w-md mt-1">
            Los comprobantes enviados por los clientes aparecerán aquí para su revisión.
          </p>
        </div>
      )}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Comprobante de Pago</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            {selectedImage ? (
              <div className="relative w-full">
                <img 
                  src={selectedImage} 
                  alt="Comprobante de pago" 
                  className="max-h-[70vh] object-contain mx-auto border rounded-md"
                  onError={handleImageError}
                />
                <div className="mt-4 flex justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={downloadImage}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Descargar imagen
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteClick}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Eliminar comprobante
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-magic-dark/50 flex flex-col items-center">
                <FileImage className="h-16 w-16 text-magic-dark/30 mb-3" />
                <p>No se pudo cargar la imagen</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente el comprobante de pago y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PaymentScreenshots;
