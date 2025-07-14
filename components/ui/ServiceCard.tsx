"use client"
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native"

interface Service {
  icon: string
  title: string
  description: string
}

interface Props {
  service: Service
  width: number
  hovered: boolean
  onHoverIn: () => void
  onHoverOut: () => void
  onPress: () => void
  breakpoint?: {
    isTabletOrMobile: boolean
    isMobile: boolean
  }
}

const useBreakpoint = () => {
  const { width } = useWindowDimensions()
  return {
    isTabletOrMobile: width < 1024,
    isMobile: width < 768,
  }
}

const ServiceCard = ({ service, width, hovered, onHoverIn, onHoverOut, onPress, breakpoint }: Props) => {
  const bp = breakpoint || useBreakpoint()

  return (
    <TouchableOpacity
      style={[
        styles.serviceCard,
        {
          width,
          height: width * 0.9,
          transform: [{ scale: hovered ? 1.05 : 1 }],
        },
        hovered && styles.serviceCardHovered,
        bp.isTabletOrMobile && styles.serviceCardTabletOrMobile,
        bp.isMobile && styles.serviceCardMobile,
      ]}
      onPress={onPress}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      activeOpacity={0.9}
    >
      <View style={[styles.gradientOverlay, hovered && styles.gradientOverlayHovered]} />
      <View
        style={[
          styles.leftBorder,
          hovered && styles.leftBorderHovered,
          bp.isTabletOrMobile && styles.leftBorderTabletOrMobile,
          bp.isMobile && styles.leftBorderMobile,
        ]}
      />

      <View
        style={[
          styles.cardContent,
          bp.isTabletOrMobile && styles.cardContentTabletOrMobile,
          bp.isMobile && styles.cardContentMobile,
        ]}
      >
        <View
          style={[
            styles.iconContainer,
            hovered && styles.iconContainerHovered,
            bp.isTabletOrMobile && styles.iconContainerTabletOrMobile,
            bp.isMobile && styles.iconContainerMobile,
          ]}
        >
          <View
            style={[
              styles.iconGlow,
              bp.isTabletOrMobile && styles.iconGlowTabletOrMobile,
              bp.isMobile && styles.iconGlowMobile,
            ]}
          />
          <Text
            style={[
              styles.serviceIcon,
              bp.isTabletOrMobile && styles.serviceIconTabletOrMobile,
              bp.isMobile && styles.serviceIconMobile,
            ]}
          >
            {service.icon}
          </Text>
        </View>

        <View style={[styles.titleSection, bp.isMobile && styles.titleSectionMobile]}>
          <Text
            style={[
              styles.serviceTitle,
              hovered && styles.serviceTitleHovered,
              bp.isTabletOrMobile && styles.serviceTitleTabletOrMobile,
              bp.isMobile && styles.serviceTitleMobile,
            ]}
          >
            {service.title}
          </Text>
          <View
            style={[
              styles.titleUnderline,
              hovered && styles.titleUnderlineHovered,
              bp.isTabletOrMobile && styles.titleUnderlineTabletOrMobile,
              bp.isMobile && styles.titleUnderlineMobile,
            ]}
          />
        </View>

        <Text
          style={[
            styles.serviceDescription,
            bp.isTabletOrMobile && styles.serviceDescriptionTabletOrMobile,
            bp.isMobile && styles.serviceDescriptionMobile,
          ]}
        >
          {service.description}
        </Text>

        <View style={[styles.learnMoreContainer, bp.isMobile && styles.learnMoreContainerMobile]}>
          <Text
            style={[
              styles.learnMoreText,
              bp.isTabletOrMobile && styles.learnMoreTextTabletOrMobile,
              bp.isMobile && styles.learnMoreTextMobile,
            ]}
          >
            Saber más
          </Text>
          <Text
            style={[
              styles.learnMoreArrow,
              hovered && styles.learnMoreArrowHovered,
              bp.isTabletOrMobile && styles.learnMoreArrowTabletOrMobile,
              bp.isMobile && styles.learnMoreArrowMobile,
            ]}
          >
            →
          </Text>
        </View>
      </View>

      {hovered && <View style={styles.shineEffect} />}
    </TouchableOpacity>
  )
}

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
  serviceCardTabletOrMobile: {
    borderRadius: 14,
    marginBottom: 18,
  },
  serviceCardMobile: {
    borderRadius: 12,
    marginBottom: 15,
    elevation: 6,
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
  leftBorderTabletOrMobile: {
    width: 3,
    height: 30,
    top: 18,
  },
  leftBorderMobile: {
    width: 3,
    height: 25,
    top: 15,
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
  cardContentTabletOrMobile: {
    padding: 18,
    paddingLeft: 24,
  },
  cardContentMobile: {
    padding: 14,
    paddingLeft: 18,
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
  iconContainerTabletOrMobile: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginBottom: 14,
  },
  iconContainerMobile: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginBottom: 10,
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
  iconGlowTabletOrMobile: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    top: -5,
    left: -5,
  },
  iconGlowMobile: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    top: -5,
    left: -5,
  },
  serviceIcon: {
    fontSize: 24,
    zIndex: 1,
  },
  serviceIconTabletOrMobile: {
    fontSize: 20,
  },
  serviceIconMobile: {
    fontSize: 18,
  },
  titleSection: {
    marginBottom: 12,
  },
  titleSectionMobile: {
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
    lineHeight: 22,
  },
  serviceTitleTabletOrMobile: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 5,
  },
  serviceTitleMobile: {
    fontSize: 14,
    lineHeight: 17,
    marginBottom: 4,
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
  titleUnderlineTabletOrMobile: {
    width: 28,
    height: 2,
  },
  titleUnderlineMobile: {
    width: 25,
    height: 1.5,
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
  serviceDescriptionTabletOrMobile: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 14,
  },
  serviceDescriptionMobile: {
    fontSize: 10,
    lineHeight: 14,
    marginBottom: 10,
  },
  learnMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  learnMoreContainerMobile: {
    gap: 6,
  },
  learnMoreText: {
    fontSize: 13,
    color: "#ff6b35",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  learnMoreTextTabletOrMobile: {
    fontSize: 12,
  },
  learnMoreTextMobile: {
    fontSize: 10,
  },
  learnMoreArrow: {
    fontSize: 14,
    color: "#ff6b35",
    fontWeight: "bold",
  },
  learnMoreArrowTabletOrMobile: {
    fontSize: 13,
  },
  learnMoreArrowMobile: {
    fontSize: 12,
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
