"use client";
import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { useEffect } from "react";

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

  const scale = useSharedValue(1);
  const borderOpacity = useSharedValue(0);
  const iconScale = useSharedValue(1);
  const arrowTranslateX = useSharedValue(0);
  const titleColor = useSharedValue(0);
  const underlineWidth = useSharedValue(30);
  const leftBorderHeight = useSharedValue(20);

  // Efectos de las animaciones
  useEffect(() => {
    if (hovered) {
      scale.value = withTiming(1.05, { duration: 200 });
      borderOpacity.value = withTiming(1, { duration: 200 });
      iconScale.value = withTiming(1.1, { duration: 200 });
      arrowTranslateX.value = withTiming(4, { duration: 200 });
      titleColor.value = withTiming(1, { duration: 200 });
      underlineWidth.value = withTiming(50, { duration: 200 });
      leftBorderHeight.value = withTiming(60, { duration: 200 });
    } else {
      scale.value = withTiming(1, { duration: 300 });
      borderOpacity.value = withTiming(0, { duration: 300 });
      iconScale.value = withTiming(1, { duration: 300 });
      arrowTranslateX.value = withTiming(0, { duration: 300 });
      titleColor.value = withTiming(0, { duration: 300 });
      underlineWidth.value = withTiming(30, { duration: 300 });
      leftBorderHeight.value = withTiming(45, { duration: 300 });
    }
  }, [hovered]);

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    borderColor: interpolateColor(
      borderOpacity.value,
      [1, 0],
      ["#ff6b35", "#2a2a2a"]
    ),
    backgroundColor: interpolateColor(
      borderOpacity.value,
      [1, 0],
      ["#222222", "#1a1a1a"]
    ),
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
    backgroundColor: interpolateColor(
      iconScale.value,
      [1, 1.1],
      ["#ff6b35", "#f49349"]
    ),
  }));

  const animatedArrowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: arrowTranslateX.value }],
    color: interpolateColor(titleColor.value, [0, 1], ["#ff6b35", "#ffffff"]),
  }));

  const animatedTitleStyle = useAnimatedStyle(() => ({
    color: interpolateColor(titleColor.value, [0, 1], ["#ffffff", "#ff6b35"]),
  }));

  const animatedUnderlineStyle = useAnimatedStyle(() => ({
    width: underlineWidth.value,
    backgroundColor: interpolateColor(
      titleColor.value,
      [0, 1],
      ["#ff6b35", "#ffffff"]
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
          height: width * 0.9,
        },
        animatedCardStyle,
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
          <View
            style={[
              styles.iconGlow,
              bp.isMobile && styles.iconGlowMobile,
              bp.isTablet && styles.iconGlowTablet,
              bp.isDesktop && styles.iconGlowDesktop,
            ]}
          />
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
          <Animated.View
            style={[
              styles.titleUnderline,
              animatedUnderlineStyle,
              bp.isMobile && styles.titleUnderlineMobile,
              bp.isTablet && styles.titleUnderlineTablet,
              bp.isDesktop && styles.titleUnderlineDesktop,
            ]}
          />
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

        <View
          style={[
            styles.learnMoreContainer,
            bp.isMobile && styles.learnMoreContainerMobile,
          ]}
        >
          <Animated.Text
            style={[
              styles.learnMoreText,
              animatedArrowStyle,
              bp.isMobile && styles.learnMoreTextMobile,
              bp.isTablet && styles.learnMoreTextTablet,
              bp.isDesktop && styles.learnMoreTextDesktop,
            ]}
          >
            Saber más
          </Animated.Text>
          <Animated.Text
            style={[
              styles.learnMoreArrow,
              animatedArrowStyle,
              bp.isMobile && styles.learnMoreArrowMobile,
              bp.isTablet && styles.learnMoreArrowTablet,
              bp.isDesktop && styles.learnMoreArrowDesktop,
            ]}
          >
            →
          </Animated.Text>
        </View>
      </View>
    </Animated.View>
  );
};

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
    shadowColor: "#ff6b35",
    shadowOpacity: 0.2,
    shadowRadius: 24,
    borderColor: "#ff6b35",
    backgroundColor: "#222",
  },

  // serviceCardHovered: {
  //   elevation: 20,
  //   shadowColor: "#ff6b35",
  //   shadowOpacity: 0.2,
  //   shadowRadius: 24,
  //   borderColor: "#ff6b35",
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
    backgroundColor: "#ff6b35",
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
    shadowColor: "#ff6b35",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },

  // leftBorderHovered: {
  //   height: 45,
  //   top: 15,
  //   width: 5,
  //   shadowColor: "#ff6b35",
  //   shadowOffset: { width: 2, height: 0 },
  //   shadowOpacity: 0.6,
  //   shadowRadius: 8,
  // },
  cardContent: {
    padding: 20,
    paddingLeft: 28,
    flex: 1,
    justifyContent: "space-between",
    zIndex: 1,
  },
  cardContentMobile: {
    padding: 14,
    paddingLeft: 18,
  },
  cardContentTablet: {
    padding: 18,
    paddingLeft: 24,
  },
  cardContentDesktop: {
    padding: 20,
    paddingLeft: 28,
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
  iconContainerMobile: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginBottom: 10,
  },
  iconContainerTablet: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginBottom: 14,
  },
  iconContainerDesktop: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginBottom: 16,
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
    backgroundColor: "#ff6b35",
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
    fontSize: 24,
    zIndex: 1,
  },
  serviceIconMobile: {
    fontSize: 18,
  },
  serviceIconTablet: {
    fontSize: 20,
  },
  serviceIconDesktop: {
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
  serviceTitleMobile: {
    fontSize: 14,
    lineHeight: 17,
    marginBottom: 4,
  },
  serviceTitleTablet: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 5,
  },
  serviceTitleDesktop: {
    fontSize: 16,
    lineHeight: 18,
    marginBottom: 5,
  },
  serviceTitleHovered: {
    color: "#ff6b35",
  },

  // serviceTitleHovered: {
  //   color: "#ff6b35",
  // },
  titleUnderline: {
    width: 30,
    height: 2,
    backgroundColor: "#ff6b35",
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
    fontSize: 13,
    color: "#bbb",
    lineHeight: 18,
    marginBottom: 16,
    flex: 1,
    letterSpacing: 0.2,
  },
  serviceDescriptionMobile: {
    fontSize: 10,
    lineHeight: 14,
    marginBottom: 10,
  },
  serviceDescriptionTablet: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 14,
  },
  serviceDescriptionDesktop: {
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 16,
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
  learnMoreTextMobile: {
    fontSize: 10,
  },
  learnMoreTextTablet: {
    fontSize: 12,
  },
  learnMoreTextDesktop: {
    fontSize: 12,
  },

  learnMoreArrow: {
    fontSize: 14,
    color: "#ff6b35",
    fontWeight: "bold",
  },
  learnMoreArrowMobile: {
    fontSize: 12,
  },
  learnMoreArrowTablet: {
    fontSize: 13,
  },
  learnMoreArrowDesktop: {
    fontSize: 13,
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
});

export default ServiceCard;
