"use client"

import { useState } from "react"
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Platform,
  Pressable,
  Modal,
  useWindowDimensions,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Text from "@/components/ui/CustomText"
import { LoginButton, EmailConsultButton } from "@/components/ui/AppButtons"

type HeaderProps = {
  scrollToSection: (sectionId: string) => void
}

type SectionButtonProps = {
  text: string
  sectionId: string
  onPress: (sectionId: string) => void
}

/* ---------- HEADER ---------- */
const Header = ({ scrollToSection }: HeaderProps) => {
  const bp = useBreakpoint()
  const [menuVisible, setMenuVisible] = useState(false)
  const toggleMenu = () => setMenuVisible((prev) => !prev)
  const handleEmailConsult = () => console.log("Consultando email…")

  const renderNavItems = (vertical = false) => (
    <View
      style={[
        vertical ? styles.navContainerVertical : styles.navContainer,
        bp.isTabletOrMobile && styles.navContainerTabletOrMobile,
      ]}
    >
      <SectionButton text="INICIO" sectionId="inicio" onPress={scrollToSection} />
      <SectionButton text="SERVICIOS" sectionId="servicios" onPress={scrollToSection} />
      <SectionButton text="QUIÉNES SOMOS" sectionId="quienes" onPress={scrollToSection} />
      <SectionButton text="CONTÁCTANOS" sectionId="contacto" onPress={scrollToSection} />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* --------- MAIN HEADER --------- */}
      <View
        style={[
          styles.mainHeader,
          bp.isTabletOrMobile && styles.mainHeaderTabletOrMobile,
          bp.isMobile && styles.mainHeaderMobile,
        ]}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={[
              styles.logoImage,
              bp.isTabletOrMobile && styles.logoImageTabletOrMobile,
              bp.isMobile && styles.logoImageMobile,
            ]}
            resizeMode="contain"
          />
        </View>

        {/* Navegación desktop/tablet */}
        {!bp.isMobile && renderNavItems()}

        {/* Navegación mobile */}
        {bp.isMobile && (
          <>
            <Pressable onPress={toggleMenu} style={styles.burgerButton}>
              <Ionicons name="menu" size={28} color="#fff" />
            </Pressable>
            <Modal visible={menuVisible} animationType="slide" transparent>
              <Pressable style={styles.modalOverlay} onPress={toggleMenu}>
                <View style={styles.modalContent}>
                  {renderNavItems(true)}
                  <View style={styles.modalFooter}>
                    <LoginButton />
                  </View>
                </View>
              </Pressable>
            </Modal>
          </>
        )}

        {!bp.isMobile && (
          <View style={styles.rightSection}>
            <View style={styles.languageSelector}>
              <Text style={[styles.languageText, bp.isTabletOrMobile && styles.languageTextTabletOrMobile]}>ES</Text>
              <Text style={[styles.languageText, bp.isTabletOrMobile && styles.languageTextTabletOrMobile]}>EN</Text>
            </View>
            <LoginButton />
          </View>
        )}
      </View>

      {/* --------- PROMO BANNER --------- */}
      <View
        style={[
          styles.promoBanner,
          bp.isTabletOrMobile && styles.promoBannerTabletOrMobile,
          bp.isMobile && styles.promoBannerMobile,
        ]}
      >
        <Text
          style={[
            styles.promoText,
            bp.isTabletOrMobile && styles.promoTextTabletOrMobile,
            bp.isMobile && styles.promoTextMobile,
          ]}
        >
          BANNER PARA OFERTAS PROMOS
        </Text>
        <View style={[styles.emailSection, bp.isMobile && styles.emailSectionMobile]}>
          <TextInput
            style={[
              styles.emailInput,
              bp.isTabletOrMobile && styles.emailInputTabletOrMobile,
              bp.isMobile && styles.emailInputMobile,
            ]}
            placeholder="Ingresá tu e‑mail"
            placeholderTextColor="#666"
          />
          <EmailConsultButton onPress={handleEmailConsult} />
        </View>
      </View>
    </SafeAreaView>
  )
}

/* ---------- BUTTON ---------- */
const SectionButton = ({ text, sectionId, onPress }: SectionButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const bp = useBreakpoint()

  return (
    <Pressable
      style={styles.navItem}
      onPress={() => onPress(sectionId)}
      onHoverIn={Platform.OS === "web" ? () => setIsHovered(true) : undefined}
      onHoverOut={Platform.OS === "web" ? () => setIsHovered(false) : undefined}
    >
      <Text
        style={[
          styles.navText,
          bp.isTabletOrMobile && styles.navTextTabletOrMobile,
          isHovered && Platform.OS === "web" && styles.navTextHover,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  )
}

/* --------------------- BREAKPOINT ------------------------ */
const useBreakpoint = () => {
  const { width } = useWindowDimensions()
  return {
    isTabletOrMobile: width < 1024,
    isMobile: width < 768,
  }
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#000" },

  /* — HEADER — */
  mainHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#000",
  },
  mainHeaderTabletOrMobile: { paddingHorizontal: 15, paddingVertical: 8 },
  mainHeaderMobile: { paddingHorizontal: 10, paddingVertical: 8 },

  /* Logo */
  logoContainer: { alignItems: "flex-start" },
  logoImage: { width: 160, height: 90 },
  logoImageTabletOrMobile: { width: 120, height: 70 },
  logoImageMobile: { width: 110, height: 60 },

  /* — NAVEGACIÓN — */
  navContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
    gap: 15,
  },
  navContainerTabletOrMobile: { gap: 10, marginHorizontal: 15 },
  navContainerVertical: {
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  navItem: { marginHorizontal: 15 },
  navText: { color: "#fff", fontSize: 15, fontWeight: "500" },
  navTextTabletOrMobile: { fontSize: 14 },
  navTextHover: { textDecorationLine: "underline" },

  /* — SECCIÓN DERECHA — */
  rightSection: { flexDirection: "row", alignItems: "center" },
  languageSelector: { flexDirection: "row", marginRight: 15 },
  languageText: { color: "#fff", fontSize: 14, marginHorizontal: 5 },
  languageTextTabletOrMobile: { fontSize: 13 },

  /* — BANNER — */
  promoBanner: {
    backgroundColor: "#ff6b35",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
  },
  promoBannerTabletOrMobile: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  promoBannerMobile: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  promoText: { color: "#000", fontSize: 15, fontWeight: "600" },
  promoTextTabletOrMobile: { fontSize: 13 },
  promoTextMobile: { fontSize: 10 },

  /* — EMAIL — */
  emailSection: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  emailInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 10,
    minWidth: 200,
    fontSize: 14,
  },
  emailInputTabletOrMobile: {
    minWidth: 160,
    fontSize: 13,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginRight: 8,
  },
  emailSectionMobile: {
    flexDirection: "row",
    alignItems: "center",
  },
  emailInputMobile: {
    minWidth: 110,
    fontSize: 11,
    paddingHorizontal: 7,
    paddingVertical: 6,
    marginRight: 3,
  },

  /* MODAL */
  burgerButton: { padding: 8 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#151414",
    paddingVertical: 30,
    paddingHorizontal: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalFooter: { marginTop: 30 },
})

export default Header
