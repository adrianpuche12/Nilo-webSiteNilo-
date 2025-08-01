"use client"
import Text from "@/components/ui/CustomText"
import { RegisterButton } from "@/components/ui/AppButtons"
import { View, TouchableOpacity, TextInput, StyleSheet, Image, useWindowDimensions } from "react-native"

const Footer = () => {
  const bp = useBreakpoint()

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.footerContent,
          bp.isTabletOrMobile && styles.footerContentTabletOrMobile,
          bp.isMobile && styles.footerContentMobile,
        ]}
      >
        {/* Logo Section */}
        <View
          style={[
            styles.logoSection,
            bp.isTabletOrMobile && styles.logoSectionTabletOrMobile,
            bp.isMobile && styles.logoSectionMobile,
          ]}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/footerlogo.png")}
              style={[
                styles.logoImage,
                bp.isTabletOrMobile && styles.logoImageTabletOrMobile,
                bp.isMobile && styles.logoImageMobile,
              ]}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Nav Links Section */}
        <View
          style={[
            styles.navLinksSection,
            bp.isTabletOrMobile && styles.navLinksSectionTabletOrMobile,
            bp.isMobile && styles.navLinksSectionMobile,
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              bp.isTabletOrMobile && styles.sectionTitleTabletOrMobile,
              bp.isMobile && styles.sectionTitleMobile,
            ]}
          >
            Navegación
          </Text>
          <TouchableOpacity style={styles.linkItem}>
            <Text
              style={[
                styles.linkText,
                bp.isTabletOrMobile && styles.linkTextTabletOrMobile,
                bp.isMobile && styles.linkTextMobile,
              ]}
            >
              Inicio
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Text
              style={[
                styles.linkText,
                bp.isTabletOrMobile && styles.linkTextTabletOrMobile,
                bp.isMobile && styles.linkTextMobile,
              ]}
            >
              Servicios
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Text
              style={[
                styles.linkText,
                bp.isTabletOrMobile && styles.linkTextTabletOrMobile,
                bp.isMobile && styles.linkTextMobile,
              ]}
            >
              Quienes somos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Text
              style={[
                styles.linkText,
                bp.isTabletOrMobile && styles.linkTextTabletOrMobile,
                bp.isMobile && styles.linkTextMobile,
              ]}
            >
              Contáctanos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Text
              style={[
                styles.linkText,
                bp.isTabletOrMobile && styles.linkTextTabletOrMobile,
                bp.isMobile && styles.linkTextMobile,
              ]}
            >
              Blog
            </Text>
          </TouchableOpacity>
        </View>

        {/* Links Section */}
        <View
          style={[
            styles.linksSection,
            bp.isTabletOrMobile && styles.linksSectionTabletOrMobile,
            bp.isMobile && styles.linksSectionMobile,
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              bp.isTabletOrMobile && styles.sectionTitleTabletOrMobile,
              bp.isMobile && styles.sectionTitleMobile,
            ]}
          >
            Empresa
          </Text>
          <TouchableOpacity style={styles.linkItem}>
            <Text
              style={[
                styles.linkText,
                bp.isTabletOrMobile && styles.linkTextTabletOrMobile,
                bp.isMobile && styles.linkTextMobile,
              ]}
            >
              Trabaja con nosotros
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Text
              style={[
                styles.linkText,
                bp.isTabletOrMobile && styles.linkTextTabletOrMobile,
                bp.isMobile && styles.linkTextMobile,
              ]}
            >
              Políticas de privacidad y legales
            </Text>
          </TouchableOpacity>
        </View>

        {/* Address Section */}
        <View
          style={[
            styles.addressSection,
            bp.isTabletOrMobile && styles.addressSectionTabletOrMobile,
            bp.isMobile && styles.addressSectionMobile,
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              bp.isTabletOrMobile && styles.sectionTitleTabletOrMobile,
              bp.isMobile && styles.sectionTitleMobile,
            ]}
          >
            Contacto
          </Text>
          <View style={styles.addressInfo}>
            <Text
              style={[
                styles.addressText,
                bp.isTabletOrMobile && styles.addressTextTabletOrMobile,
                bp.isMobile && styles.addressTextMobile,
              ]}
            >
              Direccion: Rosario, Santa Fe
            </Text>
            <TouchableOpacity style={[styles.linkItem, { marginTop: 10 }]}>
              <Text
                style={[
                  styles.phoneText,
                  bp.isTabletOrMobile && styles.phoneTextTabletOrMobile,
                  bp.isMobile && styles.phoneTextMobile,
                ]}
              >
                Telefono: +54 341 123-4567
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Social Media Section */}
        <View
          style={[
            styles.socialSection,
            bp.isTabletOrMobile && styles.socialSectionTabletOrMobile,
            bp.isMobile && styles.socialSectionMobile,
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              bp.isTabletOrMobile && styles.sectionTitleTabletOrMobile,
              bp.isMobile && styles.sectionTitleMobile,
            ]}
          >
            Síguenos en redes sociales
          </Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity
              style={[
                styles.socialIcon,
                bp.isTabletOrMobile && styles.socialIconTabletOrMobile,
                bp.isMobile && styles.socialIconMobile,
              ]}
            >
              <Text
                style={[
                  styles.socialIconText,
                  bp.isTabletOrMobile && styles.socialIconTextTabletOrMobile,
                  bp.isMobile && styles.socialIconTextMobile,
                ]}
              >
                @
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.socialIcon,
                bp.isTabletOrMobile && styles.socialIconTabletOrMobile,
                bp.isMobile && styles.socialIconMobile,
              ]}
            >
              <Text
                style={[
                  styles.socialIconText,
                  bp.isTabletOrMobile && styles.socialIconTextTabletOrMobile,
                  bp.isMobile && styles.socialIconTextMobile,
                ]}
              >
                f
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.socialIcon,
                bp.isTabletOrMobile && styles.socialIconTabletOrMobile,
                bp.isMobile && styles.socialIconMobile,
              ]}
            >
              <Text
                style={[
                  styles.socialIconText,
                  bp.isTabletOrMobile && styles.socialIconTextTabletOrMobile,
                  bp.isMobile && styles.socialIconTextMobile,
                ]}
              >
                in
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Newsletter Section */}
        <View
          style={[
            styles.newsletterSection,
            bp.isTabletOrMobile && styles.newsletterSectionTabletOrMobile,
            bp.isMobile && styles.newsletterSectionMobile,
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              bp.isTabletOrMobile && styles.sectionTitleTabletOrMobile,
              bp.isMobile && styles.sectionTitleMobile,
            ]}
          >
            ¿Quieres conocer nuestras novedades?
          </Text>
          <View
            style={[
              styles.emailContainer,
              bp.isTabletOrMobile && styles.emailContainerTabletOrMobile,
              bp.isMobile && styles.emailContainerMobile,
            ]}
          >
            <TextInput
              style={[
                styles.emailInput,
                bp.isTabletOrMobile && styles.emailInputTabletOrMobile,
                bp.isMobile && styles.emailInputMobile,
              ]}
              placeholder="Ingresá tu e-mail"
              placeholderTextColor="#999"
            />
            <RegisterButton onPress={() => {}} />
          </View>
          <Text
            style={[
              styles.privacyText,
              bp.isTabletOrMobile && styles.privacyTextTabletOrMobile,
              bp.isMobile && styles.privacyTextMobile,
            ]}
          >
            Al registrarte aceptás nuestra política de privacidad.
          </Text>
        </View>
      </View>

      {/* Copyright */}
      <View style={styles.copyrightSection}>
        <Text
          style={[
            styles.copyrightText,
            bp.isTabletOrMobile && styles.copyrightTextTabletOrMobile,
            bp.isMobile && styles.copyrightTextMobile,
          ]}
        >
          © 2024 NilO Solutions. Todos los derechos reservados.
        </Text>
      </View>
    </View>
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
  container: {
    backgroundColor: "#000",
    borderColor: "#ff6b35",
    borderTopWidth: 2,
  },
  footerContent: {
    flexDirection: "row",
    paddingHorizontal: 80,
    paddingVertical: 30,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  footerContentTabletOrMobile: {
    paddingHorizontal: 16,
    paddingVertical: 25,
  },
  footerContentMobile: {
    flexDirection: "column",
    paddingHorizontal: 12,
    paddingVertical: 20,
    gap: 25,
  },
  logoSection: {
    flex: 1,
    minWidth: 150,
  },
  logoSectionTabletOrMobile: {
    minWidth: 130,
  },
  logoSectionMobile: {
    flex: 0,
    alignItems: "center",
    minWidth: "100%",
  },
  logoContainer: {
    alignItems: "flex-start",
  },
  logoImage: {
    width: 160,
    height: 100,
  },
  logoImageTabletOrMobile: {
    width: 140,
    height: 85,
  },
  logoImageMobile: {
    width: 120,
    height: 75,
  },
  navLinksSection: {
    flex: 1,
    minWidth: 180,
    justifyContent: "flex-start",
  },
  navLinksSectionTabletOrMobile: {
    minWidth: 160,
  },
  navLinksSectionMobile: {
    flex: 0,
    minWidth: "100%",
    alignItems: "center",
  },
  linksSection: {
    flex: 1,
    minWidth: 200,
  },
  linksSectionTabletOrMobile: {
    minWidth: 180,
  },
  linksSectionMobile: {
    flex: 0,
    minWidth: "100%",
    alignItems: "center",
  },
  linkItem: {
    marginBottom: 10,
  },
  linkText: {
    color: "#fff",
    fontSize: 14,
  },
  linkTextTabletOrMobile: {
    fontSize: 13,
  },
  linkTextMobile: {
    fontSize: 12,
    textAlign: "center",
  },
  // NEW ADDRESS SECTION
  addressSection: {
    flex: 1,
    minWidth: 200,
  },
  addressSectionTabletOrMobile: {
    minWidth: 180,
  },
  addressSectionMobile: {
    flex: 0,
    minWidth: "100%",
    alignItems: "center",
  },
  addressInfo: {
    marginTop: 5,
  },
  addressText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
    lineHeight: 20,
  },
  addressTextTabletOrMobile: {
    fontSize: 13,
    lineHeight: 18,
  },
  addressTextMobile: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
  },
  phoneText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "300",
  },
  phoneTextTabletOrMobile: {
    fontSize: 13,
  },
  phoneTextMobile: {
    fontSize: 12,
    textAlign: "center",
  },
  socialSection: {
    flex: 1,
    minWidth: 200,
  },
  socialSectionTabletOrMobile: {
    minWidth: 180,
  },
  socialSectionMobile: {
    flex: 0,
    minWidth: "100%",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#ff6b35",
    fontSize: 14,
    fontWeight: "normal",
    marginBottom: 15,
  },
  sectionTitleTabletOrMobile: {
    fontSize: 13,
    marginBottom: 12,
  },
  sectionTitleMobile: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  socialIcon: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  socialIconTabletOrMobile: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  socialIconMobile: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  socialIconText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  socialIconTextTabletOrMobile: {
    fontSize: 15,
  },
  socialIconTextMobile: {
    fontSize: 14,
  },
  newsletterSection: {
    flex: 1,
    minWidth: 250,
  },
  newsletterSectionTabletOrMobile: {
    minWidth: 220,
  },
  newsletterSectionMobile: {
    flex: 0,
    minWidth: "100%",
    alignItems: "center",
  },
  emailContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  emailContainerTabletOrMobile: {
    
  },
  emailContainerMobile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
  emailInput: {
    flex: 1,
    backgroundColor: "#333",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
    fontSize: 14,
  },
  emailInputTabletOrMobile: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
  },
  emailInputMobile: {
    flex: 0,
    width: "50%",
    marginRight: 0,
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  privacyText: {
    color: "#999",
    fontSize: 12,
    marginTop: 5,
  },
  privacyTextTabletOrMobile: {
    fontSize: 11,
  },
  privacyTextMobile: {
    fontSize: 10,
    textAlign: "center",
  },
  copyrightSection: {
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingVertical: 15,
    alignItems: "center",
  },
  copyrightText: {
    color: "#999",
    fontSize: 12,
  },
  copyrightTextTabletOrMobile: {
    fontSize: 11,
  },
  copyrightTextMobile: {
    fontSize: 10,
    textAlign: "center",
  },
})

export default Footer
