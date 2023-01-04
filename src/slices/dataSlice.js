import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemon, getPokemonDetails } from "../api";
import { setLoading } from "./uiSlice";

const initialState = {
  pokemons: [],
  pokemonsFiltered: [],
};

export const fetchPokemonsWithDetails = createAsyncThunk(
  "data/fetchPokemonsWithDetails",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    const pokemonsRes = await getPokemon();
    const pokemonDetailed = await Promise.all(
      pokemonsRes.map((pokemon) => getPokemonDetails(pokemon))
    );
    dispatch(setPokemons(pokemonDetailed));
    dispatch(setLoading(false));
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
      state.pokemonsFiltered = action.payload;
    },
    setFavorite: (state, action) => {
      const currentPokemonIndex = state.pokemonsFiltered.findIndex(
        (pokemon) => {
          return pokemon.id === action.payload.pokemonId;
        }
      );
      if (currentPokemonIndex >= 0) {
        const isFavorite = state.pokemonsFiltered[currentPokemonIndex].favorite;

        state.pokemonsFiltered[currentPokemonIndex].favorite = !isFavorite;
      }
    },
    setFilter: (state, action) => {
      const pokemonsFiltered = state.pokemons.filter((pokemon) => {
        const pokemonName = pokemon.name.toLowerCase();
        const search = action.payload.toLowerCase();
        return pokemonName.includes(search);
      });
      state.pokemonsFiltered = pokemonsFiltered;
    },
  },
});

export const { setFavorite, setPokemons, setFilter } = dataSlice.actions;
console.log("🚀 ~ file: dataSlice.js:28 ~ dataSlice", dataSlice);

export default dataSlice.reducer;
