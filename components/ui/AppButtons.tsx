"use client"
import { useState } from "react"
import { Pressable, StyleSheet, type GestureResponderEvent, Platform, useWindowDimensions } from "react-native"
import Text from "@/components/ui/CustomText"
import { useRouter } from "expo-router"

const useHover = () => {
  const [isHovered, setIsHovered] = useState(false)
  return {
    isHovered,
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
  const { isHovered, eventHandlers } = useHover()
  const bp = useBreakpoint()

  return (
    <Pressable
      style={[
        styles.loginButton,
        bp.isTablet && styles.loginButtonTablet,
        bp.isMobile && styles.loginButtonMobile,
        isHovered && styles.loginButtonHover,
      ]}
      onPress={() => router.push("/")}
      {...eventHandlers}
    >
      <Text
        style={[
          styles.loginButtonText,
          bp.isTablet && styles.loginButtonTextTablet,
          bp.isMobile && styles.loginButtonTextMobile,
        ]}
      >
        INICIAR SESIÓN
      </Text>
    </Pressable>
  )
}

export const EmailConsultButton = ({
  onPress,
}: {
  onPress?: (event: GestureResponderEvent) => void
}) => {
  const { isHovered, eventHandlers } = useHover()
  const bp = useBreakpoint()

  return (
    <Pressable
      style={[
        styles.consultButton,
        bp.isTablet && styles.consultButtonTablet,
        bp.isMobile && styles.consultButtonMobile,
        isHovered && styles.consultButtonHover,
      ]}
      onPress={onPress}
      {...eventHandlers}
    >
      <Text
        style={[
          styles.consultButtonText,
          bp.isTablet && styles.consultButtonTextTablet,
          bp.isMobile && styles.consultButtonTextMobile,
        ]}
      >
        CONSULTAR
      </Text>
    </Pressable>
  )
}

export const RegisterButton = ({
  onPress,
}: {
  onPress?: (event: GestureResponderEvent) => void
}) => {
  const { isHovered, eventHandlers } = useHover()
  const bp = useBreakpoint()

  return (
    <Pressable
      style={[
        styles.registerButton,
        bp.isTablet && styles.registerButtonTablet,
        bp.isMobile && styles.registerButtonMobile,
        isHovered && styles.registerButtonHover,
      ]}
      onPress={onPress}
      {...eventHandlers}
    >
      <Text
        style={[
          styles.registerButtonText,
          bp.isTablet && styles.registerButtonTextTablet,
          bp.isMobile && styles.registerButtonTextMobile,
        ]}
      >
        REGISTRARSE
      </Text>
    </Pressable>
  )
}

export const StartProjectButton = ({
  onPress,
}: {
  onPress?: (event: GestureResponderEvent) => void
}) => {
  const { isHovered, eventHandlers } = useHover()
  const bp = useBreakpoint()

  return (
    <Pressable
      style={[
        styles.startProjectButton,
        bp.isTablet && styles.startProjectButtonTablet,
        bp.isMobile && styles.startProjectButtonMobile,
        isHovered && styles.startProjectButtonHover,
      ]}
      onPress={onPress}
      {...eventHandlers}
    >
      <Text
        style={[
          styles.startProjectButtonText,
          bp.isTablet && styles.startProjectButtonTextTablet,
          bp.isMobile && styles.startProjectButtonTextMobile,
        ]}
      >
        COMENZAR PROYECTO
      </Text>
    </Pressable>
  )
}

export const ViewPortfolioButton = ({
  onPress,
}: {
  onPress?: (event: GestureResponderEvent) => void
}) => {
  const { isHovered, eventHandlers } = useHover()
  const bp = useBreakpoint()

  return (
    <Pressable
      style={[
        styles.viewPortfolioButton,
        bp.isTablet && styles.viewPortfolioButtonTablet,
        bp.isMobile && styles.viewPortfolioButtonMobile,
        isHovered && styles.viewPortfolioButtonHover,
      ]}
      onPress={onPress}
      {...eventHandlers}
    >
      <Text
        style={[
          styles.viewPortfolioButtonText,
          bp.isTablet && styles.viewPortfolioButtonTextTablet,
          bp.isMobile && styles.viewPortfolioButtonTextMobile,
        ]}
      >
        VER PORTAFOLIO
      </Text>
    </Pressable>
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
  const { isHovered, eventHandlers } = useHover()
  const bp = useBreakpoint()

  return (
    <Pressable
      style={[
        styles.filterButton,
        bp.isTablet && styles.filterButtonTablet,
        bp.isMobile && styles.filterButtonMobile,
        isActive && styles.filterButtonActive,
        isHovered && !isActive && styles.filterButtonHover,
        isHovered && isActive && styles.filterButtonActiveHover,
      ]}
      onPress={onPress}
      {...eventHandlers}
    >
      <Text
        style={[
          styles.filterButtonText,
          bp.isTablet && styles.filterButtonTextTablet,
          bp.isMobile && styles.filterButtonTextMobile,
          isActive && styles.filterButtonTextActive,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  )
}

export const SendButton = ({
  onPress,
  disabled = false,
}: {
  onPress?: (event: GestureResponderEvent) => void
  disabled?: boolean
}) => {
  const { isHovered, eventHandlers } = useHover()
  const bp = useBreakpoint()

  return (
    <Pressable
      style={[
        styles.sendButton,
        bp.isTablet && styles.sendButtonTablet,
        bp.isMobile && styles.sendButtonMobile,
        isHovered && styles.sendButtonHover,
        disabled && styles.sendButtonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      {...eventHandlers}
    >
      <Text
        style={[
          styles.sendButtonText,
          bp.isTablet && styles.sendButtonTextTablet,
          bp.isMobile && styles.sendButtonTextMobile,
          disabled && styles.sendButtonTextDisabled,
        ]}
      >
        ENVIAR
      </Text>
    </Pressable>
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

/* ------------------------- STYLES ---------------------------- */
const styles = StyleSheet.create({
  /* -------- LOGIN -------- */
  loginButton: {
    backgroundColor: "#ff6b35",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  loginButtonTablet: { paddingHorizontal: 13, paddingVertical: 7, borderRadius: 18 },
  loginButtonMobile: { paddingHorizontal: 11, paddingVertical: 6, borderRadius: 16 },
  loginButtonHover: { backgroundColor: "#ff8b60" },
  loginButtonText: { color: "#000", fontSize: 14, fontWeight: "bold" },
  loginButtonTextTablet: { fontSize: 13 },
  loginButtonTextMobile: { fontSize: 13, textAlign: "center" },

  /* -------- CONSULT -------- */
  consultButton: {
    backgroundColor: "#000",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  consultButtonTablet: { paddingHorizontal: 13, paddingVertical: 7 },
  consultButtonMobile: { paddingHorizontal: 11, paddingVertical: 6 },
  consultButtonHover: { backgroundColor: "#222" },
  consultButtonText: { color: "#fff", fontSize: 13, fontWeight: "bold" },
  consultButtonTextTablet: { fontSize: 11 },
  consultButtonTextMobile: { fontSize: 11 },

  /* -------- REGISTER -------- */
  registerButton: {
    backgroundColor: "#ff6b35",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  registerButtonTablet: { paddingHorizontal: 18, paddingVertical: 9 },
  registerButtonMobile: { paddingHorizontal: 16, paddingVertical: 8 },
  registerButtonHover: { backgroundColor: "#ff8b60" },
  registerButtonText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  registerButtonTextTablet: { fontSize: 11 },
  registerButtonTextMobile: { fontSize: 11 },

  /* -------- START PROJECT -------- */
  startProjectButton: {
    backgroundColor: "#ff6b35",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 3,
    shadowColor: "#ff6b35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    // @ts-ignore
    transition: "transform 0.2s ease-in-out"
  },
  startProjectButtonTablet: { paddingHorizontal: 28, paddingVertical: 14, borderRadius: 28 },
  startProjectButtonMobile: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 26 },
  startProjectButtonHover: { backgroundColor: "#ff8b60" , transform: [{ scale: 1.05 }]},
  startProjectButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  startProjectButtonTextTablet: { fontSize: 15 },
  startProjectButtonTextMobile: { fontSize: 14 },

  /* -------- VIEW PORTFOLIO -------- */
  viewPortfolioButton: {
    borderWidth: 2,
    borderColor: "#fff",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
    transition: "transform 0.2s ease-in-out",
  },
  viewPortfolioButtonTablet: { paddingHorizontal: 28, paddingVertical: 12, borderRadius: 28 },
  viewPortfolioButtonMobile: { paddingHorizontal: 24, paddingVertical: 10, borderRadius: 26 },
  viewPortfolioButtonHover: { backgroundColor: "#ffffff22" , transform: [{ scale: 1.05 }] },
  viewPortfolioButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  viewPortfolioButtonTextTablet: { fontSize: 15 },
  viewPortfolioButtonTextMobile: { fontSize: 14 },

  /* -------- FILTER -------- */
  filterButton: {
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#2a2a2a",
    transition: "transform 0.2s ease-in-out",
  },
  filterButtonTablet: { paddingHorizontal: 18, paddingVertical: 10 },
  filterButtonMobile: { paddingHorizontal: 16, paddingVertical: 9 },
  filterButtonHover: { backgroundColor: "#3a3a3a", borderColor: "#4a4a4a",transform: [{ scale: 1.05 }]},
  filterButtonActive: {
    backgroundColor: "#ff6b35",
    borderColor: "#ff6b35",
    elevation: 4,
    shadowColor: "#ff6b35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  filterButtonActiveHover: { backgroundColor: "#ff8b60", borderColor: "#ff8b60",transform: [{ scale: 1.05 }] },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ccc",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  filterButtonTextTablet: { fontSize: 13 },
  filterButtonTextMobile: { fontSize: 12 },
  filterButtonTextActive: { color: "#fff", fontWeight: "700" },

  /* -------- SEND -------- */
  sendButton: {
    backgroundColor: "#ff6b35",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#ff6b35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    minWidth: 150,
  },
  sendButtonTablet: {
    paddingHorizontal: 34,
    paddingVertical: 13,
    borderRadius: 23,
    minWidth: 130,
  },
  sendButtonMobile: {
    paddingHorizontal: 28,
    paddingVertical: 11,
    borderRadius: 21,
    minWidth: 110,
  },
  sendButtonHover: { backgroundColor: "#ff8b60", elevation: 6, shadowOpacity: 0.4 },
  sendButtonDisabled: { backgroundColor: "#666", elevation: 0, shadowOpacity: 0 },
  sendButtonText: { color: "#fff", fontSize: 16, fontWeight: "700", letterSpacing: 1 },
  sendButtonTextTablet: { fontSize: 15 },
  sendButtonTextMobile: { fontSize: 14 },
  sendButtonTextDisabled: { color: "#999" },
})
