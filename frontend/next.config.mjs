/** @type {import('next').NextConfig} */
const nextConfig = {
  // Genera la carpeta out/ con HTML/CSS/JS estáticos listos para Apache
  output: "export",

  // Genera out/tasks/index.html en vez de out/tasks.html
  // Necesario para que Apache sirva /tasks correctamente sin reescritura de URLs
  trailingSlash: true,

  // La optimización de imágenes requiere servidor Node.js; se desactiva para export estático
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
