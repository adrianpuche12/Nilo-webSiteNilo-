import { useEffect, type ReactNode } from "react";
import type { LayoutChangeEvent } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface Props {
  /** true la primera vez que la sección entra en pantalla; nunca vuelve a false. */
  shown: boolean;
  /** Con "reducir movimiento" activo, la sección aparece sin animar. */
  reduceMotion: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  children: ReactNode;
}

/**
 * Aparición de una sección al hacer scroll: opacity + translateY 24 → 0, 600 ms, sin scale.
 * Se anima UNA sola vez: volver a subir no oculta el contenido (antes las secciones quedaban en opacity 0).
 */
export default function Reveal({ shown, reduceMotion, onLayout, children }: Props) {
  const opacity = useSharedValue(reduceMotion ? 1 : 0);
  const translateY = useSharedValue(reduceMotion ? 0 : 24);

  useEffect(() => {
    if (reduceMotion) {
      opacity.value = 1;
      translateY.value = 0;
    } else if (shown) {
      opacity.value = withTiming(1, { duration: 600 });
      translateY.value = withTiming(0, { duration: 600 });
    }
  }, [shown, reduceMotion, opacity, translateY]);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={style} onLayout={onLayout}>
      {children}
    </Animated.View>
  );
}
