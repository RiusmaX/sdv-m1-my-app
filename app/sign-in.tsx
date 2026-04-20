import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

function SignInScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const isSignIn = mode === "signin";

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    const fn = isSignIn
      ? supabase.auth.signInWithPassword({ email, password })
      : supabase.auth.signUp({ email, password });
    const { error } = await fn;
    if (error) setError(error.message);
    setLoading(false);
  };

  const toggleMode = () => {
    setMode(isSignIn ? "signup" : "signin");
    setError("");
  };

  const styles = makeStyles(colors, colorScheme);

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo / Icon */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>✦</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          {isSignIn ? "Bon retour !" : "Créer un compte"}
        </Text>
        <Text style={styles.subtitle}>
          {isSignIn
            ? "Connectez-vous pour continuer"
            : "Rejoignez-nous en quelques secondes"}
        </Text>

        {/* Form */}
        <View style={styles.form}>
          <View
            style={[
              styles.inputWrapper,
              focusedField === "email" && styles.inputWrapperFocused,
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Adresse e-mail"
              placeholderTextColor={colors.icon}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          <View
            style={[
              styles.inputWrapper,
              focusedField === "password" && styles.inputWrapperFocused,
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              placeholderTextColor={colors.icon}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {isSignIn ? "Se connecter" : "S'inscrire"}
              </Text>
            )}
          </Pressable>
        </View>

        {/* Toggle mode */}
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>
            {isSignIn ? "Pas encore de compte ?" : "Déjà un compte ?"}
          </Text>
          <Pressable onPress={toggleMode}>
            <Text style={styles.toggleLink}>
              {isSignIn ? " S'inscrire" : " Se connecter"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function makeStyles(colors: (typeof Colors)["light"] | (typeof Colors)["dark"], scheme: "light" | "dark") {
  const isDark = scheme === "dark";
  const cardBg = isDark ? "#1e2022" : "#f8f9fa";
  const borderColor = isDark ? "#2e3235" : "#e8eaed";

  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scroll: {
      flexGrow: 1,
      justifyContent: "center",
      paddingHorizontal: 28,
      paddingVertical: 48,
    },
    logoContainer: {
      alignItems: "center",
      marginBottom: 32,
    },
    logoCircle: {
      width: 72,
      height: 72,
      borderRadius: 20,
      backgroundColor: colors.tint,
      justifyContent: "center",
      alignItems: "center",
    },
    logoEmoji: {
      fontSize: 32,
      color: "#fff",
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.text,
      textAlign: "center",
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 15,
      color: colors.icon,
      textAlign: "center",
      marginBottom: 36,
    },
    form: {
      gap: 12,
    },
    inputWrapper: {
      backgroundColor: cardBg,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: borderColor,
      paddingHorizontal: 16,
      paddingVertical: Platform.OS === "ios" ? 16 : 4,
    },
    inputWrapperFocused: {
      borderColor: colors.tint,
    },
    input: {
      fontSize: 16,
      color: colors.text,
    },
    errorBox: {
      backgroundColor: isDark ? "#3a1a1a" : "#fff0f0",
      borderRadius: 10,
      padding: 12,
    },
    errorText: {
      color: isDark ? "#ff6b6b" : "#c0392b",
      fontSize: 14,
      textAlign: "center",
    },
    button: {
      backgroundColor: colors.tint,
      borderRadius: 14,
      paddingVertical: 16,
      alignItems: "center",
      marginTop: 4,
    },
    buttonPressed: {
      opacity: 0.85,
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    toggleRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 28,
    },
    toggleLabel: {
      color: colors.icon,
      fontSize: 14,
    },
    toggleLink: {
      color: colors.tint,
      fontSize: 14,
      fontWeight: "600",
    },
  });
}

export default SignInScreen;