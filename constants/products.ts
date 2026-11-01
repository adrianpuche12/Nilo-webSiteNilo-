/**
 * Productos propios de Nilo Solutions (sección "Nuestros productos").
 * Única fuente de datos: para sumar o cambiar un producto se edita solo este archivo.
 * Actualizado: 01-Nov-2026.
 */

export type NiloProduct = {
  id: string;
  name: string;
  /** Frase corta (una línea). */
  tagline: string;
  description: string;
  /** Para quién es. */
  audience: string;
  /** Etiquetas cortas: tipo de producto / plataforma. */
  tags: string[];
  url: string;
  cta: string;
  /** Color de marca del producto (badge del ícono). */
  color: string;
  /** Color del texto sobre `color`. */
  onColor: string;
  /** Inicial o sigla que se muestra en el badge. */
  initial: string;
};

export const NILO_PRODUCTS: NiloProduct[] = [
  {
    id: "belopia",
    name: "Belopia",
    tagline: "Tu negocio, en orden.",
    description:
      "Gestión de locales en la nube: ventas por turno con cierre de caja, inventario por local, finanzas, gastos y pagos, con roles y permisos a medida de cada negocio.",
    audience: "Restaurantes, cafeterías, tiendas y comercios con uno o varios locales.",
    tags: ["SaaS", "Web y celular"],
    url: "https://belopia.app",
    cta: "Conocer Belopia",
    color: "#F5C430",
    onColor: "#1F1B16",
    initial: "B",
  },
  {
    id: "lexiius",
    name: "Lexiius",
    tagline: "IA para tu trabajo, sin exponer datos confidenciales.",
    description:
      "Anonimiza automáticamente tus documentos antes de que la inteligencia artificial los lea, para usar IA con contratos y expedientes sin comprometer a ningún cliente.",
    audience: "Abogados, contadores y profesionales que trabajan con información confidencial.",
    tags: ["SaaS", "IA"],
    url: "https://lexiius.com",
    cta: "Conocer Lexiius",
    color: "#1E4D8C",
    onColor: "#FFFFFF",
    initial: "L",
  },
  {
    id: "propero",
    name: "Propero",
    tagline: "Gestión inmobiliaria inteligente.",
    description:
      "Centraliza la relación entre la inmobiliaria, propietarios, inquilinos y proveedores: clientes, propiedades, contratos y reclamos de mantenimiento de punta a punta.",
    audience: "Inmobiliarias que administran alquileres.",
    tags: ["SaaS", "Panel web"],
    url: "http://62.171.160.238:8084",
    cta: "Conocer Propero",
    color: "#1A6B5A",
    onColor: "#FFFFFF",
    initial: "P",
  },
  {
    id: "propero-app",
    name: "App Propero",
    tagline: "La inmobiliaria en el bolsillo.",
    description:
      "La app mobile de Propero: el inquilino reporta problemas con fotos y videos, el proveedor gestiona sus trabajos y el propietario sigue lo que pasa en su propiedad.",
    audience: "Inquilinos, propietarios y proveedores de servicios.",
    tags: ["App mobile", "Android"],
    url: "http://62.171.160.238:8084/descargar",
    cta: "Ver la app",
    color: "#4CAF7D",
    onColor: "#0F2E25",
    initial: "P",
  },
];
