import {
  BaseRoute,
  Request,
  Response,
  NextFunction,
} from "../../base/baseRoute";

class ViewRoute extends BaseRoute {
  constructor() {
    super();
  }

  customRouting() {
    this.router.get("/login", this.route(this.index));
  }

  async index(req: Request, res: Response) {
    res.send("hello");
  }
}

export default new ViewRoute().router;
