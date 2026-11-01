import Contact from "@/app/ContactSection";
import HomePage from "@/app/homePage";
import Services from "@/app/ServicesSection";
import ProductsSection from "@/app/ProductsSection";
import N8nProjectsSection from "@/app/N8nProjectsSection";
import ExperienceSection from "@/app/ExperienceSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Reveal from "@/components/ui/Reveal";
import { COLOR } from "@/constants/theme";

import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AccessibilityInfo, ScrollView, View, type LayoutChangeEvent, type NativeScrollEvent, type NativeSyntheticEvent } from "react-native";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

/** Alto del header fijo (components/Header.tsx → inner.height). */
const HEADER_HEIGHT = 72;
const SECTIONS = ["inicio", "servicios", "productos", "proyectos", "experiencia", "contacto"] as const;
type SectionId = (typeof SECTIONS)[number];

export default function Home() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [sectionPositions, setSectionPositions] = useState<Partial<Record<SectionId, number>>>({});
  const [currentSection, setCurrentSection] = useState<SectionId>("inicio");
  // Secciones que ya aparecieron: se animan una sola vez y nunca vuelven a ocultarse.
  const [shown, setShown] = useState<Set<SectionId>>(() => new Set<SectionId>(["inicio"]));
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion).catch(() => undefined);
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const viewport = event.nativeEvent.layoutMeasurement.height;
    let active: SectionId = "inicio";
    const newlyShown: SectionId[] = [];

    for (const id of SECTIONS) {
      const top = sectionPositions[id];
      if (top === undefined) continue;
      if (!shown.has(id) && y + viewport * 0.85 >= top) newlyShown.push(id);
      if (y + HEADER_HEIGHT + 120 >= top) active = id;
    }

    if (newlyShown.length) setShown((prev) => new Set([...prev, ...newlyShown]));
    if (active !== currentSection) setCurrentSection(active);
  };

  const handleSectionLayout = (sectionId: SectionId) => (event: LayoutChangeEvent) => {
    const { y } = event.nativeEvent.layout;
    setSectionPositions((prev) => ({ ...prev, [sectionId]: y }));
  };

  const scrollToSection = (sectionId: string) => {
    const top = sectionPositions[sectionId as SectionId];
    if (scrollViewRef.current && top !== undefined) {
      scrollViewRef.current.scrollTo({ y: Math.max(0, top - HEADER_HEIGHT), animated: true });
    }
  };

  const section = (id: Exclude<SectionId, "inicio">, content: ReactNode) => (
    <Reveal shown={shown.has(id)} reduceMotion={reduceMotion} onLayout={handleSectionLayout(id)}>
      {content}
    </Reveal>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLOR.bg }}>
      {/* Header fuera del ScrollView: queda fijo arriba. */}
      <Header scrollToSection={scrollToSection} isIndexPage currentSection={currentSection} />

      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: COLOR.bg }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View onLayout={handleSectionLayout("inicio")}>
          <HomePage onStartProject={() => scrollToSection("contacto")} onViewWork={() => scrollToSection("productos")} />
        </View>

        {section("servicios", <Services onContact={() => scrollToSection("contacto")} />)}
        {section("productos", <ProductsSection />)}
        {section("proyectos", <N8nProjectsSection />)}
        {section("experiencia", <ExperienceSection />)}
        {section("contacto", <Contact />)}

        <Footer scrollToSection={scrollToSection} />
      </ScrollView>
    </View>
  );
}
