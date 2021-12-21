import type { User, UserDto } from "./types.ts";

export const userToUserDto = (user: User): UserDto => {
  return {
    createdAt: user.createdAt,
    username: user.username,
  };
};
