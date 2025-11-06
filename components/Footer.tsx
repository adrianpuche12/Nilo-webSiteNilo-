"use client";

import { View, TouchableOpacity, TextInput, StyleSheet, Image, useWindowDimensions } from "react-native";
import Text from "@/components/ui/CustomText";
import { RegisterButton } from "@/components/ui/AppButtons";

/* --------------------- BREAKPOINT HOOK ------------------------ */
const useBreakpoint = () => {
  const { width } = useWindowDimensions();
  return {
    isTabletOrMobile: width < 1024,
    isMobile: width < 768,
  };
};

const Footer = () => {
  const bp = useBreakpoint();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.footerContent,
          bp.isTabletOrMobile && styles.footerContentTabletOrMobile,
          bp.isMobile && styles.footerContentMobile,
        ]}
      >
        {/* LOGO */}
        <View
          style={[
            styles.column,
            bp.isMobile && styles.columnMobile,
          ]}
        >
          <Image
            source={require("@/assets/images/footerlogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* NAVEGACIÓN */}
        <View
          style={[
            styles.column,
            bp.isMobile && styles.columnMobile,
          ]}
        >
          <Text style={styles.title}>Navegación</Text>
          <TouchableOpacity style={styles.linkItem}><Text style={styles.link}>Inicio</Text></TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}><Text style={styles.link}>Servicios</Text></TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}><Text style={styles.link}>Quienes somos</Text></TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}><Text style={styles.link}>Contáctanos</Text></TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}><Text style={styles.link}>Blog</Text></TouchableOpacity>
        </View>

        {/* EMPRESA */}
        <View
          style={[
            styles.column,
            bp.isMobile && [styles.columnMobile, { marginBottom: 45 }], // extra espacio 🔥
          ]}
        >
          <Text style={styles.title}>Empresa</Text>
          <TouchableOpacity style={styles.linkItem}><Text style={styles.link}>Trabaja con nosotros</Text></TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}><Text style={styles.link}>Políticas de privacidad</Text></TouchableOpacity>
        </View>

        {/* CONTACTO */}
        <View
          style={[
            styles.column,
            bp.isMobile && styles.columnMobile,
          ]}
        >
          <Text style={styles.title}>Contacto</Text>
          <Text style={styles.text}>Dirección: Rosario, Santa Fe</Text>
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.text}>Teléfono: +54 341 123-4567</Text>
          </TouchableOpacity>
        </View>

        {/* REDES SOCIALES */}
        <View
          style={[
            styles.column,
            bp.isMobile && styles.columnMobile,
          ]}
        >
          <Text style={styles.title}>Síguenos</Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.socialIcon}><Text style={styles.socialText}>@</Text></TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}><Text style={styles.socialText}>f</Text></TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}><Text style={styles.socialText}>in</Text></TouchableOpacity>
          </View>
        </View>

        {/* NEWSLETTER */}
        <View
          style={[
            styles.column,
            bp.isMobile && styles.columnMobile,
          ]}
        >
          <Text style={styles.title}>¿Querés conocer nuestras novedades?</Text>
          <View style={styles.emailContainer}>
            <TextInput
              style={styles.emailInput}
              placeholder="Ingresá tu e-mail"
              placeholderTextColor="#999"
            />
            <RegisterButton onPress={() => {}} />
          </View>
          <Text style={styles.privacy}>
            Al registrarte aceptás nuestra política de privacidad.
          </Text>
        </View>
      </View>

      {/* COPYRIGHT */}
      <View style={styles.copyrightSection}>
        <Text style={styles.copyrightText}>
          © 2024 NilO Solutions. Todos los derechos reservados.
        </Text>
      </View>
    </View>
  );
};

/* --------------------- ESTILOS ------------------------ */
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    borderTopWidth: 2,
    borderTopColor: "#ff6b35",
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 80,
    paddingVertical: 40,
    flexWrap: "wrap",
  },
  footerContentTabletOrMobile: {
    paddingHorizontal: 32,
    paddingVertical: 30,
  },
  footerContentMobile: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 25,
    gap: 30,
  },

  /* Columnas */
  column: {
    flex: 1,
    minWidth: 220,
    paddingHorizontal: 10,
  },
  columnMobile: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 35,
  },

  /* Logo */
  logo: {
    width: 160,
    height: 90,
  },

  /* Títulos */
  title: {
    color: "#ff6b35",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 12,
    textTransform: "uppercase",
  },

  /* Enlaces y texto */
  linkItem: {
    marginBottom: 8,
  },
  link: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.9,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 4,
  },

  /* Redes sociales */
  socialIcons: {
    flexDirection: "row",
    marginTop: 6,
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  socialText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  /* Newsletter */
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  emailInput: {
    flex: 1,
    backgroundColor: "#222",
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 14,
    marginRight: 10,
  },
  privacy: {
    color: "#999",
    fontSize: 12,
    marginTop: 6,
  },

  /* Copyright */
  copyrightSection: {
    borderTopWidth: 1,
    borderTopColor: "#222",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: 10,
  },
  copyrightText: {
    color: "#777",
    fontSize: 12,
    textAlign: "center",
  },
});

export default Footer;
