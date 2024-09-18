import { View, StyleSheet, Text } from "react-native";
import { ColorType } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function AddPlayer() {
  const theme = useThemeColor();
  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).text}>Adicionar Jogador</Text>
    </View>
  );
}

const styles = (theme: ColorType) =>
  StyleSheet.create({
    container: {
      padding: 32,
      gap: 16,
      flex: 1,
      backgroundColor: theme.background,
    },
    text: {
      color: theme.text,
    },
  });
