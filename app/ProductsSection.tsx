import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useBreakpoint } from "@/hooks/useBreakpoints";
import { NILO_PRODUCTS } from "@/constants/products";

/**
 * "Nuestros productos": los productos propios de Nilo Solutions.
 * Mismo lenguaje visual que el resto de la web (fondo negro, acento naranja #ff6b35);
 * cada tarjeta lleva el color de marca de su producto en el badge.
 * Los datos salen de constants/products.ts.
 */
const ProductsSection = () => {
  const { isMobile } = useBreakpoint();

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.titleDecoration} />
        <Text style={styles.title}>Nuestros productos</Text>
        <View style={styles.titleDecoration} />
      </View>

      <Text style={styles.description}>
        Además de desarrollar a medida, en <Text style={styles.highlight}>Nilo Solutions</Text> creamos y operamos
        nuestros propios productos: software en la nube pensado para negocios y profesionales de Latinoamérica.
      </Text>

      <View style={styles.cardsOuterContainer}>
        <View style={[styles.cardsContainer, isMobile && styles.cardsContainerMobile]}>
          {NILO_PRODUCTS.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={[styles.card, isMobile && styles.cardMobile]}
              activeOpacity={0.9}
              onPress={() => Linking.openURL(product.url)}
              accessibilityRole="link"
              accessibilityLabel={`${product.name}: ${product.tagline}`}
            >
              <LinearGradient
                colors={["#151515", "#101010"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.gradientBackground}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.badge, { backgroundColor: product.color }]}>
                    <Text style={[styles.badgeText, { color: product.onColor }]}>{product.initial}</Text>
                  </View>
                  <View style={styles.cardHeaderText}>
                    <Text style={styles.cardTitle}>{product.name}</Text>
                    <Text style={styles.cardTagline}>{product.tagline}</Text>
                  </View>
                </View>

                <View style={styles.tags}>
                  {product.tags.map((tag) => (
                    <Text key={tag} style={styles.tag}>
                      {tag}
                    </Text>
                  ))}
                </View>

                <Text style={styles.cardDescription}>{product.description}</Text>
                <Text style={styles.cardAudience}>
                  <Text style={styles.cardAudienceLabel}>Para: </Text>
                  {product.audience}
                </Text>

                <View style={styles.buttonContainer}>
                  <LinearGradient colors={["#ff6b35", "#ff3b00"]} style={styles.linkButton}>
                    <Text style={styles.linkButtonText}>{product.cta} →</Text>
                  </LinearGradient>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ProductsSection;

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: "#000",
    paddingVertical: 70,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  titleDecoration: {
    width: 50,
    height: 3,
    backgroundColor: "#ff6b35",
    marginHorizontal: 16,
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 0.8,
  },
  description: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 45,
    paddingHorizontal: 10,
    lineHeight: 24,
    maxWidth: 760,
  },
  highlight: {
    color: "#ff6b35",
    fontWeight: "bold",
  },
  cardsOuterContainer: {
    width: "100%",
    maxWidth: 1100,
    alignSelf: "center",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 25,
  },
  cardsContainerMobile: {
    flexDirection: "column",
    gap: 18,
  },
  card: {
    borderRadius: 24,
    width: "45%",
    maxWidth: 520,
    minWidth: 300,
    backgroundColor: "#121212",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  cardMobile: {
    width: "100%",
    minWidth: "auto",
    alignSelf: "center",
  },
  gradientBackground: {
    flex: 1,
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    backgroundColor: "#121212",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 14,
  },
  badge: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 24,
    fontWeight: "800",
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
  cardTagline: {
    fontSize: 14,
    color: "#ff9b73",
    marginTop: 2,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
  },
  tag: {
    color: "#ddd",
    fontSize: 12,
    fontWeight: "600",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 999,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  cardDescription: {
    color: "#bbb",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  },
  cardAudience: {
    color: "#999",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  cardAudienceLabel: {
    color: "#ddd",
    fontWeight: "700",
  },
  buttonContainer: {
    alignItems: "flex-start",
  },
  linkButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  linkButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
  },
});
