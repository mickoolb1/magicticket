export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  price: number;
  instructor: string;
  image: string;
  description: string;
  longDescription: string;
  capacity: number;
  availableTickets: number;
  tags: string[];
};

export const events: Event[] = [
  {
    id: '1',
    title: 'Entre Diosas y Volcanes',
    date: '17 de Mayo, 2025',
    time: '16:00 a 22:00 Hrs',
    location: 'Serrania Maipo',
    address: 'San Jose de Maipo',
    price: 5000,
    instructor: 'Amar de Volcán, Euffe, Nina Inti, Anitakaren y las Diosas Pélvicas',
    image: '/attached_assets/entre deosas.jpeg',
    description: 'Un evento inolvidable con música, baile, y mucho más en un entorno natural único.',
    longDescription: `✨ ENTRE DIOSAS Y VOLCANES ✨

🗓️ Sábado 17 de mayo de 2025
⏰ 16:00 a 22:00 Hrs
📍 Serrania Maipo
   San Jose de Maipo

💫 UN VIAJE HACIA TU PODER INTERIOR 💫

Te invitamos a una experiencia mágica que fusiona arte, música y danza en un entorno natural incomparable. Una tarde diseñada para despertar tu esencia, conectar con tu poder interior y celebrar la vida en su máxima expresión.

🌟 ARTISTAS INVITAD@S 🌟

• AMAR DE VOLCÁN •
Artista multidisciplinaria que fusiona danza y música con gran autenticidad, creando una experiencia única y transformadora.

• EUFFE •
Un viaje sonoro a través del R&B, pop y ritmos urbanos que te invitará a reflexionar y sanar con música profunda y emocional.

•Dj Urania•
Artista multidisciplinaria, Dj de música electrónica desde el 2021 
Especializada en Ecstatic Dance, dedicada a compartir momentos de mágia sonora principalmente en spot naturales y atardeceres.

• NINA INTI •
Cantante, actriz y bailarina de raíces quechua. Su música fusiona lo ancestral con lo moderno, transmitiendo un poderoso mensaje de liberación.

• ANITAKAREN Y LAS DIOSAS PÉLVICAS •
Un colectivo que celebra el empoderamiento femenino y la conexión profunda con el cuerpo a través de la medicina pélvica y danza.

🔥 EXPERIENCIA ESPECIAL 🔥

CEREMONIA RITUAL AVE FÉNIX
Un espacio sagrado de renovación energética y purificación que elevará tu experiencia a otro nivel.

✨ TU TICKET INCLUYE ✨

• Acceso completo a todos los shows
• Participación en actividades artísticas
• Espacio seguro y acogedor
• Experiencia transformadora única

👗 RECOMENDACIONES 👗

• Ropa cómoda y calzado adecuado
• ¡Toda tu energía y disposición!

💫 ¿POR QUÉ NO TE LO PUEDES PERDER? 💫

Este no es solo un evento... es una invitación a:
• Reconectar con tu esencia
• Liberarte de las cargas cotidianas
• Descubrir tu fuerza interior
• Ser parte de una comunidad mágica
• Transformar cuerpo, mente y alma

"Entre Diosas y Volcanes" es tu oportunidad de vivir el presente con intensidad, escuchar tu voz interior y ser parte de una experiencia colectiva única. 

✨ ¡Nos vemos el 17 de mayo para despertar junt@s nuestra magia interior! ✨`,
    capacity: 100,
    availableTickets: 80,
    tags: ['Música', 'Baile', 'Ceremonia', 'Danza']
  }
];

export const getEvent = (id: string): Event | undefined => {
  return events.find(event => event.id === id);
};