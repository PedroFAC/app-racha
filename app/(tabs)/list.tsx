import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Platform,
} from "react-native";
import { ColorType } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import isEmptyArray from "@/utils/isEmptyArray";
import StarsRating from "@/components/StarsRating";
import ratingNumberToArray from "@/utils/ratingNumberToArray";
import {
  checkPlayer,
  deletePlayer,
  Player,
} from "@/redux/reducers/playerSlice";
import { Link, router } from "expo-router";
import { useState } from "react";
import webAlert from "@/utils/webAlert";
import Checkbox from "expo-checkbox";

export default function ListPlayers() {
  const theme = useThemeColor();
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.players.players);

  const [hayashiiMode, setHayashiiMode] = useState<boolean>(false);

  const renderSeparator = () => {
    return <View style={styles(theme).separator} />;
  };

  const handleDelete = (player: Player) => {
    if (Platform.OS === "web") {
      webAlert("Deseja realmente remover esse jogador?", "", [
        {
          text: "Sim",
          onPress: () => {
            dispatch(deletePlayer({ name: player.playerName }));
          },
        },
        {
          text: "Não",
          style: "cancel",
        },
      ]);
      return;
    }
    Alert.alert("Deseja realmente remover esse jogador?", "", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          dispatch(deletePlayer({ name: player.playerName }));
        },
      },
    ]);
  };

  const renderItem = (player: Player) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={styles(theme).listItemContainer}
          onLongPress={() => {
            handleDelete(player);
          }}
          onPress={() => {
            router.push<Player>({
              pathname: "/add",
              params: {
                playerName: player.playerName,
                rating: `${player.rating}`,
              },
            });
          }}
        >
          <Text style={styles(theme).listItemText} numberOfLines={1}>
            {player.playerName}
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StarsRating
              onChange={() => {}}
              disabled={true}
              stars={ratingNumberToArray(player.rating)}
              starSize={22}
            />
          </View>
        </TouchableOpacity>
        <Checkbox
          onValueChange={() => {
            dispatch(checkPlayer({ player }));
          }}
          value={player.checked}
        />
      </View>
    );
  };

  return (
    <ImageBackground
      source={
        hayashiiMode ? require("@/assets/images/hayashii.png") : undefined
      }
      resizeMode="stretch"
      style={styles(theme).container}
    >
      {isEmptyArray(players) && (
        <View style={styles(theme).emptyContainer}>
          <Text style={styles(theme).text}>
            Filhos,{"\n"}🚫 Lista de Jogadores Vazia! 🚫
          </Text>
          <Link href="/add" asChild>
            <TouchableOpacity hitSlop={50}>
              <Text style={styles(theme).textBlue}>Adicionar Jogador</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
      {!isEmptyArray(players) && (
        <View style={styles(theme).listContainer}>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Link href="/add" asChild>
              <TouchableOpacity hitSlop={20}>
                <Text style={styles(theme).textBlue}>Adicionar Jogador</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity
              onLongPress={() => {
                setHayashiiMode(!hayashiiMode);
              }}
            >
              <Text>{"       "}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={players}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item.playerName}
            ItemSeparatorComponent={renderSeparator}
          />
        </View>
      )}
    </ImageBackground>
  );
}

const styles = (theme: ColorType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      backgroundColor: theme.background,
    },
    listContainer: {
      flex: 1,
      gap: 20,
    },
    emptyContainer: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      gap: 40,
    },
    text: {
      fontSize: 22,
      color: theme.text,
    },
    textBlue: {
      fontSize: 22,
      color: theme.buttonColor,
    },
    listItemContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      marginRight: 10,
    },
    listItemText: {
      fontSize: 20,
      color: theme.text,
    },
    separator: { height: 1, backgroundColor: theme.border },
  });
