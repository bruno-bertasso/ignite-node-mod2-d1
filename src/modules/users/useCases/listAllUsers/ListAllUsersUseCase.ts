import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  private isAdmin(user_id: string): boolean {
    const user = this.usersRepository.findById(user_id);
    return user.admin;
  }

  execute({ user_id }: IRequest): User[] {
    if (!this.isAdmin(user_id)) {
      throw Error("é necessário ser administrador");
    }
    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
