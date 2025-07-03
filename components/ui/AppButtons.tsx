"use client"

import { useState } from "react"
import { Pressable, StyleSheet, type GestureResponderEvent, Platform } from "react-native"
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

  return (
    <Pressable
      style={[styles.loginButton, isHovered && styles.loginButtonHover]}
      onPress={() => router.push("/")}
      {...eventHandlers}
    >
      <Text style={styles.loginButtonText}>INICIAR SESIÓN</Text>
    </Pressable>
  )
}

export const EmailConsultButton = ({ onPress }: { onPress?: (event: GestureResponderEvent) => void }) => {
  const { isHovered, eventHandlers } = useHover()

  return (
    <Pressable
      style={[styles.consultButton, isHovered && styles.consultButtonHover]}
      onPress={onPress}
      {...eventHandlers}
    >
      <Text style={styles.consultButtonText}>CONSULTAR</Text>
    </Pressable>
  )
}

export const RegisterButton = ({ onPress }: { onPress?: (event: GestureResponderEvent) => void }) => {
  const { isHovered, eventHandlers } = useHover()

  return (
    <Pressable
      style={[styles.registerButton, isHovered && styles.registerButtonHover]}
      onPress={onPress}
      {...eventHandlers}
    >
      <Text style={styles.registerButtonText}>REGISTRARSE</Text>
    </Pressable>
  )
}

export const StartProjectButton = ({ onPress }: { onPress?: (event: GestureResponderEvent) => void }) => {
  const { isHovered, eventHandlers } = useHover()

  return (
    <Pressable
      style={[styles.startProjectButton, isHovered && styles.startProjectButtonHover]}
      onPress={onPress}
      {...eventHandlers}
    >
      <Text style={styles.startProjectButtonText}>COMENZAR PROYECTO</Text>
    </Pressable>
  )
}

export const ViewPortfolioButton = ({ onPress }: { onPress?: (event: GestureResponderEvent) => void }) => {
  const { isHovered, eventHandlers } = useHover()

  return (
    <Pressable
      style={[styles.viewPortfolioButton, isHovered && styles.viewPortfolioButtonHover]}
      onPress={onPress}
      {...eventHandlers}
    >
      <Text style={styles.viewPortfolioButtonText}>VER PORTAFOLIO</Text>
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

  return (
    <Pressable
      style={[
        styles.filterButton,
        isActive && styles.filterButtonActive,
        isHovered && !isActive && styles.filterButtonHover,
        isHovered && isActive && styles.filterButtonActiveHover,
      ]}
      onPress={onPress}
      {...eventHandlers}
    >
      <Text style={[styles.filterButtonText, isActive && styles.filterButtonTextActive]}>{title}</Text>
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

  return (
    <Pressable style={[styles.sendButton, isHovered && styles.sendButtonHover]} onPress={onPress} {...eventHandlers}>
      <Text style={styles.sendButtonText}>ENVIAR</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "#ff6b35",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  loginButtonHover: {
    backgroundColor: "#ff8b60",
  },
  loginButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
  consultButton: {
    backgroundColor: "#000",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  consultButtonHover: {
    backgroundColor: "#222",
  },
  consultButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "#ff6b35",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  registerButtonHover: {
    backgroundColor: "#ff8b60",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
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
  },
  startProjectButtonHover: {
    backgroundColor: "#ff8b60",
  },
  startProjectButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  viewPortfolioButton: {
    borderWidth: 2,
    borderColor: "#fff",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
  },
  viewPortfolioButtonHover: {
    backgroundColor: "#ffffff22",
  },
  viewPortfolioButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  filterButton: {
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#2a2a2a",
  },
  filterButtonHover: {
    backgroundColor: "#3a3a3a",
    borderColor: "#4a4a4a",
  },
  filterButtonActive: {
    backgroundColor: "#ff6b35",
    borderColor: "#ff6b35",
    elevation: 4,
    shadowColor: "#ff6b35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  filterButtonActiveHover: {
    backgroundColor: "#ff8b60",
    borderColor: "#ff8b60",
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ccc",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  filterButtonTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
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
  sendButtonHover: {
    backgroundColor: "#ff8b60",
    elevation: 6,
    shadowOpacity: 0.4,
  },
  sendButtonDisabled: {
    backgroundColor: "#666",
    elevation: 0,
    shadowOpacity: 0,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
  sendButtonTextDisabled: {
    color: "#999",
  }
})
