import { commands } from "./command";

export const state = {
  isOpen: false,
  query: "",
  activeIndex: 0,
  filteredCommands: [...commands],
  triggerEl: null,
}