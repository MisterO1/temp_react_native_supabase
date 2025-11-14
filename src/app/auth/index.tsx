// src/app/auth/index.tsx
import { useThemeContext } from "@/contexts/theme-context";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AuthScreen() {
  const router = useRouter();
  const { colors, toggleTheme } = useThemeContext();
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!email) throw new Error("Email requis");
      if (!password) throw new Error("Mot de passe requis");

      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        Alert.alert("Succès", "Vérifie ta boîte mail pour confirmer (si nécessaire).");
      }
    } catch (err: any) {
      Alert.alert("Erreur", err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
      if (error) throw error;
      // In React Native this usually opens the external flow; session handled by auth listener
    } catch (err: any) {
      Alert.alert("Erreur", err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: insets.top }}>
      <View style={{ flex: 1, paddingHorizontal: 20, justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: "100%", maxWidth: 520 }}>
          {/* Header */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <Text style={{ color: colors.text, fontSize: 28, fontWeight: "700" }}>
              {mode === "login" ? "Connexion" : "Inscription"}
            </Text>
            <Pressable onPress={toggleTheme} style={{ padding: 8, borderRadius: 999, backgroundColor: colors.surface }}>
              <Text style={{ fontSize: 18 }}>{colors.background === "#ffffff" ? "🌙" : "☀️"}</Text>
            </Pressable>
          </View>

          {/* Card */}
          <View style={{ backgroundColor: colors.surface, borderRadius: 12, padding: 18, marginBottom: 16, shadowColor: "#000", shadowOpacity: 0.03, elevation: 1 }}>
            {/* Email */}
            <Text style={{ color: colors.textSecondary, marginBottom: 6 }}>Email</Text>
            <TextInput
              placeholder="votre@email.com"
              placeholderTextColor={colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
              style={{
                backgroundColor: colors.background,
                color: colors.text,
                borderColor: colors.border,
                borderWidth: 1,
                padding: 12,
                borderRadius: 8,
                marginBottom: 12,
                width: "100%",
              }}
            />

            {/* Password */}
            <Text style={{ color: colors.textSecondary, marginBottom: 6 }}>Mot de passe</Text>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor={colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
              style={{
                backgroundColor: colors.background,
                color: colors.text,
                borderColor: colors.border,
                borderWidth: 1,
                padding: 12,
                borderRadius: 8,
                marginBottom: 16,
                width: "100%",
              }}
            />

            {/* Submit */}
            <Pressable
              onPress={handleSubmit}
              disabled={loading}
              style={{
                backgroundColor: colors.primary,
                opacity: loading ? 0.8 : 1,
                paddingVertical: 14,
                borderRadius: 8,
                marginBottom: 12,
                alignItems: "center",
              }}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: "#fff", fontWeight: "600" }}>{mode === "login" ? "Se connecter" : "S'inscrire"}</Text>}
            </Pressable>

            {/* Mode toggle */}
            <Pressable onPress={() => setMode(mode === "login" ? "signup" : "login")} style={{ alignItems: "center", marginBottom: 8 }}>
              <Text style={{ color: colors.primary, fontWeight: "600" }}>{mode === "login" ? "Créer un compte" : "Déjà un compte ? Se connecter"}</Text>
            </Pressable>

            {/* Divider */}
            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
              <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
              <Text style={{ color: colors.textSecondary, marginHorizontal: 12 }}>ou</Text>
              <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
            </View>

            {/* Google Sign-in */}
            <Pressable
              onPress={handleSignInWithGoogle}
              disabled={loading}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                paddingVertical: 12,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.background,
              }}
            >
              <Text style={{ marginRight: 10, fontWeight: "700", color: colors.text }}>G</Text>
              {loading ? <ActivityIndicator color={colors.text} /> : <Text style={{ color: colors.text, fontWeight: "600" }}>Continuer avec Google</Text>}
            </Pressable>
          </View>

          {/* Secondary Option Card */}
          <View style={{ alignItems: "center", marginTop: 6 }}>
            <Text style={{ color: colors.textSecondary, fontSize: 12, textAlign: "center" }}>
              En utilisant ce service, vous acceptez nos conditions.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
