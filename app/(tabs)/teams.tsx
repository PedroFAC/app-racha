import { View, StyleSheet, Text, ScrollView, FlatList } from "react-native";
import { ColorType } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAppSelector } from "@/hooks/hooks";
import StarsRating from "@/components/StarsRating";
import ratingNumberToArray from "@/utils/ratingNumberToArray";
import { Player } from "@/redux/reducers/playerSlice";
import { useEffect, useState } from "react";
import isEmptyArray from "@/utils/isEmptyArray";

export type Team = {
  name: string;
  players: Player[];
};

export default function ListPlayers() {
  const theme = useThemeColor();
  const players = useAppSelector((state) => state.players.players);

  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    let playersCopy = [...players];
    const newTeams = [];
    let teamPlayers = [];
    let teamCount = players.length / 3;

    if (teamCount < 1) return;

    for (let teamNumber = 0; teamNumber < 3; teamNumber++) {
      for (let index = 0; index < teamCount; index++) {
        if (playersCopy.length <= 0) continue;
        const randElem =
          playersCopy[Math.floor(Math.random() * playersCopy.length)];
        playersCopy = playersCopy.filter(
          (p) => p.playerName !== randElem.playerName
        );
        teamPlayers.push(randElem);
      }
      newTeams.push({ name: `Time ${teamNumber + 1}`, players: teamPlayers });
      teamPlayers = [];
    }
    setTeams(newTeams);
  }, [players]);

  const renderSeparator = () => {
    return <View style={styles(theme).separator} />;
  };

  const renderTeam = (team: Team) => {
    return (
      <View key={team.name}>
        <Text style={styles(theme).text}>{team.name}</Text>
        {!isEmptyArray(team.players) && team.players.map(renderItem)}
      </View>
    );
  };

  const renderItem = (player: Player) => {
    return (
      <View key={player.playerName} style={styles(theme).listItemContainer}>
        <Text style={styles(theme).listItemText} numberOfLines={1}>
          {player.playerName}
        </Text>
        <StarsRating
          onChange={() => {}}
          disabled={true}
          stars={ratingNumberToArray(player.rating)}
          starSize={22}
        />
      </View>
    );
  };

  return (
    <View style={styles(theme).container}>
      {teams && (
        <FlatList
          data={teams}
          renderItem={({ item }) => renderTeam(item)}
          keyExtractor={(item) => item.name}
          ItemSeparatorComponent={renderSeparator}
        />
      )}
    </View>
  );
}

const styles = (theme: ColorType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      backgroundColor: theme.background,
    },
    text: {
      fontSize: 22,
      color: theme.text,
    },
    listItemContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
    },
    listItemText: {
      fontSize: 20,
      color: theme.text,
    },
    separator: {
      height: 1,
      backgroundColor: theme.border,
      marginVertical: 10,
    },
  });
