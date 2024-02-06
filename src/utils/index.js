export function distance(a, b) {
  return Math.round(Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2));
}

export { default as listUsersInView } from "./listUsersInView";
export { USER_LIST } from "./constants";
export { useStyles } from "./useStyles";
