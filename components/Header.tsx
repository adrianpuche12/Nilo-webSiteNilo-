import { useState } from "react";
import { View, Text, Image, Pressable, Modal, StyleSheet, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Button from "@/components/ui/Button";
import { COLOR, FONT, MAX_WIDTH } from "@/constants/theme";
import { useBreakpoint } from "@/hooks/useBreakpoints";

type NavItem = { label: string; sectionId?: string; url?: string };

const INDEX_NAV: NavItem[] = [
  { label: "Servicios", sectionId: "servicios" },
  { label: "Productos", sectionId: "productos" },
  { label: "Automatización", sectionId: "proyectos" },
  { label: "Experiencia", sectionId: "experiencia" },
  { label: "Blog", url: "/blog" },
];
const OTHER_NAV: NavItem[] = [{ label: "Inicio", url: "/" }];

interface Props {
  scrollToSection: (sectionId: string) => void;
  /** true solo en la home (app/index.tsx). Default false: el blog y otras páginas navegan con URLs. */
  isIndexPage?: boolean;
  currentSection?: string; // ya existe en index.tsx; pasarlo para marcar el link activo
}

/**
 * Header rediseñado.
 * - Se elimina el banner naranja "BANNER PARA OFERTAS PROMOS" + input de email (placeholder en producción).
 * - Se elimina "Quiénes somos" (apuntaba a TeamSection, que está comentada → link muerto).
 * - "INICIAR SESIÓN" (que llevaba a "/") se reemplaza por el CTA "Hablemos" → contacto.
 * - ES/EN queda visual hasta que exista i18n (ver README).
 * - Debe renderizarse FUERA del ScrollView para quedar fijo (ver README §3).
 */
export default function Header({ scrollToSection, isIndexPage = false, currentSection }: Props) {
  const router = useRouter();
  const { isMobile, isTablet } = useBreakpoint();
  const [open, setOpen] = useState(false);
  const items = isIndexPage ? INDEX_NAV : OTHER_NAV;

  const go = (item: NavItem) => {
    setOpen(false);
    if (item.url) router.push(item.url as never);
    else if (item.sectionId) scrollToSection(item.sectionId);
  };
  const toContact = () => {
    setOpen(false);
    if (isIndexPage) scrollToSection("contacto");
    else router.push("/" as never);
  };

  return (
    <View style={styles.bar}>
      <View style={styles.inner}>
        <Pressable onPress={() => (isIndexPage ? scrollToSection("inicio") : router.push("/" as never))} accessibilityLabel="Nilo Solutions — inicio">
          <Image source={require("@/assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
        </Pressable>

        {!isMobile && (
          <View style={[styles.nav, isTablet && { gap: 20 }]}>
            {items.map((it) => (
              <NavLink key={it.label} item={it} active={!!it.sectionId && it.sectionId === currentSection} onPress={() => go(it)} />
            ))}
          </View>
        )}

        {!isMobile && (
          <View style={styles.right}>
            {/* Selector ES/EN oculto hasta que exista i18n (README del rediseño, §6). */}
            <Button label="Hablemos" size="sm" onPress={toContact} />
          </View>
        )}

        {isMobile && (
          <Pressable onPress={() => setOpen(true)} style={styles.burger} accessibilityLabel="Abrir menú">
            <Feather name="menu" size={24} color={COLOR.ink} />
          </Pressable>
        )}
      </View>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <Pressable style={styles.drawer} onPress={() => {}}>
            <Pressable onPress={() => setOpen(false)} style={styles.close} accessibilityLabel="Cerrar menú">
              <Feather name="x" size={24} color={COLOR.ink} />
            </Pressable>
            {items.map((it) => (
              <Pressable key={it.label} onPress={() => go(it)} style={styles.drawerLink}>
                <Text style={styles.drawerText}>{it.label}</Text>
              </Pressable>
            ))}
            <View style={{ marginTop: 24 }}>
              <Button label="Hablemos" onPress={toContact} fullWidth />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function NavLink({ item, active, onPress }: { item: NavItem; active: boolean; onPress: () => void }) {
  const [hover, setHover] = useState(false);
  const hoverProps = Platform.OS === "web" ? { onHoverIn: () => setHover(true), onHoverOut: () => setHover(false) } : {};
  return (
    <Pressable onPress={onPress} {...hoverProps} style={styles.link}>
      <Text style={[styles.linkText, (hover || active) && { color: COLOR.ink }]}>{item.label}</Text>
      <View style={[styles.underline, active && { backgroundColor: COLOR.orange }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: "rgba(0,0,0,0.72)",
    borderBottomWidth: 1,
    borderBottomColor: COLOR.line,
    zIndex: 50,
    // @ts-ignore — solo web
    backdropFilter: "blur(14px)",
  },
  inner: { height: 72, maxWidth: MAX_WIDTH, width: "100%", alignSelf: "center", paddingHorizontal: 24, flexDirection: "row", alignItems: "center", gap: 32 },
  logo: { width: 76, height: 40 },
  nav: { flexDirection: "row", gap: 28, marginLeft: "auto" },
  link: { paddingVertical: 6 },
  linkText: { fontFamily: FONT.regular, fontSize: 14, color: COLOR.ink2 },
  underline: { height: 2, borderRadius: 2, marginTop: 4, backgroundColor: "transparent" },
  right: { flexDirection: "row", alignItems: "center", gap: 16 },
  lang: { fontFamily: FONT.regular, fontSize: 13, color: COLOR.ink3 },
  langOn: { color: COLOR.ink, fontFamily: FONT.medium },
  burger: { marginLeft: "auto", padding: 8 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", alignItems: "flex-end" },
  drawer: { width: "86%", maxWidth: 320, height: "100%", backgroundColor: COLOR.bgRaised, borderLeftWidth: 1, borderLeftColor: COLOR.line, padding: 24 },
  close: { alignSelf: "flex-end", padding: 8, marginBottom: 8 },
  drawerLink: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLOR.line },
  drawerText: { fontFamily: FONT.regular, fontSize: 18, color: COLOR.ink },
});
