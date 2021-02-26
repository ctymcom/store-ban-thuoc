import Link from 'next/link';
export function ContentStatus(props) {
    const { status } = props;
    const styleButton = (href:string) => {
        let tempStyle: string = 'block w-3/5 mx-auto md:w-3/5 md:ml-10 border border-gray-300 rounded p-2 mt-2 ';
        if (href !== "/profile/order-history") {
            tempStyle += "bg-primary text-white";
        } else {
            tempStyle += "text-primary";
        }
        return tempStyle;
    }
    return <>
        <div className="text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-bold mx-auto my-4 whitespace-nowrap text-primary">Đặt hàng thành công</h3>
            <div className="w-4/5 mx-auto my-5 md:my-10">
                <p>Đơn hàng được đặt thành công</p>
                <p>Chúng tôi sẽ vận chuyển đơn hàng này ngay khi xác nhận chuyển khoản thành công</p>
            </div>
            <div className=" mt-10">
                <Link href={"/home"}><button className={styleButton("/home")}>Trở về trang chủ</button></Link>
                <Link href={"/profile/order-history"}><button className={styleButton("/profile/order-history")}>Lịch sử đơn hàng</button></Link>
            </div>
        </div>
    </>
}