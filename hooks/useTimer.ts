import { Audio } from "expo-av";
import { useEffect, useState } from "react";

export function useTimer() {
  const [time, setTime] = useState(0);
  const [play, setPlay] = useState(false);
  const [pause, setPause] = useState(true);

  async function playSound() {
    console.log("Loading Sound");
    //TODO: ../../../../ = Cringe
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sound.mp3")
    );
    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0 && play && !pause) {
        setTime(time - 1000);
      }
    }, 1000);

    if (time === 0 && play) {
      alert("Tempo Acabou");
      playSound();
      setPlay(false);
    }
    return () => clearInterval(interval);
  }, [time, play, pause]);
  const startTimer = (time: number) => {
    setTime(time);
    setPlay(true);
    setPause(false);
  };

  const stopTimer = () => {
    setPlay(false);
  };
  const pauseOrUnpauseTimer = () => {
    setPause(!pause);
  };

  return { pause, play, time, startTimer, stopTimer, pauseOrUnpauseTimer };
}
