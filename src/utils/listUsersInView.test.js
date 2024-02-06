import listUsersInView from "./listUsersInView";
import { USER_LIST } from "./constants";

test("base case: default parameters", () => {
  const users = listUsersInView(Object.values(USER_LIST), 800, 400, 1920, 1080);
  expect(users).toStrictEqual([2, 3]);
});
