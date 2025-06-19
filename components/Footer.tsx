import React from 'react';
import Text from '@/components/ui/CustomText';
import { RegisterButton } from '@/components/ui/AppButtons';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.footerContent}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/footerlogo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Nav Links Section */}
        <View style={styles.navLinksSection}>
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Servicios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Quienes somos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Contáctanos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Blog</Text>
          </TouchableOpacity>
        </View>

        {/* Links Section */}
        <View style={styles.linksSection}>
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Trabaja con nosotros</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Políticas de privacidad y legales</Text>
          </TouchableOpacity>
        </View>

        {/* Social Media Section */}
        <View style={styles.socialSection}>
          <Text style={styles.sectionTitle}>Síguenos en redes sociales</Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.socialIcon}>
              <Text style={styles.socialIconText}>@</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Text style={styles.socialIconText}>f</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Text style={styles.socialIconText}>in</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Newsletter Section */}
        <View style={styles.newsletterSection}>
          <Text style={styles.sectionTitle}>¿Quieres conocer nuestras novedades?</Text>
          <View style={styles.emailContainer}>
            <TextInput
              style={styles.emailInput}
              placeholder="Ingresá tu e-mail"
              placeholderTextColor="#999"
            />
            <RegisterButton onPress={() => {
              
            }} />
          </View>
          <Text style={styles.privacyText}>
            Al registrarte aceptás nuestra política de privacidad.
          </Text>
        </View>
      </View>

      {/* Copyright */}
      <View style={styles.copyrightSection}>
        <Text style={styles.copyrightText}>
          © 2024 NilO Solutions. Todos los derechos reservados.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  footerContent: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  logoSection: {
    flex: 1,
    minWidth: 150,
  },
  logoContainer: {
    alignItems: 'flex-start',
  },
  logoImage: {
    width: 160,
    height: 100,
  },

  // Nueva sección para nav links
  navLinksSection: {
    flex: 1,
    minWidth: 180,
    justifyContent: 'flex-start',
  },

  linksSection: {
    flex: 1,
    minWidth: 200,
  },
  linkItem: {
    marginBottom: 10,
  },
  linkText: {
    color: '#fff',
    fontSize: 14,
  },
  socialSection: {
    flex: 1,
    minWidth: 200,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'normal',
    marginBottom: 15,
  },
  socialIcons: {
    flexDirection: 'row',
  },
  socialIcon: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  socialIconText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  newsletterSection: {
    flex: 1,
    minWidth: 250,
  },
  emailContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  emailInput: {
    flex: 1,
    backgroundColor: '#333',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
    fontSize: 14,
  },
  privacyText: {
    color: '#999',
    fontSize: 12,
    marginTop: 5,
  },
  copyrightSection: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingVertical: 15,
    alignItems: 'center',
  },
  copyrightText: {
    color: '#999',
    fontSize: 12,
  },
});

export default Footer;
