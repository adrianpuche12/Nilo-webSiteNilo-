import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import Button from "@/components/ui/Button";
import { COLOR, FONT, MAX_WIDTH, TYPE } from "@/constants/theme";
import { useBreakpoint } from "@/hooks/useBreakpoints";

interface Props {
  onStartProject: () => void; // scrollToSection("contacto")
  onViewWork: () => void;     // scrollToSection("productos")
}

/**
 * Hero rediseñado.
 * - Mismo copy y mismas cifras (15+ / 10+).
 * - Se reemplazan la tarjeta "<NilO Solutions />" con puntitos y los círculos/rombo
 *   naranjas animados por un ANILLO que toma la "O" del logo (arco blanco con glow).
 * - Los CTAs ahora hacen algo (antes: console.log).
 * - Se elimina el contenedor blanco con borde negro que asomaba debajo del hero.
 */
export default function HomePage({ onStartProject, onViewWork }: Props) {
  const { isMobile } = useBreakpoint();
  const fs = isMobile ? TYPE.hero.m : TYPE.hero.d;
  const ring = isMobile ? 300 : 440;

  return (
    <View style={styles.section}>
      <View style={[styles.inner, isMobile && styles.innerMobile]}>
        <View style={styles.text}>
          <Animated.Text entering={FadeInUp.duration(500)} style={styles.eyebrow}>CONSULTORA DE SOFTWARE</Animated.Text>
          <Animated.Text entering={FadeInUp.delay(80).duration(600)} style={[styles.title, { fontSize: fs, lineHeight: fs * TYPE.hero.lh }]}>
            Transformamos tus <Text style={{ color: COLOR.orange }}>ideas digitales</Text> en realidad.
          </Animated.Text>
          <Animated.Text entering={FadeInUp.delay(160).duration(600)} style={[styles.lead, { fontSize: isMobile ? TYPE.lead.m : TYPE.lead.d }]}>
            Desarrollamos soluciones tecnológicas para empresas que buscan crecer en el mundo digital. Desde aplicaciones móviles hasta sistemas web complejos.
          </Animated.Text>
          <Animated.View entering={FadeInUp.delay(240).duration(600)} style={[styles.ctas, isMobile && styles.ctasMobile]}>
            <Button label="Comenzar un proyecto" icon="arrow-right" onPress={onStartProject} fullWidth={isMobile} />
            <Button label="Ver nuestro trabajo" variant="ghost" onPress={onViewWork} fullWidth={isMobile} />
          </Animated.View>
        </View>

        <View style={[styles.visual, { width: ring, height: ring }]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <View style={[styles.glow, { width: ring * 0.64, height: ring * 0.64, borderRadius: ring }]} />
          {/* Arco: borde blanco en 3 lados + rotación = "O" abierta del logo */}
          <View
            style={[
              styles.ring,
              { width: ring, height: ring, borderRadius: ring / 2, borderWidth: isMobile ? 14 : 22 },
            ]}
          />
          <View style={styles.stats}>
            <Stat n="15" label="PROYECTOS" />
            <View style={styles.rule} />
            <Stat n="10" label="CLIENTES" />
          </View>
        </View>
      </View>
    </View>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.statN}>
        {n}
        <Text style={{ color: COLOR.orange }}>+</Text>
      </Text>
      <Text style={styles.statL}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { backgroundColor: COLOR.bg, paddingVertical: 112, borderBottomWidth: 1, borderBottomColor: COLOR.line, overflow: "hidden" },
  inner: { maxWidth: MAX_WIDTH, width: "100%", alignSelf: "center", paddingHorizontal: 24, flexDirection: "row", alignItems: "center", gap: 48 },
  innerMobile: { flexDirection: "column", alignItems: "flex-start" },
  text: { flex: 1.15 },
  eyebrow: { fontFamily: FONT.medium, fontSize: 13, letterSpacing: 4.2, color: COLOR.orange },
  title: { fontFamily: FONT.bold, color: COLOR.ink, letterSpacing: -1.2, marginTop: 20, marginBottom: 24 },
  lead: { fontFamily: FONT.light, color: COLOR.ink2, lineHeight: 32, maxWidth: 540 },
  ctas: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 40 },
  ctasMobile: { flexDirection: "column", alignSelf: "stretch" },
  visual: { alignSelf: "center", alignItems: "center", justifyContent: "center" },
  glow: { position: "absolute", backgroundColor: COLOR.orangeSoft, opacity: 0.9 },
  ring: {
    position: "absolute",
    borderColor: "rgba(255,255,255,0.85)",
    borderBottomColor: "transparent",
    transform: [{ rotate: "-35deg" }],
    shadowColor: "#FFFFFF",
    shadowOpacity: 0.25,
    shadowRadius: 24,
  },
  stats: { alignItems: "center", gap: 20 },
  rule: { width: 40, height: 1, backgroundColor: COLOR.lineStrong },
  statN: { fontFamily: FONT.bold, fontSize: 52, lineHeight: 56, color: COLOR.ink },
  statL: { fontFamily: FONT.medium, fontSize: 12, letterSpacing: 2.9, color: COLOR.ink3, marginTop: 6 },
});
