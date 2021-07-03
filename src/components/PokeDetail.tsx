import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, CardImg, ListGroup, ListGroupItem } from "reactstrap";

interface IAbility {
  ability:{
    name: string
  }
}
interface IType {
  type:{
    name: string
  }
}
interface IMove {
  move:{
    name: string
  }
}

interface IStat {
  base_stat: number,
  effort: number,
  stat:{
    name: string
  }
}

interface IPokeDetail {
  info:{
    name: string,
    order: number,
    weight: number,
    height: number,
    sprites: {
      front_default: string
    },
    abilities: IAbility[],
    types: IType[]
    stats: IStat[],
    moves: IMove[]
  },
  evolutions: string[]
}

export const PokeDetail: React.FC<IPokeDetail> = (props: IPokeDetail) => {
  if (props)
  {
    return (
      <div>
        <Card>
          <CardImg top width="100%" className="Img-fitted" src={props.info.sprites.front_default} alt={props.info.name} />
          <CardHeader data-testid="test-pokedetail-header">{props.info.name} ({props.info.order})</CardHeader>
          <CardBody data-testid="test-pokedetail-body">
            <b>Height</b>: {props.info.height} <br/>
            <b>Weight</b>: {props.info.weight} <br/>
            <br />
            <b>Stats</b>:
            <ul>
            {props.info.stats.map((entry: IStat, index)=> (
              <li key={index}>{entry.stat.name} - {entry.base_stat}</li>))}
            </ul>
            <b>Abilities</b>:
            <ul>
            {props.info.abilities.map((entry: IAbility, index)=> (
              <li key={index}>{entry.ability.name}</li>))}
            </ul>
            <b>Types</b>:
            <ul>
            {props.info.types.map((entry: IType, index)=> (
              <li key={index}>{entry.type.name}</li>))}
            </ul>
            <b>Moves</b>:
            <ul>
            {props.info.moves.map((entry: IMove, index)=> (
              <li key={index}>{entry.move.name}</li>))}
            </ul>
          </CardBody>
          <CardFooter>
            Evolutions chain:
            <ListGroup horizontal data-testid="test-pokedetail-footer">
            {props.evolutions.map((entry: string, index)=> (
              <ListGroupItem key={index} className={props.info.name === entry ? "active" : ""}>{entry}</ListGroupItem>))}              
            </ListGroup>
            
          </CardFooter>
        </Card>  
      </div>
    )
  }
  return (<div>
    No Data
  </div>);
}
