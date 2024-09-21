import { View, StyleSheet, Text, FlatList, Button } from "react-native";
import { ColorType } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAppSelector } from "@/hooks/hooks";
import StarsRating from "@/components/StarsRating";
import ratingNumberToArray from "@/utils/ratingNumberToArray";
import { Player } from "@/redux/reducers/playerSlice";
import { useState } from "react";
import isEmptyArray from "@/utils/isEmptyArray";
import ThemedTextInput from "@/components/TextInput";
import stringToNumber from "@/utils/stringToNumber";

export type Team = {
  name: string;
  players: Player[];
};

export default function ListPlayers() {
  const theme = useThemeColor();
  const players = useAppSelector((state) => state.players.players);

  const [teams, setTeams] = useState<Team[]>([]);
  const [playersPerTeam, setPlayersPerTeam] = useState<string>("");

  const handleSortTeams = () => {
    const playersPerTeamNumber = stringToNumber(playersPerTeam);
    let playersCopy = [...players.filter((p) => p.checked)];
    const teamCount = playersCopy.length / playersPerTeamNumber;
    const newTeams: Team[] = [];
    let reserveCount = 1;
    if (teamCount <= 0) return;
    if (playersPerTeamNumber < 1) return;

    playersCopy.sort((a, b) => {
      if (a.rating > b.rating) {
        return 1;
      }
      if (a.rating < b.rating) {
        return -1;
      }
      const rnd = Math.round(Math.random());
      return rnd === 0 ? -1 : 1;
    });

    for (let teamCountIndex = 0; teamCountIndex < teamCount; teamCountIndex++) {
      const firstPick = playersCopy.pop();
      if (!firstPick) continue;
      newTeams.push({
        name: `Time ${teamCountIndex + 1}`,
        players: [firstPick],
      });
    }

    let isPickingPlayer = true;
    while (isPickingPlayer) {
      if (
        playersCopy.length === 0 &&
        newTeams[0].players.length === playersPerTeamNumber
      )
        break;
      for (
        let teamCountIndex = 0;
        teamCountIndex < teamCount;
        teamCountIndex++
      ) {
        let playerPick = playersCopy.pop();
        if (!playerPick) {
          isPickingPlayer = false;
          playerPick = { playerName: `Reserva ${reserveCount}`, rating: 0 };
          reserveCount++;
        }
        newTeams[teamCountIndex] = {
          name: `Time ${teamCountIndex + 1}`,
          players: [...newTeams[teamCountIndex].players, playerPick],
        };
      }
    }
    newTeams.sort((a, b) => {
      const rnd = Math.round(Math.random());
      return rnd === 0 ? -1 : 1;
    });
    setTeams(newTeams);
  };

  const renderSeparator = () => {
    return <View style={styles(theme).separator} />;
  };

  const renderTeam = (team: Team, index: number) => {
    return (
      <View key={team.name}>
        <Text style={styles(theme).text}>Time {index + 1}</Text>
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
      <View style={styles(theme).inputContainer}>
        <Text style={styles(theme).text}>Jogadores por time</Text>
        <ThemedTextInput
          onChangeText={(text) => setPlayersPerTeam(text)}
          value={playersPerTeam}
          keyboardType="number-pad"
        />
      </View>
      <View style={styles(theme).inputContainer}>
        <Button title="Sortear" onPress={handleSortTeams} />
      </View>
      {teams && (
        <FlatList
          data={teams}
          renderItem={({ item, index }) => renderTeam(item, index)}
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
    inputContainer: { gap: 8, paddingBottom: 20 },
  });
