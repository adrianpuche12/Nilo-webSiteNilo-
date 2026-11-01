/**
 * theme.ts — tokens de marca de Nilo Solutions.
 * Única fuente de colores, tipografía y espaciado. Reemplaza los hex sueltos
 * (#ff6b35, #000, #ccc, #aaa, #1a1a1a...) repetidos en cada archivo.
 * La identidad NO cambia: negro, naranja #ff6b35, blanco, Roboto, logo.
 */
export const COLOR = {
  bg: "#000000",
  bgRaised: "#0B0B0B",
  card: "#101010",
  cardHover: "#151515",
  line: "rgba(255,255,255,0.08)",
  lineStrong: "rgba(255,255,255,0.16)",
  ink: "#FFFFFF",
  ink2: "#B8B8B8",
  ink3: "#8A8A8A",
  orange: "#FF6B35",
  orangeHover: "#FF8255",
  orangeSoft: "rgba(255,107,53,0.12)",
  orangeBorder: "rgba(255,107,53,0.45)",
  onOrange: "#000000",
  success: "#4ADE80",
} as const;

/** Familias cargadas en app/_layout.tsx (ver README §1). */
export const FONT = {
  light: "Roboto_300Light",
  regular: "Roboto_400Regular",
  medium: "Roboto_500Medium",
  bold: "Roboto_700Bold",
  mono: "RobotoMono_400Regular",
} as const;

export const SPACE = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 14: 56, 18: 72, 28: 112 } as const;
export const RADIUS = { md: 10, lg: 12, xl: 16, pill: 999 } as const;
export const MAX_WIDTH = 1200;

/** Escala tipográfica (desktop / mobile). */
export const TYPE = {
  hero: { d: 72, m: 40, lh: 1.04 },
  h2: { d: 44, m: 30, lh: 1.12 },
  h3: { d: 20, m: 19, lh: 1.3 },
  lead: { d: 20, m: 17, lh: 1.6 },
  body: 15,
  small: 13,
  eyebrow: 13,
} as const;

/** Mismo criterio de breakpoints en toda la web (hoy hay 3 hooks distintos). */
export const BP = { mobile: 820, tablet: 1024 } as const;
