import settingGroupResolver from "../../src/graphql/modules/settingGroup/settingGroup.resolver";
import { expect } from "chai";
import { ROLES } from "../../src/constants/role.const";
import faker from "faker";
import { SettingGroupModel } from "../../src/graphql/modules/settingGroup/settingGroup.model";
import { getAdminContext } from "../utils/context";

let settingGroup: any = {};
let data = {
  name: faker.name.jobTitle(),
};
let context = getAdminContext();

describe("# Test getAllSettingGroup", () => {
  it("shold return an array", async (done) => {
    let result = await settingGroupResolver.Query.getAllSettingGroup(
      {},
      {},
      context
    );

    expect(result).to.be.an("object");
    expect(result.data).to.be.an("array");
    expect(result.total).to.be.a("number");
    expect(result.pagination).to.be.an("object");
    expect(result.pagination.limit).to.be.a("number");
    expect(result.pagination.offset).to.be.a("number");
    expect(result.pagination.page).to.be.a("number");
    done();
  });
});

// describe("# Test createSettingGroup", () => {
//   it("shold return an array", async (done) => {
//     let context: Context = {
//       isAuth: true,
//       isTokenExpired: false,
//       tokenData: {
//         role_: ROLES.ADMIN,
//       },
//     };

//     let result: any = await settingGroupResolver.Mutation.createSettingGroup(
//       {},
//       { data },
//       context
//     );
//     result = result.toJSON();
//     settingGroup = result;

//     expect(result).to.be.an("object");
//     expect(result.name).to.equal(data.name);
//     done();
//   });
// });

// describe("# Test getOneSettingGroup", () => {
//   it("shold return an object", async (done) => {
//     let context: Context = {
//       isAuth: true,
//       isTokenExpired: false,
//       tokenData: {
//         role_: ROLES.ADMIN,
//       },
//     };

//     let result: any = await settingGroupResolver.Query.getOneSettingGroup(
//       {},
//       { id: settingGroup.id },
//       context
//     );
//     result = result.toJSON();

//     expect(result).to.be.an("object");
//     expect(result.name).to.equal(data.name);
//     done();
//   });
// });

// describe("# Test updateSettingGroup", () => {
//   it("shold return an object", async (done) => {
//     let context: Context = {
//       isAuth: true,
//       isTokenExpired: false,
//       tokenData: {
//         role_: ROLES.ADMIN,
//       },
//     };

//     data.name = faker.name.title();
//     let result: any = await settingGroupResolver.Mutation.updateSettingGroup(
//       {},
//       {
//         id: settingGroup.id,
//         data: data,
//       },
//       context
//     );
//     result = result.toJSON();
//     settingGroup = result;

//     expect(result).to.be.an("object");
//     expect(result.name).to.equal(data.name);
//     done();
//   });
// });

// describe("# Test deleteOneSettingGroup", () => {
//   it("shold return an object", async (done) => {
//     let context: Context = {
//       isAuth: true,
//       isTokenExpired: false,
//       tokenData: {
//         role_: ROLES.ADMIN,
//       },
//     };

//     data.name = faker.name.title();
//     let result: any = await settingGroupResolver.Mutation.deleteOneSettingGroup(
//       {},
//       {
//         id: settingGroup.id,
//       },
//       context
//     );
//     result = result.toJSON();

//     expect(result).to.be.an("object");
//     expect(result.id).to.equal(settingGroup.id);
//     done();
//   });
// });

// describe("# Test deleteManySettingGroup", () => {
//   it("shold return an object", async (done) => {
//     let context: Context = {
//       isAuth: true,
//       isTokenExpired: false,
//       tokenData: {
//         role_: ROLES.ADMIN,
//       },
//     };

//     let records = await SettingGroupModel.bulkCreate([
//       {
//         name: faker.name.title(),
//       },
//       {
//         name: faker.name.title(),
//       },
//       {
//         name: faker.name.title(),
//       },
//     ]);

//     let ids = records.map(r => r.get("id"));

//     let result: any = await settingGroupResolver.Mutation.deleteManySettingGroup(
//       {},
//       {
//         ids: ids
//       },
//       context
//     );

//     expect(result).to.be.a("number");
//     expect(result).to.equal(records.length);
//     done();
//   });
// });
