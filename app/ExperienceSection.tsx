import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";
import SectionHeader from "@/components/ui/SectionHeader";
import { COLOR, FONT, MAX_WIDTH, RADIUS } from "@/constants/theme";
import { useBreakpoint } from "@/hooks/useBreakpoints";

const EXPERIENCE = [
  {
    title: "Automatización y soluciones empresariales",
    description:
      "Desarrollo de sistemas de automatización con n8n, integraciones con APIs y flujos inteligentes para optimizar procesos legales, administrativos y de comunicación.",
  },
  {
    title: "Educación en tecnologías emergentes",
    description:
      "Programas educativos dictados a través de la Fundación Libertad y nuestra plataforma oficial, enfocados en IA Generativa, Ciencia de Datos y Automatización Legal.",
    link: { label: "Visitar plataforma educativa", url: "https://educate.nilosolutions.com/" },
  },
  {
    title: "Proyectos y consultoría tecnológica",
    description:
      "Colaboración con empresas y estudios jurídicos para la implementación de tecnologías emergentes: MCP, n8n, RAG y despliegue de soluciones IA.",
  },
];

export default function ExperienceSection() {
  const { isMobile } = useBreakpoint();
  return (
    <View style={[styles.section, isMobile && styles.sectionMobile]}>
      <View style={styles.inner}>
        <SectionHeader
          eyebrow="Experiencia"
          title="Dónde ponemos el foco"
          description="Tecnología aplicada, formación y consultoría para equipos que quieren adoptar herramientas emergentes con criterio."
        />
        <View style={[styles.box, isMobile && styles.boxMobile]}>
          {EXPERIENCE.map((item, index) => (
            <View
              key={item.title}
              style={[
                styles.col,
                isMobile && styles.colMobile,
                index > 0 && (isMobile ? styles.dividerTop : styles.dividerLeft),
              ]}
            >
              <Text style={styles.num}>{String(index + 1).padStart(2, "0")}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              {item.link && (
                <Pressable onPress={() => Linking.openURL(item.link.url)} accessibilityRole="link" style={styles.link}>
                  <Text style={styles.linkText}>{item.link.label}</Text>
                  <Feather name="arrow-up-right" size={16} color={COLOR.orange} />
                </Pressable>
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { backgroundColor: COLOR.bg, paddingVertical: 112, borderBottomWidth: 1, borderBottomColor: COLOR.line },
  sectionMobile: { paddingVertical: 80 },
  inner: { maxWidth: MAX_WIDTH, width: "100%", alignSelf: "center", paddingHorizontal: 24 },
  box: { flexDirection: "row", borderWidth: 1, borderColor: COLOR.line, borderRadius: RADIUS.lg },
  boxMobile: { flexDirection: "column" },
  col: { flex: 1, padding: 32 },
  colMobile: { padding: 24 },
  dividerLeft: { borderLeftWidth: 1, borderLeftColor: COLOR.line },
  dividerTop: { borderTopWidth: 1, borderTopColor: COLOR.line },
  num: { fontFamily: FONT.mono, fontSize: 14, color: COLOR.orange, marginBottom: 20 },
  title: { fontFamily: FONT.medium, fontSize: 20, lineHeight: 26, color: COLOR.ink, marginBottom: 12 },
  desc: { fontFamily: FONT.regular, fontSize: 15, lineHeight: 25, color: COLOR.ink2 },
  link: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 24 },
  linkText: { fontFamily: FONT.medium, fontSize: 14, color: COLOR.orange },
});
