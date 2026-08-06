/**
 * Camera Prompt Component
 * Handles framing, orientation, centering, and studio background.
 */
export function cameraPrompt() {
  return `
Camera:
Front view.
Entire bouquet visible.
Portrait orientation.
Centered.
No cropping.
Bouquet fills 80% of frame.
Luxury florist studio background.
`.trim();
}

export default cameraPrompt;
