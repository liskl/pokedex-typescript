import type { State } from "./state.js";

export async function commandExplore(state: State, args: string[]): Promise<void> {
  const name = args[0];
  if (!name) {
    console.log("explore requires a location area name");
    return;
  }
  console.log(`Exploring ${name}...`);
  const location = await state.pokeapi.fetchLocation(name);
  console.log("Found Pokemon:");
  for (const encounter of location.pokemon_encounters) {
    console.log(` - ${encounter.pokemon.name}`);
  }
}
