import { Slot } from "expo-router";
import { ScrollView, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Services from "@/app/(tabs)/ServicesSection";
import Index from "@/app/(tabs)/index";
import Team from "@/app/(tabs)/TeamSection";
import Contact from "@/app/(tabs)/ContactSection";
import ClientTestimonials from "@/components/ui/ClientTestimonials";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
} from "react-native-reanimated";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const [sectionPositions, setSectionPositions] = useState<Record<string, number>>({});

  // estado para  la animacion de scroll de cambio de seccion
  const [currentSection, setCurrentSection] = useState<string>("inicio");
  const [newCurrentSection, setNewCurrentSection] = useState<string>("inicio");
  

  // 🎨 Valores animados para cada sección


  const serviciosOpacity = useSharedValue(0);
  const serviciosTranslateY = useSharedValue(50);

  const quienesOpacity = useSharedValue(0);
  const quienesTranslateY = useSharedValue(50);

  const contactoOpacity = useSharedValue(0);
  const contactoTranslateY = useSharedValue(50);
  

  // Scroll value para efectos parallax
  const scrollY = useSharedValue(100);

  const [loaded] = useFonts({
    Roboto_400Regular,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // 🎯 Función para animar secciones
  const animateSection = (sectionId: string, isVisible: boolean) => {
    const duration = 800;
    const springConfig = {
      damping: 150,
      stiffness: 100,
    };

    switch (sectionId) {
      case "servicios":
        serviciosOpacity.value = withTiming(isVisible ? 1 : 0, { duration });
        serviciosTranslateY.value = withSpring(
          isVisible ? 0 : 50,
          springConfig
        );
        break;
      case "quienes":
        quienesOpacity.value = withTiming(isVisible ? 1 : 0, { duration });
        quienesTranslateY.value = withSpring(isVisible ? 0 : 50, springConfig);
        break;
      case "contacto":
        contactoOpacity.value = withTiming(isVisible ? 1 : 0, { duration });
        contactoTranslateY.value = withSpring(isVisible ? 0 : 50, springConfig);
        break;
    }
  };

  // Función para detectar cambio de sección
  const handleScroll = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    scrollY.value = currentScrollY; // Para efectos parallax

    const offset = 200; // Distancia antes de activar animación
    const sections = ["inicio", "servicios", "quienes", "contacto"];
    let newCurrentSection = "inicio";

    // Animar todas las secciones basado en su visibilidad
    sections.forEach((section) => {
      if (sectionPositions[section] !== undefined) {
        const sectionTop = sectionPositions[section];

        const sectionVisible = currentScrollY + 200 >= sectionTop - 500;

        // Animar sección si está visible
        animateSection(section, sectionVisible);

        // Detectar sección actual
        if (currentScrollY + offset >= sectionTop) {
          newCurrentSection = section;
        }
      }
    });

    // Solo hacer console.log si cambió la sección
    if (newCurrentSection !== currentSection) {
      setCurrentSection(newCurrentSection);
      console.log("🎯 Sección actual:", newCurrentSection);
      console.log("📍 Posición scroll:", currentScrollY);
    }
  };
  // 🎨 Estilos animados para cada sección

  const serviciosAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: serviciosOpacity.value,
      transform: [
        { translateY: serviciosTranslateY.value },
        { scale: interpolate(serviciosOpacity.value, [0.3, 1], [0.95, 1]) },
      ],
    };
  });

  const quienesAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: quienesOpacity.value,
      transform: [
        { translateY: quienesTranslateY.value },
        { scale: interpolate(quienesOpacity.value, [0.3, 1], [0.95, 1]) },
      ],
    };
  });

  const contactoAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: contactoOpacity.value,
      transform: [
        { translateY: contactoTranslateY.value },
        { scale: interpolate(contactoOpacity.value, [0.3, 1], [0.95, 1]) },
      ],
    };
  });

  // Función para guardar la posición de cada sección
  const handleSectionLayout = (sectionId: string, event: any) => {
    const { y } = event.nativeEvent.layout;
    setSectionPositions((prev) => {
      const newPositions = {
        ...prev,
        [sectionId]: y,
      };
      return newPositions;
    });
  };

  // Función para hacer scroll a una sección específica
  const scrollToSection = (sectionId: string) => {
    if (scrollViewRef?.current && sectionPositions[sectionId] !== undefined) {
      scrollViewRef.current.scrollTo({
        y: sectionPositions[sectionId],
        animated: true,
      });
    }
  };

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "#000000" }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Header scrollToSection={scrollToSection} />
        <View
          onLayout={(event) => handleSectionLayout("inicio", event)}>
          <Index />
        </View>

        <Animated.View
          style={serviciosAnimatedStyle}
          onLayout={(event) => handleSectionLayout("servicios", event)}
        >
          <Services isView={currentSection === "servicios"}/>
        </Animated.View>

        <Animated.View
          style={quienesAnimatedStyle}
          onLayout={(event) => handleSectionLayout("quienes", event)}
        >
          <Team />
        </Animated.View>

        <Animated.View
          style={contactoAnimatedStyle}
          onLayout={(event) => handleSectionLayout("contacto", event)}
        >
          <Contact />
        </Animated.View>

        <ClientTestimonials />
        <Footer />
      </ScrollView>
    </>
  );
}
