import formDataResolver from "../../src/graphql/modules/formData/formData.resolver";
import { expect } from "chai";
import { ROLES } from "../../src/constants/role.const";
import faker from "faker";
import { FormDataModel } from "../../src/graphql/modules/formData/formData.model";
import { getAdminContext } from "../utils/context";

let formData: any = {};
let data = {
  name: faker.name.jobTitle(),
};
let context = getAdminContext();

describe("# Test getAllFormData", () => {
  it("shold return an array", async (done) => {
    let result = await formDataResolver.Query.getAllFormData({}, {}, context);

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

describe("# Test createFormData", () => {
  it("shold return an array", async (done) => {
    let result: any = await formDataResolver.Mutation.createFormData(
      {},
      { data },
      context
    );
    result = result.toJSON();
    formData = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test getOneFormData", () => {
  it("shold return an object", async (done) => {
    let result: any = await formDataResolver.Query.getOneFormData(
      {},
      { id: formData._id },
      context
    );

    console.log(formData);
    console.log(result);

    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test updateFormData", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await formDataResolver.Mutation.updateFormData(
      {},
      {
        id: formData._id,
        data: data,
      },
      context
    );
    result = result.toJSON();
    formData = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test deleteOneFormData", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await formDataResolver.Mutation.deleteOneFormData(
      {},
      {
        id: formData._id,
      },
      context
    );
    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.id).to.equal(formData.id);
    done();
  });
});

describe("# Test deleteManyFormData", () => {
  it("shold return an object", async (done) => {
    let records = await FormDataModel.create([
      {
        name: faker.name.title(),
      },
      {
        name: faker.name.title(),
      },
      {
        name: faker.name.title(),
      },
    ]);

    let ids = records.map((r) => r.get("id"));

    let result: any = await formDataResolver.Mutation.deleteManyFormData(
      {},
      {
        ids: ids,
      },
      context
    );

    expect(result).to.be.a("number");
    expect(result).to.equal(records.length);
    done();
  });
});
