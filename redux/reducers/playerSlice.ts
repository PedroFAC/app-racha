import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Player = {
  playerName: string;
  rating: number;
  checked?: boolean;
};

export const playersSlice = createSlice({
  name: "players",
  initialState: {
    players: [
      {
        playerName: "Eduardo",
        rating: 5,
        checked: true,
      },
      {
        playerName: "Leopoldo",
        rating: 3,
        checked: true,
      },
      {
        playerName: "Gouveia",
        rating: 4,
        checked: true,
      },
      {
        playerName: "Jotinha",
        rating: 3,
        checked: true,
      },
      {
        playerName: "Guilherme",
        rating: 5,
        checked: true,
      },
      {
        playerName: "Emre",
        rating: 4,
        checked: true,
      },
      {
        playerName: "Anthony",
        rating: 3,
        checked: true,
      },
      {
        playerName: "Jão",
        rating: 2,
        checked: true,
      },
      {
        playerName: "Jp",
        rating: 2,
        checked: true,
      },
      {
        playerName: "Tiago",
        rating: 2,
        checked: true,
      },
      {
        playerName: "Dets",
        rating: 3,
        checked: true,
      },
    ] as Player[],
  },
  reducers: {
    addPlayer: (state, action: PayloadAction<Player>) => {
      if (state.players.find((p) => p.playerName === action.payload.playerName))
        return;
      state.players.push({ ...action.payload, checked: true });
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
      state.players[oldPlayerIndex] = {
        ...action.payload.player,
        checked: state.players[oldPlayerIndex].checked,
      };
    },
    deletePlayer: (state, action: PayloadAction<{ name: string }>) => {
      state.players = state.players.filter(
        (p) => p.playerName !== action.payload.name
      );
    },
    checkPlayer: (state, action: PayloadAction<{ player: Player }>) => {
      const player = state.players.filter(
        (p) => p.playerName === action.payload.player.playerName
      )[0];
      if (player) {
        player.checked = !player.checked;
      }
    },
    clear: (state) => {
      state.players = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPlayer, editPlayer, deletePlayer, clear, checkPlayer } =
  playersSlice.actions;

export default playersSlice.reducer;
