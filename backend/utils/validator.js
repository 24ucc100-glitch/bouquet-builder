/**
 * Bouquet Payload Validator & JSON Formatter
 * Converts raw user selections into structured JSON objects.
 */
export function validatePayload(rawPayload = {}) {
  let formattedFlowers = [];

  if (Array.isArray(rawPayload.flowers) && rawPayload.flowers.length > 0) {
    formattedFlowers = rawPayload.flowers.map(f => {
      if (typeof f === 'object' && f !== null && f.type && f.count) {
        return { type: String(f.type), count: Number(f.count) };
      }
      if (typeof f === 'string') {
        const match = f.match(/^(\d+)\s+(.+)$/);
        if (match) {
          return { count: parseInt(match[1], 10), type: match[2].trim() };
        }
        return { count: 1, type: f.trim() };
      }
      return { count: 1, type: 'flower' };
    });
  } else {
    formattedFlowers = [
      { type: 'rose', count: 6 },
      { type: 'lily', count: 3 }
    ];
  }

  const greenery = Array.isArray(rawPayload.leaves) ? rawPayload.leaves : ['Eucalyptus', 'Fern'];
  const wrap = rawPayload.wrap || 'Luxury Korean Pink Wrap';
  const ribbon = rawPayload.ribbon || 'Satin Pink Ribbon';
  const card = rawPayload.card || 'Happy Birthday Sneha ❤️';

  return {
    flowers: formattedFlowers,
    greenery: greenery,
    wrap: wrap,
    ribbon: ribbon,
    card: card
  };
}
