import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  private isAdmin(user_id: string): boolean {
    const user = this.usersRepository.findById(user_id);
    return user ? user.admin : false;
  }

  execute({ user_id }: IRequest): User[] {
    if (!this.isAdmin(user_id)) {
      throw Error("You need to be an administrator to list all users.");
    }
    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
