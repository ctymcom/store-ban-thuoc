export type ProductGroupPrice = {
  customerGroup?: string; // Nhóm khách hàng
  expiredAt?: Date; // Ngày hiệu lục tới
  basePrice?: number; // Giá trước khi chiết khấu
  salePrice?: number; // Giá bán
  saleRate?: number; // Tỷ lệ chiết khấu %
};
