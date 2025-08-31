import { useWindowDimensions } from 'react-native';

export const useBreakpoint = () => {
  const { width } = useWindowDimensions();
  
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024 && width < 1440,
    isLargeDesktop: width >= 1440,
    isTabletOrMobile: width < 1024, // Útil para combinar estilos
    width, // Por si necesitas el ancho exacto
  };
};