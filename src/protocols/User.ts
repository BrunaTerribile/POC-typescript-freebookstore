//usuário cadastrado - retorno da tabela do banco
export type UserEntity = {
    id: number,
    name: string,
    email: string,
    password: string
}

export type LoginUser = Omit<UserEntity, "id" | "name"> // recebido do usuário para login

export type UserData = Omit<UserEntity, "id"> //recebido do usuário no cadastro