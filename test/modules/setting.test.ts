import settingResolver from "../../src/graphql/modules/setting/setting.resolver";
import { expect } from "chai";
import { ROLES } from "../../src/constants/role.const";
import faker from "faker";
import { SettingModel } from "../../src/graphql/modules/setting/setting.model";
import { getAdminContext } from "../utils/context";

let setting: any = {};
let data = {
  name: faker.name.jobTitle(),
};
let context = getAdminContext();

describe("# Test getAllSetting", () => {
  it("shold return an array", async (done) => {
    let result = await settingResolver.Query.getAllSetting({}, {}, context);

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

describe("# Test getOneSetting", () => {
  it("shold return an object", async (done) => {
    let data = {
      key: "EXAMPLE",
    };
    let result = await settingResolver.Query.getOneSetting(
      {},
      { key: data.key },
      context
    );

    expect(result).to.be.an("object");
    expect(result.key).to.equal(data.key);
    done();
  });
});

// describe("# Test createSetting", () => {
//   it("shold return an array", async (done) => {
//     let context: Context = {
//       isAuth: true,
//       isTokenExpired: false,
//       tokenData: {
//         role_: ROLES.ADMIN,
//       },
//     };

//     let result: any = await settingResolver.Mutation.createSetting(
//       {},
//       { data },
//       context
//     );
//     result = result.toJSON();
//     setting = result;

//     expect(result).to.be.an("object");
//     expect(result.name).to.equal(data.name);
//     done();
//   });
// });

// describe("# Test getOneSetting", () => {
//   it("shold return an object", async (done) => {
//     let context: Context = {
//       isAuth: true,
//       isTokenExpired: false,
//       tokenData: {
//         role_: ROLES.ADMIN,
//       },
//     };

//     let result: any = await settingResolver.Query.getOneSetting(
//       {},
//       { id: setting.id },
//       context
//     );
//     result = result.toJSON();

//     expect(result).to.be.an("object");
//     expect(result.name).to.equal(data.name);
//     done();
//   });
// });

// describe("# Test updateSetting", () => {
//   it("shold return an object", async (done) => {
//     let context: Context = {
//       isAuth: true,
//       isTokenExpired: false,
//       tokenData: {
//         role_: ROLES.ADMIN,
//       },
//     };

//     data.name = faker.name.title();
//     let result: any = await settingResolver.Mutation.updateSetting(
//       {},
//       {
//         id: setting.id,
//         data: data,
//       },
//       context
//     );
//     result = result.toJSON();
//     setting = result;

//     expect(result).to.be.an("object");
//     expect(result.name).to.equal(data.name);
//     done();
//   });
// });

// describe("# Test deleteOneSetting", () => {
//   it("shold return an object", async (done) => {
//     let context: Context = {
//       isAuth: true,
//       isTokenExpired: false,
//       tokenData: {
//         role_: ROLES.ADMIN,
//       },
//     };

//     data.name = faker.name.title();
//     let result: any = await settingResolver.Mutation.deleteOneSetting(
//       {},
//       {
//         id: setting.id,
//       },
//       context
//     );
//     result = result.toJSON();

//     expect(result).to.be.an("object");
//     expect(result.id).to.equal(setting.id);
//     done();
//   });
// });

// describe("# Test deleteManySetting", () => {
//   it("shold return an object", async (done) => {
//     let context: Context = {
//       isAuth: true,
//       isTokenExpired: false,
//       tokenData: {
//         role_: ROLES.ADMIN,
//       },
//     };

//     let records = await SettingModel.bulkCreate([
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

//     let result: any = await settingResolver.Mutation.deleteManySetting(
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
