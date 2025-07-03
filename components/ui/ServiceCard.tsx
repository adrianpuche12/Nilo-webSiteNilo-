import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

interface Service {
  id: number
  title: string
  icon: string
  description: string
  route: string
}

interface Props {
  service: Service
  width: number
  hovered: boolean
  onHoverIn: () => void
  onHoverOut: () => void
  onPress: () => void
}

const ServiceCard = ({ service, width, hovered, onHoverIn, onHoverOut, onPress }: Props) => (
  <TouchableOpacity
    style={[
      styles.serviceCard,
      {
        width,
        height: width * 0.9,
        transform: [{ scale: hovered ? 1.05 : 1 }],
      },
      hovered && styles.serviceCardHovered,
    ]}
    onPress={onPress}
    onMouseEnter={onHoverIn}
    onMouseLeave={onHoverOut}
    activeOpacity={0.9}
  >
    <View style={[styles.gradientOverlay, hovered && styles.gradientOverlayHovered]} />
    <View style={[styles.leftBorder, hovered && styles.leftBorderHovered]} />

    <View style={styles.cardContent}>
      <View style={[styles.iconContainer, hovered && styles.iconContainerHovered]}>
        <View style={styles.iconGlow} />
        <Text style={styles.serviceIcon}>{service.icon}</Text>
      </View>

      <View style={styles.titleSection}>
        <Text style={[styles.serviceTitle, hovered && styles.serviceTitleHovered]}>
          {service.title}
        </Text>
        <View style={[styles.titleUnderline, hovered && styles.titleUnderlineHovered]} />
      </View>

      <Text style={styles.serviceDescription}>{service.description}</Text>

      <View style={styles.learnMoreContainer}>
        <Text style={styles.learnMoreText}>Saber más</Text>
        <Text style={[styles.learnMoreArrow, hovered && styles.learnMoreArrowHovered]}>→</Text>
      </View>
    </View>

    {hovered && <View style={styles.shineEffect} />}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  serviceCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    marginBottom: 20,
    position: "relative",
    overflow: "hidden",
  },
  serviceCardHovered: {
    elevation: 20,
    shadowColor: "#ff6b35",
    shadowOpacity: 0.2,
    shadowRadius: 24,
    borderColor: "#ff6b35",
    backgroundColor: "#222",
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  gradientOverlayHovered: {
    backgroundColor: "rgba(255, 107, 53, 0.03)",
  },
  leftBorder: {
    position: "absolute",
    left: 0,
    top: 20,
    width: 4,
    height: 35,
    backgroundColor: "#ff6b35",
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  leftBorderHovered: {
    height: 45,
    top: 15,
    width: 5,
    shadowColor: "#ff6b35",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  cardContent: {
    padding: 20,
    paddingLeft: 28,
    flex: 1,
    justifyContent: "space-between",
    zIndex: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ff6b35",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    position: "relative",
    elevation: 4,
    shadowColor: "#ff6b35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  iconContainerHovered: {
    backgroundColor: "#f49349",
    transform: [{ scale: 1.1 }],
    shadowOpacity: 0.5,
  },
  iconGlow: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ff6b35",
    opacity: 0.2,
    top: -5,
    left: -5,
  },
  serviceIcon: {
    fontSize: 24,
    zIndex: 1,
  },
  titleSection: {
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
    lineHeight: 22,
  },
  serviceTitleHovered: {
    color: "#ff6b35",
  },
  titleUnderline: {
    width: 30,
    height: 2,
    backgroundColor: "#ff6b35",
    borderRadius: 1,
  },
  titleUnderlineHovered: {
    width: 50,
    backgroundColor: "#fff",
  },
  serviceDescription: {
    fontSize: 13,
    color: "#bbb",
    lineHeight: 18,
    marginBottom: 16,
    flex: 1,
    letterSpacing: 0.2,
  },
  learnMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  learnMoreText: {
    fontSize: 13,
    color: "#ff6b35",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  learnMoreArrow: {
    fontSize: 14,
    color: "#ff6b35",
    fontWeight: "bold",
  },
  learnMoreArrowHovered: {
    transform: [{ translateX: 4 }],
    color: "#fff",
  },
  shineEffect: {
    position: "absolute",
    top: 0,
    left: -100,
    width: 50,
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: [{ skewX: "-20deg" }],
  },
})

export default ServiceCard
