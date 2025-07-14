import { View, Text, StyleSheet, useWindowDimensions, Dimensions } from "react-native"

import { StartProjectButton, ViewPortfolioButton } from "@/components/ui/AppButtons"

const { height } = Dimensions.get("window")

const NiloSolutionsIndex = () => {
  const bp = useBreakpoint()

  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <View
        style={[
          styles.heroSection,
          bp.isTabletOrMobile && styles.heroSectionTabletOrMobile,
          bp.isMobile && styles.heroSectionMobile,
        ]}
      >
        <View
          style={[
            styles.heroContent,
            bp.isTabletOrMobile && styles.heroContentTabletOrMobile,
            bp.isMobile && styles.heroContentMobile,
          ]}
        >
          <View
            style={[
              styles.heroTextContainer,
              bp.isTabletOrMobile && styles.heroTextContainerTabletOrMobile,
              bp.isMobile && styles.heroTextContainerMobile,
            ]}
          >
            <Text
              style={[
                styles.heroSubtitle,
                bp.isTabletOrMobile && styles.heroSubtitleTabletOrMobile,
                bp.isMobile && styles.heroSubtitleMobile,
              ]}
            >
              CONSULTORA DE SOFTWARE
            </Text>
            <Text
              style={[
                styles.heroTitle,
                bp.isTabletOrMobile && styles.heroTitleTabletOrMobile,
                bp.isMobile && styles.heroTitleMobile,
              ]}
            >
              Transformamos tus{"\n"}
              <Text style={styles.heroTitleAccent}>ideas digitales</Text>
              {"\n"}en realidad
            </Text>
            <Text
              style={[
                styles.heroDescription,
                bp.isTabletOrMobile && styles.heroDescriptionTabletOrMobile,
                bp.isMobile && styles.heroDescriptionMobile,
              ]}
            >
              Desarrollamos soluciones tecnológicas innovadoras para empresas que buscan crecer en el mundo digital.
              Desde aplicaciones móviles hasta sistemas web complejos.
            </Text>
            <View
              style={[
                styles.heroButtons,
                bp.isTabletOrMobile && styles.heroButtonsTabletOrMobile,
                bp.isMobile && styles.heroButtonsMobile,
              ]}
            >
              <StartProjectButton onPress={() => console.log("Comenzar proyecto")} />
              <ViewPortfolioButton onPress={() => console.log("Ver portafolio")} />
            </View>
          </View>

          <View
            style={[
              styles.heroVisual,
              bp.isTabletOrMobile && styles.heroVisualTabletOrMobile,
              bp.isMobile && styles.heroVisualMobile,
            ]}
          >
            <View
              style={[
                styles.floatingCard,
                bp.isTabletOrMobile && styles.floatingCardTabletOrMobile,
                bp.isMobile && styles.floatingCardMobile,
              ]}
            >
              <View style={[styles.cardHeader, bp.isMobile && styles.cardHeaderMobile]}>
                <View style={[styles.cardDots, bp.isMobile && styles.cardDotsMobile]}>
                  <View style={[styles.dot, { backgroundColor: "#ff6b35" }, bp.isMobile && styles.dotMobile]} />
                  <View style={[styles.dot, { backgroundColor: "#fff" }, bp.isMobile && styles.dotMobile]} />
                  <View style={[styles.dot, { backgroundColor: "#fff" }, bp.isMobile && styles.dotMobile]} />
                </View>
              </View>
              <View style={styles.cardContent}>
                <Text
                  style={[
                    styles.cardTitle,
                    bp.isTabletOrMobile && styles.cardTitleTabletOrMobile,
                    bp.isMobile && styles.cardTitleMobile,
                  ]}
                >
                  {"<NilO Solutions />"}
                </Text>
                <Text
                  style={[
                    styles.cardSubtitle,
                    bp.isTabletOrMobile && styles.cardSubtitleTabletOrMobile,
                    bp.isMobile && styles.cardSubtitleMobile,
                  ]}
                >
                  Desarrollo de Software
                </Text>
                <View style={[styles.cardStats, bp.isMobile && styles.cardStatsMobile]}>
                  <View style={styles.statItem}>
                    <Text
                      style={[
                        styles.statNumber,
                        bp.isTabletOrMobile && styles.statNumberTabletOrMobile,
                        bp.isMobile && styles.statNumberMobile,
                      ]}
                    >
                      15+
                    </Text>
                    <Text
                      style={[
                        styles.statLabel,
                        bp.isTabletOrMobile && styles.statLabelTabletOrMobile,
                        bp.isMobile && styles.statLabelMobile,
                      ]}
                    >
                      Proyectos
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text
                      style={[
                        styles.statNumber,
                        bp.isTabletOrMobile && styles.statNumberTabletOrMobile,
                        bp.isMobile && styles.statNumberMobile,
                      ]}
                    >
                      10+
                    </Text>
                    <Text
                      style={[
                        styles.statLabel,
                        bp.isTabletOrMobile && styles.statLabelTabletOrMobile,
                        bp.isMobile && styles.statLabelMobile,
                      ]}
                    >
                      Clientes
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.backgroundElements, bp.isMobile && styles.backgroundElementsMobile]}>
              <View
                style={[
                  styles.circle,
                  styles.circle1,
                  bp.isTabletOrMobile && styles.circle1TabletOrMobile,
                  bp.isMobile && styles.circle1Mobile,
                ]}
              />
              <View
                style={[
                  styles.circle,
                  styles.circle2,
                  bp.isTabletOrMobile && styles.circle2TabletOrMobile,
                  bp.isMobile && styles.circle2Mobile,
                ]}
              />
              <View
                style={[
                  styles.square,
                  styles.square1,
                  bp.isTabletOrMobile && styles.square1TabletOrMobile,
                  bp.isMobile && styles.square1Mobile,
                ]}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

/* --------------------- BREAKPOINT------------------------ */
const useBreakpoint = () => {
  const { width } = useWindowDimensions()
  return {
    isTabletOrMobile: width < 1024,
    isMobile: width < 768,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#000",
  },

  /* -------- HERO SECTION -------- */
  heroSection: {
    backgroundColor: "#000",
    minHeight: height * 0.8,
    paddingVertical: 60,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  heroSectionTabletOrMobile: {
    paddingVertical: 50,
    paddingHorizontal: 16,
    minHeight: height * 0.75,
  },
  heroSectionMobile: {
    paddingVertical: 40,
    paddingHorizontal: 12,
    minHeight: "auto",
  },

  /* -------- HERO CONTENT -------- */
  heroContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: 1200,
    width: "100%",
  },
  heroContentTabletOrMobile: {
    flexDirection: "row",
    gap: 30,
  },
  heroContentMobile: {
    flexDirection: "column",
    alignItems: "center",
    gap: 40,
  },

  /* -------- HERO TEXT CONTAINER -------- */
  heroTextContainer: {
    flex: 1,
    paddingRight: 40,
  },
  heroTextContainerTabletOrMobile: {
    paddingRight: 20,
    flex: 1.2,
  },
  heroTextContainerMobile: {
    paddingRight: 0,
    alignItems: "center",
    textAlign: "center",
  },

  /* -------- HERO SUBTITLE -------- */
  heroSubtitle: {
    fontSize: 14,
    color: "#ff6b35",
    fontWeight: "600",
    letterSpacing: 2,
    marginBottom: 20,
  },
  heroSubtitleTabletOrMobile: {
    fontSize: 13,
    marginBottom: 18,
  },
  heroSubtitleMobile: {
    fontSize: 12,
    marginBottom: 16,
    textAlign: "center",
  },

  /* -------- HERO TITLE -------- */
  heroTitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    lineHeight: 56,
    marginBottom: 24,
  },
  heroTitleTabletOrMobile: {
    fontSize: 36,
    lineHeight: 42,
    marginBottom: 20,
  },
  heroTitleMobile: {
    fontSize: 28,
    lineHeight: 34,
    marginBottom: 18,
    textAlign: "center",
  },
  heroTitleAccent: {
    color: "#ff6b35",
  },

  /* -------- HERO DESCRIPTION -------- */
  heroDescription: {
    fontSize: 18,
    color: "#ccc",
    lineHeight: 28,
    marginBottom: 40,
    maxWidth: 500,
  },
  heroDescriptionTabletOrMobile: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 35,
    maxWidth: 400,
  },
  heroDescriptionMobile: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 30,
    maxWidth: 300,
    textAlign: "center",
  },

  /* -------- HERO BUTTONS -------- */
  heroButtons: {
    flexDirection: "row",
    gap: 20,
  },
  heroButtonsTabletOrMobile: {
    gap: 16,
  },
  heroButtonsMobile: {
    flexDirection: "column",
    gap: 16,
    alignItems: "center",
    width: "100%",
  },

  /* -------- HERO VISUAL -------- */
  heroVisual: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  heroVisualTabletOrMobile: {
    flex: 0.8,
  },
  heroVisualMobile: {
    flex: 0,
    width: "100%",
    marginTop: 20,
  },

  /* -------- FLOATING CARD -------- */
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
  floatingCardTabletOrMobile: {
    width: 240,
    padding: 20,
    borderRadius: 16,
  },
  floatingCardMobile: {
    width: 260,
    padding: 18,
    borderRadius: 14,
    elevation: 6,
    shadowRadius: 12,
  },

  /* -------- CARD HEADER -------- */
  cardHeader: {
    marginBottom: 20,
  },
  cardHeaderMobile: {
    marginBottom: 16,
  },

  /* -------- CARD DOTS -------- */
  cardDots: {
    flexDirection: "row",
    gap: 8,
  },
  cardDotsMobile: {
    gap: 6,
  },

  /* -------- DOT -------- */
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotMobile: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  /* -------- CARD CONTENT -------- */
  cardContent: {
    alignItems: "center",
  },

  /* -------- CARD TITLE -------- */
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    fontFamily: "monospace",
  },
  cardTitleTabletOrMobile: {
    fontSize: 20,
    marginBottom: 6,
  },
  cardTitleMobile: {
    fontSize: 18,
    marginBottom: 6,
  },

  /* -------- CARD SUBTITLE -------- */
  cardSubtitle: {
    fontSize: 16,
    color: "#ff6b35",
    marginBottom: 24,
  },
  cardSubtitleTabletOrMobile: {
    fontSize: 14,
    marginBottom: 20,
  },
  cardSubtitleMobile: {
    fontSize: 13,
    marginBottom: 18,
  },

  /* -------- CARD STATS -------- */
  cardStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  cardStatsMobile: {
    gap: 20,
  },

  /* -------- STAT ITEM -------- */
  statItem: {
    alignItems: "center",
  },

  /* -------- STAT NUMBER -------- */
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff6b35",
    marginBottom: 4,
  },
  statNumberTabletOrMobile: {
    fontSize: 24,
    marginBottom: 3,
  },
  statNumberMobile: {
    fontSize: 22,
    marginBottom: 3,
  },

  /* -------- STAT LABEL -------- */
  statLabel: {
    fontSize: 14,
    color: "#ccc",
  },
  statLabelTabletOrMobile: {
    fontSize: 13,
  },
  statLabelMobile: {
    fontSize: 12,
  },

  /* -------- BACKGROUND ELEMENTS -------- */
  backgroundElements: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  backgroundElementsMobile: {
    opacity: 0.8,
    zIndex: 1,
  },

  /* -------- CIRCLES -------- */
  circle: {
    position: "absolute",
    borderRadius: 50,
    opacity: 0.1,
    pointerEvents: "none",
  },
  circle1: {
    width: 100,
    height: 100,
    backgroundColor: "#ff6b35",
    top: 20,
    right: 20,
  },
  circle1TabletOrMobile: {
    width: 80,
    height: 80,
    top: 15,
    right: 15,
  },
  circle1Mobile: {
    width: 70,
    height: 70,
    top: -10,
    right: -10,
    opacity: 0.15,
  },
  circle2: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    bottom: 100,
    left: 40,
  },
  circle2TabletOrMobile: {
    width: 50,
    height: 50,
    bottom: 80,
    left: 30,
  },
  circle2Mobile: {
    width: 50,
    height: 50,
    bottom: -20,
    left: -10,
    opacity: 0.12,
  },

  /* -------- SQUARES -------- */
  square: {
    position: "absolute",
    opacity: 0.05,
    pointerEvents: "none",
  },
  square1: {
    width: 80,
    height: 80,
    backgroundColor: "#ff6b35",
    bottom: 40,
    right: 60,
    transform: [{ rotate: "45deg" }],
  },
  square1TabletOrMobile: {
    width: 65,
    height: 65,
    bottom: 30,
    right: 45,
  },
  square1Mobile: {
    width: 60,
    height: 60,
    bottom: -15,
    right: -15,
    opacity: 0.08,
  },
})

export default NiloSolutionsIndex
