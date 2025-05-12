
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, Phone, Check } from 'lucide-react';

const TicketFAQ = () => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-magic-light p-6 md:p-8 mt-8">
      <h2 className="text-2xl font-bold text-magic-dark mb-6">Preguntas Frecuentes</h2>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left font-medium text-magic-dark">
            Si no me llega la entrada al mail, ¿Qué debo hacer?
          </AccordionTrigger>
          <AccordionContent className="text-magic-dark/80">
            <p className="flex items-start gap-2">
              <Phone className="h-4 w-4 text-magic mt-1 flex-shrink-0" />
              <span>Debes enviar un WhatsApp a <a href="tel:+56945835342" className="text-magic hover:underline">+56 945 835 342</a> indicando el nombre y rut del comprador.</span>
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-left font-medium text-magic-dark">
            ¿Qué debo presentar en la puerta del establecimiento?
          </AccordionTrigger>
          <AccordionContent className="text-magic-dark/80">
            <p className="flex items-start gap-2">
              <Check className="h-4 w-4 text-magic mt-1 flex-shrink-0" />
              <span>Debes mostrar la entrada que llegó a tu mail, desde tu celular, no es necesario imprimir el ticket.</span>
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-left font-medium text-magic-dark">
            ¿Con cuánto tiempo de anticipación debo llegar al show?
          </AccordionTrigger>
          <AccordionContent className="text-magic-dark/80">
            <p className="flex items-start gap-2">
              <Check className="h-4 w-4 text-magic mt-1 flex-shrink-0" />
              <span>Por lo menos debes llegar 15 minutos antes del inicio del show.</span>
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TicketFAQ;
