import { GraphRepository } from "./graph.repo";

export interface AritoUser {
  id: number;
  username: string;
  admin: number;
  nickname: string;
  userRef: string;
  unitId: number;
  imageId: string;
  locationId: string;
  devId: number;
  language: string;
  country: string;
  email: string;
  phone: string;
  birthday: Date;
  datetime2: Date;
  timeout: number;
  permission: number;
  group: string;
  imageLink: string;
  role: ROLE;
}

export enum ROLE {
  Admin = "ADMIN",
  Editor = "EDITOR",
}

export const USER_ROLES = [
  { value: ROLE.Admin, label: "Quản trị viên" },
  { value: ROLE.Editor, label: "Biên tập viên" },
];

export class AritoUserRepository extends GraphRepository {
  fragment = this.parseFragment(`
    id: Int
    username: String
    admin: Int
    nickname: String
    userRef: String
    unitId: Int
    imageId: String
    locationId: String
    devId: Int
    language: String
    country: String
    email: String
    phone: String
    birthday: DateTime
    datetime2: DateTime
    timeout: Int
    permission: Int
    group: String
    imageLink: String
    role: String
  `);

  async loginArito(
    username,
    password,
    headers,
    mode: "user" | "editor"
  ): Promise<{ token: string; user: AritoUser }> {
    let mutationName;
    switch (mode) {
      case "user":
        mutationName = "loginAritoUser";
        break;
      case "editor":
        mutationName = "loginAritoEditor";
        break;
    }

    const res = await this.apollo.mutate({
      mutation: this.gql`
        mutation {
          ${mutationName}(
            username: "${username}",
            password: "${password}",
          ) {
            token 
            user { ${this.fragment} }
          }
        }
      `,
      context: {
        headers,
      },
    });
    return res.data[mutationName];
  }

  async regisAritoUser(
    nickname: string,
    email: string,
    phone: string
  ): Promise<{ token: string; user: AritoUser }> {
    let mutationName = "regisAritoUser";
    const res = await this.apollo.mutate({
      mutation: this.gql`
        mutation {
          ${mutationName}(
            nickname: "${nickname}",
            email: "${email}",
            phone: "${phone}",
          ) {
            token
            user { ${this.fragment} }
          }
        }
      `,
    });
    return res.data[mutationName];
  }

  async recoveryPassword(email: string): Promise<string> {
    let mutationName = "recoveryPassword";
    const res = await this.apollo.mutate({
      mutation: this.gql`
        mutation {
          ${mutationName}(
            email: "${email}",
          )
        }
      `,
    });
    return res.data[mutationName];
  }
}

export const AritoUserService = new AritoUserRepository();
