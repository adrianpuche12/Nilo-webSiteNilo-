import { useState } from "react";
import { View, Text, Image, Pressable, Linking, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { COLOR, FONT, MAX_WIDTH } from "@/constants/theme";
import { useBreakpoint } from "@/hooks/useBreakpoints";
import { NILO_PRODUCTS } from "@/constants/products";

interface Props {
  /** En la home hace scroll a la sección; en otras páginas (blog) los links llevan a la home. */
  scrollToSection?: (sectionId: string) => void;
}

type FooterLink = { label: string; sectionId?: string; url?: string; external?: string };

/**
 * Footer rediseñado: logo + descripción · Navegación · Productos · Empresa.
 * Todos los links hacen algo. No se muestran redes sociales, teléfono ni páginas
 * (trabajá con nosotros / privacidad) hasta tener datos y páginas reales.
 */
export default function Footer({ scrollToSection }: Props) {
  const router = useRouter();
  const { isMobile, isTablet } = useBreakpoint();

  const go = (link: FooterLink) => {
    if (link.external) return Linking.openURL(link.external);
    if (link.url) return router.push(link.url as never);
    if (link.sectionId) {
      if (scrollToSection) scrollToSection(link.sectionId);
      else router.push("/" as never);
    }
  };

  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: "Navegación",
      links: [
        { label: "Servicios", sectionId: "servicios" },
        { label: "Productos", sectionId: "productos" },
        { label: "Automatización", sectionId: "proyectos" },
        { label: "Blog", url: "/blog" },
      ],
    },
    {
      title: "Productos",
      links: NILO_PRODUCTS.filter((p) => p.id !== "propero-app").map((p) => ({ label: p.name, external: p.url })),
    },
    {
      title: "Empresa",
      links: [
        { label: "Contacto", sectionId: "contacto" },
        { label: "Plataforma educativa", external: "https://educate.nilosolutions.com/" },
      ],
    },
  ];

  return (
    <View style={styles.footer}>
      <View style={styles.inner}>
        <View style={[styles.top, (isMobile || isTablet) && styles.topWrap]}>
          <View style={[styles.brand, isMobile && styles.full]}>
            <Image source={require("@/assets/images/footerlogo.png")} style={styles.logo} resizeMode="contain" accessibilityLabel="Nilo Solutions" />
            <Text style={styles.about}>
              Consultora de software en Rosario. Desarrollo a medida, automatización y productos propios en la nube.
            </Text>
          </View>

          {columns.map((col) => (
            <View key={col.title} style={[styles.col, isMobile && styles.full]}>
              <Text style={styles.colTitle}>{col.title.toUpperCase()}</Text>
              {col.links.map((link) => (
                <FooterItem key={link.label} label={link.label} onPress={() => go(link)} />
              ))}
            </View>
          ))}
        </View>

        <View style={[styles.bottom, isMobile && styles.bottomMobile]}>
          <Text style={styles.small}>© {new Date().getFullYear()} Nilo Solutions. Todos los derechos reservados.</Text>
          <Text style={styles.small}>Rosario, Argentina</Text>
        </View>
      </View>
    </View>
  );
}

function FooterItem({ label, onPress }: { label: string; onPress: () => void }) {
  const [hover, setHover] = useState(false);
  const hoverProps = Platform.OS === "web" ? { onHoverIn: () => setHover(true), onHoverOut: () => setHover(false) } : {};
  return (
    <Pressable onPress={onPress} {...hoverProps} accessibilityRole="link" style={styles.item}>
      <Text style={[styles.link, hover && { color: COLOR.ink }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  footer: { backgroundColor: COLOR.bg, borderTopWidth: 1, borderTopColor: COLOR.line },
  inner: { maxWidth: MAX_WIDTH, width: "100%", alignSelf: "center", paddingHorizontal: 24, paddingTop: 72, paddingBottom: 32 },
  top: { flexDirection: "row", gap: 48 },
  topWrap: { flexWrap: "wrap", rowGap: 40 },
  brand: { flex: 1.4, minWidth: 240 },
  full: { flexBasis: "100%", minWidth: "100%" },
  logo: { width: 64, height: 58, marginBottom: 18 },
  about: { fontFamily: FONT.regular, fontSize: 14, lineHeight: 23, color: COLOR.ink3, maxWidth: 320 },
  col: { flex: 1, minWidth: 160 },
  colTitle: { fontFamily: FONT.medium, fontSize: 12, letterSpacing: 2.9, color: COLOR.ink, marginBottom: 18 },
  item: { paddingVertical: 6, alignSelf: "flex-start" },
  link: { fontFamily: FONT.regular, fontSize: 14, color: COLOR.ink3 },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 56,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: COLOR.line,
    gap: 12,
  },
  bottomMobile: { flexDirection: "column", alignItems: "flex-start" },
  small: { fontFamily: FONT.regular, fontSize: 13, color: COLOR.ink3 },
});
