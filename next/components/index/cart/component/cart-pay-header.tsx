export function CartPayHeader(props) {
    const { title } = props;
    switch (title) {
        case "cart":
            return <h2 className="text-22 md:text-28 mb-10 text-center uppercase m-6 text-gray-300"><span className="text-black"> Giỏ Hàng </span><span>{`>`} Thanh Toán </span> <span>{`>`} Hoàn tất </span></h2>
        case "pay":
            return <h2 className="text-22 md:text-28 mb-10 text-center uppercase m-6 text-gray-300"><span> Giỏ Hàng </span><span className="text-black">{`>`} Thanh Toán </span> <span>{`>`} Hoàn tất </span></h2>
        case "comp":
            return <h2 className="text-22 md:text-28  mb-10 text-center uppercase m-6 text-gray-300"><span > Giỏ Hàng </span><span>{`>`} Thanh Toán </span> <span className="text-black">{`>`} Hoàn tất </span></h2>
    }
}