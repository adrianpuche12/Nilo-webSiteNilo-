import { Slot } from 'expo-router';
import { ScrollView, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Services from '@/app/(tabs)/ServicesSection';
import Index from '@/app/(tabs)/index';
import Team from '@/app/(tabs)/TeamSection';
import Contact from '@/app/(tabs)/ContactSection';
import ClientTestimonials from "@/components/ui/ClientTestimonials"

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const [sectionPositions, setSectionPositions] = useState<Record<string, number>>({});
  
  const [loaded] = useFonts({
    Roboto_400Regular,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Función para guardar la posición de cada sección
  const handleSectionLayout = (sectionId: string, event: any) => {
    const { y } = event.nativeEvent.layout;
    setSectionPositions(prev => ({
      ...prev,
      [sectionId]: y
    }));
  };

  // Función para hacer scroll a una sección específica
  const scrollToSection = (sectionId: string) => {
    if (scrollViewRef?.current && sectionPositions[sectionId] !== undefined) {
      scrollViewRef.current.scrollTo({
        y: sectionPositions[sectionId],
        animated: true
      });
    }
  };

  if (!loaded) {
    return null;
  }

  return (
    <>
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Header scrollToSection={scrollToSection} />
        
        <View onLayout={(event) => handleSectionLayout('inicio', event)}>
          <Index/> 
        </View>
        
        <View onLayout={(event) => handleSectionLayout('servicios', event)}>
          <Services/>
        </View>
        
        <View onLayout={(event) => handleSectionLayout('quienes', event)}>
          <Team/>
        </View>
        
        <View onLayout={(event) => handleSectionLayout('contacto', event)}>
          <Contact/>
        </View>
        
        <ClientTestimonials/>
        <Footer/>
      </ScrollView>
    </>
  );
}