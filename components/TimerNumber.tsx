import { ColorType } from "@/constants/Colors";
import { CommonStyles } from "@/constants/CommonStyles";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface ITimerNumberProps {
  play: boolean;
  minutes: number;
  seconds: number;
  callbacks: {
    handleMinusSeconds: () => void;
    handleMoreSeconds: () => void;
    handleMoreMinutes: () => void;
    handleMinusMinutes: () => void;
  };
}

export default function TimerNumber({
  play,
  minutes,
  seconds,
  callbacks: {
    handleMinusSeconds,
    handleMoreSeconds,
    handleMoreMinutes,
    handleMinusMinutes,
  },
}: ITimerNumberProps) {
  const theme = useThemeColor();
  return (
    <View style={styles(theme).container}>
      <View>
        {!play && (
          <TouchableOpacity
            style={styles(theme).button}
            onPress={handleMinusMinutes}
          >
            <FontAwesome5 name="minus" size={24} color="white" />
            </TouchableOpacity>
        )}
        <Text style={styles(theme).text}>
          {minutes < 10 ? `0${minutes}` : minutes}
        </Text>
        {!play && (
          <TouchableOpacity
            style={styles(theme).button}
            onPress={handleMoreMinutes}
          >
            <FontAwesome5 name="plus" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles(theme).text}>:</Text>
      <View>
        {!play && (
          <TouchableOpacity
            style={styles(theme).button}
            onPress={handleMinusSeconds}
          >
            <FontAwesome5 name="minus" size={24} color="white" />
            </TouchableOpacity>
        )}
        <Text style={styles(theme).text}>
          {seconds <= 0 ? `0${seconds}` : seconds}
        </Text>
        {!play && (
          <TouchableOpacity
            style={styles(theme).button}
            onPress={handleMoreSeconds}
          >
            <FontAwesome5 name="plus" size={24} color="white" />
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
const styles = (theme: ColorType) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 40,
      gap: 10,
      alignItems: "center",
    },
    text: {
      color: theme.text,
      fontSize: 80,
    },
    button: CommonStyles.button,
    buttonText: CommonStyles.buttonText,
  });
