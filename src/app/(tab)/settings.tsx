// src/app/(tabs)/settings.tsx

import { useAuth } from "@/contexts/auth-context";
import { useThemeContext } from "@/contexts/theme-context";
import { useUser } from "@/contexts/user-context";
import { Bell, HelpCircle, Moon, Shield, Sun, User } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, Pressable, ScrollView, Switch, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const { colors, theme, toggleTheme } = useThemeContext();
  const { signOut } = useAuth();
  const { user } = useUser();
  const insets = useSafeAreaInsets();
  const anim = useRef(new Animated.Value(theme === "dark" ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: theme === "dark" ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [theme]);

  const settingsItems = [
    {
      id: "profile",
      title: "Profile",
      subtitle: "Manage your account",
      icon: User,
      accent: colors.primary,
      onPress: () => {},
    },
    {
      id: "notifications",
      title: "Notifications",
      subtitle: "Reminders and updates",
      icon: Bell,
      accent: colors.secondary,
      onPress: () => {},
    },
    {
      id: "privacy",
      title: "Privacy & Security",
      subtitle: "Data and privacy settings",
      icon: Shield,
      accent: colors.primaryDark ?? colors.primary,
      onPress: () => {},
    },
    {
      id: "help",
      title: "Help & Support",
      subtitle: "Get help and contact us",
      icon: HelpCircle,
      accent: colors.secondaryDark ?? colors.secondary,
      onPress: () => {},
    },
  ];

  const getInitials = (email?: string) => {
    return email?.charAt(0).toUpperCase() || "U";
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        {/* Top header */}
        <View style={{ marginBottom: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ color: colors.text, fontSize: 28, fontWeight: "800" }}>Settings</Text>
        </View>

        {/* Profile hero */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 16,
            padding: 16,
            marginBottom: 16,
            shadowColor: "#000",
            shadowOpacity: 0.04,
            shadowOffset: { width: 0, height: 8 },
            shadowRadius: 18,
            elevation: 3,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 76,
              height: 76,
              borderRadius: 18,
              backgroundColor: colors.primary,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 14,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 32, fontWeight: "900" }}>{getInitials(user?.email)}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.text, fontSize: 18, fontWeight: "800" }}>{user?.email}</Text>
            <Text style={{ color: colors.textSecondary, marginTop: 4 }}>Member — Premium</Text>

            <View style={{ flexDirection: "row", marginTop: 12 }}>
              <Pressable
                style={{
                  backgroundColor: colors.primary,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 10,
                  marginRight: 8,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>Manage account</Text>
              </Pressable>

              <Pressable
                style={{
                  backgroundColor: colors.background,
                  borderWidth: 1,
                  borderColor: colors.border,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: colors.text, fontWeight: "700" }}>Invite</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Appearance Section */}
        <View style={{ backgroundColor: colors.surface, borderRadius: 14, paddingVertical: 6, marginBottom: 14 }}>
          <View style={{ paddingHorizontal: 12, paddingVertical: 10 }}>
            <Text style={{ color: colors.text, fontSize: 12, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.6 }}>
              Appearance
            </Text>
          </View>

          <Pressable
            onPress={toggleTheme}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 12,
              paddingVertical: 14,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: theme === "dark" ? colors.primary : colors.secondary, justifyContent: "center", alignItems: "center", marginRight: 12 }}>
                {theme === "dark" ? <Moon size={18} color="#fff" /> : <Sun size={18} color="#fff" />}
              </View>
              <View>
                <Text style={{ color: colors.text, fontWeight: "700", fontSize: 15 }}>Dark Mode</Text>
                <Text style={{ color: colors.textSecondary }}>{theme === "dark" ? "Activated" : "Deactivated"}</Text>
              </View>
            </View>

            <Switch
              value={theme === "dark"}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={theme === "dark" ? "#fff" : colors.textSecondary}
            />
          </Pressable>
        </View>

        {/* General section with accent icons */}
        <View style={{ backgroundColor: colors.surface, borderRadius: 14, paddingVertical: 6, marginBottom: 14 }}>
          <View style={{ paddingHorizontal: 12, paddingVertical: 10 }}>
            <Text style={{ color: colors.text, fontSize: 12, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.6 }}>General</Text>
          </View>

          {settingsItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Pressable
                key={item.id}
                onPress={item.onPress}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 12,
                  paddingVertical: 14,
                  borderBottomWidth: idx !== settingsItems.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: item.accent, justifyContent: "center", alignItems: "center", marginRight: 12 }}>
                    <Icon size={18} color="#fff" />
                  </View>
                  <View style={{ maxWidth: "72%" }}>
                    <Text style={{ color: colors.text, fontWeight: "700" }}>{item.title}</Text>
                    <Text style={{ color: colors.textSecondary, marginTop: 2 }}>{item.subtitle}</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Danger / Sign out */}
        <View style={{ backgroundColor: colors.surface, borderRadius: 14, padding: 12, marginBottom: 20 }}>
          <Text style={{ color: colors.textSecondary, marginBottom: 8 }}>Danger Zone</Text>
          <Pressable
            onPress={signOut}
            style={{
              backgroundColor: colors.error,
              paddingVertical: 12,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "800" }}>Sign Out</Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View style={{ alignItems: "center", paddingVertical: 20 }}>
          <Text style={{ color: colors.textSecondary, fontSize: 12 }}>App v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}