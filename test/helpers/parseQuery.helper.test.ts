import { ParseQueryHelper } from "../../src/helpers/parseQuery.helper";
import { expect } from "chai";

describe("Functional ParseQueryHelper.parseGetList", () => {
  it("test positive parseGetList", (done) => {
    let result = ParseQueryHelper.parseGetList({ limit: 100 });

    console.log(result);

    expect(result).to.be.an("object");
    expect(result).to.deep.equal({
      filter: {},
      limit: 100,
      offset: 0,
      order: {},
      pagination: { limit: 100, offset: 0, page: 1 },
    });

    done();
  });
});
