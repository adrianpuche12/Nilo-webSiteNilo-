"use client"

import { useEffect, useRef } from "react"
import { Animated, Easing } from "react-native"

// Hook para animación de crecimiento y decrecimiento suave
export const useShapeAnimation = (initialScale = 1, maxScale = 1.3, duration = 3000, delay = 0) => {
  const scaleValue = useRef(new Animated.Value(initialScale)).current

  useEffect(() => {
    const createAnimation = () => {
      return Animated.sequence([
        // Crecer
        Animated.timing(scaleValue, {
          toValue: maxScale,
          duration: duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        // Decrecer
        Animated.timing(scaleValue, {
          toValue: initialScale,
          duration: duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    }

    const startAnimation = () => {
      Animated.loop(createAnimation(), { iterations: -1 }).start()
    }

    // Aplicar delay inicial 
    if (delay > 0) {
      const timer = setTimeout(startAnimation, delay)
      return () => clearTimeout(timer)
    } else {
      startAnimation()
    }
  }, [scaleValue, maxScale, duration, delay, initialScale])

  return scaleValue
}

// Hook para animación de opacidad pulsante
export const useOpacityPulse = (initialOpacity = 0.1, maxOpacity = 0.3, duration = 2500, delay = 0) => {
  const opacityValue = useRef(new Animated.Value(initialOpacity)).current

  useEffect(() => {
    const createAnimation = () => {
      return Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: maxOpacity,
          duration: duration,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: initialOpacity,
          duration: duration,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    }

    const startAnimation = () => {
      Animated.loop(createAnimation(), { iterations: -1 }).start()
    }

    if (delay > 0) {
      const timer = setTimeout(startAnimation, delay)
      return () => clearTimeout(timer)
    } else {
      startAnimation()
    }
  }, [opacityValue, maxOpacity, duration, delay, initialOpacity])

  return opacityValue
}

// Hook para animación de rotación lenta
export const useRotationAnimation = (duration = 20000, delay = 0) => {
  const rotateValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const createAnimation = () => {
      return Animated.timing(rotateValue, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    }

    const startAnimation = () => {
      rotateValue.setValue(0)
      Animated.loop(createAnimation(), { iterations: -1 }).start()
    }

    if (delay > 0) {
      const timer = setTimeout(startAnimation, delay)
      return () => clearTimeout(timer)
    } else {
      startAnimation()
    }
  }, [rotateValue, duration, delay])

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  return rotate
}

// Hook combinado para formas con múltiples animaciones
export const useComplexShapeAnimation = (
  scaleConfig: {
    initialScale?: number
    maxScale?: number
    duration?: number
    delay?: number
  } = {},
  opacityConfig: {
    initialOpacity?: number
    maxOpacity?: number
    duration?: number
    delay?: number
  } = {},
  rotationConfig: {
    duration?: number
    delay?: number
  } = {},
) => {
  const scale = useShapeAnimation(
    scaleConfig.initialScale,
    scaleConfig.maxScale,
    scaleConfig.duration,
    scaleConfig.delay,
  )

  const opacity = useOpacityPulse(
    opacityConfig.initialOpacity,
    opacityConfig.maxOpacity,
    opacityConfig.duration,
    opacityConfig.delay,
  )

  const rotation = useRotationAnimation(rotationConfig.duration, rotationConfig.delay)

  return { scale, opacity, rotation }
}

// Configuraciones predefinidas para diferentes tipos de formas
export const SHAPE_ANIMATIONS = {
  CIRCLE_PRIMARY: {
    scale: { initialScale: 1, maxScale: 1.05, duration: 4000, delay: 0 },
    opacity: { initialOpacity: 0.03, maxOpacity: 0.3, duration: 4000, delay: 0 },
  },
  CIRCLE_SECONDARY: {
    scale: { initialScale: 1, maxScale: 1.1, duration: 4000, delay: 1000 },
    opacity: { initialOpacity: 0.05, maxOpacity: 0.3, duration: 4000, delay: 1000 },
  },
  SQUARE_PRIMARY: {
    scale: { initialScale: 1, maxScale: 1.05, duration: 4000, delay: 2000 },
    opacity: { initialOpacity: 0.03, maxOpacity: 0.3, duration: 4000, delay: 2000 },
  },
}
