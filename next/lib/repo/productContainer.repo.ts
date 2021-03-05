import { BaseModel, CrudRepository } from "./crud.repo";
import { Product, ProductService } from "./product.repo";
export interface ProductContainer extends BaseModel {
  code?: number; // Mã nhóm
  name?: string; // Tên nhóm
  name2?: string; // Tên nhóm tiếng việt
  tagCode?: string; // Mã tag
  note?: string; // Ghi chú
  position?: number; // vị trí
  productIds?: string[]; // Danh sách sản phẩm

  products?: Product[];
}

export class ProductContainerRepository extends CrudRepository<ProductContainer> {
  apiName: string = "ProductContainer";
  shortFragment: string = `
    id
    name
    name2
    position
    products(limit: 10) {
      ${ProductService.shortFragment}
    }
  `;
  fullFragment: string = this.parseFragment(`
    id: String
    name: String
    name2: String
    position: Int
  `);
}

export const ProductContainerService = new ProductContainerRepository();
