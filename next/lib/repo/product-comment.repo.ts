import { BaseModel, CrudRepository } from "./crud.repo";
export interface ProductComment extends BaseModel {
  code: string;
  productId: string;
  productCode: string;
  imark: number;
  content: string;
  reviewer: string;
}

export class ProductCommentRepository extends CrudRepository<ProductComment> {
  apiName: string = "ProductComment";
  shortFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    code: String
    content: String
    reviewer: String
    imark: Int
  `);
  fullFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    code: String
    productId: ID
    productCode: String
    imark: Int
    content: String
    reviewer: String
  `);

  async postProductComment({
    productId,
    reviewerName,
    imark,
    content,
  }: {
    productId: string;
    reviewerName: string;
    imark: string;
    content: string;
  }) {
    let res = await this.apollo.mutate({
      mutation: this.gql`
        mutation PostProduct($data: PostProductCommentInput!) {
          g0: postProductComment(data: $data)
        }
      `,
      variables: {
        data: {
          productId,
          reviewerName,
          imark,
          content,
        },
      },
    });
    return res.data.g0;
  }
}

export const ProductCommentService = new ProductCommentRepository();
