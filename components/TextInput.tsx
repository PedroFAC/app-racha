import { ColorType } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { type TextInputProps, StyleSheet, TextInput } from "react-native";

export type ThemedTextInputProps = TextInputProps & {};

export default function ThemedTextInput({ ...props }: ThemedTextInputProps) {
  const theme = useThemeColor();

  return <TextInput style={styles(theme).container} {...props} />;
}

const styles = (theme: ColorType) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: 50,
      borderWidth: 2,
      borderRadius: 16,
      paddingLeft: 10,
      fontSize: 22,
      borderColor: theme.border,
      color: theme.text,
      backgroundColor: theme.inputBackground,
    },
  });
