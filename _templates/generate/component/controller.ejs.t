---
to: src/graphql/modules/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.controller.ts
---
import { CrudController } from "../../../base/crudController";
import { <%= h.inflection.camelize(name) %>Model } from "./<%= h.inflection.camelize(name, true) %>.model";
class <%= h.inflection.camelize(name) %>Controller extends CrudController<typeof <%= h.inflection.camelize(name) %>Model> {
  constructor() {
    super(<%= h.inflection.camelize(name) %>Model);
  }
}

const <%= h.inflection.camelize(name, true) %>Controller = new <%= h.inflection.camelize(name) %>Controller();

export { <%= h.inflection.camelize(name, true) %>Controller };
