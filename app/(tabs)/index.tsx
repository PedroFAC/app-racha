import { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { ColorType } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Timer() {
  const theme = useThemeColor();

  const [time, setTime] = useState(0);
  const [play, setPlay] = useState(false);

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

  return (
    <View style={styles(theme).container}>
      <View>
        {!play && (
          <Button
            onPress={() => {
              if (time > 0) setTime(time - 1000);
            }}
            title="-"
          />
        )}
        <Text style={styles(theme).text}>{time / 1000}</Text>
        {!play && <Button onPress={() => setTime(time + 1000)} title="+" />}
      </View>
      {!play && (
        <Button disabled={play} onPress={() => setPlay(true)} title="Play" />
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
    },
  });
