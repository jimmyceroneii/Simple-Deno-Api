import { userToUserDto } from "./adapter.ts";
import {
  LoginPayload,
  RegisterPayload,
  User,
  UserController,
  UserRepository,
} from "./types.ts";
import { generateSalt, hashWithSalt } from "./util.ts";

interface ControllerDependencies {
  userRepository: UserRepository;
}

export class Controller implements UserController {
  userRepository: UserRepository;

  constructor({ userRepository }: ControllerDependencies) {
    this.userRepository = userRepository;
  }

  private async getHashedUser(username: string, password: string) {
    const salt = generateSalt();

    const user = {
      username,
      hash: hashWithSalt(password, salt),
      salt,
    };

    return user;
  }

  private async isCorrectPassword(password: string, user: User) {
    const hashPassword = hashWithSalt(password, user.salt);

    if (hashPassword === user.hash) {
      return Promise.resolve(true);
    }

    return Promise.reject(false);
  }

  public async register(payload: RegisterPayload) {
    if (await this.userRepository.exists(payload.username)) {
      return Promise.reject(`Username ${payload.username} already exists`);
    } else {
      const createdUser = await this.userRepository.create(
        await this.getHashedUser(payload.username, payload.password),
      );

      return userToUserDto(createdUser);
    }
  }

  public async login(payload: LoginPayload) {
    try {
      const user = await this.userRepository.getByUsername(payload.username);

      await this.isCorrectPassword(payload.password, user);

      return { user: userToUserDto(user) };
    } catch (e) {
      throw new Error("Username and password combination is not correct");
    }
  }
}
