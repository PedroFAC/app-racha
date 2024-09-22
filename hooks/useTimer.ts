import { Audio } from "expo-av";
import { useEffect, useState } from "react";

export function useTimer() {
  const [time, setTime] = useState(0);
  const [play, setPlay] = useState(false);
  const [pause, setPause] = useState(true);

  async function playSound(type: "start" | "end" = "start") {
    //TODO: ../../../../ = Cringe
    const { sound } = await Audio.Sound.createAsync(
      type === "start"
        ? require(`../assets/start.mp3`)
        : require(`../assets/end.mp3`)
    );
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
      playSound("end");
      setPlay(false);
    }
    return () => clearInterval(interval);
  }, [time, play, pause]);
  const startTimer = async (time: number) => {
    playSound("start");
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
