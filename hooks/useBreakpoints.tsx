import { useWindowDimensions } from "react-native";
import { BP } from "@/constants/theme";

/**
 * Un solo criterio de breakpoints para toda la web (constants/theme.ts → BP).
 * Mantiene isTabletOrMobile / isLargeDesktop para las pantallas que todavía los usan (TeamSection).
 */
export function useBreakpoint() {
  const { width } = useWindowDimensions();
  return {
    width,
    isMobile: width < BP.mobile,
    isTablet: width >= BP.mobile && width < BP.tablet,
    isDesktop: width >= BP.tablet,
    isLargeDesktop: width >= 1440,
    isTabletOrMobile: width < BP.tablet,
  };
}
