"use client"

import { useEffect } from "react"
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  withSpring,
  interpolate,
  Easing,
} from "react-native-reanimated"

// Animación de entrada suave siguiendo el patrón de la referencia
export const useFadeInAnimation = (delay = 0, duration = 600) => {
  const opacity = useSharedValue(0)
  const translateY = useSharedValue(30)

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      })
    )
    translateY.value = withDelay(
      delay,
      withSpring(0, {
        damping: 15,
        stiffness: 150,
        mass: 1,
      })
    )
  }, [delay, duration])

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }))
}

// Animación de hover moderna como la de la referencia
export const useModernHoverAnimation = (isHovered: boolean) => {
  const scale = useSharedValue(1)
  const shadowOpacity = useSharedValue(0.2)
  const borderOpacity = useSharedValue(0)

  useEffect(() => {
    if (isHovered) {
      scale.value = withTiming(1.05, { duration: 250 })
      shadowOpacity.value = withTiming(0.4, { duration: 250 })
      borderOpacity.value = withTiming(1, { duration: 250 })
    } else {
      scale.value = withTiming(1, { duration: 350 })
      shadowOpacity.value = withTiming(0.2, { duration: 350 })
      borderOpacity.value = withTiming(0, { duration: 350 })
    }
  }, [isHovered])

  return {
    cardStyle: useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    })),
    shadowStyle: useAnimatedStyle(() => ({
      shadowOpacity: shadowOpacity.value,
    })),
    borderStyle: useAnimatedStyle(() => ({
      borderColor: `rgba(255, 102, 0, ${borderOpacity.value})`,
    })),
  }
}

// Animación de texto que aparece letra por letra (efecto typewriter)
export const useTypewriterAnimation = (text: string, delay = 0) => {
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(1, {
        duration: text.length * 50,
        easing: Easing.linear,
      })
    )
  }, [text, delay])

  return useAnimatedStyle(() => {
    const visibleLength = Math.floor(progress.value * text.length)
    return {
      opacity: progress.value > 0 ? 1 : 0,
    }
  })
}

// Animación de carga de elementos en secuencia
export const useSequentialAnimation = (items: any[], baseDelay = 0) => {
  const animations = items.map((_, index) => {
    const opacity = useSharedValue(0)
    const translateY = useSharedValue(20)
    const scale = useSharedValue(0.9)

    useEffect(() => {
      const itemDelay = baseDelay + index * 100

      opacity.value = withDelay(
        itemDelay,
        withTiming(1, { duration: 400 })
      )
      translateY.value = withDelay(
        itemDelay,
        withSpring(0, {
          damping: 20,
          stiffness: 200,
        })
      )
      scale.value = withDelay(
        itemDelay,
        withSpring(1, {
          damping: 15,
          stiffness: 150,
        })
      )
    }, [])

    return useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    }))
  })

  return animations
}

// Animación de gradient hover effect
export const useGradientHoverAnimation = (isHovered: boolean) => {
  const gradientPosition = useSharedValue(0)
  const gradientOpacity = useSharedValue(0)

  useEffect(() => {
    if (isHovered) {
      gradientPosition.value = withTiming(1, { duration: 300 })
      gradientOpacity.value = withTiming(0.1, { duration: 300 })
    } else {
      gradientPosition.value = withTiming(0, { duration: 300 })
      gradientOpacity.value = withTiming(0, { duration: 300 })
    }
  }, [isHovered])

  return useAnimatedStyle(() => {
    const translateX = interpolate(
      gradientPosition.value,
      [0, 1],
      [-100, 100]
    )

    return {
      opacity: gradientOpacity.value,
      transform: [{ translateX }],
    }
  })
}

// Animación de pulso para elementos destacados
export const usePulseAnimation = (active = true) => {
  const scale = useSharedValue(1)

  useEffect(() => {
    if (active) {
      scale.value = withSequence(
        withTiming(1.05, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      )
    }
  }, [active])

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))
}