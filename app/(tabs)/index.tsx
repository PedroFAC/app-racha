import TimerNumber from "@/components/TimerNumber";
import { ColorType } from "@/constants/Colors";
import { CommonStyles } from "@/constants/CommonStyles";
import { useThemeColor } from "@/hooks/useThemeColor";
import { format } from "date-fns";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useTimer } from "@/hooks/useTimer";
import ActiveTimer from "@/components/ActiveTimer";

export default function Timer() {
  const theme = useThemeColor();
  const { time, pause, play, stopTimer, pauseOrUnpauseTimer, startTimer } =
    useTimer();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const calculatedTime = minutes * 60000 + seconds * 1000;
  const timerCallbacks = {
    handleMoreMinutes: () => setMinutes(minutes + 1),
    handleMinusMinutes: () => {
      minutes > 0 && setMinutes(minutes - 1);
    },
    handleMoreSeconds: () => {
      seconds >= 50 ? setSeconds(0) : setSeconds(seconds + 10);
    },
    handleMinusSeconds: () => {
      seconds <= 0 ? setSeconds(50) : setSeconds(seconds - 10);
    },
  };

  return (
    <View style={styles(theme).container}>
      {!play ? (
        <>
          <TimerNumber
            play={play}
            minutes={minutes}
            seconds={seconds}
            callbacks={timerCallbacks}
          />
          <TouchableOpacity
            style={styles(theme).button}
            onPress={() => {
              if (calculatedTime > 0) {
                startTimer(calculatedTime);
              }
            }}
          >
            <Text style={styles(theme).buttonText}>Iniciar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <ActiveTimer
          time={time}
          pause={pause}
          stopTimer={stopTimer}
          play={play}
          pauseOrUnpauseTimer={pauseOrUnpauseTimer}
        />
      )}
    </View>
  );
}

const styles = (theme: ColorType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },
    text: {
      color: theme.text,
      fontSize: 80,
    },
    button: CommonStyles.button,
    buttonText: CommonStyles.buttonText,
  });
