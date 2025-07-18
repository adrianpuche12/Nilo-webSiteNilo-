"use client";

import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { useState, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import ServiceCard from "@/components/ui/ServiceCard";

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
      "Creamos experiencias digitales intuitivas y atractivas que conectan con tus usuarios de manera efectiva.",
    route: "/servicios/ui-ux-design",
  },
  {
    id: 2,
    title: "Desarrollo Web",
    icon: "💻",
    description:
      "Desarrollamos sitios web modernos, responsivos y optimizados para el mejor rendimiento y experiencia.",
    route: "/servicios/desarrollo-web",
  },
  {
    id: 3,
    title: "Apps Móviles",
    icon: "📱",
    description:
      "Creamos aplicaciones móviles nativas y multiplataforma con las últimas tecnologías del mercado.",
    route: "/servicios/apps-moviles",
  },
  {
    id: 4,
    title: "E-commerce",
    icon: "🛒",
    description:
      "Desarrollamos tiendas online completas con sistemas de pago seguros y gestión avanzada.",
    route: "/servicios/ecommerce",
  },
  {
    id: 5,
    title: "Consultoría Tech",
    icon: "💡",
    description:
      "Asesoramos en la transformación digital de tu empresa con estrategias tecnológicas efectivas.",
    route: "/servicios/consultoria",
  },
  {
    id: 6,
    title: "Mantenimiento",
    icon: "🔧",
    description:
      "Brindamos soporte técnico continuo y mantenimiento para garantizar el óptimo funcionamiento.",
    route: "/servicios/mantenimiento",
  },
];

const ServicesSection = ({
  services = defaultServices,
  onServicePress,
  isView = false,
}: ServicesSectionProps) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { width } = useWindowDimensions();
  const bp = useBreakpoint();

  const cardAnimations = services.map(() => ({
    opacity: useSharedValue(0),
    translateX: useSharedValue(-100),
  }));

  const handleServicePress = (service: Service) => {
    if (onServicePress) {
      onServicePress(service);
    }
    console.log(`Navegando a: ${service.route}`);
  };

  useEffect(() => {
    if (isView) {
      cardAnimations.forEach((animation, index) => {
        const delay = index * 150;

        animation.opacity.value = withDelay(
          delay,
          withTiming(1, { duration: 600 })
        );
        animation.translateX.value = withDelay(
          delay,
          withSpring(0, {
            damping: 20,
            stiffness: 100,
          })
        );
      });
    } else {
      cardAnimations.forEach((animation) => {
        animation.opacity.value = withTiming(0, { duration: 300 });
        animation.translateX.value = withTiming(-100, { duration: 300 });
      });
    }
  }, [isView]);

  const getAnimatedStyle = (index: number) => {
    return useAnimatedStyle(() => ({
      opacity: cardAnimations[index].opacity.value,
      transform: [{ translateX: cardAnimations[index].translateX.value }],
    }));
  };

  const getColumnsAndWidth = () => {
    let columns = 3;
    let gap = 24;
    let horizontalPadding = 40;

    if (bp.isMobile) {
      columns = 2;
      gap = 14;
      horizontalPadding = 28;
    } else if (bp.isTablet) {
      columns = 3;
      gap = 16;
      horizontalPadding = 32;
    } else if (bp.isDesktop) {
      columns = 4;
      gap = 20;
      horizontalPadding = 36;
    } else if (bp.isLargeDesktop) {
      columns = 6;
      gap = 24;
      horizontalPadding = 40;
    }

    const availableWidth = width - horizontalPadding;
    const cardWidth = (availableWidth - gap * (columns - 1)) / columns;

    return { columns, cardWidth, gap };
  };

  const { cardWidth, gap } = getColumnsAndWidth();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.contentWrapper,
          bp.isTablet && styles.contentWrapperTablet,
          bp.isMobile && styles.contentWrapperMobile,
        ]}
      >
        <View
          style={[
            styles.titleContainer,
            bp.isTablet && styles.titleContainerTablet,
            bp.isMobile && styles.titleContainerMobile,
          ]}
        >
          <View
            style={[
              styles.titleDecorationLeft,
              bp.isTablet && styles.titleDecorationTablet,
              bp.isMobile && styles.titleDecorationMobile,
            ]}
          />
          <View style={styles.titleWrapper}>
            <Text
              style={[
                styles.sectionSubtitle,
                bp.isTablet && styles.sectionSubtitleTablet,
                bp.isMobile && styles.sectionSubtitleMobile,
              ]}
            >
              Lo que hacemos
            </Text>
            <Text
              style={[
                styles.sectionTitle,
                bp.isTablet && styles.sectionTitleTablet,
                bp.isMobile && styles.sectionTitleMobile,
              ]}
            >
              Nuestros <Text style={styles.titleAccent}>Servicios</Text>
            </Text>
          </View>
          <View
            style={[
              styles.titleDecorationRight,
              bp.isTablet && styles.titleDecorationTablet,
              bp.isMobile && styles.titleDecorationMobile,
            ]}
          />
        </View>

        <View
          style={[
            styles.servicesGrid,
            { gap },
            bp.isTablet && styles.servicesGridTablet,
            bp.isMobile && styles.servicesGridMobile,
          ]}
        >
          {services.map((service, index) => (
            <Animated.View
              key={service.id}
              style={[getAnimatedStyle(index), { width: cardWidth }]}
            >
              <ServiceCard
                service={service}
                width={cardWidth}
                hovered={hoveredCard === service.id}
                onPress={() => handleServicePress(service)}
                onHoverIn={() => setHoveredCard(service.id)}
                onHoverOut={() => setHoveredCard(null)}
                breakpoint={bp}
              />
            </Animated.View>
          ))}
        </View>
      </View>
    </View>
  );
};

// ✅ Nuevo Hook con los breakpoints actualizados
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
  },
  contentWrapper: {
    width: "100%",
    maxWidth: 1200,
    paddingHorizontal: 20,
  },
  contentWrapperTablet: {
    paddingHorizontal: 16,
  },
  contentWrapperMobile: {
    paddingHorizontal: 14,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  titleContainerTablet: {
    marginBottom: 50,
    paddingHorizontal: 16,
  },
  titleContainerMobile: {
    marginBottom: 40,
    paddingHorizontal: 8,
  },
  titleDecorationLeft: {
    width: 50,
    height: 3,
    backgroundColor: "#ff6b35",
    marginRight: 25,
    borderRadius: 2,
  },
  titleDecorationRight: {
    width: 50,
    height: 3,
    backgroundColor: "#ff6b35",
    marginLeft: 25,
    borderRadius: 2,
  },
  titleDecorationTablet: {
    width: 40,
    height: 2,
    marginHorizontal: 20,
  },
  titleDecorationMobile: {
    width: 30,
    height: 2,
    marginHorizontal: 15,
  },
  titleWrapper: {
    alignItems: "center",
  },
  sectionSubtitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#ff6b35",
    letterSpacing: 3,
    marginBottom: 12,
    textTransform: "uppercase",
  },
  sectionSubtitleTablet: {
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 10,
  },
  sectionSubtitleMobile: {
    fontSize: 10,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 0.5,
    lineHeight: 42,
  },
  sectionTitleTablet: {
    fontSize: 32,
    lineHeight: 36,
  },
  sectionTitleMobile: {
    fontSize: 24,
    lineHeight: 28,
  },
  titleAccent: {
    color: "#ff6b35",
    fontStyle: "italic",
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  servicesGridTablet: {
    marginBottom: 40,
  },
  servicesGridMobile: {
    marginBottom: 30,
    justifyContent: "center",
  },
});

export default ServicesSection;
