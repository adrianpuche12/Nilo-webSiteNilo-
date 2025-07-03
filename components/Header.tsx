import React, { useState } from 'react';
import Text from '@/components/ui/CustomText';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import { LoginButton, EmailConsultButton } from '@/components/ui/AppButtons';

// Agrega la prop scrollToSection con tipado
type HeaderProps = {
  scrollToSection: (sectionId: string) => void;
};

const Header = ({ scrollToSection }: HeaderProps) => {
  const handleEmailConsult = () => {
    console.log('Consultando email...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Main Header */}
      <View style={styles.mainHeader}>
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.navContainer}>
          <SectionButton text="INICIO" sectionId="inicio" onPress={scrollToSection} />
          <SectionButton text="SERVICIOS" sectionId="servicios" onPress={scrollToSection} />
          <SectionButton text="QUIÉNES SOMOS" sectionId="quienes" onPress={scrollToSection} />
          <SectionButton text="CONTÁCTANOS" sectionId="contacto" onPress={scrollToSection} />
        </View>
        
        <View style={styles.rightSection}>
          <View style={styles.languageSelector}>
            <Text style={styles.languageText}>ES</Text>
            <Text style={styles.languageText}>EN</Text>
          </View>
          <LoginButton />
        </View>
      </View>
      
      {/* Promotional Banner */}
      <View style={styles.promoBanner}>
        <Text style={styles.promoText}>BANNER PARA OFERTAS PROMOS</Text>
        <View style={styles.emailSection}>
          <TextInput
            style={styles.emailInput}
            placeholder="Ingresá tu e-mail"
            placeholderTextColor="#666"
          />
          <EmailConsultButton onPress={handleEmailConsult} />
        </View>
      </View>
    </SafeAreaView>
  );
};

// Componente para botones de sección (scroll interno)
type SectionButtonProps = {
  text: string;
  sectionId: string;
  onPress: (sectionId: string) => void;
};

const SectionButton = ({ text, sectionId, onPress }: SectionButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      style={styles.navItem}
      onPress={() => onPress(sectionId)}
      onHoverIn={Platform.OS === 'web' ? () => setIsHovered(true) : undefined}
      onHoverOut={Platform.OS === 'web' ? () => setIsHovered(false) : undefined}
    >
      <Text
        style={[
          styles.navText,
          isHovered && Platform.OS === 'web' && styles.navTextHover,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

// Mantén este componente para navegación a otras páginas si lo necesitas
type TextButtonProps = {
  text: string;
  route: string;
};

const TextButton = ({ text, route }: TextButtonProps) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      style={styles.navItem}
      onPress={() => router.push(route)}
      onHoverIn={Platform.OS === 'web' ? () => setIsHovered(true) : undefined}
      onHoverOut={Platform.OS === 'web' ? () => setIsHovered(false) : undefined}
    >
      <Text
        style={[
          styles.navText,
          isHovered && Platform.OS === 'web' && styles.navTextHover,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  mainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#000',
  },
  logoContainer: {
    alignItems: 'flex-start',
  },
  logoImage: {
    width: 160,
    height: 90,
  },
  navContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
    gap: 15,
  },
  navItem: {
    marginHorizontal: 15,
  },
  navText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageSelector: {
    flexDirection: 'row',
    marginRight: 15,
  },
  languageText: {
    color: '#fff',
    fontSize: 14,
    marginHorizontal: 5,
  },
  promoBanner: {
    backgroundColor: '#ff6b35',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  promoText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'normal',
  },
  emailSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 10,
    minWidth: 200,
    fontSize: 14,
  },
    navTextHover: {
    textDecorationLine: 'underline',
  },

});

export default Header;
