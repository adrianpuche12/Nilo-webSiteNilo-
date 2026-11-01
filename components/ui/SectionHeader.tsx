import { View, Text, StyleSheet } from "react-native";
import { COLOR, FONT, TYPE } from "@/constants/theme";
import { useBreakpoint } from "@/hooks/useBreakpoints";

interface Props {
  eyebrow: string;   // "Servicios" — se muestra en MAYÚSCULAS espaciadas, como "SOLUTIONS" del logo
  title: string;
  description?: string;
}

/**
 * Encabezado único de sección. Reemplaza los 4 estilos distintos de hoy:
 * "NUESTROS SERVICIOS" uppercase 28px, títulos con rayitas a los lados (Productos, n8n),
 * "Experiencia y Proyectos Destacados" 26px centrado y "Contáctanos" 30px.
 * Desktop: título a la izquierda, descripción a la derecha. Mobile: apilado.
 */
export default function SectionHeader({ eyebrow, title, description }: Props) {
  const { isMobile } = useBreakpoint();
  return (
    <View style={[styles.wrap, isMobile && styles.wrapMobile]}>
      <View style={styles.col}>
        <Text style={styles.eyebrow}>{eyebrow.toUpperCase()}</Text>
        <Text style={[styles.title, { fontSize: isMobile ? TYPE.h2.m : TYPE.h2.d, lineHeight: (isMobile ? TYPE.h2.m : TYPE.h2.d) * TYPE.h2.lh }]}>{title}</Text>
      </View>
      {description ? <Text style={[styles.desc, styles.col]}>{description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", alignItems: "flex-end", gap: 48, marginBottom: 56, width: "100%" },
  wrapMobile: { flexDirection: "column", alignItems: "flex-start", gap: 20, marginBottom: 40 },
  col: { flex: 1 },
  eyebrow: { fontFamily: FONT.medium, fontSize: TYPE.eyebrow, letterSpacing: 4.2, color: COLOR.orange },
  title: { fontFamily: FONT.bold, color: COLOR.ink, marginTop: 14, letterSpacing: -0.6 },
  desc: { fontFamily: FONT.light, fontSize: 17, lineHeight: 28, color: COLOR.ink2 },
});
