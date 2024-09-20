import TimerNumber from "@/components/TimerNumber";
import { ColorType } from "@/constants/Colors";
import { CommonStyles } from "@/constants/CommonStyles";
import { useThemeColor } from "@/hooks/useThemeColor";
import { format } from "date-fns";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Timer() {
  const theme = useThemeColor();

  const [time, setTime] = useState(0);
  const [play, setPlay] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  async function playSound() {
    console.log("Loading Sound");
    //TODO: ../../../../ = Cringe
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sound.mp3")
    );
    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    setTime(minutes * 60000 + seconds * 1000);
  }, [minutes, seconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0 && play) {
        setTime(time - 1000);
      }
    }, 1000);

    if (time === 0 && play) {
      alert("Tempo Acabou");
      playSound();
      setPlay(false);
    }
    return () => clearInterval(interval);
  }, [time, play]);

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
            onPress={() => time > 0 && setPlay(true)}
          >
            <Text style={styles(theme).buttonText}>Iniciar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles(theme).text}>{format(time, "mm:ss")}</Text>
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
