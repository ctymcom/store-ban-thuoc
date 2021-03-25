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
  containers: string[];
  saleRate: number;
  tags: string[];
  tagDetails: ProductTagDetail[];
  tabs: ProductTabContent[];
  relatedProducts: Product[];
  saleExpiredDate: string;
  categories: Category[];
  ingredients: Ingredient[];
  image: string;
  imageS: string;
  imageM: string;
  imageL: string;
  viewCount: number;
  saleCount: number;
}

interface ProductTagDetail {
  code: string;
  name: string;
  name2: string;
  color: string;
  icon: string;
  position: number;
  outOfDate: string;
}

interface ProductTabContent {
  name: string;
  name2: string;
  content: string;
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
    packing: string
    basePrice: number
    salePrice: number
    containers: [string]
    saleRate: number
    tags: [string]
    tagDetails { code name color }: [ProductTagDetail]
    categories { id name parents { id name } }: [Category]
    image: string
    imageS: string
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
    viewCount: Int
    saleCount: Int
    tagDetails {
      code: String
      name: String
      name2: String
      color: String
      icon: String
      position: Int
      outOfDate: DateTime
    }: [ProductTagDetail]
    tabs {
      name: String
      name2: String
      content: String
    }: [ProductTabContent]
    relatedProducts {
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
      tagDetails { code name }: [ProductTagDetail]
      categories { id name parents { id name } }: [Category]
      image: string
    }: [Product]
    categories { id name parents { id name } }: [Category]
    ingredients { id name }: [Ingredient]
    image: string
    imageS: string
    imageM: string
    imageL: string
  `);
}

export const ProductService = new ProductRepository();
