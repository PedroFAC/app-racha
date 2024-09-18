import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  const [time, setTime] = useState(0);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0 && play) {
        setTime(time - 1000);
      }
    }, 1000);

    if (time === 0 && play) {
      alert("Tempo Acabou");
      setPlay(false);
    }
    return () => clearInterval(interval);
  }, [time, play]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        {!play && (
          <Button
            onPress={() => {
              if (time > 0) setTime(time - 1000);
            }}
            title="-"
          />
        )}
        <Text>{time / 1000}</Text>
        {!play && <Button onPress={() => setTime(time + 1000)} title="+" />}
      </View>
      {!play && (
        <Button disabled={play} onPress={() => setPlay(true)} title="Play" />
      )}
    </View>
  );
}
