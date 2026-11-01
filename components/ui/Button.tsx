import { useState } from "react";
import { Pressable, StyleSheet, Text, View, Platform, type GestureResponderEvent } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLOR, FONT, RADIUS } from "@/constants/theme";

type Variant = "primary" | "ghost";
type Size = "md" | "sm";

interface Props {
  label: string;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: Variant;
  size?: Size;
  icon?: keyof typeof Feather.glyphMap; // p.ej. "arrow-right"
  disabled?: boolean;
  fullWidth?: boolean;
  accessibilityLabel?: string;
}

/**
 * Botón único de la web. Reemplaza StartProjectButton, ViewPortfolioButton,
 * SendButton, RegisterButton, LoginButton y los LinearGradient "Ver más →".
 * Sólido (sin degradado), pill, texto en sentence case.
 */
export default function Button({ label, onPress, variant = "primary", size = "md", icon, disabled, fullWidth, accessibilityLabel }: Props) {
  const [hover, setHover] = useState(false);
  const hoverProps = Platform.OS === "web" ? { onHoverIn: () => setHover(true), onHoverOut: () => setHover(false) } : {};
  const primary = variant === "primary";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      {...hoverProps}
      style={[
        styles.base,
        size === "sm" ? styles.sm : styles.md,
        primary ? styles.primary : styles.ghost,
        hover && !disabled && (primary ? styles.primaryHover : styles.ghostHover),
        disabled && styles.disabled,
        fullWidth && styles.full,
      ]}
    >
      <View style={styles.row}>
        <Text style={[styles.label, size === "sm" && styles.labelSm, { color: primary ? COLOR.onOrange : COLOR.ink }]}>{label}</Text>
        {icon && (
          <Feather
            name={icon}
            size={size === "sm" ? 16 : 18}
            color={primary ? COLOR.onOrange : COLOR.ink}
            style={hover ? styles.iconHover : undefined}
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: RADIUS.pill, borderWidth: 1, borderColor: "transparent", justifyContent: "center", alignItems: "center", alignSelf: "flex-start" },
  md: { height: 48, paddingHorizontal: 24 },
  sm: { height: 40, paddingHorizontal: 18 },
  primary: { backgroundColor: COLOR.orange },
  primaryHover: { backgroundColor: COLOR.orangeHover },
  ghost: { borderColor: COLOR.lineStrong, backgroundColor: "transparent" },
  ghostHover: { borderColor: COLOR.ink },
  disabled: { opacity: 0.45 },
  full: { alignSelf: "stretch" },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  label: { fontFamily: FONT.medium, fontSize: 15, letterSpacing: 0.15 },
  labelSm: { fontSize: 14 },
  iconHover: { transform: [{ translateX: 3 }] },
});
