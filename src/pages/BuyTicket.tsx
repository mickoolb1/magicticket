import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { getEvent } from '@/data/events';
import { createPendingTicket, getTicketAvailability, TICKET_CONFIG } from '@/utils/ticketUtils';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TicketFAQ from '@/components/FAQ/TicketFAQ';
import { Calendar, MapPin, CreditCard, Mail, User, Minus, Plus, CheckCircle2, CopyIcon, AlertCircle, Clock, X, Upload, Info, Ban } from 'lucide-react';

const BuyTicket = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const eventId = searchParams.get('event');
  const event = eventId ? getEvent(eventId) : null;
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Confirmation
  const [paymentReference, setPaymentReference] = useState('');
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [availability, setAvailability] = useState(getTicketAvailability());

  useEffect(() => {
    if (!event && eventId) {
      toast({
        title: "Evento no encontrado",
        description: "El evento solicitado no está disponible.",
        variant: "destructive"
      });
      navigate('/events');
    }

    setAvailability(getTicketAvailability());
  }, [event, eventId, navigate, toast]);

  useEffect(() => {
    if (step === 2 && customerName) {
      const date = new Date();
      const reference = `MT-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${customerName.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      setPaymentReference(reference);
    }
  }, [step, customerName]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Archivo demasiado grande",
          description: "El tamaño máximo permitido es 5MB",
          variant: "destructive"
        });
        return;
      }

      setPaymentProof(file);

      const reader = new FileReader();
      reader.onloadend = () => {
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    if (!paymentProof) {
      toast({
        title: "Comprobante requerido",
        description: "Por favor, sube una captura de tu comprobante de pago.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const reader = new FileReader();
      reader.readAsDataURL(paymentProof);
      reader.onload = async () => {
        const base64Image = reader.result as string;

        const pendingTicketInfo = await createPendingTicket(
          event.id, 
          event.title, 
          customerName, 
          customerEmail, 
          event.date, 
          event.location, 
          event.price, 
          quantity, 
          paymentReference,
          base64Image
        );

        setStep(3);
        toast({
          title: "¡Solicitud enviada!",
          description: `Tu solicitud de compra ha sido registrada. Recibirás tus boletos por correo una vez que se verifique el pago (1-2 horas).`
        });
      };

      reader.onerror = () => {
        toast({
          title: "Error al procesar la imagen",
          description: "No se pudo procesar el archivo. Intenta con otro formato.",
          variant: "destructive"
        });
        setIsSubmitting(false);
      };
    } catch (error) {
      toast({
        title: "Error en la solicitud",
        description: "Ocurrió un error al procesar tu solicitud. Inténtalo nuevamente.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  const handleCopyToClipboard = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copiado",
        description: message,
        duration: 2000
      });
    } catch (err) {
      console.error('Error al copiar: ', err);
      toast({
        title: "Error",
        description: "No se pudo copiar el texto",
        variant: "destructive"
      });
    }
  };

  if (!event) {
    return <Layout>
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-magic-dark">Selecciona un evento</h1>
            <p className="text-magic-dark/70 mt-2 mb-6">Por favor, selecciona un evento para comprar boletos.</p>
            <Button asChild>
              <a href="/events">Ver Eventos Disponibles</a>
            </Button>
          </div>
        </div>
      </Layout>;
  }

  return (
    <Layout>
      <div className="bg-gradient-to-b from-magic-light/50 to-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className={`flex flex-col items-center ${step >= 1 ? 'text-magic' : 'text-magic-dark/40'}`}>
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${step >= 1 ? 'border-magic bg-magic text-white' : 'border-magic-dark/30'}`}>
                    1
                  </div>
                  <span className="mt-2 text-sm">Detalles</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-magic' : 'bg-magic-dark/20'}`}></div>
                <div className={`flex flex-col items-center ${step >= 2 ? 'text-magic' : 'text-magic-dark/40'}`}>
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${step >= 2 ? 'border-magic bg-magic text-white' : 'border-magic-dark/30'}`}>
                    2
                  </div>
                  <span className="mt-2 text-sm">Pago</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-magic' : 'bg-magic-dark/20'}`}></div>
                <div className={`flex flex-col items-center ${step >= 3 ? 'text-magic' : 'text-magic-dark/40'}`}>
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${step >= 3 ? 'border-magic bg-magic text-white' : 'border-magic-dark/30'}`}>
                    3
                  </div>
                  <span className="mt-2 text-sm">Confirmación</span>
                </div>
              </div>
            </div>

            {step === 1 && (
              <>
                <div className="bg-white rounded-xl shadow-md border border-magic-light overflow-hidden">
                  <div className="p-6 md:p-8">
                    <h1 className="text-2xl font-bold text-magic-dark mb-6">Detalles del Boleto</h1>

                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center text-magic-dark/80">
                          <Calendar className="h-5 w-5 mr-3 text-magic" />
                          <div>
                            <div className="font-medium">Evento</div>
                            <div className="font-semibold text-magic-dark">{event.title}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-magic-dark/80">
                          <Calendar className="h-5 w-5 mr-3 text-magic" />
                          <div>
                            <div className="font-medium">Fecha</div>
                            <div>{event.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-magic-dark/80">
                          <MapPin className="h-5 w-5 mr-3 text-magic" />
                          <div>
                            <div className="font-medium">Ubicación</div>
                            <div>{event.location}</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-magic-light/30 rounded-lg p-4">
                        <h3 className="font-semibold text-magic-dark mb-3">Resumen de compra</h3>

                        <div className="space-y-3">
                          <div className="p-2 bg-blue-50 rounded border border-blue-100">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-blue-700">Boletos disponibles:</span>
                              <span className="font-semibold text-blue-700">Disponibles</span>
                            </div>
                          </div>

                          <div className="p-2 bg-gray-50 rounded border border-gray-100">
                            <div className="space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Precio boleto:</span>
                                <span className="font-semibold text-gray-700">$5.000</span>
                              </div>
                              <div className="flex justify-between items-center pt-1 border-t border-gray-200">
                                <span className="text-sm font-medium text-gray-700">Total por boleto:</span>
                                <span className="font-bold text-magic">$5.000</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mb-3">
                          <span>Valor de entrada:</span>
                          <span className="font-semibold">$5000</span>
                        </div>
                        
                        <div className="p-2 bg-yellow-50 rounded border border-yellow-100 mb-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-yellow-700">Cantidad de boletos:</span>
                            <span className="font-semibold text-yellow-700">{quantity}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span>Cantidad:</span>
                          <div className="flex items-center">
                            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => setQuantity(prev => Math.max(1, prev - 1))} disabled={quantity <= 1}>
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="mx-3 font-semibold">{quantity}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => setQuantity(prev => Math.min(availability.available, prev + 1))} disabled={quantity >= availability.available}>
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="border-t border-magic-light/50 pt-3 flex justify-between items-center">
                          <span className="font-semibold">Total:</span>
                          <span className="text-xl font-bold text-magic">${5000 * quantity}</span>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={e => {
                      e.preventDefault();
                      setStep(2);
                    }}>
                      <div className="bg-magic-light/20 border border-magic-light/40 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-magic-dark mb-2 flex items-center">
                          <AlertCircle className="h-5 w-5 mr-2 text-magic" />
                          Puntos Importantes
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-start mt-2">
                            <X className="h-4 w-4 text-magic/70 mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-magic-dark/80">No hay cambio o devolución de entrada</p>
                          </div>
                          <div className="flex items-start">
                            <Clock className="h-4 w-4 text-magic/70 mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-magic-dark/80">Se recomienda llegar 15 minutos antes del evento</p>
                          </div>
                          <div className="flex items-start">
                            <Ban className="h-4 w-4 text-magic/70 mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-magic-dark/80">Se prohíbe ingresar con alcohol y bebidas al evento</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button type="submit" className="magic-button">
                          Continuar al Pago
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>

                <TicketFAQ />
              </>
            )}

            {step === 2 && (
              <div className="bg-white rounded-xl shadow-md border border-magic-light overflow-hidden">
                <div className="p-6 md:p-8">
                  <h1 className="text-2xl font-bold text-magic-dark mb-6">Información de Pago por Transferencia</h1>

                  <div className="mb-6 space-y-4">
                    <div className="p-4 bg-magic-light/30 rounded-lg">
                      <h3 className="font-semibold text-magic-dark mb-2">Resumen de la orden</h3>
                      <div className="flex justify-between items-center">
                        <span>{quantity} x {event.title}</span>
                        <span className="font-semibold">${(5000 + 990) * quantity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-magic-light/10 border border-magic-light/50 rounded-lg p-5 mb-6">
                    <div className="flex items-center text-magic mb-4">
                      <AlertCircle className="mr-2 h-5 w-5" />
                      <h3 className="font-medium">Instrucciones de pago</h3>
                    </div>

                    <p className="text-magic-dark/80 mb-4">
                      Para completar tu compra, realiza una transferencia bancaria con los siguientes datos:
                    </p>

                    <div className="space-y-4">
                      <div className="bg-magic-dark/60 rounded-md p-3 border border-magic/30 text-white">
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Banco:</span>
                          <div className="flex items-center">
                            <span className="font-semibold">Mercado Pago</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2 text-magic-gold hover:text-magic-gold/80" onClick={() => handleCopyToClipboard("Mercado Pago", "Nombre del banco copiado")}>
                              <CopyIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-magic-dark/60 rounded-md p-3 border border-magic/30 text-white">
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Titular:</span>
                          <div className="flex items-center">
                            <span className="font-semibold">Ymairy del Carmen Arrivillaga Monsalve</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2 text-magic-gold hover:text-magic-gold/80" onClick={() => handleCopyToClipboard("Ymairy del Carmen Arrivillaga Monsalve", "Nombre del titular copiado")}>
                              <CopyIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-magic-dark/60 rounded-md p-3 border border-magic/30 text-white">
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">RUT:</span>
                          <div className="flex items-center">
                            <span className="font-semibold">255211544</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2 text-magic-gold hover:text-magic-gold/80" onClick={() => handleCopyToClipboard("255211544", "RUT copiado")}>
                              <CopyIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-magic-dark/60 rounded-md p-3 border border-magic/30 text-white">
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Tipo de cuenta:</span>
                          <div className="flex items-center">
                            <span className="font-semibold">Cuenta Vista</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2 text-magic-gold hover:text-magic-gold/80" onClick={() => handleCopyToClipboard("Cuenta Vista", "Tipo de cuenta copiado")}>
                              <CopyIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-magic-dark/60 rounded-md p-3 border border-magic/30 text-white">
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Número:</span>
                          <div className="flex items-center">
                            <span className="font-semibold">1025996448</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2 text-magic-gold hover:text-magic-gold/80" onClick={() => handleCopyToClipboard("1025996448", "Número de cuenta copiado")}>
                              <CopyIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-magic-dark/60 rounded-md p-3 border border-magic/30 text-white">
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Email:</span>
                          <div className="flex items-center">
                            <span className="font-semibold">patagonia.luztribal@gmail.com</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2 text-magic-gold hover:text-magic-gold/80" onClick={() => handleCopyToClipboard("patagonia.luztribal@gmail.com", "Email copiado")}>
                              <CopyIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-md p-3 border border-magic-light">
                        <div className="flex justify-between items-center">
                          <span className="text-magic-dark/70">Monto:</span>
                          <div className="flex items-center">
                            <span className="font-semibold text-magic">${5000 * quantity}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => handleCopyToClipboard(`${5000 * quantity}`, "Monto copiado")}>
                              <CopyIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-md p-3 border border-magic-light">
                        <div className="flex justify-between items-center">
                          <span className="text-magic-dark/70">Referencia:</span>
                          <div className="flex items-center">
                            <span className="font-semibold text-magic">{paymentReference}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => handleCopyToClipboard(paymentReference, "Referencia copiada")}>
                              <CopyIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
                      <p className="text-sm font-medium flex items-start">
                        <Clock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <span className="font-bold">Importante: </span> 
                          Incluye el comprobante en tu transferencia en el formulario . La verificación del pago toma de 1 a 2 horas y recibirás tus boletos por correo una vez aprobada.
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-magic-dark mb-3">Comprobante de Pago</h3>
                    <div className="border-2 border-dashed border-magic-light/50 rounded-lg p-6 text-center">
                      <p className="text-magic-dark/70 mb-3">
                        una vez realizada la transferencia, debes llenar el formulario para recibir tu entrada , adjunta tu comprobante de pago en el formulario
                      </p>
                      <Button 
                        variant="outline" 
                        className="border-magic text-magic hover:bg-magic-light"
                        onClick={() => window.open('https://forms.gle/CYRnchYgLSLa7SCQ6', '_blank')}
                      >
                        Ir al Formulario
                      </Button>
                      {paymentProof && (
                        <div className="mt-3 p-2 bg-magic-light/20 rounded text-magic-dark">
                          <p>Archivo seleccionado: {paymentProof.name}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="border-magic hover:bg-magic-light">
                      Volver
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-xl shadow-md border border-magic-light overflow-hidden">
                <div className="p-6 md:p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-magic-light rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-8 w-8 text-magic" />
                    </div>
                  </div>

                  <h1 className="text-2xl font-bold text-magic-dark mb-2">¡Solicitud Enviada!</h1>
                  <p className="text-magic-dark/70 mb-8 max-w-md mx-auto">
                    Muchas gracias , Hemos registrado tu solicitud de compra, toma una captura de tu solicitud. Un administrador verificará tu pago en un periodo de 1 a 2 horas y te enviaremos tus boletos al correo electrónico  <strong>{customerEmail}</strong>.
                  </p>

                  <div className="bg-magic-light/30 rounded-lg p-4 mb-8 max-w-md mx-auto">
                    <h3 className="font-semibold text-magic-dark mb-3">Detalles de tu solicitud:</h3>
                    <div className="text-left space-y-2">
                      <div className="flex justify-between">
                        <span className="text-black font-medium">Referencia:</span>
                        <span className="font-mono text-black">{paymentReference}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black font-medium">Evento:</span>
                        <span className="text-black">{event.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black font-medium">Cantidad:</span>
                        <span className="text-black">{quantity} boleto(s)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black font-medium">Total:</span>
                        <span className="font-semibold text-black">${(5000 + 990) * quantity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button onClick={() => navigate('/events')} className="magic-button">
                      Explorar más eventos
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BuyTicket;