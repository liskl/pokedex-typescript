import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
}

export function startREPL(state: State): void {
  const rl = state.rl;
  rl.prompt();

  let pending = Promise.resolve();
  rl.on("line", (line) => {
    pending = pending.then(async () => {
      const words = cleanInput(line);
      if (words.length === 0) {
        rl.prompt();
        return;
      }
      const command = state.commands[words[0]];
      if (!command) {
        console.log("Unknown command");
        rl.prompt();
        return;
      }
      try {
        await command.callback(state, words.slice(1));
      } catch (error) {
        console.log(error);
      }
      rl.prompt();
    });
  });
}
