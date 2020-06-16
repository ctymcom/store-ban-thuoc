import { ParseQueryHelper } from "../../src/helpers/parseQuery.helper";
import { expect } from "chai";

describe("Functional ParseQueryHelper.parseGetList", () => {
  it("test positive parseGetList", (done) => {
    let result = ParseQueryHelper.parseGetList({ limit: 100 }, "tbl_test");

    console.log(result);

    expect(result).to.be.an("object");
    expect(result).to.deep.equal({
      limit: 100,
      offset: 0,
      pagination: { limit: 100, offset: 0, page: 1 },
      order: [["createdAt", "DESC"]],
      where: {},
      include: [],
    });

    done();
  });
});

describe("Functional ParseQueryHelper.parseGetOne", () => {
  it("test positive parseGetOne", (done) => {
    let result = ParseQueryHelper.parseGetOne({});
    expect(result).to.be.an("object");
    expect(result).to.deep.equal({
      include: [],
    });

    done();
  });
});
