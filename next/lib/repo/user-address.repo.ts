import { BaseModel, CrudRepository } from "./crud.repo";

export interface UserAddress extends BaseModel {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    addressId: string;
    fullAddress: string
    contactName: string
    address: string
    provinceId: string
    districtId: string
    wardId: string;
    phone: string;
    location: string;
    isDefault: boolean;
}

export class UserAddressRepository extends CrudRepository<UserAddress> {
  apiName = "UserAddress";
  shortFragment = this.parseFragment(`
    id: string
    createdAt: DateTime
    updatedAt: DateTime
    userId: string
    addressId: string
    fullAddress: string
    contactName: string
  `);
  fullFragment = this.parseFragment(`
    id: string
    createdAt: DateTime
    updatedAt: DateTime
    userId: string
    addressId: string
    fullAddress: string
    contactName: string
    address: string
    provinceId: string
    districtId: string
    wardId: string
    phone: string
    location: string
    isDefault: Boolean
  `);

  
}

export const UserAddressService = new UserAddressRepository();
