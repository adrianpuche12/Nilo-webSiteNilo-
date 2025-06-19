import { Slot } from 'expo-router';
import { ScrollView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Services from '@/app/(tabs)/ServicesSection';
import Index from '@/app/(tabs)/index';
import ClientTestimonials from "@/components/ui/ClientTestimonials"

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Roboto_400Regular,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Header />
      <Index /> 
      <Services />
      <ClientTestimonials />
      <Footer />
      </ScrollView>
    </>
  );
}
