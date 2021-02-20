import feedbackResolver from "../../src/graphql/modules/feedback/feedback.resolver";
import { expect } from "chai";
import { ROLES } from "../../src/constants/role.const";
import faker from "faker";
import { FeedbackModel } from "../../src/graphql/modules/feedback/feedback.model";
import { getAdminContext } from "../utils/context";

let feedback: any = {};
let data = {
  name: faker.name.jobTitle(),
};
let context = getAdminContext();

describe("# Test getAllFeedback", () => {
  it("shold return an array", async (done) => {
    let result = await feedbackResolver.Query.getAllFeedback({}, {}, context);

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

describe("# Test createFeedback", () => {
  it("shold return an array", async (done) => {
    let result: any = await feedbackResolver.Mutation.createFeedback(
      {},
      { data },
      context
    );
    result = result.toJSON();
    feedback = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test getOneFeedback", () => {
  it("shold return an object", async (done) => {
    let result: any = await feedbackResolver.Query.getOneFeedback(
      {},
      { id: feedback._id },
      context
    );

    console.log(feedback);
    console.log(result);

    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test updateFeedback", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await feedbackResolver.Mutation.updateFeedback(
      {},
      {
        id: feedback._id,
        data: data,
      },
      context
    );
    result = result.toJSON();
    feedback = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test deleteOneFeedback", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await feedbackResolver.Mutation.deleteOneFeedback(
      {},
      {
        id: feedback._id,
      },
      context
    );
    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.id).to.equal(feedback.id);
    done();
  });
});

describe("# Test deleteManyFeedback", () => {
  it("shold return an object", async (done) => {
    let records = await FeedbackModel.create([
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

    let result: any = await feedbackResolver.Mutation.deleteManyFeedback(
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
