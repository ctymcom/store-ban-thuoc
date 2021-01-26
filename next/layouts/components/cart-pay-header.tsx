export function CartPayHeader(props){
    const {title} = props;
    switch(title){
        case "cart":
            return  <h2 className = "text-4xl text-center uppercase m-10 text-gray-300"><span className= "text-black"> Giỏ Hàng </span><span>{`>`} Thanh Toán </span> <span>{`>`} Hoàn tất </span></h2>
        case "pay":
            return  <h2 className = "text-4xl text-center uppercase m-10 text-gray-300"><span> Giỏ Hàng </span><span className="text-black">{`>`} Thanh Toán </span> <span>{`>`} Hoàn tất </span></h2>
        case "compl":
            return <h2 className = "text-4xl text-center uppercase m-10 text-gray-300"><span > Giỏ Hàng </span><span>{`>`} Thanh Toán </span> <span className="text-black">{`>`} Hoàn tất </span></h2>
    }
}