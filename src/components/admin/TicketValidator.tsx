import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, QrCode, Upload } from 'lucide-react';
import { Ticket, validateTicket, extractTicketIdFromQR, decodeQRCode } from '@/utils/ticketUtils';
import { useToast } from '@/hooks/use-toast';
import { Html5Qrcode } from "html5-qrcode"; // Import the library

interface TicketValidatorProps {
  validationResult: {
    valid: boolean;
    message: string;
    ticket?: Ticket;
  } | null;
  setValidationResult: React.Dispatch<React.SetStateAction<{
    valid: boolean;
    message: string;
    ticket?: Ticket;
  } | null>>;
}

const TicketValidator: React.FC<TicketValidatorProps> = ({ 
  validationResult, 
  setValidationResult 
}) => {
  const { toast } = useToast();
  const [ticketId, setTicketId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleValidateTicket = () => {
    if (!ticketId.trim()) {
      toast({
        title: "Error de validación",
        description: "Por favor, ingresa un ID de boleto válido.",
        variant: "destructive"
      });
      return;
    }

    const result = validateTicket(ticketId);
    setValidationResult(result);

    toast({
      title: result.valid ? "Boleto Válido" : "Boleto Inválido",
      description: result.message,
      variant: result.valid ? "default" : "destructive"
    });
  };


  const handleScanQR = () => {
    setIsScanning(true);
    const html5QrcodeScanner = new Html5Qrcode("qr-reader");

    html5QrcodeScanner.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      async (decodedText) => {
        try {
          const extractedTicketId = extractTicketIdFromQR(decodedText);

          if (extractedTicketId) {
            setTicketId(extractedTicketId);
            const result = validateTicket(extractedTicketId);
            setValidationResult(result);

            toast({
              title: "Código QR escaneado",
              description: `ID de boleto extraído: ${extractedTicketId}`,
              variant: "default"
            });

            // Stop scanning after successful read
            html5QrcodeScanner.stop();
            setIsScanning(false);
          }
        } catch (error) {
          console.error("Error processing QR code:", error);
          toast({
            title: "Error",
            description: "Error al procesar el código QR",
            variant: "destructive"
          });
        }
      },
      (error) => {
        console.warn(`QR Code scanning error: ${error}`);
      }
    ).catch((err) => {
      console.error("Error starting QR scanner:", err);
      toast({
        title: "Error",
        description: "No se pudo iniciar el escáner de QR",
        variant: "destructive"
      });
      setIsScanning(false);
    });
  };

  const stopScanning = () => {
    const html5QrcodeScanner = new Html5Qrcode("qr-reader");
    html5QrcodeScanner.stop().then(() => {
      setIsScanning(false);
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow-md border border-magic-light p-6">
        <h2 className="text-xl font-bold text-magic-dark mb-4">Validar Boleto</h2>
        <p className="text-magic-dark/70 mb-6">
          Ingresa el ID del boleto o escanea el código QR para validar su autenticidad.
        </p>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ingresa el ID del boleto"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              className="border-magic-light"
            />
            <Button onClick={handleValidateTicket} className="magic-button whitespace-nowrap">
              Validar Boleto
            </Button>
          </div>

          <div className="border border-dashed border-magic-light rounded-lg p-4">
            <h3 className="font-semibold text-magic-dark mb-3 flex items-center">
              <QrCode className="h-4 w-4 mr-2 text-magic" />
              Escanear Código QR
            </h3>

            <div id="qr-reader" className="mb-3"></div> {/*Added div for QR reader*/}

            <Button 
              onClick={handleScanQR} 
              disabled={isScanning}
              className="w-full magic-button flex items-center justify-center gap-2"
            >
              {isScanning ? (
                <span>Detener Escaneo</span>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Escanear QR y Extraer ID
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-magic-light p-6">
        <h2 className="text-xl font-bold text-magic-dark mb-4">Resultado de Validación</h2>

        {validationResult ? (
          <div>
            <div className="flex items-center mb-4">
              {validationResult.valid ? (
                <CheckCircle className="h-8 w-8 text-green-500 mr-2" />
              ) : (
                <XCircle className="h-8 w-8 text-red-500 mr-2" />
              )}
              <div>
                <h3 className={`font-bold ${validationResult.valid ? 'text-green-600' : 'text-red-600'}`}>
                  {validationResult.valid ? 'Boleto Válido' : 'Boleto Inválido'}
                </h3>
                <p className="text-magic-dark/70">{validationResult.message}</p>
              </div>
            </div>

            {validationResult.ticket && (
              <div className="bg-magic-light/30 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-black mb-2">Detalles del Boleto</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-black font-medium">ID:</span>
                    <span className="text-black font-mono">{validationResult.ticket.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black font-medium">Evento:</span>
                    <span className="text-black">{validationResult.ticket.eventName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black font-medium">Asistente:</span>
                    <span className="text-black">{validationResult.ticket.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black font-medium">Email:</span>
                    <span className="text-black">{validationResult.ticket.customerEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black font-medium">Fecha de compra:</span>
                    <span className="text-black">{new Date(validationResult.ticket.purchaseDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black font-medium">Estado:</span>
                    <span className={validationResult.ticket.used ? 'text-red-500' : 'text-green-500'}>
                      {validationResult.ticket.used ? 'Utilizado' : 'No utilizado'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-magic-dark/50">
            No hay resultados para mostrar. Valida un boleto para ver su información.
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketValidator;