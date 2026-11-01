import { useState } from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import SectionHeader from "@/components/ui/SectionHeader";
import { COLOR, FONT, MAX_WIDTH, RADIUS } from "@/constants/theme";
import { useBreakpoint } from "@/hooks/useBreakpoints";

type FeatherName = keyof typeof Feather.glyphMap;

interface Service {
  id: number;
  title: string;
  icon: FeatherName;
  description: string;
}

const SERVICES: Service[] = [
  {
    id: 1,
    title: "Diseño UI/UX",
    icon: "pen-tool",
    description:
      "Diseñamos experiencias digitales con foco en la usabilidad, estética y conversión, combinando creatividad con estrategia.",
  },
  {
    id: 2,
    title: "Desarrollo Web",
    icon: "monitor",
    description:
      "Creamos sitios web modernos, escalables y ultra rápidos, optimizados para SEO y adaptados a cualquier dispositivo.",
  },
  {
    id: 3,
    title: "Apps Móviles",
    icon: "smartphone",
    description:
      "Desarrollamos aplicaciones móviles con interfaces fluidas, alto rendimiento y compatibilidad multiplataforma.",
  },
  {
    id: 4,
    title: "E-commerce",
    icon: "shopping-bag",
    description:
      "Creamos tiendas online completas con sistemas de pago integrados, gestión de productos y dashboards intuitivos.",
  },
  {
    id: 5,
    title: "Consultoría tecnológica",
    icon: "compass",
    description:
      "Impulsamos tu transformación digital mediante estrategias tecnológicas adaptadas a tus objetivos de negocio.",
  },
  {
    id: 6,
    title: "Mantenimiento",
    icon: "shield",
    description:
      "Ofrecemos soporte técnico continuo, auditorías de seguridad y mejoras de rendimiento en tus sistemas existentes.",
  },
];

interface Props {
  /** Lleva al formulario de contacto (no hay páginas por servicio). */
  onContact?: () => void;
}

export default function ServicesSection({ onContact }: Props) {
  const { width, isMobile, isTablet } = useBreakpoint();
  const columns = isMobile ? 1 : isTablet ? 2 : 3;
  const gap = 16;
  const inner = Math.min(width, MAX_WIDTH) - 48;
  const cardWidth = (inner - gap * (columns - 1)) / columns;

  return (
    <View style={[styles.section, isMobile && styles.sectionMobile]}>
      <View style={styles.inner}>
        <SectionHeader
          eyebrow="Servicios"
          title="Lo que construimos para tu empresa"
          description="Un equipo que cubre el ciclo completo: estrategia, diseño, desarrollo y soporte, con foco en resultados de negocio."
        />
        <View style={[styles.grid, { gap }]}>
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} width={cardWidth} compact={isMobile} onContact={onContact} />
          ))}
        </View>
      </View>
    </View>
  );
}

function ServiceCard({ service, width, compact, onContact }: { service: Service; width: number; compact: boolean; onContact?: () => void }) {
  const [hover, setHover] = useState(false);
  const hoverProps = Platform.OS === "web" ? { onHoverIn: () => setHover(true), onHoverOut: () => setHover(false) } : {};
  return (
    <Pressable
      onPress={onContact}
      {...hoverProps}
      accessibilityRole="button"
      accessibilityLabel={`${service.title}: consultar`}
      style={[styles.card, compact && styles.cardCompact, { width }, hover && styles.cardHover]}
    >
      <View style={styles.iconBox}>
        <Feather name={service.icon} size={22} color={COLOR.orange} />
      </View>
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.desc}>{service.description}</Text>
      <View style={styles.more}>
        <Text style={styles.moreText}>Consultar</Text>
        <Feather name="arrow-right" size={16} color={COLOR.orange} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  section: { backgroundColor: COLOR.bg, paddingVertical: 112, borderBottomWidth: 1, borderBottomColor: COLOR.line },
  sectionMobile: { paddingVertical: 80 },
  inner: { maxWidth: MAX_WIDTH, width: "100%", alignSelf: "center", paddingHorizontal: 24 },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  card: {
    backgroundColor: COLOR.card,
    borderWidth: 1,
    borderColor: COLOR.line,
    borderRadius: RADIUS.lg,
    padding: 32,
  },
  cardCompact: { padding: 24 },
  cardHover: { borderColor: COLOR.orangeBorder, backgroundColor: COLOR.cardHover },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLOR.orangeSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: { fontFamily: FONT.medium, fontSize: 20, color: COLOR.ink, marginBottom: 10 },
  desc: { fontFamily: FONT.regular, fontSize: 15, lineHeight: 25, color: COLOR.ink2, marginBottom: 24 },
  more: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: "auto" },
  moreText: { fontFamily: FONT.medium, fontSize: 14, color: COLOR.ink },
});
