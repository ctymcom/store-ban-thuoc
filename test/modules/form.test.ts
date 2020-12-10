import formResolver from "../../src/graphql/modules/form/form.resolver";
import { expect } from "chai";
import { ROLES } from "../../src/constants/role.const";
import faker from "faker";
import { FormModel } from "../../src/graphql/modules/form/form.model";
import { getAdminContext } from "../utils/context";

let form: any = {};
let data = {
  name: faker.name.jobTitle(),
};
let context = getAdminContext();

describe("# Test getAllForm", () => {
  it("shold return an array", async (done) => {
    let result = await formResolver.Query.getAllForm({}, {}, context);

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

describe("# Test createForm", () => {
  it("shold return an array", async (done) => {
    let result: any = await formResolver.Mutation.createForm(
      {},
      { data },
      context
    );
    result = result.toJSON();
    form = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test getOneForm", () => {
  it("shold return an object", async (done) => {
    let result: any = await formResolver.Query.getOneForm(
      {},
      { id: form._id },
      context
    );

    console.log(form);
    console.log(result);

    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test updateForm", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await formResolver.Mutation.updateForm(
      {},
      {
        id: form._id,
        data: data,
      },
      context
    );
    result = result.toJSON();
    form = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test deleteOneForm", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await formResolver.Mutation.deleteOneForm(
      {},
      {
        id: form._id,
      },
      context
    );
    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.id).to.equal(form.id);
    done();
  });
});

describe("# Test deleteManyForm", () => {
  it("shold return an object", async (done) => {
    let records = await FormModel.create([
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

    let result: any = await formResolver.Mutation.deleteManyForm(
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
