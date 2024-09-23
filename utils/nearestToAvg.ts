import { Player } from "@/redux/reducers/playerSlice";
import ratingMean from "./ratingMean";

export default (
  playersInTeam: Player[],
  remainingPlayers: Player[],
  totalAvg: number
) => {
  if (remainingPlayers.length < 1) return;
  let nearest = remainingPlayers[0];
  let lowestDiff = Math.abs(totalAvg - ratingMean([...playersInTeam, nearest]));

  for (let i = 0; i < remainingPlayers.length; i++) {
    const currentPlayer = remainingPlayers[i];
    const diff = Math.abs(
      totalAvg - ratingMean([...playersInTeam, currentPlayer])
    );

    if (diff < lowestDiff) {
      nearest = currentPlayer;
    }
  }

  return nearest;
};
