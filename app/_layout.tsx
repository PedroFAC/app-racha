import { store, persistor } from "@/redux/store";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    //TODO: Se quiser mudar o tema das tabs e header tem que criar um tipo próprio
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false, title: "Home" }}
            />
            <Stack.Screen
              name="add"
              options={{
                title: "Adicionar Jogador",
              }}
            />
          </Stack>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
