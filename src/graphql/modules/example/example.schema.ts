import { gql } from 'apollo-server-express';

const schema = gql`
  extend type Query {
    getAllSetting: [Setting]
  }

  type Setting {
    id: String,
    code: String
  }

  type SettingPageData {
    data: [Setting]
  }
`;

export default schema;
