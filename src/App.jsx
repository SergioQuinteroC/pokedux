import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Col } from "antd";
import Searcher from "./components/Searcher";
import PokemonList from "./components/PokemonList";
import { getPokemon, getPokemonDetails } from "./api";
import { setPokemons } from "./actions";
import logo from "./statics/logo.svg";
import "./App.css";

// function App({ pokemons, setPokemons }) {         Con Redux connect
function App() {
  // const [pokemons, setPokemons] = useState([]); Con React State

  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPokemons = async () => {
      const pokemonsRes = await getPokemon();
      const pokemonDetailed = await Promise.all(
        pokemonsRes.map((pokemon) => getPokemonDetails(pokemon))
      );
      // setPokemons(pokemonsRes);  redux connect y react state
      dispatch(setPokemons(pokemonDetailed));
    };

    fetchPokemons();
  }, []);

  return (
    <div className="App">
      <Col span={4} offset={10}>
        <img src={logo} alt="Pokedux" />
      </Col>
      <Col span={8} offset={8}>
        <Searcher />
      </Col>
      <PokemonList pokemons={pokemons} />
    </div>
  );
}

//Reduc Connect
// const mapStateToProps = (state) => ({
//   pokemons: state.pokemons,
// });

// const mapDispatchToProps = (dispatch) => ({
//   setPokemons: (value) => dispatch(setPokemonsActions(value)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
