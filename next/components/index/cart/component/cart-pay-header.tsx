import {HiOutlineChevronRight} from "react-icons/hi"
export function CartPayHeader() {
    let pathName=null;
    try {
        const { pathname } = window.location;
        pathName= pathname;
    } catch (error) {
        pathName="/cart";
    }
    return <div className="text-sm sm:text-xl md:text-2xl lg:text-3xl w-5/6 sm:w-4/5 md:w-3/5 lg:w-2/5 mx-auto my-10 text-center uppercase sm:whitespace-nowrap text-gray-300 flex items-center">
            <h2 className={pathName ==="/cart"?"text-black":"cursor-pointer"}> Giỏ Hàng</h2>
            <h2 className={pathName ==="/checkout"?"text-black flex justify-around items-center":"flex justify-around items-center cursor-pointer"}><i><HiOutlineChevronRight/></i>Thanh Toán</h2> 
            <h2 className={pathName ==="/complete"?"text-black flex justify-around items-center":"flex justify-around items-center cursor-pointer"}><i><HiOutlineChevronRight/></i>Hoàn tất</h2>
        </div>
}