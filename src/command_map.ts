import type { State } from "./state.js";

export async function commandMap(state: State, _args: string[]): Promise<void> {
  const locations = await state.pokeapi.fetchLocations(state.nextLocationsURL ?? undefined);
  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;
  for (const location of locations.results) {
    console.log(location.name);
  }
}

export async function commandMapb(state: State, _args: string[]): Promise<void> {
  if (!state.prevLocationsURL) {
    console.log("you're on the first page");
    return;
  }
  const locations = await state.pokeapi.fetchLocations(state.prevLocationsURL);
  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;
  for (const location of locations.results) {
    console.log(location.name);
  }
}
