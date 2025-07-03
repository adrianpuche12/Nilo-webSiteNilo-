
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native"
import { StartProjectButton, ViewPortfolioButton } from "@/components/ui/AppButtons"
const { width, height } = Dimensions.get("window")

const NiloSolutionsIndex = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroSubtitle}>CONSULTORA DE SOFTWARE</Text>
            <Text style={styles.heroTitle}>
              Transformamos tus{"\n"}
              <Text style={styles.heroTitleAccent}>ideas digitales</Text>
              {"\n"}en realidad
            </Text>
            <Text style={styles.heroDescription}>
              Desarrollamos soluciones tecnológicas innovadoras para empresas que buscan crecer en el mundo digital.
              Desde aplicaciones móviles hasta sistemas web complejos.
            </Text>
            <View style={styles.heroButtons}>
              <StartProjectButton onPress={() => console.log("Comenzar proyecto")} />
              <ViewPortfolioButton onPress={() => console.log("Ver portafolio")} />
            </View>
          </View>

          <View style={styles.heroVisual}>
            <View style={styles.floatingCard}>
              <View style={styles.cardHeader}>
                <View style={styles.cardDots}>
                  <View style={[styles.dot, { backgroundColor: "#ff6b35" }]} />
                  <View style={[styles.dot, { backgroundColor: "#fff" }]} />
                  <View style={[styles.dot, { backgroundColor: "#fff" }]} />
                </View>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{"<NilO Solutions />"}</Text>
                <Text style={styles.cardSubtitle}>Desarrollo de Software</Text>
                <View style={styles.cardStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>15+</Text>
                    <Text style={styles.statLabel}>Proyectos</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>10+</Text>
                    <Text style={styles.statLabel}>Clientes</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.backgroundElements}>
              <View style={[styles.circle, styles.circle1]} />
              <View style={[styles.circle, styles.circle2]} />
              <View style={[styles.square, styles.square1]} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "000",
  },
  heroSection: {
    backgroundColor: "#000",
    minHeight: height * 0.8,
    paddingVertical: 60,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  heroContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
  },
  heroTextContainer: {
    flex: 1,
    paddingRight: 40,
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#ff6b35",
    fontWeight: "600",
    letterSpacing: 2,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    lineHeight: 56,
    marginBottom: 24,
  },
  heroTitleAccent: {
    color: "#ff6b35",
  },
  heroDescription: {
    fontSize: 18,
    color: "#ccc",
    lineHeight: 28,
    marginBottom: 40,
    maxWidth: 500,
  },
  heroButtons: {
    flexDirection: "row",
    gap: 20,
  },
  primaryButton: {
    backgroundColor: "#ff6b35",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 3,
    shadowColor: "#ff6b35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: "#fff",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
  },
  secondaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  heroVisual: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  floatingCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    padding: 24,
    width: 280,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: "#333",
  },
  cardHeader: {
    marginBottom: 20,
  },
  cardDots: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  cardContent: {
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    fontFamily: "monospace",
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#ff6b35",
    marginBottom: 24,
  },
  cardStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff6b35",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#ccc",
  },
  backgroundElements: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  circle: {
    position: "absolute",
    borderRadius: 50,
    opacity: 0.1,
  },
  circle1: {
    width: 100,
    height: 100,
    backgroundColor: "#ff6b35",
    top: 20,
    right: 20,
  },
  circle2: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    bottom: 100,
    left: 40,
  },
  square: {
    position: "absolute",
    opacity: 0.05,
  },
  square1: {
    width: 80,
    height: 80,
    backgroundColor: "#ff6b35",
    bottom: 40,
    right: 60,
    transform: [{ rotate: "45deg" }],
  },
})

export default NiloSolutionsIndex

