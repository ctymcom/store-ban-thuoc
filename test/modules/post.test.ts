import postResolver from "../../src/graphql/modules/post/post.resolver";
import { expect } from "chai";
import { ROLES } from "../../src/constants/role.const";
import faker from "faker";
import { PostModel } from "../../src/graphql/modules/post/post.model";
import { getAdminContext } from "../utils/context";

let post: any = {};
let data = {
  name: faker.name.jobTitle(),
};
let context = getAdminContext();

describe("# Test getAllPost", () => {
  it("shold return an array", async (done) => {
    let result = await postResolver.Query.getAllPost({}, {}, context);

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

describe("# Test createPost", () => {
  it("shold return an array", async (done) => {
    let result: any = await postResolver.Mutation.createPost(
      {},
      { data },
      context
    );
    result = result.toJSON();
    post = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test getOnePost", () => {
  it("shold return an object", async (done) => {
    let result: any = await postResolver.Query.getOnePost(
      {},
      { id: post._id },
      context
    );

    console.log(post);
    console.log(result);

    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test updatePost", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await postResolver.Mutation.updatePost(
      {},
      {
        id: post._id,
        data: data,
      },
      context
    );
    result = result.toJSON();
    post = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test deleteOnePost", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await postResolver.Mutation.deleteOnePost(
      {},
      {
        id: post._id,
      },
      context
    );
    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.id).to.equal(post.id);
    done();
  });
});

describe("# Test deleteManyPost", () => {
  it("shold return an object", async (done) => {
    let records = await PostModel.create([
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

    let result: any = await postResolver.Mutation.deleteManyPost(
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
