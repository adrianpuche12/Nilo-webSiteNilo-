"use client";

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

interface Service {
  id: number;
  title: string;
  icon: string;
  description: string;
  route: string;
}

interface ServicesSectionProps {
  services?: Service[];
  onServicePress?: (service: Service) => void;
  isView?: boolean;
}

const defaultServices: Service[] = [
  {
    id: 1,
    title: "UI/UX Design",
    icon: "🎨",
    description:
      "Diseñamos experiencias digitales con foco en la usabilidad, estética y conversión, combinando creatividad con estrategia.",
    route: "/servicios/ui-ux-design",
  },
  {
    id: 2,
    title: "Desarrollo Web",
    icon: "💻",
    description:
      "Creamos sitios web modernos, escalables y ultra rápidos, optimizados para SEO y adaptados a cualquier dispositivo.",
    route: "/servicios/desarrollo-web",
  },
  {
    id: 3,
    title: "Apps Móviles",
    icon: "📱",
    description:
      "Desarrollamos aplicaciones móviles con interfaces fluidas, alto rendimiento y compatibilidad multiplataforma.",
    route: "/servicios/apps-moviles",
  },
  {
    id: 4,
    title: "E-commerce",
    icon: "🛒",
    description:
      "Creamos tiendas online completas con sistemas de pago integrados, gestión de productos y dashboards intuitivos.",
    route: "/servicios/ecommerce",
  },
  {
    id: 5,
    title: "Consultoría Tech",
    icon: "💡",
    description:
      "Impulsamos tu transformación digital mediante estrategias tecnológicas adaptadas a tus objetivos de negocio.",
    route: "/servicios/consultoria",
  },
  {
    id: 6,
    title: "Mantenimiento",
    icon: "🔧",
    description:
      "Ofrecemos soporte técnico continuo, auditorías de seguridad y mejoras de rendimiento en tus sistemas existentes.",
    route: "/servicios/mantenimiento",
  },
];

const ServicesSection = ({
  services = defaultServices,
  onServicePress,
  isView = false,
}: ServicesSectionProps) => {
  const { width } = useWindowDimensions();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const bp = useBreakpoint();

  const animations = services.map(() => ({
    opacity: useSharedValue(0),
    translateY: useSharedValue(60),
  }));

  useEffect(() => {
    if (isView) {
      animations.forEach((anim, index) => {
        const delay = index * 150;
        anim.opacity.value = withDelay(delay, withTiming(1, { duration: 600 }));
        anim.translateY.value = withDelay(
          delay,
          withSpring(0, { damping: 16, stiffness: 120 })
        );
      });
    } else {
      animations.forEach((anim) => {
        anim.opacity.value = withTiming(0);
        anim.translateY.value = withTiming(60);
      });
    }
  }, [isView]);

  const { cardWidth, gap } = getGridDimensions(width, bp);

  const getAnimatedStyle = (i: number) =>
    useAnimatedStyle(() => ({
      opacity: animations[i].opacity.value,
      transform: [{ translateY: animations[i].translateY.value }],
    }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Nuestros <Text style={styles.titleAccent}>Servicios</Text>
      </Text>

      <View style={[styles.grid, { gap }]}>
        {services.map((service, i) => (
          <Animated.View key={service.id} style={[getAnimatedStyle(i), { width: cardWidth }]}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => onServicePress?.(service)}
              onPressIn={() => setHoveredCard(service.id)}
              onPressOut={() => setHoveredCard(null)}
            >
              <LinearGradient
                colors={
                  hoveredCard === service.id
                    ? ["#1a1a1a", "#2d2d2d"]
                    : ["#121212", "#0a0a0a"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.card,
                  hoveredCard === service.id && styles.cardHover,
                ]}
              >
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>{service.icon}</Text>
                </View>

                <Text style={styles.cardTitle}>{service.title}</Text>
                <Text style={styles.cardDescription}>{service.description}</Text>

                <View style={styles.cardButton}>
                  <LinearGradient
                    colors={["#ff6b35", "#f97316"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>Ver más →</Text>
                  </LinearGradient>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

// 📱 Responsive grid layout
const getGridDimensions = (width: number, bp: ReturnType<typeof useBreakpoint>) => {
  let columns = 3;
  let gap = 24;
  if (bp.isMobile) {
    columns = 1;
    gap = 16;
  } else if (bp.isTablet) {
    columns = 2;
    gap = 20;
  } else if (bp.isDesktop) {
    columns = 3;
  } else {
    columns = 4;
  }

  const availableWidth = width - 40;
  const cardWidth = (availableWidth - gap * (columns - 1)) / columns;
  return { cardWidth, gap };
};

const useBreakpoint = () => {
  const { width } = useWindowDimensions();
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024 && width < 1440,
    isLargeDesktop: width >= 1440,
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingVertical: 80,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "800",
    marginBottom: 40,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  titleAccent: {
    color: "#ff6b35",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    shadowColor: "#ff6b35",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  cardHover: {
    transform: [{ scale: 1.03 }],
    shadowOpacity: 0.4,
  },
  iconContainer: {
    marginBottom: 14,
  },
  icon: {
    fontSize: 34,
    textAlign: "center",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  cardDescription: {
    color: "#aaa",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  cardButton: {
    marginTop: 18,
    alignSelf: "center",
  },
  buttonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
    textAlign: "center",
  },
});

export default ServicesSection;
