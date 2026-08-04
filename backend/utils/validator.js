/**
 * Payload Validator for Bouquet Builder API
 */
export function validatePayload(rawPayload = {}) {
  return {
    flowers: Array.isArray(rawPayload.flowers) && rawPayload.flowers.length > 0
      ? rawPayload.flowers
      : ["6 Velvet Red Roses", "3 White Lilies"],
    leaves: Array.isArray(rawPayload.leaves) ? rawPayload.leaves : ["Eucalyptus", "Fern"],
    wrap: rawPayload.wrap || "Luxury Korean Pink Wrap",
    ribbon: rawPayload.ribbon || "Satin Pink Ribbon",
    card: rawPayload.card || "Happy Birthday Sneha ❤️",
    decorations: Array.isArray(rawPayload.decorations) ? rawPayload.decorations : ["Floating Sparkles"],
    occasion: rawPayload.occasion || "Birthday",
    theme: rawPayload.theme || "Dark Luxury Studio",
    size: rawPayload.size || "Standard Florist Dome"
  };
}
