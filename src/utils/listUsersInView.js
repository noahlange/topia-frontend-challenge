import { AVATAR_HEIGHT, AVATAR_WIDTH } from "./constants";

/**
 * listUsersInView
 * @param {*} users - unordered array of user objects, each containing (at least) x, y and id properties
 * @param {*} positionX - x coordinate of center point
 * @param {*} positionY - y coordinate of center point
 * @param {*} screenWidth - screen width
 * @param {*} screenHeight - screen height
 * @returns - list of IDs corresponding to visible users
 */
export default function listUsersInView(
  users,
  positionX,
  positionY,
  screenWidth,
  screenHeight
) {
  const [w, h] = [
    AVATAR_WIDTH + screenWidth / 2,
    AVATAR_HEIGHT + screenHeight / 2,
  ];

  // WRITE SOLUTION BELOW. ADD USERNAME AND IS_BROADCASTER TO 'usersInView' IF USER FALLS INTO VISIBLE RANGE

  // these bounds aren't pixel-perfect, but will err on the side of mistakenly returning users that are not visible vs. failing to return those that are.
  const [x1, x2, y1, y2] = [
    positionX - w,
    positionX + w,
    positionY - h,
    positionY + h,
  ];

  return (
    users
      // There are more efficient ways to compute this, but computational efficiency is basically irrelevant on a sample size of 7. You can always optimize something once it's working!
      .filter(
        (user) =>
          // leftmost avatar pixel must be <= leftmost visible pixel and >= rightmost.
          user.x >= x1 &&
          user.x <= x2 &&
          // ditto, but for y
          user.y >= y1 &&
          user.y <= y2
      )
      .map((user) => user.id)
  );
  // END SOLUTION SECTION
}
