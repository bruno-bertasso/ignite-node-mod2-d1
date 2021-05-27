import { v4 as uuid } from "uuid";

import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [
      // {
      //   id: "3a609139-575c-4c59-9129-901d95d3a5be",
      //   name: "Bruno",
      //   email: "bertasso.bruno@gmail.com",
      //   admin: true,
      //   created_at: new Date(),
      //   updated_at: new Date(),
      // },
      // {
      //   id: "672040c7-dc80-43d4-9942-a6d242c32aba",
      //   name: "Rafael",
      //   email: "rafael@gmail.com",
      //   admin: false,
      //   created_at: new Date(),
      //   updated_at: new Date(),
      // },
    ];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      admin: false,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);
    return user;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  turnAdmin(receivedUser: User): User {
    const userIndex = this.users.findIndex(
      (user) => user.id === receivedUser.id
    );

    if (userIndex === -1) {
      return undefined;
    }

    this.users[userIndex].admin = true;
    return this.users[userIndex];
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
