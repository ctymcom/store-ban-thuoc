import {
  BaseRoute,
  Request,
  Response,
  NextFunction,
} from "../../base/baseRoute";

class ExampleRoute extends BaseRoute {
  constructor() {
    super();
  }

  customRouting() {
    this.router.get("/", this.route(this.index));
  }

  async index(req: Request, res: Response) {
    res.send("hello");
  }
}

export default new ExampleRoute().router;
