import type { State } from "./state.js";

export async function commandCatch(state: State, args: string[]): Promise<void> {
  const name = args[0];
  if (!name) {
    console.log("catch requires a pokemon name");
    return;
  }
  console.log(`Throwing a Pokeball at ${name}...`);
  const pokemon = await state.pokeapi.fetchPokemon(name);
  const roll = Math.random() * pokemon.base_experience;
  if (roll > 40) {
    console.log(`${name} escaped!`);
    return;
  }
  state.pokedex[pokemon.name] = pokemon;
  console.log(`${name} was caught!`);
  console.log("You may now inspect it with the inspect command.");
}
