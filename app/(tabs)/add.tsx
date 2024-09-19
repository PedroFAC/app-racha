import { View, StyleSheet, Text, Button } from "react-native";
import { ColorType } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedTextInput from "@/components/TextInput";
import { useCallback, useMemo, useState } from "react";
import StarsRating from "@/components/StarsRating";
import { addPlayer, Player } from "@/redux/reducers/playerSlice";
import { useAppDispatch } from "@/hooks/hooks";
import starArrayToNumber from "@/utils/starArrayToNumber";

export default function AddPlayer() {
  const theme = useThemeColor();
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>("");
  const [stars, setStars] = useState([true, false, false, false, false]);

  const disable = useMemo(() => {
    return name.trim().length === 0;
  }, [name]);

  const resetInputs = useCallback(() => {
    setName("");
    setStars([true, false, false, false, false]);
  }, []);

  const handleStarChange = (rating: number) => {
    if (stars[rating]) {
      setStars(
        stars.map((_, start) => {
          if (start > rating) return false;
          return true;
        })
      );
      return;
    }
    setStars(
      stars.map((_, start) => {
        if (start <= rating) return true;
        return false;
      })
    );
  };

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).inputContainer}>
        <Text style={styles(theme).text}>Nome</Text>
        <ThemedTextInput onChangeText={(text) => setName(text)} value={name} />
      </View>
      <StarsRating onChange={handleStarChange} stars={stars} />
      <Button
        title="Adicionar"
        disabled={disable}
        onPress={() => {
          const player: Player = {
            playerName: name.trim(),
            rating: starArrayToNumber(stars),
          };
          dispatch(addPlayer(player));
          resetInputs();
        }}
      />
    </View>
  );
}

const styles = (theme: ColorType) =>
  StyleSheet.create({
    container: {
      padding: 32,
      gap: 40,
      flex: 1,
      backgroundColor: theme.background,
    },
    inputContainer: { gap: 8 },
    text: {
      fontSize: 22,
      color: theme.text,
    },
  });
