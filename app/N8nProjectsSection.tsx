import { useState } from "react";
import { View, Text, StyleSheet, Pressable, Linking, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import SectionHeader from "@/components/ui/SectionHeader";
import { COLOR, FONT, MAX_WIDTH } from "@/constants/theme";
import { useBreakpoint } from "@/hooks/useBreakpoints";

/** Flujos de n8n en producción. Lista numerada (sin íconos externos de flaticon). */
const PROJECTS = [
  {
    title: "Gestión legal: procesos administrativos",
    description:
      "Flujo diseñado para optimizar la gestión documental y automatizar tareas internas en estudios jurídicos, reduciendo tiempos y errores humanos.",
    url: "https://legalbackn8n.nilosolutions.com/workflow/rvudGubRQEUmVV73",
  },
  {
    title: "Canales de comunicación unificados",
    description:
      "Conecta mensajería, correos y CRM (Twilio + n8n) para mantener un registro automatizado y unificado de las interacciones con los clientes.",
    url: "https://legalbackn8n.nilosolutions.com/workflow/RMrvdul3O2Fm18B3",
  },
  {
    title: "Pipeline de datos para reportes con IA",
    description:
      "Recolecta, transforma y distribuye datos hacia módulos de inteligencia artificial para análisis estratégico.",
    url: "https://legalbackn8n.nilosolutions.com/workflow/6wDIzWI3B5YGYdyE",
  },
  {
    title: "Automatización legal avanzada con RAG",
    description:
      "Integración de RAG (Retrieval Augmented Generation) para consultas jurídicas inteligentes basadas en documentación real.",
    url: "https://legalbackn8n.nilosolutions.com/workflow/8bOVNfpNEOY9SUDS",
  },
];

export default function N8nProjectsSection() {
  const { isMobile } = useBreakpoint();
  return (
    <View style={[styles.section, isMobile && styles.sectionMobile]}>
      <View style={styles.inner}>
        <SectionHeader
          eyebrow="Automatización"
          title="Flujos inteligentes con n8n, IA y APIs"
          description="Conectamos sistemas empresariales y eliminamos tareas repetitivas. Cada flujo está en producción y se puede recorrer."
        />
        <View style={styles.list}>
          {PROJECTS.map((project, index) => (
            <ProjectRow key={project.url} index={index} project={project} compact={isMobile} />
          ))}
        </View>
      </View>
    </View>
  );
}

function ProjectRow({
  index,
  project,
  compact,
}: {
  index: number;
  project: (typeof PROJECTS)[number];
  compact: boolean;
}) {
  const [hover, setHover] = useState(false);
  const hoverProps = Platform.OS === "web" ? { onHoverIn: () => setHover(true), onHoverOut: () => setHover(false) } : {};
  return (
    <Pressable
      onPress={() => Linking.openURL(project.url)}
      {...hoverProps}
      accessibilityRole="link"
      accessibilityLabel={`Ver el flujo: ${project.title}`}
      style={[styles.row, compact && styles.rowCompact]}
    >
      <Text style={styles.num}>{String(index + 1).padStart(2, "0")}</Text>
      <View style={styles.body}>
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.desc}>{project.description}</Text>
      </View>
      <View style={[styles.circle, hover && styles.circleHover]}>
        <Feather name="arrow-up-right" size={18} color={hover ? COLOR.onOrange : COLOR.ink} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  section: { backgroundColor: COLOR.bg, paddingVertical: 112, borderBottomWidth: 1, borderBottomColor: COLOR.line },
  sectionMobile: { paddingVertical: 80 },
  inner: { maxWidth: MAX_WIDTH, width: "100%", alignSelf: "center", paddingHorizontal: 24 },
  list: { borderTopWidth: 1, borderTopColor: COLOR.line },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.line,
  },
  rowCompact: { gap: 16, paddingVertical: 24, alignItems: "flex-start" },
  num: { fontFamily: FONT.mono, fontSize: 14, color: COLOR.orange, width: 32, paddingTop: 4 },
  body: { flex: 1 },
  title: { fontFamily: FONT.medium, fontSize: 19, color: COLOR.ink, marginBottom: 10 },
  desc: { fontFamily: FONT.regular, fontSize: 15, lineHeight: 25, color: COLOR.ink2 },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLOR.lineStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  circleHover: { backgroundColor: COLOR.orange, borderColor: COLOR.orange },
});
