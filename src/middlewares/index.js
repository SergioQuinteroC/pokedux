import { SET_LOADING, SET_POKEMONS } from "../actions/types";

export const logger = (store) => (next) => (action) => {
  console.log(action);
  next(action);
};

// export const nameUpperCase = (store) => (next) => (action) => {
//   const pokemonsUpperCase = action.action.payload.map((pokemon) => ({
//     ...pokemon,
//     name: pokemon.name[0].toUpperCase() + pokemon.name.substring(1),
//   }));
//   const updatedAction = {
//     ...action,
//     action: { ...action.action, payload: pokemonsUpperCase },
//   };
//   next(updatedAction);
// };

export const nameUpperCase = (store) => (next) => (action) => {
  if (action.type === SET_POKEMONS) {
    const pokemonsUpperCase = action.payload.map((pokemon) => ({
      ...pokemon,
      name: pokemon.name[0].toUpperCase() + pokemon.name.substring(1),
    }));
    const updatedAction = {
      ...action,
      payload: pokemonsUpperCase,
    };
    next(updatedAction);
  } else {
    next(action);
  }
};

export const featuring = (store) => (next) => (actionInfo) => {
  const featured = [{ name: "sergi" }, ...actionInfo.action.payload];
  const updatedActionInfo = {
    ...actionInfo,
    action: { ...actionInfo.action, payload: featured },
  };
  next(updatedActionInfo);
};
