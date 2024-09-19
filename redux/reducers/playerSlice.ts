import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Player = {
  playerName:string;
  rating:number;
}

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    players: [] as Player[]
  },
  reducers: {
    addPlayer: (state,  action: PayloadAction<Player>) => {
      state.players.push(action.payload);
    },
    clear: (state) => {
      state.players = [];
    },
  }
})

// Action creators are generated for each case reducer function
export const { addPlayer, clear } = playerSlice.actions

export default playerSlice.reducer