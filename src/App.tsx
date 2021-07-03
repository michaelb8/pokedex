import { Button, Col, Container, Row } from "reactstrap";
import { Header } from "./components/Header";
import { PokeDetail } from "./components/PokeDetail";
import { PokeList } from "./components/PokeList";
import React, { useEffect, useState } from "react";
import "./App.css";

export interface IApp {}

const dummy = {
  name: "",
  order: 0,
  weight: 0,
  height: 0,
  sprites: {
    front_default: ""
  },
  abilities:[{
    ability:{
      name:""
    }
  }],
  types:[{
    type:{
      name:""
    }
  }],
  stats:[{
    base_stat: 0,
    effort: 0,
    stat:{
      name:""
    }
  }],
  moves:[{
    move:{
      name:""
    }
  }]
};

const App: React.FC<IApp> = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [pokeDetail, setPokeDetail] = useState(dummy);
  const [pokeEvol, setPokeEvol] = useState([""]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1200")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.results);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  interface IEntry {
    index: number;
    name: string;
    url: string;
  }

  interface ISpecies {
    url: string;
  }

  interface IEvo {
    species: {
      name: string;
    },
    evolves_to?: IEvo[];
  }

  const getEvolutions = (chain: IEvo) : Array<string> =>  {
    var evo : Array<string>= [];
    var dummy : IEvo | null = chain;
    evo.push(dummy.species.name);
    if (dummy.evolves_to)
    {
      for (let i = 0; i < dummy.evolves_to.length; i++) {
        var temp : IEvo | null  = dummy.evolves_to[i];
        evo.push(temp.species.name);
        if (temp.evolves_to)
        {
          dummy.evolves_to= dummy.evolves_to.concat(temp.evolves_to);
        }
      }
    }
    return evo;
  }

  const getEvoChain = (species: ISpecies) => {
    fetch(species.url)
    .then((res) => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        if (result.evolution_chain)
        {
          fetch(result.evolution_chain.url)
          .then((res) => res.json())
          .then(
            (result2) => {
              setIsLoaded(true);
              setPokeEvol(getEvolutions (result2.chain));
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          );
        }        
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
  };

  const getPokeInfo = (url: string) => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          getEvoChain(result.species);
          setPokeDetail(result);
          window.scrollTo(0,0);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const changeState = (entry: IEntry) => {
    getPokeInfo(entry.url);
  };

  if (error)
  {
    return (
      <Container>{error}</Container>
    );
  }
  if (!isLoaded)
  {
    return (
      <div className="spinner-border m-5" role="status">
        <span className="sr-only"></span>
      </div>
    );
  }
  return (
    <Container>
      <Header title="Pokedex" />
      <Row>
        <Col sm={4}>
          <PokeList pokeList={items} selected={pokeDetail.name} callback={changeState} />
        </Col>
        <Col sm={6}>{pokeDetail.name !== "" ? <PokeDetail info={pokeDetail} evolutions={pokeEvol} /> : null}</Col>
        <Col sm={1}>{pokeDetail.name !== "" ? <Button color="secondary" onClick={() => setPokeDetail(dummy)}>X</Button> : null}</Col>
      </Row>
    </Container>
  );
};

export default App;
