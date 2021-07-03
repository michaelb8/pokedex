import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

interface IEntry {
  name: string;
  url: string;
}

interface IProps {
  pokeList: IEntry[];
  selected: string;
  callback: Function;
}

export const PokeList: React.FC<IProps> = ({ pokeList, selected, callback }: IProps) => {
  return (
    <ListGroup data-testid="test-pokelist">
      {pokeList.map((entry: IEntry, index) => (
        <ListGroupItem
          key={index}
          onClick={() => {
            callback(entry);
          }}
          data-testid="test-pokelist-item"
          tag="a" href="#"
          className={selected === entry.name ? "active" : ""}
        >
          {entry.name}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};
