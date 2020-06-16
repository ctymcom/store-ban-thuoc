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
    this.router.get("/login", this.route(this.login));
    this.router.get("/loginEmail", this.route(this.loginEmail));
  }

  async login(req: Request, res: Response) {
    res.render('login');
  }

  async loginEmail(req: Request, res: Response){
    res.render('loginEmail');
  }

}

export default new ViewRoute().router;
