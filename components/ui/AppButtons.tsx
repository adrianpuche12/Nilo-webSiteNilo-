"use client"
import { useState } from "react"
import { Pressable, StyleSheet, type GestureResponderEvent, Platform, useWindowDimensions } from "react-native"
import Text from "@/components/ui/CustomText"
import { useRouter } from "expo-router"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated"
import { useEffect } from "react"

// Unified hover animation hook following reference page pattern
const useUnifiedHover = () => {
  const [isHovered, setIsHovered] = useState(false)
  const scale = useSharedValue(1)
  const shadowOpacity = useSharedValue(0.3)

  useEffect(() => {
    if (isHovered) {
      scale.value = withTiming(1.05, { duration: 200 })
      shadowOpacity.value = withTiming(0.5, { duration: 200 })
    } else {
      scale.value = withTiming(1, { duration: 200 })
      shadowOpacity.value = withTiming(0.3, { duration: 200 })
    }
  }, [isHovered])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: shadowOpacity.value,
  }))

  return {
    isHovered,
    animatedStyle,
    eventHandlers:
      Platform.OS === "web"
        ? {
            onHoverIn: () => setIsHovered(true),
            onHoverOut: () => setIsHovered(false),
          }
        : {},
  }
}

export const LoginButton = () => {
  const router = useRouter()
  const { isHovered, animatedStyle, eventHandlers } = useUnifiedHover()
  const bp = useBreakpoint()

  return (
    <Animated.View style={[animatedStyle]}>
      <Pressable
        style={[
          styles.primaryButton,
          styles.primaryButtonSecondary,
          bp.isTablet && styles.buttonTablet,
          bp.isMobile && styles.buttonMobile,
        ]}
        onPress={() => router.push("/")}
        {...eventHandlers}
      >
        <Text
          style={[
            styles.primaryButtonText,
            styles.primaryButtonTextDark,
            bp.isTablet && styles.buttonTextTablet,
            bp.isMobile && styles.buttonTextMobile,
          ]}
        >
          INICIAR SESIÓN
        </Text>
      </Pressable>
    </Animated.View>
  )
}

export const EmailConsultButton = ({
  onPress,
}: {
  onPress?: (event: GestureResponderEvent) => void
}) => {
  const { isHovered, animatedStyle, eventHandlers } = useUnifiedHover()
  const bp = useBreakpoint()

  return (
    <Animated.View style={[animatedStyle]}>
      <Pressable
        style={[
          styles.outlineButton,
          bp.isTablet && styles.buttonTablet,
          bp.isMobile && styles.buttonMobile,
        ]}
        onPress={onPress}
        {...eventHandlers}
      >
        <Text
          style={[
            styles.outlineButtonText,
            bp.isTablet && styles.buttonTextTablet,
            bp.isMobile && styles.buttonTextMobile,
          ]}
        >
          CONSULTAR
        </Text>
      </Pressable>
    </Animated.View>
  )
}

export const RegisterButton = ({
  onPress,
}: {
  onPress?: (event: GestureResponderEvent) => void
}) => {
  const { isHovered, animatedStyle, eventHandlers } = useUnifiedHover()
  const bp = useBreakpoint()

  return (
    <Animated.View style={[animatedStyle, { backgroundColor: 'transparent', maxWidth: 150 }]}>
      <Pressable
        style={[
          styles.primaryButton,
          bp.isTablet && styles.buttonTablet,
          bp.isMobile && styles.buttonMobile,
        ]}
        onPress={onPress}
        {...eventHandlers}
      >
        <Text
          style={[
            styles.primaryButtonText,
            bp.isTablet && styles.buttonTextTablet,
            bp.isMobile && styles.buttonTextMobile,
          ]}
        >
          REGISTRARSE
        </Text>
      </Pressable>
    </Animated.View>
  )
}

export const StartProjectButton = ({
  onPress,
}: {
  onPress?: (event: GestureResponderEvent) => void
}) => {
  const { isHovered, animatedStyle, eventHandlers } = useUnifiedHover()
  const bp = useBreakpoint()

  return (
    <Animated.View style={[animatedStyle]}>
      <Pressable
        style={[
          styles.primaryButton,
          styles.primaryButtonLarge,
          bp.isTablet && styles.buttonTablet,
          bp.isMobile && styles.buttonMobile,
        ]}
        onPress={onPress}
        {...eventHandlers}
      >
        <Text
          style={[
            styles.primaryButtonText,
            styles.primaryButtonTextLarge,
            bp.isTablet && styles.buttonTextTablet,
            bp.isMobile && styles.buttonTextMobile,
          ]}
        >
          COMENZAR PROYECTO
        </Text>
      </Pressable>
    </Animated.View>
  )
}

export const ViewPortfolioButton = ({
  onPress,
}: {
  onPress?: (event: GestureResponderEvent) => void
}) => {
  const { isHovered, animatedStyle, eventHandlers } = useUnifiedHover()
  const bp = useBreakpoint()

  return (
    <Animated.View style={[animatedStyle]}>
      <Pressable
        style={[
          styles.outlineButton,
          styles.outlineButtonLarge,
          bp.isTablet && styles.buttonTablet,
          bp.isMobile && styles.buttonMobile,
        ]}
        onPress={onPress}
        {...eventHandlers}
      >
        <Text
          style={[
            styles.outlineButtonText,
            styles.outlineButtonTextLarge,
            bp.isTablet && styles.buttonTextTablet,
            bp.isMobile && styles.buttonTextMobile,
          ]}
        >
          VER PORTAFOLIO
        </Text>
      </Pressable>
    </Animated.View>
  )
}

export const FilterButton = ({
  title,
  isActive = false,
  onPress,
}: {
  title: string
  isActive?: boolean
  onPress?: (event: GestureResponderEvent) => void
}) => {
  const { isHovered, animatedStyle, eventHandlers } = useUnifiedHover()
  const bp = useBreakpoint()

  return (
    <Animated.View style={[animatedStyle]}>
      <Pressable
        style={[
          isActive ? styles.primaryButton : styles.secondaryButton,
          bp.isTablet && styles.buttonTablet,
          bp.isMobile && styles.buttonMobile,
        ]}
        onPress={onPress}
        {...eventHandlers}
      >
        <Text
          style={[
            isActive ? styles.primaryButtonText : styles.secondaryButtonText,
            bp.isTablet && styles.buttonTextTablet,
            bp.isMobile && styles.buttonTextMobile,
          ]}
        >
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  )
}

export const SendButton = ({
  onPress,
  disabled = false,
}: {
  onPress?: (event: GestureResponderEvent) => void
  disabled?: boolean
}) => {
  const { isHovered, animatedStyle, eventHandlers } = useUnifiedHover()
  const bp = useBreakpoint()

  return (
    <Animated.View style={[!disabled && animatedStyle]}>
      <Pressable
        style={[
          styles.primaryButton,
          styles.primaryButtonLarge,
          bp.isTablet && styles.buttonTablet,
          bp.isMobile && styles.buttonMobile,
          disabled && styles.disabledButton,
        ]}
        onPress={onPress}
        disabled={disabled}
        {...(disabled ? {} : eventHandlers)}
      >
        <Text
          style={[
            styles.primaryButtonText,
            styles.primaryButtonTextLarge,
            bp.isTablet && styles.buttonTextTablet,
            bp.isMobile && styles.buttonTextMobile,
            disabled && styles.disabledButtonText,
          ]}
        >
          ENVIAR
        </Text>
      </Pressable>
    </Animated.View>
  )
}

/* --------------------- BREAKPOINT ------------------------ */
const useBreakpoint = () => {
  const { width } = useWindowDimensions()
  return {
    isDesktop: width >= 1024,
    isTablet: width >= 768 && width < 1024,
    isMobile: width < 768,
  }
}

// Export unified button component for reuse
export const UnifiedButton = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
}: {
  title: string
  onPress?: (event: GestureResponderEvent) => void
  variant?: "primary" | "secondary" | "outline"
  size?: "small" | "medium" | "large"
  disabled?: boolean
}) => {
  const { isHovered, animatedStyle, eventHandlers } = useUnifiedHover()
  const bp = useBreakpoint()

  const getButtonStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondaryButton
      case "outline":
        return [
          styles.outlineButton,
          size === "large" && styles.outlineButtonLarge,
        ]
      default:
        return [
          styles.primaryButton,
          size === "large" && styles.primaryButtonLarge,
        ]
    }
  }

  const getTextStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondaryButtonText
      case "outline":
        return [
          styles.outlineButtonText,
          size === "large" && styles.outlineButtonTextLarge,
        ]
      default:
        return [
          styles.primaryButtonText,
          size === "large" && styles.primaryButtonTextLarge,
        ]
    }
  }

  return (
    <Animated.View style={[!disabled && animatedStyle]}>
      <Pressable
        style={[
          getButtonStyle(),
          bp.isTablet && styles.buttonTablet,
          bp.isMobile && styles.buttonMobile,
          disabled && styles.disabledButton,
        ]}
        onPress={onPress}
        disabled={disabled}
        {...(disabled ? {} : eventHandlers)}
      >
        <Text
          style={[
            getTextStyle(),
            bp.isTablet && styles.buttonTextTablet,
            bp.isMobile && styles.buttonTextMobile,
            disabled && styles.disabledButtonText,
          ]}
        >
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  )
}

/* ------------------------- UNIFIED STYLES ---------------------------- */
const styles = StyleSheet.create({
  /* -------- BASE BUTTON STYLES -------- */
  // Primary button - main call-to-action following reference design
  primaryButton: {
    backgroundColor: "#FF6600",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#FF6600",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    // @ts-ignore - transition for web compatibility
    transition: "all 0.2s ease",
  },
  primaryButtonSecondary: {
    backgroundColor: "#FF6600",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  primaryButtonLarge: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  primaryButtonTextDark: {
    color: "#000",
  },
  primaryButtonTextLarge: {
    fontSize: 16,
    letterSpacing: 1,
  },

  // Secondary button - neutral/inactive states
  secondaryButton: {
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#444",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // @ts-ignore - transition for web compatibility
    transition: "all 0.2s ease",
  },
  secondaryButtonText: {
    color: "#ccc",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.5,
  },

  // Outline button - border style following reference
  outlineButton: {
    backgroundColor: "transparent",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
    // @ts-ignore - transition for web compatibility
    transition: "all 0.2s ease",
  },
  outlineButtonLarge: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
  },
  outlineButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  outlineButtonTextLarge: {
    fontSize: 16,
  },

  // Disabled state
  disabledButton: {
    backgroundColor: "#666",
    elevation: 0,
    shadowOpacity: 0,
  },
  disabledButtonText: {
    color: "#999",
  },

  /* -------- RESPONSIVE BREAKPOINTS -------- */
  buttonTablet: {
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 22,
  },
  buttonMobile: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 18,
  },
  buttonTextTablet: {
    fontSize: 13,
  },
  buttonTextMobile: {
    fontSize: 12,
  },
})
