import { Player } from "@/redux/reducers/playerSlice";

export default (array: Player[]) => {
  return array.map((p) => p.rating).reduce((a, b) => a + b) / array.length;
};
