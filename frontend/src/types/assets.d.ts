declare module "*.png" {
  const src: string;
  export default src;
}
declare module "*.svg" {
  const src: string; // URL string (we're not using an SVG-to-Vue loader)
  export default src;
}
