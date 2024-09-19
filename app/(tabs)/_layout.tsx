import { TabBarIcon } from "@/components/TabBarIcon";
import { useAppDispatch } from "@/hooks/hooks";
import { useThemeColor } from "@/hooks/useThemeColor";
import { clear } from "@/redux/reducers/playerSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";

export default function TabLayout() {
  const theme = useThemeColor();
  const dispatch = useAppDispatch();

  //TODO: REMOVER PARA SALVAR DADOS!!!
  useEffect(() => {
    console.log("Resetou tudo!!!");
    AsyncStorage.clear();
    dispatch(clear());
  }, []);

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
        name="add"
        options={{
          title: "Adicionar",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person-add" : "person-add-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
