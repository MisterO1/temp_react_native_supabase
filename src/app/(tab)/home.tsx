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
      accent: colors.primary,
    },
    {
      icon: Code2,
      title: "Modern Stack",
      description: "NativeWind + TypeScript ready",
      accent: colors.secondary,
    },
    {
      icon: Check,
      title: "Auth Included",
      description: "Login already implemented",
      accent: colors.primaryDark ?? colors.primary,
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
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          paddingTop: insets.top + 16,
          alignItems: "center",
        }}
      >
        {/* centered container with max width so items don't touch edges */}
        <View style={{ width: "100%", maxWidth: 720 }}>
          {/* Hero / Welcome */}
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 18,
              padding: 20,
              marginBottom: 18,
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowOffset: { width: 0, height: 8 },
              shadowRadius: 20,
              elevation: 4,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 34,
                    fontWeight: "800",
                    marginBottom: 6,
                  }}
                >
                  Welcome
                  {user?.email ? `, ${user.email.split("@")[0]}` : "!"}
                </Text>
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 14,
                    marginBottom: 12,
                  }}
                >
                  Starter template with Supabase auth, theming and modern tooling.
                </Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Pressable
                    style={{
                      backgroundColor: colors.primary,
                      paddingVertical: 10,
                      paddingHorizontal: 14,
                      borderRadius: 12,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 10,
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "700" }}>
                      Start building
                    </Text>
                  </Pressable>

                  <Pressable
                    style={{
                      backgroundColor: colors.background,
                      paddingVertical: 10,
                      paddingHorizontal: 14,
                      borderRadius: 12,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: colors.border,
                    }}
                  >
                    <Text style={{ color: colors.text, fontWeight: "600" }}>
                      View docs
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View
                style={{
                  width: 92,
                  height: 92,
                  borderRadius: 22,
                  backgroundColor: colors.primary,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "800",
                    fontSize: 28,
                  }}
                >
                  {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
                </Text>
              </View>
            </View>
          </View>

          {/* What's Included / Features */}
          <Text
            style={{
              color: colors.text,
              fontSize: 20,
              fontWeight: "800",
              marginBottom: 12,
            }}
          >
            What's Included
          </Text>
          <View style={{ marginBottom: 18 }}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: colors.surface,
                    borderRadius: 14,
                    padding: 14,
                    marginBottom: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOpacity: 0.03,
                    shadowOffset: { width: 0, height: 6 },
                    shadowRadius: 10,
                    elevation: 2,
                  }}
                >
                  <View
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 12,
                      backgroundColor: feature.accent,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 12,
                    }}
                  >
                    <Icon size={22} color="#fff" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: colors.text,
                        fontSize: 16,
                        fontWeight: "700",
                        marginBottom: 4,
                      }}
                    >
                      {feature.title}
                    </Text>
                    <Text style={{ color: colors.textSecondary }}>
                      {feature.description}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Tech Stack */}
          <Text
            style={{
              color: colors.text,
              fontSize: 20,
              fontWeight: "800",
              marginBottom: 10,
            }}
          >
            Tech Stack
          </Text>
          <View
            style={{
              borderRadius: 14,
              overflow: "hidden",
              marginBottom: 18,
            }}
          >
            {listElements.map((item, index) => (
              <View
                key={index}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                  backgroundColor: colors.surface,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomWidth:
                    index !== listElements.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border,
                }}
              >
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontWeight: "600",
                  }}
                >
                  {item.label}
                </Text>
                <Text
                  style={{
                    color: colors.primary,
                    fontWeight: "800",
                  }}
                >
                  {item.value}
                </Text>
              </View>
            ))}
          </View>

          {/* Quick Steps */}
          <Text
            style={{
              color: colors.text,
              fontSize: 20,
              fontWeight: "800",
              marginBottom: 10,
            }}
          >
            Quick Start
          </Text>
          <View style={{ marginBottom: 24 }}>
            <View
              style={{
                backgroundColor: colors.primary,
                borderRadius: 12,
                padding: 14,
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "800",
                  marginBottom: 6,
                }}
              >
                1. Customize Your App
              </Text>
              <Text style={{ color: "#ffffffcc" }}>
                Update colors, branding, and content to match your needs
              </Text>
            </View>

            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 14,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "700",
                  marginBottom: 6,
                }}
              >
                2. Build Your Features
              </Text>
              <Text style={{ color: colors.textSecondary }}>
                Add your business logic and features
              </Text>
            </View>

            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 14,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "700",
                  marginBottom: 6,
                }}
              >
                3. Deploy & Share
              </Text>
              <Text style={{ color: colors.textSecondary }}>
                Publish to Expo, App Store, or Google Play
              </Text>
            </View>
          </View>

          {/* CTA */}
          <Pressable
            style={{
              backgroundColor: colors.secondary,
              borderRadius: 14,
              paddingVertical: 14,
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "800" }}>Start Building</Text>
          </Pressable>

          {/* Footer */}
          <View style={{ alignItems: "center", paddingVertical: 18 }}>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 12,
                textAlign: "center",
              }}
            >
              This template includes authentication, theming, and is ready for
              production
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
