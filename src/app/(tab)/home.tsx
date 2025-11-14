// src/app/(tabs)/home.tsx
import { useThemeContext } from "@/contexts/theme-context";
import { useUser } from "@/contexts/user-context";
import { Check, Code2, Zap } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { colors } = useThemeContext();
  const { user } = useUser();
  const insets = useSafeAreaInsets();

  const features = [
    {
      icon: Zap,
      title: "Fast Setup",
      description: "Pre-configured with all essentials",
    },
    {
      icon: Code2,
      title: "Modern Stack",
      description: "NativeWind + TypeScript ready",
    },
    {
      icon: Check,
      title: "Auth Included",
      description: "Login already implemented",
    },
  ];

  const listElements = [
    { label: "Framework", value: "React Native + Expo" },
    { label: "Language", value: "TypeScript" },
    { label: "Styling", value: "NativeWind (Tailwind)" },
    { label: "Backend", value: "Supabase" },
    { label: "Auth", value: "Built-in & Ready" },
  ];

  return (
    <View style={{ backgroundColor: colors.background }} className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16, paddingTop: insets.top }}>
        {/* Welcome Section */}
        <View className="mb-8">
          <Text style={{ color: colors.text }} className="text-5xl font-bold mb-2">
            Welcome!
          </Text>
          <Text style={{ color: colors.textSecondary }} className="text-lg">
            {user?.email}
          </Text>
        </View>

        {/* Template Info Card */}
        <View style={{ backgroundColor: colors.surface }} className="rounded-2xl p-6 mb-8">
          <Text style={{ color: colors.text }} className="text-2xl font-bold mb-3">
            React Native Template
          </Text>
          <Text style={{ color: colors.textSecondary }} className="text-base leading-6 mb-4">
            This is a starter template designed to accelerate your React Native development with a solid foundation.
          </Text>
          <View className="bg-opacity-10 rounded-lg p-3" style={{ backgroundColor: colors.primary }}>
            <Text style={{ color: colors.primary }} className="text-xs font-semibold">
              ✨ Perfect for quick project startup
            </Text>
          </View>
        </View>

        {/* What's Included Section */}
        <View className="mb-8">
          <Text style={{ color: colors.text }} className="text-2xl font-bold mb-4">
            What's Included
          </Text>

          {features.map((feature, index) => (
            <View
              key={index}
              style={{ backgroundColor: colors.surface }}
              className="rounded-xl p-4 mb-3 flex-row items-start"
            >
              <View style={{ backgroundColor: colors.primary }} className="w-12 h-12 rounded-lg justify-center items-center mr-4">
                <feature.icon size={24} color="#fff" />
              </View>
              <View className="flex-1">
                <Text style={{ color: colors.text }} className="font-semibold text-base mb-1">
                  {feature.title}
                </Text>
                <Text style={{ color: colors.textSecondary }} className="text-sm">
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Tech Stack Section */}
        <View className="mb-8">
          <Text style={{ color: colors.text }} className="text-2xl font-bold mb-4">
            Tech Stack
          </Text>

          <View style={{ backgroundColor: colors.surface }} className="rounded-xl overflow-hidden">
            {listElements.map((item, index) => (
              <View
                key={index}
                className="px-4 py-3 flex-row justify-between items-center"
                style={index !== 4 ? { borderBottomWidth: 1, borderBottomColor: colors.border } : {}}
              >
                <Text style={{ color: colors.textSecondary }} className="font-medium text-sm">
                  {item.label}
                </Text>
                <Text style={{ color: colors.primary }} className="font-bold text-sm">
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Start Section */}
        <View className="mb-8">
          <Text style={{ color: colors.text }} className="text-2xl font-bold mb-4">
            Quick Start
          </Text>

          <View style={{ backgroundColor: colors.primary }} className="rounded-xl p-4 mb-3">
            <Text className="text-white font-bold mb-2">1. Customize Your App</Text>
            <Text className="text-white text-sm opacity-90">Update colors, branding, and content to match your needs</Text>
          </View>

          <View style={{ backgroundColor: colors.surface, borderColor: colors.primary, borderWidth: 1 }} className="rounded-xl p-4 mb-3">
            <Text style={{ color: colors.text }} className="font-bold mb-2">
              2. Build Your Features
            </Text>
            <Text style={{ color: colors.textSecondary }} className="text-sm">
              The foundation is ready, add your business logic and features
            </Text>
          </View>

          <View style={{ backgroundColor: colors.surface, borderColor: colors.primary, borderWidth: 1 }} className="rounded-xl p-4">
            <Text style={{ color: colors.text }} className="font-bold mb-2">
              3. Deploy & Share
            </Text>
            <Text style={{ color: colors.textSecondary }} className="text-sm">
              Publish to Expo, App Store, or Google Play
            </Text>
          </View>
        </View>

        {/* CTA Button */}
        <Pressable style={{ backgroundColor: colors.secondary }} className="rounded-xl py-4 mb-4 items-center">
          <Text className="text-white font-bold text-base">Start Building</Text>
        </Pressable>

        {/* Footer Info */}
        <View className="items-center py-6">
          <Text style={{ color: colors.textSecondary }} className="text-xs text-center">
            This template includes authentication, theming, and is ready for production
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
