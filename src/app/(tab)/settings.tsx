// src/app/(tabs)/settings.tsx

import { useAuth } from "@/contexts/auth-context";
import { useThemeContext } from "@/contexts/theme-context";
import { useUser } from "@/contexts/user-context";
import { Bell, HelpCircle, LogOut, Moon, Shield, Sun, User } from "lucide-react-native";
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
    <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}>
        {/* Header */}
        <Text style={{ color: colors.text }} className="text-3xl font-bold mb-6">
          Settings
        </Text>

        {/* Profile Section */}
        <View style={{ backgroundColor: colors.surface }} className="rounded-xl mb-4 overflow-hidden">
          <View className="flex-row items-center p-4">
            <View style={{ backgroundColor: colors.primary }} className="w-14 h-14 rounded-full justify-center items-center mr-3.5">
              <Text style={{ color: "#fff" }} className="text-lg font-bold">
                {getInitials(user?.email)}
              </Text>
            </View>
            <View className="flex-1">
              <Text style={{ color: colors.text }} className="text-base font-semibold mb-1">
                {user?.email}
              </Text>
              <Text style={{ color: colors.textSecondary }} className="text-sm">
                Member
              </Text>
            </View>
          </View>
        </View>

        {/* Appearance Section */}
        <View style={{ backgroundColor: colors.surface }} className="rounded-xl mb-4 overflow-hidden">
          <View className="px-4 py-3">
            <Text style={{ color: colors.text }} className="text-xs font-semibold uppercase tracking-wide">
              Appearance
            </Text>
          </View>

          <Pressable className="flex-row items-center justify-between px-4 py-3.5" onPress={toggleTheme}>
            <View className="flex-row items-center flex-1">
              {theme === "dark" ? (
                <Moon size={20} color={colors.textSecondary} />
              ) : (
                <Sun size={20} color={colors.textSecondary} />
              )}
              <View className="ml-3 flex-1">
                <Text style={{ color: colors.text }} className="text-base font-medium mb-0.5">
                  Dark Mode
                </Text>
                <Text style={{ color: colors.textSecondary }} className="text-xs">
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
        <View style={{ backgroundColor: colors.surface }} className="rounded-xl mb-4 overflow-hidden">
          <View className="px-4 py-3">
            <Text style={{ color: colors.text }} className="text-xs font-semibold uppercase tracking-wide">
              General
            </Text>
          </View>

          {settingsItems.map((item, index) => (
            <Pressable
              key={item.id}
              className="flex-row items-center justify-between px-4 py-3.5"
              style={index !== settingsItems.length - 1 ? { borderBottomWidth: 1, borderBottomColor: colors.border } : {}}
              onPress={item.onPress}
            >
              <View className="flex-row items-center flex-1">
                <item.icon size={20} color={colors.textSecondary} />
                <View className="ml-3 flex-1">
                  <Text style={{ color: colors.text }} className="text-base font-medium mb-0.5">
                    {item.title}
                  </Text>
                  <Text style={{ color: colors.textSecondary }} className="text-xs">
                    {item.subtitle}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Danger Zone */}
        <View style={{ backgroundColor: colors.surface }} className="rounded-xl mb-4 overflow-hidden">
          <Pressable className="flex-row items-center justify-between px-4 py-3.5" onPress={signOut}>
            <View className="flex-row items-center flex-1">
              <LogOut size={20} color={colors.error} />
              <View className="ml-3 flex-1">
                <Text style={{ color: colors.error }} className="text-base font-medium">
                  Sign Out
                </Text>
              </View>
            </View>
          </Pressable>
        </View>

        {/* Footer */}
        <View className="items-center py-6">
          <Text style={{ color: colors.textSecondary }} className="text-xs font-medium">
            App v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}