type ProductCardProps = {
  [x: string]: any;
  img: string;
  type: string;
  name: string;
  price: string;
  sale: string;
  onAddToCart?: () => void;
};
export function ProductCard({ img: image, type, name, price, sale, ...props }: ProductCardProps) {
  return (
    <div className="Product">
      <div className="flex flex-col">
        <div className="img-item flex justify-center items-center max-w-sm h-48 relative">
          <img src={image} alt="" className="w-36 max-h-48" />
          <div className="btn-readmore duration-200 absolute bottom-0 w-full bg-green-400 text-center text-white text-sm rounded">
            <div className="w-full py-1 cursor-pointer duration-150">Xem nhanh</div>
          </div>
        </div>
        <div className="py-1">
          <p className="text-sm text-gray-400">{type}</p>
        </div>
        <div className="h-16">
          <p className="">{name}</p>
        </div>
        <div className="">
          <div className="line-through text-green-200 text-sm">{price}</div>
          <div className="flex space-x-1 items-center">
            <p className="text-green-500">{sale}</p>
            <p className="text-sm text-gray-400"> /Hộp</p>
          </div>
        </div>
        <div className="flex space-x-2 items-center py-2">
          <div className="cursor-pointer text-sm px-3 py-1 border border-green-400 rounded text-green-400">
            Thêm vào giỏ
          </div>
          <div className="cursor-pointer text-sm px-3 py-1 border border-green-400  rounded text-white bg-green-400">
            Mua ngay
          </div>
        </div>
      </div>
    </div>
  );
}
