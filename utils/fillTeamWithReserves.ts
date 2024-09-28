import { Player } from "@/redux/reducers/playerSlice";
import ratingMean from "./ratingMean";

export default (
  playersInTeam: Player[],
  totalAvg: number,
  playersPerTeamCount: number
) => {
  let reserveCount = 1;
  const reservesToAdd = playersPerTeamCount - playersInTeam.length;

  for (let index = 0; index < reservesToAdd; index++) {
    const currentMean = ratingMean(playersInTeam);
    const diff = totalAvg - currentMean;

    playersInTeam.push({
      playerName: `Reserva ${reserveCount}`,
      rating: Math.round(totalAvg + diff),
    });
    reserveCount++;
  }
  return playersInTeam;
};
