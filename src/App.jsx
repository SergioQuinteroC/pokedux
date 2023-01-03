import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Spin } from "antd";
import Searcher from "./components/Searcher";
import PokemonList from "./components/PokemonList";
import { getPokemon } from "./api";
import { getPokemonsWithDetails, setLoading, setPokemons } from "./actions";
import logo from "./statics/logo.svg";
import "./App.css";

// function App({ pokemons, setPokemons }) {         Con Redux connect
function App() {
  // const [pokemons, setPokemons] = useState([]); Con React State

  const pokemons = useSelector((state) => state.pokemons);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPokemons = async () => {
      dispatch(setLoading(true));
      const pokemonsRes = await getPokemon();

      // setPokemons(pokemonsRes);  redux connect y react state
      dispatch(getPokemonsWithDetails(pokemonsRes));
      dispatch(setLoading(false));
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
      {loading ? (
        <Col offset={12}>
          <Spin spinning size="large" />
        </Col>
      ) : (
        <PokemonList pokemons={pokemons} />
      )}
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
