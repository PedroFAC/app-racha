import { ColorType } from "@/constants/Colors";
import { CommonStyles } from "@/constants/CommonStyles";
import { useThemeColor } from "@/hooks/useThemeColor";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { format } from "date-fns";

interface IActiveTimerProps {
  pause: boolean;
  time: number;
  play: boolean;
  stopTimer: () => void;
  pauseOrUnpauseTimer: () => void;
}

export default function ActiveTimer({
  pause,
  time,
  stopTimer,
  pauseOrUnpauseTimer,
}: IActiveTimerProps) {
  const theme = useThemeColor();

  return (
    <>
      <Text style={styles(theme).text}>{format(time, "mm:ss")}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 40,
          gap: 20,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={stopTimer} style={styles(theme).button}>
          <FontAwesome5 name="stop" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={pauseOrUnpauseTimer}
          style={styles(theme).button}
        >
          <FontAwesome5
            name={pause ? "play" : "pause"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = (theme: ColorType) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      marginTop: 40,
      gap: 20,
      alignItems: "center",
    },
    text: {
      color: theme.text,
      fontSize: 80,
    },
    button: CommonStyles.button,
    buttonText: CommonStyles.buttonText,
  });
