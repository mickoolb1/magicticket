import QRCode from 'qrcode';

// Type definition for a ticket
export type Ticket = {
  id: string;
  eventId: string;
  eventName: string;
  customerName: string;
  customerEmail: string;
  purchaseDate: string;
  eventDate: string;
  eventLocation: string;
  price: number;
  qrCode: string;
  used: boolean;
};

// Interfaz para los tickets pendientes
export interface PendingTicket {
  id: string;
  eventId: string;
  eventName: string;
  customerName: string;
  customerEmail: string;
  eventDate: string;
  eventLocation: string;
  price: number;
  quantity: number;
  paymentReference: string;
  paymentProof?: string; // Add this optional field
  requestDate: number;
  status: 'pending' | 'approved' | 'rejected';
}

// Configuración del sistema de boletos
export const TICKET_CONFIG = {
  MAX_TICKETS: "disponible"
};

// Generate a unique ticket ID
export const generateTicketId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `MT-${timestamp}-${randomStr}`;
};

// Generate QR code for a ticket
export const generateQRCode = async (ticketId: string): Promise<string> => {
  try {
    // In a real app, this would include a signature or encryption for security
    const data = JSON.stringify({
      ticketId,
      timestamp: Date.now(),
      secure: true
    });
    
    return await QRCode.toDataURL(data);
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

// Extract ticket ID from QR code data
export const extractTicketIdFromQR = (qrData: string): string | null => {
  try {
    const parsedData = JSON.parse(qrData);
    if (parsedData && parsedData.ticketId) {
      return parsedData.ticketId;
    }
    return null;
  } catch (error) {
    console.error('Error extracting ticket ID from QR:', error);
    return null;
  }
};

// Decode QR code image (in a real app, this would be integrated with a QR scanner library)
export const decodeQRCode = async (qrImage: string): Promise<string | null> => {
  // In a real implementation, you would use a QR code scanner library
  // This is a simplified placeholder that simulates extracting data from QR
  // For demonstration purposes only
  
  try {
    // This is a mock implementation. In a real app, you would use a QR scanner
    // like jsQR, zxing, or a native mobile scanner API
    console.log('Decoding QR image:', qrImage.substring(0, 30) + '...');
    
    // Simulate extracting the QR data
    // In a real implementation, the library would parse the image and extract the data
    return 'This would be the decoded QR data containing the ticket ID';
  } catch (error) {
    console.error('Error decoding QR code:', error);
    return null;
  }
};

// Create a new ticket
export const createTicket = async (
  eventId: string,
  eventName: string,
  customerName: string,
  customerEmail: string,
  eventDate: string,
  eventLocation: string,
  price: number
): Promise<Ticket> => {
  const ticketId = generateTicketId();
  const qrCode = await generateQRCode(ticketId);
  
  const formatDate = (dateStr: string) => {
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    
    const parts = dateStr.split(' ');
    if (parts.length >= 4) {
      const day = parts[0];
      const month = months.indexOf(parts[2].toLowerCase());
      const year = parts[3];
      
      if (month !== -1) {
        return `${day} de ${months[month]} ${year}`;
      }
    }
    return dateStr;
  };

  const ticket: Ticket = {
    id: ticketId,
    eventId,
    eventName,
    customerName,
    customerEmail,
    purchaseDate: new Date().toISOString(),
    eventDate: formatDate(eventDate),
    eventLocation,
    price,
    qrCode,
    used: false
  };
  
  // In a real app, save the ticket to a database
  // For this demo, we'll simulate storing it in localStorage
  const storedTickets = JSON.parse(localStorage.getItem('magicticket_tickets') || '[]');
  storedTickets.push(ticket);
  localStorage.setItem('magicticket_tickets', JSON.stringify(storedTickets));
  
  return ticket;
};

// Validate a ticket
export const validateTicket = (ticketId: string): { valid: boolean; message: string; ticket?: Ticket } => {
  // In a real app, this would validate against a database
  const storedTickets = JSON.parse(localStorage.getItem('magicticket_tickets') || '[]');
  const ticket = storedTickets.find((t: Ticket) => t.id === ticketId);
  
  if (!ticket) {
    return { valid: false, message: 'Boleto no encontrado' };
  }
  
  if (ticket.used) {
    return { valid: false, message: 'Este boleto ya ha sido utilizado', ticket };
  }
  
  // Mark the ticket as used
  ticket.used = true;
  localStorage.setItem('magicticket_tickets', JSON.stringify(storedTickets));
  
  return { valid: true, message: 'Boleto válido', ticket };
};

// Get all tickets (for admin)
export const getAllTickets = (): Ticket[] => {
  return JSON.parse(localStorage.getItem('magicticket_tickets') || '[]');
};

// Get user's tickets by email
export const getUserTickets = (email: string): Ticket[] => {
  const storedTickets = JSON.parse(localStorage.getItem('magicticket_tickets') || '[]');
  return storedTickets.filter((ticket: Ticket) => ticket.customerEmail.toLowerCase() === email.toLowerCase());
};

// Crear un ticket pendiente (solicitud de compra)
export const createPendingTicket = async (
  eventId: string,
  eventName: string,
  customerName: string,
  customerEmail: string,
  eventDate: string,
  eventLocation: string,
  price: number,
  quantity: number,
  paymentReference: string,
  paymentProof?: string
): Promise<PendingTicket> => {
  // Generar un ID único para la solicitud
  const id = `REQ-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`;
  
  // Crear el ticket pendiente
  const pendingTicket: PendingTicket = {
    id,
    eventId,
    eventName,
    customerName,
    customerEmail,
    eventDate,
    eventLocation,
    price,
    quantity,
    paymentReference,
    paymentProof,
    requestDate: Date.now(),
    status: 'pending'
  };
  
  // Guardar en localStorage
  const pendingTickets = getPendingTickets();
  pendingTickets.push(pendingTicket);
  localStorage.setItem('pendingTickets', JSON.stringify(pendingTickets));
  
  return pendingTicket;
};

// Obtener todos los tickets pendientes
export const getPendingTickets = (): PendingTicket[] => {
  const pendingTicketsJSON = localStorage.getItem('pendingTickets');
  if (!pendingTicketsJSON) {
    return [];
  }
  
  try {
    return JSON.parse(pendingTicketsJSON);
  } catch (error) {
    console.error('Error parsing pendingTickets from localStorage:', error);
    return [];
  }
};

// Aprobar un ticket pendiente
export const approvePendingTicket = async (pendingTicketId: string): Promise<Ticket[]> => {
  const pendingTickets = getPendingTickets();
  const pendingTicketIndex = pendingTickets.findIndex(ticket => ticket.id === pendingTicketId);
  
  if (pendingTicketIndex === -1) {
    throw new Error('Ticket pendiente no encontrado');
  }
  
  const pendingTicket = pendingTickets[pendingTicketIndex];
  const generatedTickets: Ticket[] = [];
  
  // Generar los tickets (cantidad solicitada)
  for (let i = 0; i < pendingTicket.quantity; i++) {
    const newTicket = await createTicket(
      pendingTicket.eventId,
      pendingTicket.eventName,
      pendingTicket.customerName,
      pendingTicket.customerEmail,
      pendingTicket.eventDate,
      pendingTicket.eventLocation,
      pendingTicket.price
    );
    generatedTickets.push(newTicket);
  }
  
  // Actualizar el estado del ticket pendiente a 'approved'
  pendingTicket.status = 'approved';
  pendingTickets[pendingTicketIndex] = pendingTicket;
  localStorage.setItem('pendingTickets', JSON.stringify(pendingTickets));
  
  // En una aplicación real, aquí enviaríamos un correo con los boletos
  console.log(`Enviando ${pendingTicket.quantity} boleto(s) a ${pendingTicket.customerEmail}`);
  
  return generatedTickets;
};

// Rechazar un ticket pendiente
export const rejectPendingTicket = async (pendingTicketId: string): Promise<void> => {
  const pendingTickets = getPendingTickets();
  const pendingTicketIndex = pendingTickets.findIndex(ticket => ticket.id === pendingTicketId);
  
  if (pendingTicketIndex === -1) {
    throw new Error('Ticket pendiente no encontrado');
  }
  
  // Actualizar el estado del ticket pendiente a 'rejected'
  pendingTickets[pendingTicketIndex].status = 'rejected';
  localStorage.setItem('pendingTickets', JSON.stringify(pendingTickets));
  
  // En una aplicación real, aquí enviaríamos un correo de rechazo
  console.log(`Notificando rechazo de pago a ${pendingTickets[pendingTicketIndex].customerEmail}`);
};

// Nuevas funciones para borrar boletos y gestionar disponibilidad

// Borrar un ticket específico
export const deleteTicket = (ticketId: string): boolean => {
  const storedTickets = getAllTickets();
  const ticketIndex = storedTickets.findIndex(ticket => ticket.id === ticketId);
  
  if (ticketIndex === -1) {
    return false;
  }
  
  storedTickets.splice(ticketIndex, 1);
  localStorage.setItem('magicticket_tickets', JSON.stringify(storedTickets));
  return true;
};

// Borrar un pago pendiente
export const deletePendingTicket = (pendingTicketId: string): boolean => {
  const pendingTickets = getPendingTickets();
  const pendingTicketIndex = pendingTickets.findIndex(ticket => ticket.id === pendingTicketId);
  
  if (pendingTicketIndex === -1) {
    return false;
  }
  
  pendingTickets.splice(pendingTicketIndex, 1);
  localStorage.setItem('pendingTickets', JSON.stringify(pendingTickets));
  return true;
};

// Obtener resumen de disponibilidad de boletos
export const getTicketAvailability = (): {
  totalCapacity: number;
  sold: number;
  pending: number;
  available: number;
  validated: number;
  pendingValidation: number;
} => {
  const totalCapacity = TICKET_CONFIG.MAX_TICKETS;
  const soldTickets = getAllTickets();
  const validatedTickets = soldTickets.filter(t => t.used).length;
  const pendingValidationTickets = soldTickets.filter(t => !t.used).length;

  // Calcular pendientes (solo los que están en estado "pending")
  const pendingOrders = getPendingTickets().filter(t => t.status === 'pending');
  const pendingQuantity = pendingOrders.reduce((sum, ticket) => sum + ticket.quantity, 0);

  const available = Math.max(0, totalCapacity - soldTickets.length - pendingQuantity);

  return {
    totalCapacity,
    sold: soldTickets.length,
    pending: pendingQuantity,
    available,
    validated: validatedTickets,
    pendingValidation: pendingValidationTickets
  };
};

export const deletePendingTicketPaymentProof = (ticketId: string): void => {
  const pendingTickets = getPendingTickets();
  const ticketIndex = pendingTickets.findIndex(ticket => ticket.id === ticketId);
  
  if (ticketIndex !== -1) {
    // Remove the payment proof but keep the ticket
    pendingTickets[ticketIndex].paymentProof = null;
    localStorage.setItem('pendingTickets', JSON.stringify(pendingTickets));
  } else {
    throw new Error('Ticket not found');
  }
};