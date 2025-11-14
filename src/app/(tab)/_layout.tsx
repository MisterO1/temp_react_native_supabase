import { Tabs } from "expo-router";
import { Home, Settings } from "lucide-react-native";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isDark ? "#fff" : "#000",
        tabBarStyle: {
          backgroundColor: isDark ? "#111" : "#fff",
          borderTopColor: isDark ? "#333" : "#eee",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Home color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Settings color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
