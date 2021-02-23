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
}

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
  `);

  async loginAritoUser(username, password, headers): Promise<{ token: string; user: AritoUser }> {
    const res = await this.apollo.mutate({
      mutation: this.gql`
        mutation {
          loginAritoEditor(
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
    return res.data.loginAritoEditor;
  }
}

export const AritoUserService = new AritoUserRepository();
