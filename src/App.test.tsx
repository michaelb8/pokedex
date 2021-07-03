import { render, screen } from '@testing-library/react';
import { PokeList } from './components/PokeList';
import { PokeDetail } from './components/PokeDetail';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);

//   expect(linkElement).toBeInTheDocument();
// });
const pokeListMock = {
  "count": 1118,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=10&limit=10",
  "previous": null,
  "results": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      "name": "ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon/2/"
    },
    {
      "name": "venusaur",
      "url": "https://pokeapi.co/api/v2/pokemon/3/"
    },
    {
      "name": "charmander",
      "url": "https://pokeapi.co/api/v2/pokemon/4/"
    },
    {
      "name": "charmeleon",
      "url": "https://pokeapi.co/api/v2/pokemon/5/"
    },
    {
      "name": "charizard",
      "url": "https://pokeapi.co/api/v2/pokemon/6/"
    },
    {
      "name": "squirtle",
      "url": "https://pokeapi.co/api/v2/pokemon/7/"
    },
    {
      "name": "wartortle",
      "url": "https://pokeapi.co/api/v2/pokemon/8/"
    },
    {
      "name": "blastoise",
      "url": "https://pokeapi.co/api/v2/pokemon/9/"
    },
    {
      "name": "caterpie",
      "url": "https://pokeapi.co/api/v2/pokemon/10/"
    }
  ]
};

const pokeDetailMock = 
{
	"abilities": [
		{
			"ability":
			{
				"name": "overgrow",
				"url": "https://pokeapi.co/api/v2/ability/65/"
			},
			"is_hidden": false,
			"slot": 1
		},
		{
			"ability":
			{
				"name": "chlorophyll",
				"url": "https://pokeapi.co/api/v2/ability/34/"
			},
			"is_hidden": true,
			"slot": 3
		}
	],
	"base_experience": 236,
	"forms": [
		{
			"name": "venusaur",
			"url": "https://pokeapi.co/api/v2/pokemon-form/3/"
		}
	],
	"game_indices": [],
	"height": 20,
	"held_items": [],
	"id": 3,
	"is_default": true,
	"location_area_encounters": "https://pokeapi.co/api/v2/pokemon/3/encounters",
	"moves": [
		{
			"move":
			{
				"name": "swords-dance",
				"url": "https://pokeapi.co/api/v2/move/14/"
			}
		},
		{
			"move":
			{
				"name": "cut",
				"url": "https://pokeapi.co/api/v2/move/15/"
			}
		}
	],
	"name": "venusaur",
	"order": 3,
	"past_types": [],
	"species":
	{
		"name": "venusaur",
		"url": "https://pokeapi.co/api/v2/pokemon-species/3/"
	},
	"sprites":
	{
		"front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
		"front_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/3.png",
		"front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/3.png",
		"front_shiny_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/3.png",
	},
	"stats": [
		{
			"base_stat": 80,
			"effort": 0,
			"stat":
			{
				"name": "hp",
				"url": "https://pokeapi.co/api/v2/stat/1/"
			}
		},
		{
			"base_stat": 82,
			"effort": 0,
			"stat":
			{
				"name": "attack",
				"url": "https://pokeapi.co/api/v2/stat/2/"
			}
		},
		{
			"base_stat": 83,
			"effort": 0,
			"stat":
			{
				"name": "defense",
				"url": "https://pokeapi.co/api/v2/stat/3/"
			}
		},
		{
			"base_stat": 100,
			"effort": 2,
			"stat":
			{
				"name": "special-attack",
				"url": "https://pokeapi.co/api/v2/stat/4/"
			}
		},
		{
			"base_stat": 100,
			"effort": 1,
			"stat":
			{
				"name": "special-defense",
				"url": "https://pokeapi.co/api/v2/stat/5/"
			}
		},
		{
			"base_stat": 80,
			"effort": 0,
			"stat":
			{
				"name": "speed",
				"url": "https://pokeapi.co/api/v2/stat/6/"
			}
		}
	],
	"types": [
		{
			"slot": 1,
			"type":
			{
				"name": "grass",
				"url": "https://pokeapi.co/api/v2/type/12/"
			}
		},
		{
			"slot": 2,
			"type":
			{
				"name": "poison",
				"url": "https://pokeapi.co/api/v2/type/4/"
			}
		}
	],
	"weight": 1000
};

test ("Pokemon List", () => {
  render(<PokeList pokeList={pokeListMock.results} selected="dummy" callback={()=>{}} />);

  const elements = screen.getByTestId("test-pokelist");
  
  expect(elements).not.toBeEmptyDOMElement();
})

test ("Pokemon Detail", () => {
  render(<PokeDetail info={pokeDetailMock} evolutions={["poke1", "poke2"]} />);

  const elements = screen.getByTestId("test-pokedetail-header");
  expect(elements).not.toBeEmptyDOMElement();
})

test ("Pokemon Detail Evol", () => {
  render(<PokeDetail info={pokeDetailMock} evolutions={["poke1", "poke2"]} />);

  const elements = screen.getByTestId("test-pokedetail-footer");
  expect(elements).not.toBeEmptyDOMElement();
})