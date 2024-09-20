import { TabBarIcon } from "@/components/TabBarIcon";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const theme = useThemeColor();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tabBackground,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Timer",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "timer" : "timer-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="teams"
        options={{
          title: "Times",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "people" : "people-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: "Jogadores",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "football" : "football-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
