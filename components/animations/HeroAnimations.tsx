"use client"

import { useEffect, useRef } from "react"
import { Animated, Easing } from "react-native"

// Hook para animación de entrada con fade + slide up
export const useHeroEntranceAnimation = (delay = 0, duration = 800) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current

  useEffect(() => {
    const startAnimation = () => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: duration,
          delay: delay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: duration,
          delay: delay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start()
    }

    startAnimation()
  }, [fadeAnim, slideAnim, delay, duration])

  return {
    opacity: fadeAnim,
    transform: [{ translateY: slideAnim }],
  }
}

// Hook para animación de entrada con escala
export const useScaleEntranceAnimation = (delay = 0, duration = 600) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const startAnimation = () => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: duration,
          delay: delay,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: duration,
          delay: delay,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
      ]).start()
    }

    startAnimation()
  }, [scaleAnim, fadeAnim, delay, duration])

  return {
    opacity: fadeAnim,
    transform: [{ scale: scaleAnim }],
  }
}

// Hook para animación de entrada lateral (slide from side)
export const useSideEntranceAnimation = (direction: "left" | "right" = "left", delay = 0, duration = 700) => {
  const slideAnim = useRef(new Animated.Value(direction === "left" ? -100 : 100)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const startAnimation = () => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: duration,
          delay: delay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: duration,
          delay: delay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start()
    }

    startAnimation()
  }, [slideAnim, fadeAnim, delay, duration, direction])

  return {
    opacity: fadeAnim,
    transform: [{ translateX: slideAnim }],
  }
}

// Hook para animación de entrada con rebote
export const useBounceEntranceAnimation = (delay = 0, duration = 900) => {
  const bounceAnim = useRef(new Animated.Value(0)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const startAnimation = () => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: duration * 0.6,
          delay: delay,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 1.1,
            duration: duration * 0.4,
            delay: delay,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0.95,
            duration: duration * 0.2,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: duration * 0.4,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ]).start()
    }

    startAnimation()
  }, [bounceAnim, fadeAnim, delay, duration])

  return {
    opacity: fadeAnim,
    transform: [{ scale: bounceAnim }],
  }
}

// Configuraciones predefinidas para diferentes elementos del hero
export const HERO_ENTRANCE_ANIMATIONS = {
  SUBTITLE: {
    delay: 200,
    duration: 600,
  },
  TITLE: {
    delay: 400,
    duration: 800,
  },
  DESCRIPTION: {
    delay: 600,
    duration: 700,
  },
  BUTTONS: {
    delay: 800,
    duration: 600,
  },
  CARD: {
    delay: 1000,
    duration: 900,
  },
  BACKGROUND_SHAPES: {
    delay: 1200,
    duration: 1000,
  },
}

// Hook combinado para toda la sección hero
export const useHeroSectionAnimation = () => {
  const subtitleAnim = useHeroEntranceAnimation(
    HERO_ENTRANCE_ANIMATIONS.SUBTITLE.delay,
    HERO_ENTRANCE_ANIMATIONS.SUBTITLE.duration,
  )

  const titleAnim = useHeroEntranceAnimation(
    HERO_ENTRANCE_ANIMATIONS.TITLE.delay,
    HERO_ENTRANCE_ANIMATIONS.TITLE.duration,
  )

  const descriptionAnim = useHeroEntranceAnimation(
    HERO_ENTRANCE_ANIMATIONS.DESCRIPTION.delay,
    HERO_ENTRANCE_ANIMATIONS.DESCRIPTION.duration,
  )

  const buttonsAnim = useScaleEntranceAnimation(
    HERO_ENTRANCE_ANIMATIONS.BUTTONS.delay,
    HERO_ENTRANCE_ANIMATIONS.BUTTONS.duration,
  )

  const cardAnim = useSideEntranceAnimation(
    "right",
    HERO_ENTRANCE_ANIMATIONS.CARD.delay,
    HERO_ENTRANCE_ANIMATIONS.CARD.duration,
  )

  const shapesAnim = useBounceEntranceAnimation(
    HERO_ENTRANCE_ANIMATIONS.BACKGROUND_SHAPES.delay,
    HERO_ENTRANCE_ANIMATIONS.BACKGROUND_SHAPES.duration,
  )

  return {
    subtitle: subtitleAnim,
    title: titleAnim,
    description: descriptionAnim,
    buttons: buttonsAnim,
    card: cardAnim,
    shapes: shapesAnim,
  }
}
