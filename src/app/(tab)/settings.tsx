// src/app/(tabs)/settings.tsx

import { useAuth } from "@/contexts/auth-context";
import { useThemeContext } from "@/contexts/theme-context";
import { useUser } from "@/contexts/user-context";
import { Bell, HelpCircle, LogOut, Moon, Shield, Sun, User } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
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
      onPress: () => {},
    },
    {
      id: "notifications",
      title: "Notifications",
      subtitle: "Reminders and updates",
      icon: Bell,
      onPress: () => {},
    },
    {
      id: "privacy",
      title: "Privacy & Security",
      subtitle: "Data and privacy settings",
      icon: Shield,
      onPress: () => {},
    },
    {
      id: "help",
      title: "Help & Support",
      subtitle: "Get help and contact us",
      icon: HelpCircle,
      onPress: () => {},
    },
  ];

  const getInitials = (email?: string) => {
    return email?.charAt(0).toUpperCase() || "U";
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>

        {/* Profile Section */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <View style={styles.profileHeader}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={styles.avatarText}>{getInitials(user?.email)}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileEmail, { color: colors.text }]}>{user?.email}</Text>
              <Text style={[styles.profileStatus, { color: colors.textSecondary }]}>Member</Text>
            </View>
          </View>
        </View>

        {/* Appearance Section */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
          </View>

          <Pressable style={styles.settingItem} onPress={toggleTheme}>
            <View style={styles.settingLeft}>
              {theme === "dark" ? (
                <Moon size={20} color={colors.textSecondary} />
              ) : (
                <Sun size={20} color={colors.textSecondary} />
              )}
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>Dark Mode</Text>
                <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                  {theme === "dark" ? "Dark theme enabled" : "Light theme enabled"}
                </Text>
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

        {/* General Settings */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>General</Text>
          </View>

          {settingsItems.map((item, index) => (
            <Pressable
              key={item.id}
              style={[
                styles.settingItem,
                index !== settingsItems.length - 1 && [styles.settingItemBorder, { borderColor: colors.border }],
              ]}
              onPress={item.onPress}
            >
              <View style={styles.settingLeft}>
                <item.icon size={20} color={colors.textSecondary} />
                <View style={styles.settingText}>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>{item.title}</Text>
                  <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>{item.subtitle}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Danger Zone */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Pressable style={styles.settingItem} onPress={signOut}>
            <View style={styles.settingLeft}>
              <LogOut size={20} color={colors.error} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.error }]}>Sign Out</Text>
              </View>
            </View>
          </Pressable>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>App v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
  },
  section: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  profileInfo: {
    flex: 1,
  },
  profileEmail: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  profileStatus: {
    fontSize: 13,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
    fontWeight: "500",
  },
});