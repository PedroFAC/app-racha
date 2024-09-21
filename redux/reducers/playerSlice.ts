import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Player = {
  playerName: string;
  rating: number;
};

export const playersSlice = createSlice({
  name: "players",
  initialState: {
    players: [
      {
        playerName: "Eduardo",
        rating: 5,
      },
      {
        playerName: "Leopoldo",
        rating: 3,
      },
      {
        playerName: "Gouveia",
        rating: 4,
      },
      {
        playerName: "Jotinha",
        rating: 3,
      },
      {
        playerName: "Guilherme",
        rating: 5,
      },
      {
        playerName: "Emre",
        rating: 4,
      },
      {
        playerName: "Anthony",
        rating: 3,
      },
      {
        playerName: "Jão",
        rating: 2,
      },
      {
        playerName: "Jp",
        rating: 2,
      },
    ] as Player[],
  },
  reducers: {
    addPlayer: (state, action: PayloadAction<Player>) => {
      if (state.players.find((p) => p.playerName === action.payload.playerName))
        return;
      state.players.push(action.payload);
    },
    editPlayer: (
      state,
      action: PayloadAction<{ player: Player; oldName: string }>
    ) => {
      const players = state.players.filter(
        (p) => p.playerName === action.payload.player.playerName
      );
      if (
        action.payload.oldName !== action.payload.player.playerName &&
        players.length > 0
      )
        return;
      if (players.length > 1) return;
      const oldPlayerIndex = state.players.findIndex(
        (p) => p.playerName === action.payload.oldName
      );
      if (oldPlayerIndex < 0) return;
      state.players[oldPlayerIndex] = action.payload.player;
    },
    deletePlayer: (state, action: PayloadAction<{ name: string }>) => {
      state.players = state.players.filter(
        (p) => p.playerName !== action.payload.name
      );
    },
    clear: (state) => {
      state.players = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPlayer, editPlayer, deletePlayer, clear } =
  playersSlice.actions;

export default playersSlice.reducer;
