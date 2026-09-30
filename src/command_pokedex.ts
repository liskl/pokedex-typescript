import type { State } from "./state.js";

export async function commandPokedex(state: State, _args: string[]): Promise<void> {
  console.log("Your Pokedex:");
  const names = Object.keys(state.pokedex);
  if (names.length === 0) {
    console.log(" - you have not caught any pokemon");
    return;
  }
  for (const name of names) {
    console.log(` - ${name}`);
  }
}
