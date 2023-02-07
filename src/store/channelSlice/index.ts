import { createSlice, Slice } from '@reduxjs/toolkit'

export const channelSlice: Slice = createSlice({
  name: 'channel',
  initialState: {
    snippet: [],
    brandingSettings: [],
    statistics: [],
    movieList: [],
    searchValue: ""
  },
  reducers: {
    setChannel: (state, action) => {
      state.snippet = action.payload.snippet
      state.brandingSettings = action.payload.brandingSettings
      state.statistics = action.payload.statistics
    },
    setMovieList: (state, action) => {
      state.movieList = action.payload
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    }
  }
})

export const { setChannel, setMovieList, setSearchValue } = channelSlice.actions

export const selectChannel = (state: any) => state.channel

export default channelSlice.reducer
