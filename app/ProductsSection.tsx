import { useState } from "react";
import { View, Text, StyleSheet, Pressable, Linking, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import SectionHeader from "@/components/ui/SectionHeader";
import { COLOR, FONT, MAX_WIDTH, RADIUS } from "@/constants/theme";
import { useBreakpoint } from "@/hooks/useBreakpoints";
import { NILO_PRODUCTS, type NiloProduct } from "@/constants/products";

/**
 * "Productos": los productos propios de Nilo Solutions. Datos en constants/products.ts.
 * Tarjeta estándar del rediseño (sin degradados); el badge conserva el color de marca de cada producto.
 */
export default function ProductsSection() {
  const { width, isMobile } = useBreakpoint();
  const columns = isMobile ? 1 : 2;
  const gap = 16;
  const inner = Math.min(width, MAX_WIDTH) - 48;
  const cardWidth = (inner - gap * (columns - 1)) / columns;

  return (
    <View style={[styles.section, isMobile && styles.sectionMobile]}>
      <View style={styles.inner}>
        <SectionHeader
          eyebrow="Productos"
          title="Software propio, en la nube"
          description="Además de desarrollar a medida, creamos y operamos nuestros propios productos para negocios y profesionales de Latinoamérica."
        />
        <View style={[styles.grid, { gap }]}>
          {NILO_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} width={cardWidth} compact={isMobile} />
          ))}
        </View>
      </View>
    </View>
  );
}

function ProductCard({ product, width, compact }: { product: NiloProduct; width: number; compact: boolean }) {
  const [hover, setHover] = useState(false);
  const hoverProps = Platform.OS === "web" ? { onHoverIn: () => setHover(true), onHoverOut: () => setHover(false) } : {};
  return (
    <Pressable
      onPress={() => Linking.openURL(product.url)}
      {...hoverProps}
      accessibilityRole="link"
      accessibilityLabel={`${product.name}: ${product.tagline}`}
      style={[styles.card, compact && styles.cardCompact, { width }, hover && styles.cardHover]}
    >
      <View style={styles.head}>
        <View style={[styles.badge, { backgroundColor: product.color }]}>
          <Text style={[styles.badgeText, { color: product.onColor }]}>{product.initial}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.tagline}>{product.tagline}</Text>
        </View>
      </View>

      <View style={styles.tags}>
        {product.tags.map((tag) => (
          <Text key={tag} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>

      <Text style={styles.desc}>{product.description}</Text>
      <Text style={styles.audience}>
        <Text style={styles.audienceLabel}>Para: </Text>
        {product.audience}
      </Text>

      <View style={styles.cta}>
        <Text style={styles.ctaText}>{product.cta}</Text>
        <Feather name="arrow-up-right" size={16} color={COLOR.orange} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  section: { backgroundColor: COLOR.bg, paddingVertical: 112, borderBottomWidth: 1, borderBottomColor: COLOR.line },
  sectionMobile: { paddingVertical: 80 },
  inner: { maxWidth: MAX_WIDTH, width: "100%", alignSelf: "center", paddingHorizontal: 24 },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  card: { backgroundColor: COLOR.card, borderWidth: 1, borderColor: COLOR.line, borderRadius: RADIUS.lg, padding: 32 },
  cardCompact: { padding: 24 },
  cardHover: { borderColor: COLOR.orangeBorder, backgroundColor: COLOR.cardHover },
  head: { flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 18 },
  badge: { width: 52, height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  badgeText: { fontFamily: FONT.bold, fontSize: 22 },
  name: { fontFamily: FONT.medium, fontSize: 22, color: COLOR.ink },
  tagline: { fontFamily: FONT.regular, fontSize: 14, color: COLOR.ink2, marginTop: 4 },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 18 },
  tag: {
    fontFamily: FONT.medium,
    fontSize: 12,
    color: COLOR.ink2,
    borderWidth: 1,
    borderColor: COLOR.lineStrong,
    borderRadius: RADIUS.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  desc: { fontFamily: FONT.regular, fontSize: 15, lineHeight: 25, color: COLOR.ink2, marginBottom: 12 },
  audience: { fontFamily: FONT.regular, fontSize: 14, lineHeight: 22, color: COLOR.ink3, marginBottom: 24 },
  audienceLabel: { fontFamily: FONT.medium, color: COLOR.ink },
  cta: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: "auto" },
  ctaText: { fontFamily: FONT.medium, fontSize: 14, color: COLOR.ink },
});
