import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const all = this.usersRepository.list();
    const isAdmin = all.find((user) => JSON.stringify(user.id) === user_id);

    if (!isAdmin) {
      throw new Error("user don't exits!");
    }

    if (!isAdmin.admin) {
      throw new Error("user don't have permission this action!");
    }

    return all;
  }
}

export { ListAllUsersUseCase };
