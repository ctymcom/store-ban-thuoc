import { Category } from "./category.repo";
import { BaseModel, CrudRepository } from "./crud.repo";
import { Ingredient } from "./ingredient.repo";
export interface Product extends BaseModel {
  code: string;
  name: string;
  categoryIds: string[];
  barcode: string;
  origin: string;
  ingredientIds: string[];
  packing: string;
  dosageForms: string;
  antibiotic: string;
  uses: string;
  indications: string;
  howToUse: string;
  contraindicated: string;
  interactions: string;
  sideEffects: string;
  careful: string;
  overdose: string;
  preservation: string;
  volume: number;
  weight: number;
  color: string;
  size: string;
  unitCode: string;
  unit: string;
  description: string;
  byt: string;
  imageId: string;
  basePrice: number;
  salePrice: number;
  containers: [string];
  saleRate: number;
  tags: [string];
  saleExpiredDate: Date;
  categories: Category[];
  ingredients: Ingredient[];
  image: string;
}

export class ProductRepository extends CrudRepository<Product> {
  apiName: string = "Product";
  shortFragment: string = this.parseFragment(`
    id: string
    createdAt: DateTime
    updatedAt: DateTime
    code: string
    name: string
    unit: string
    basePrice: number
    salePrice: number
    containers: [string]
    saleRate: number
    tags: [string]
    categories { id name parents { id name } }: [Category]
    image: string
  `);
  fullFragment: string = this.parseFragment(`
    id: string
    createdAt: DateTime
    updatedAt: DateTime
    code: string
    name: string
    categoryIds: [ID]
    barcode: string
    origin: string
    ingredientIds: [ID]
    packing: string
    dosageForms: string
    antibiotic: string
    uses: string
    indications: string
    howToUse: string
    contraindicated: string
    interactions: string
    sideEffects: string
    careful: string
    overdose: string
    preservation: string
    volume: number
    weight: number
    color: string
    size: string
    unitCode: string
    unit: string
    description: string
    byt: string
    imageId: string
    basePrice: number
    salePrice: number
    containers: [string]
    saleRate: number
    tags: [string]
    saleExpiredDate: DateTime
    categories { id name parents { id name } }: [Category]
    ingredients { id name }: [Ingredient]
    image: string
  `);
}

export const ProductService = new ProductRepository();
