import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { Icon } from "@/components/ui/Icon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inputs",
          headerShown: true,
          headerTitle: "Inputs",
          headerTitleStyle: {
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "left",
          },

          headerTitleAlign: "left",
          tabBarIcon: ({ color }) => (
            <Icon size={28} symbol="character.cursor.ibeam" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="buttons"
        options={{
          title: "Buttons",
          headerShown: true,
          headerTitle: "Buttons",
          headerTitleStyle: {
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "left",
          },

          headerTitleAlign: "left",
          tabBarIcon: ({ color }) => (
            <Icon size={28} symbol="button.programmable" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
