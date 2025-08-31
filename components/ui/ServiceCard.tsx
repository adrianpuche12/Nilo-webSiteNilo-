"use client";
import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useModernHoverAnimation } from "@/components/animations/ModernAnimations";

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface Props {
  service: Service;
  width: number;
  hovered: boolean;
  onHoverIn: () => void;
  onHoverOut: () => void;
  onPress: () => void;
  breakpoint?: {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isLargeDesktop: boolean;
  };
}

const useBreakpoint = () => {
  const { width } = useWindowDimensions();
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024 && width < 1440,
    isLargeDesktop: width >= 1440,
  };
};

const ServiceCard = ({
  service,
  width,
  hovered,
  onHoverIn,
  onHoverOut,
  onPress,
  breakpoint,
}: Props) => {
  const bp = breakpoint || useBreakpoint();

  // Usar la nueva animación moderna
  const { cardStyle, shadowStyle, borderStyle } = useModernHoverAnimation(hovered);

  // Animaciones específicas para elementos internos
  const iconScale = useSharedValue(1);
  const arrowTranslateX = useSharedValue(0);
  const titleColor = useSharedValue(0);
  const underlineWidth = useSharedValue(30);
  const leftBorderHeight = useSharedValue(20);

  // Efectos de las animaciones - Siguiendo patrón de referencia
  useEffect(() => {
    if (hovered) {
      iconScale.value = withTiming(1.15, { duration: 250 });
      arrowTranslateX.value = withTiming(6, { duration: 250 });
      titleColor.value = withTiming(1, { duration: 250 });
      underlineWidth.value = withTiming(60, { duration: 250 });
      leftBorderHeight.value = withTiming(70, { duration: 250 });
    } else {
      iconScale.value = withTiming(1, { duration: 350 });
      arrowTranslateX.value = withTiming(0, { duration: 350 });
      titleColor.value = withTiming(0, { duration: 350 });
      underlineWidth.value = withTiming(30, { duration: 350 });
      leftBorderHeight.value = withTiming(45, { duration: 350 });
    }
  }, [hovered]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
    backgroundColor: interpolateColor(
      iconScale.value,
      [1, 1.15],
      ["#FF6600", "#FF8533"]
    ),
  }));

  const animatedArrowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: arrowTranslateX.value }],
    color: interpolateColor(titleColor.value, [0, 1], ["#FF6600", "#ffffff"]),
  }));

  const animatedTitleStyle = useAnimatedStyle(() => ({
    color: interpolateColor(titleColor.value, [0, 1], ["#ffffff", "#FF6600"]),
  }));

  const animatedUnderlineStyle = useAnimatedStyle(() => ({
    width: underlineWidth.value,
    backgroundColor: interpolateColor(
      titleColor.value,
      [0, 1],
      ["#FF6600", "#ffffff"]
    ),
  }));

  const animatedLeftBorderStyle = useAnimatedStyle(() => ({
    height: leftBorderHeight.value,
  }));
  return (
    <Animated.View
      style={[
        styles.serviceCard,
        {
          width,
          height: Math.max(width * 0.85, 320),
        },
        cardStyle, // Nueva animación moderna
        shadowStyle, // Efecto de sombra moderna
        borderStyle, // Bordes animados
        bp.isMobile && styles.serviceCardMobile,
        bp.isTablet && styles.serviceCardTablet,
        bp.isDesktop && styles.serviceCardDesktop,
        bp.isLargeDesktop && styles.serviceCardLargeDesktop,
      ]}
      //@ts-ignore
      onPress={onPress}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      activeOpacity={0.9}
    >
      <View
        style={[
          styles.gradientOverlay,
          hovered && styles.gradientOverlayHovered,
        ]}
      />
      <View style={styles.glowEffect} />
      <View style={styles.pulseEffect} />
      <Animated.View
        style={[
          styles.leftBorder,
          animatedLeftBorderStyle,
          bp.isMobile && styles.leftBorderMobile,
          bp.isTablet && styles.leftBorderTablet,
          bp.isDesktop && styles.leftBorderDesktop,
        ]}
      />

      <View
        style={[
          styles.cardContent,
          bp.isMobile && styles.cardContentMobile,
          bp.isTablet && styles.cardContentTablet,
          bp.isDesktop && styles.cardContentDesktop,
        ]}
      >
        <Animated.View
          style={[
            styles.iconContainer,
            animatedIconStyle,
            bp.isMobile && styles.iconContainerMobile,
            bp.isTablet && styles.iconContainerTablet,
            bp.isDesktop && styles.iconContainerDesktop,
          ]}
        >
          <Text
            style={[
              styles.serviceIcon,
              bp.isMobile && styles.serviceIconMobile,
              bp.isTablet && styles.serviceIconTablet,
              bp.isDesktop && styles.serviceIconDesktop,
            ]}
          >
            {service.icon}
          </Text>
        </Animated.View>

        <View 
          style={[
            styles.cardBody,
            bp.isMobile && styles.cardBodyMobile,
            bp.isTablet && styles.cardBodyTablet,
            bp.isDesktop && styles.cardBodyDesktop,
          ]}
        >
          <View
            style={[
              styles.titleSection,
              bp.isMobile && styles.titleSectionMobile,
            ]}
          >
            <Animated.Text
              style={[
                styles.serviceTitle,
                animatedTitleStyle,
                bp.isMobile && styles.serviceTitleMobile,
                bp.isTablet && styles.serviceTitleTablet,
                bp.isDesktop && styles.serviceTitleDesktop,
              ]}
            >
              {service.title}
            </Animated.Text>
          </View>

          <Text
            style={[
              styles.serviceDescription,
              bp.isMobile && styles.serviceDescriptionMobile,
              bp.isTablet && styles.serviceDescriptionTablet,
              bp.isDesktop && styles.serviceDescriptionDesktop,
            ]}
          >
            {service.description}
          </Text>

        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  serviceCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#333333",
    marginBottom: 20,
    position: "relative",
    overflow: "hidden",
  },
  serviceCardMobile: {
    borderRadius: 12,
    marginBottom: 15,
    elevation: 6,
  },
  serviceCardTablet: {
    borderRadius: 14,
    marginBottom: 18,
  },
  serviceCardDesktop: {
    borderRadius: 16,
    marginBottom: 20,
  },
  serviceCardLargeDesktop: {
    borderRadius: 20,
    marginBottom: 24,
  },

  serviceCardHovered: {
    elevation: 20,
    shadowColor: "#FF6600",
    shadowOpacity: 0.2,
    shadowRadius: 24,
    borderColor: "#FF6600",
    backgroundColor: "#222",
  },

  // serviceCardHovered: {
  //   elevation: 20,
  //   shadowColor: "#FF6600",
  //   shadowOpacity: 0.2,
  //   shadowRadius: 24,
  //   borderColor: "#FF6600",
  //   backgroundColor: "#222",
  // },
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
    backgroundColor: "#FF6600",
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  leftBorderMobile: {
    width: 3,
    height: 25,
    top: 15,
  },
  leftBorderTablet: {
    width: 3,
    height: 30,
    top: 18,
  },
  leftBorderDesktop: {
    width: 4,
    height: 35,
    top: 20,
  },
  leftBorderHovered: {
    height: 45,
    top: 15,
    width: 5,
    shadowColor: "#FF6600",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },

  // leftBorderHovered: {
  //   height: 45,
  //   top: 15,
  //   width: 5,
  //   shadowColor: "#FF6600",
  //   shadowOffset: { width: 2, height: 0 },
  //   shadowOpacity: 0.6,
  //   shadowRadius: 8,
  // },
  cardContent: {
    padding: 0,
    flex: 1,
    justifyContent: "space-between",
    zIndex: 1,
  },
  cardContentMobile: {
    padding: 0,
  },
  cardContentTablet: {
    padding: 0,
  },
  cardContentDesktop: {
    padding: 0,
  },

  iconContainer: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    backgroundColor: "#FF6600",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
    position: "relative",
  },
  iconContainerMobile: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 0,
  },
  iconContainerTablet: {
    width: "100%",
    height: 110,
    borderRadius: 8,
    marginBottom: 0,
  },
  iconContainerDesktop: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 0,
  },
  iconContainerHovered: {
    backgroundColor: "#f49349",
    transform: [{ scale: 1.1 }],
    shadowOpacity: 0.5,
  },

  // iconContainerHovered: {
  //   backgroundColor: "#f49349",
  //   transform: [{ scale: 1.1 }],
  //   shadowOpacity: 0.5,
  // },
  iconGlow: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF6600",
    opacity: 0.2,
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
  iconGlowTablet: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    top: -5,
    left: -5,
  },
  iconGlowDesktop: {
    width: 40,
    height: 40,
    borderRadius: 30,
    top: -5,
    left: -5,
  },

  serviceIcon: {
    fontSize: 48,
    zIndex: 1,
    color: "#fff",
  },
  serviceIconMobile: {
    fontSize: 40,
  },
  serviceIconTablet: {
    fontSize: 44,
  },
  serviceIconDesktop: {
    fontSize: 48,
  },

  titleSection: {
    marginBottom: 12,
  },
  titleSectionMobile: {
    marginBottom: 10,
  },

  serviceTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
    lineHeight: 24,
  },
  serviceTitleMobile: {
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 8,
  },
  serviceTitleTablet: {
    fontSize: 19,
    lineHeight: 23,
    marginBottom: 8,
  },
  serviceTitleDesktop: {
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 8,
  },
  serviceTitleHovered: {
    color: "#FF6600",
  },

  // serviceTitleHovered: {
  //   color: "#FF6600",
  // },
  titleUnderline: {
    width: 30,
    height: 2,
    backgroundColor: "#FF6600",
    borderRadius: 1,
  },
  titleUnderlineMobile: {
    width: 25,
    height: 1.5,
  },
  titleUnderlineTablet: {
    width: 28,
    height: 2,
  },
  titleUnderlineDesktop: {
    width: 30,
    height: 2,
  },
  titleUnderlineHovered: {
    width: 50,
    backgroundColor: "#fff",
  },

  // titleUnderlineHovered: {
  //   width: 50,
  //   backgroundColor: "#fff",
  // },
  serviceDescription: {
    fontSize: 14,
    color: "#999",
    lineHeight: 20,
    marginBottom: 16,
    flex: 1,
    letterSpacing: 0.2,
  },
  serviceDescriptionMobile: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  serviceDescriptionTablet: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 16,
  },
  serviceDescriptionDesktop: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },

  learnMoreContainer: {
    width: "100%",
    alignItems: "center",
  },
  learnMoreContainerMobile: {
    gap: 6,
  },

  learnMoreText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
    letterSpacing: 0.5,
    textAlign: "center",
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
  },
  learnMoreTextMobile: {
    fontSize: 14,
  },
  learnMoreTextTablet: {
    fontSize: 15,
  },
  learnMoreTextDesktop: {
    fontSize: 14,
  },

  learnMoreArrow: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
  },
  learnMoreArrowMobile: {
    fontSize: 14,
  },
  learnMoreArrowTablet: {
    fontSize: 15,
  },
  learnMoreArrowDesktop: {
    fontSize: 14,
  },
  learnMoreArrowHovered: {
    transform: [{ translateX: 4 }],
    color: "#fff",
  },

  // learnMoreArrowHovered: {
  //   transform: [{ translateX: 4 }],
  //   color: "#fff",
  // },
  shineEffect: {
    position: "absolute",
    top: 0,
    left: -100,
    width: 50,
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: [{ skewX: "-20deg" }],
  },
  glowEffect: {
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    backgroundColor: "transparent",
    opacity: 0,
  },
  pulseEffect: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 20,
    height: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  cardBody: {
    padding: 20,
    flex: 1,
    justifyContent: "flex-start",
  },
  cardBodyMobile: {
    padding: 16,
  },
  cardBodyTablet: {
    padding: 18,
  },
  cardBodyDesktop: {
    padding: 20,
  },
});

export default ServiceCard;
