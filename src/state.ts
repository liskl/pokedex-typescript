import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandExplore } from "./command_explore.js";
import { commandMap, commandMapb } from "./command_map.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  pokedex: Record<string, Pokemon>;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  const state: State = {
    rl,
    commands: {},
    pokeapi: new PokeAPI(),
    nextLocationsURL: null,
    prevLocationsURL: null,
    pokedex: {},
  };
  state.commands.help = {
    name: "help",
    description: "Displays a help message",
    callback: commandHelp,
  };
  state.commands.exit = {
    name: "exit",
    description: "Exit the Pokedex",
    callback: commandExit,
  };
  state.commands.map = {
    name: "map",
    description: "Display the next 20 location areas",
    callback: commandMap,
  };
  state.commands.catch = {
    name: "catch",
    description: "Try to catch a pokemon",
    callback: commandCatch,
  };
  state.commands.inspect = {
    name: "inspect",
    description: "Inspect a caught pokemon",
    callback: commandInspect,
  };
  state.commands.pokedex = {
    name: "pokedex",
    description: "List caught pokemon",
    callback: commandPokedex,
  };
  state.commands.explore = {
    name: "explore",
    description: "List Pokemon in a location area",
    callback: commandExplore,
  };
  state.commands.mapb = {
    name: "mapb",
    description: "Display the previous 20 location areas",
    callback: commandMapb,
  };
  return state;
}
