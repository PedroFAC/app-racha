import { View, StyleSheet, Text, Button } from "react-native";
import { ColorType } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedTextInput from "@/components/TextInput";
import { useMemo, useState } from "react";
import StarsRating from "@/components/StarsRating";
import { addPlayer, editPlayer, Player } from "@/redux/reducers/playerSlice";
import { useAppDispatch } from "@/hooks/hooks";
import starArrayToNumber from "@/utils/starArrayToNumber";
import { Routes, useLocalSearchParams, useRouter } from "expo-router";
import ratingNumberToArray from "@/utils/ratingNumberToArray";

export default function AddPlayer() {
  const theme = useThemeColor();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useLocalSearchParams();
  const player: Player = params as unknown as Player;

  const [name, setName] = useState<string>(player.playerName ?? "");
  const [stars, setStars] = useState(
    ratingNumberToArray(player.rating ?? 1) ?? [
      true,
      false,
      false,
      false,
      false,
    ]
  );

  const isEdit = useMemo(() => player.playerName != null, [player]);

  const disable = useMemo(() => name.trim().length === 0, [name]);

  const handlePress = () => {
    const newPlayer: Player = {
      playerName: name.trim(),
      rating: starArrayToNumber(stars),
      checked: true
    };
    if (isEdit) {
      dispatch(editPlayer({ player: newPlayer, oldName: player.playerName }));
      router.back();
      return;
    }
    dispatch(addPlayer(newPlayer));
    router.back();
  };

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
      <StarsRating onChange={handleStarChange} stars={stars} starSize={30} />
      <Button
        title={isEdit ? "Editar" : "Adicionar"}
        disabled={disable}
        onPress={handlePress}
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
