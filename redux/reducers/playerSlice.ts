import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Player = {
  playerName:string;
  rating:number;
}

export const playersSlice = createSlice({
  name: 'players',
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
export const { addPlayer, clear } = playersSlice.actions

export default playersSlice.reducer