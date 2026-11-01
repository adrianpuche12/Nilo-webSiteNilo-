import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Linking, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import Button from "@/components/ui/Button";
import { COLOR, FONT, MAX_WIDTH, RADIUS, TYPE } from "@/constants/theme";
import { useBreakpoint } from "@/hooks/useBreakpoints";

/** Casilla de contacto de Nilo Solutions (confirmada por Jorge, 01-Nov-2026). */
const CONTACT_EMAIL = "contacto@nilosolutions.com";
const NEEDS = ["Desarrollo web", "App móvil", "Automatización", "Consultoría", "Otro"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contacto. El envío abre el correo del visitante con el mensaje armado (mailto),
 * así ningún mensaje se pierde: antes el formulario mostraba "enviado" sin mandar nada.
 */
export default function ContactSection() {
  const { isMobile } = useBreakpoint();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [need, setNeed] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "opened" | "error">("idle");

  const valid = name.trim().length > 0 && EMAIL_RE.test(email.trim()) && message.trim().length > 0;

  const send = async () => {
    if (!valid) return;
    const subject = `Consulta desde la web${need ? ` — ${need}` : ""}`;
    const body = [
      `Nombre: ${name.trim()}`,
      `Correo: ${email.trim()}`,
      need ? `Necesita: ${need}` : null,
      "",
      message.trim(),
    ]
      .filter((line) => line !== null)
      .join("\n");
    try {
      await Linking.openURL(`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      setStatus("opened");
    } catch {
      setStatus("error");
    }
  };

  return (
    <View style={[styles.section, isMobile && styles.sectionMobile]}>
      <View style={[styles.inner, isMobile && styles.innerMobile]}>
        <View style={styles.left}>
          <Text style={styles.eyebrow}>CONTACTO</Text>
          <Text style={[styles.title, { fontSize: isMobile ? TYPE.h2.m : TYPE.h2.d, lineHeight: (isMobile ? TYPE.h2.m : TYPE.h2.d) * TYPE.h2.lh }]}>
            Contanos qué querés construir.
          </Text>
          <Text style={styles.lead}>Te respondemos con una primera propuesta de alcance.</Text>
          <View style={styles.facts}>
            <Fact icon="map-pin" text="Rosario, Santa Fe, Argentina" />
            <Fact icon="mail" text={CONTACT_EMAIL} onPress={() => Linking.openURL(`mailto:${CONTACT_EMAIL}`)} />
          </View>
        </View>

        <View style={[styles.card, isMobile && styles.cardMobile]}>
          <Field label="Nombre" value={name} onChangeText={setName} placeholder="Tu nombre" autoComplete="name" />
          <Field
            label="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            placeholder="tu@empresa.com"
            keyboardType="email-address"
            autoComplete="email"
          />

          <Text style={styles.label}>¿Qué necesitás?</Text>
          <View style={styles.chips}>
            {NEEDS.map((option) => {
              const active = need === option;
              return (
                <Pressable
                  key={option}
                  onPress={() => setNeed(active ? null : option)}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: active }}
                  style={[styles.chip, active && styles.chipActive]}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{option}</Text>
                </Pressable>
              );
            })}
          </View>

          <Field
            label="Mensaje"
            value={message}
            onChangeText={setMessage}
            placeholder="Contanos brevemente el proyecto"
            multiline
          />

          <View style={[styles.footer, isMobile && styles.footerMobile]}>
            {status === "opened" ? (
              <View style={styles.statusRow}>
                <Feather name="check" size={16} color={COLOR.success} />
                <Text style={styles.statusOk}>Abrimos tu correo con el mensaje listo para enviar.</Text>
              </View>
            ) : status === "error" ? (
              <Text style={styles.statusErr}>No pudimos abrir tu correo. Escribinos a {CONTACT_EMAIL}.</Text>
            ) : (
              <Text style={styles.hint}>Se abre tu correo con el mensaje listo para enviar.</Text>
            )}
            <Button label="Enviar mensaje" icon="arrow-right" onPress={send} disabled={!valid} fullWidth={isMobile} />
          </View>
        </View>
      </View>
    </View>
  );
}

function Fact({ icon, text, onPress }: { icon: "map-pin" | "mail"; text: string; onPress?: () => void }) {
  const content = (
    <View style={styles.fact}>
      <Feather name={icon} size={18} color={COLOR.orange} />
      <Text style={styles.factText}>{text}</Text>
    </View>
  );
  return onPress ? (
    <Pressable onPress={onPress} accessibilityRole="link">
      {content}
    </Pressable>
  ) : (
    content
  );
}

function Field({
  label,
  multiline,
  ...input
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
  keyboardType?: "email-address";
  autoComplete?: "name" | "email";
}) {
  const [focus, setFocus] = useState(false);
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...input}
        multiline={multiline}
        accessibilityLabel={label}
        placeholderTextColor={COLOR.ink3}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={[
          styles.input,
          multiline && styles.textarea,
          focus && styles.inputFocus,
          Platform.OS === "web" && ({ outlineStyle: "none" } as object),
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: { backgroundColor: COLOR.bg, paddingVertical: 112, borderBottomWidth: 1, borderBottomColor: COLOR.line },
  sectionMobile: { paddingVertical: 80 },
  inner: { maxWidth: MAX_WIDTH, width: "100%", alignSelf: "center", paddingHorizontal: 24, flexDirection: "row", gap: 64 },
  innerMobile: { flexDirection: "column", gap: 40 },
  left: { flex: 1 },
  eyebrow: { fontFamily: FONT.medium, fontSize: TYPE.eyebrow, letterSpacing: 4.2, color: COLOR.orange },
  title: { fontFamily: FONT.bold, color: COLOR.ink, marginTop: 14, letterSpacing: -0.6 },
  lead: { fontFamily: FONT.light, fontSize: 17, lineHeight: 28, color: COLOR.ink2, marginTop: 20 },
  facts: { marginTop: 36, gap: 18 },
  fact: { flexDirection: "row", alignItems: "center", gap: 12 },
  factText: { fontFamily: FONT.regular, fontSize: 15, color: COLOR.ink },
  card: { flex: 1.2, backgroundColor: COLOR.card, borderWidth: 1, borderColor: COLOR.line, borderRadius: RADIUS.xl, padding: 36 },
  cardMobile: { padding: 24 },
  field: { marginBottom: 20 },
  label: { fontFamily: FONT.medium, fontSize: 13, color: COLOR.ink2, marginBottom: 8 },
  input: {
    fontFamily: FONT.regular,
    fontSize: 15,
    color: COLOR.ink,
    backgroundColor: "#0a0a0a",
    borderWidth: 1,
    borderColor: COLOR.lineStrong,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  textarea: { minHeight: 130, textAlignVertical: "top" },
  inputFocus: { borderColor: COLOR.orange },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  chip: { borderWidth: 1, borderColor: COLOR.lineStrong, borderRadius: RADIUS.pill, paddingVertical: 8, paddingHorizontal: 14 },
  chipActive: { borderColor: COLOR.orange, backgroundColor: COLOR.orangeSoft },
  chipText: { fontFamily: FONT.regular, fontSize: 14, color: COLOR.ink2 },
  chipTextActive: { color: COLOR.ink, fontFamily: FONT.medium },
  footer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 16, marginTop: 8 },
  footerMobile: { flexDirection: "column", alignItems: "stretch" },
  hint: { flex: 1, fontFamily: FONT.regular, fontSize: 13, color: COLOR.ink3 },
  statusRow: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8 },
  statusOk: { fontFamily: FONT.regular, fontSize: 13, color: COLOR.success, flexShrink: 1 },
  statusErr: { flex: 1, fontFamily: FONT.regular, fontSize: 13, color: COLOR.orange },
});
