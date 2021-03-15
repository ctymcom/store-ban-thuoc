import Link from "next/link";
export function ContentStatus(props) {
  return (
    <>
      <div className="text-center md:text-left">
        <h3 className="text-3xl md:text-4xl font-bold mx-auto my-4 whitespace-nowrap text-primary">
          Đặt hàng thành công
        </h3>
        <div className="w-4/5 mx-auto my-5 md:my-10 text-16">
          <p>Đơn hàng được đặt thành công</p>
          <p>Chúng tôi sẽ vận chuyển đơn hàng này ngay khi xác nhận chuyển khoản thành công</p>
        </div>
        <div className=" mt-10">
          <Link href={"/home"}>
            <button className={`block w-3/5 mx-auto md:w-3/5 md:ml-10 btn-primary`}>
              Trở về trang chủ
            </button>
          </Link>
          <Link href={"/profile/order-history"}>
            <button className={`btn-outline block w-3/5 mx-auto md:w-3/5 md:ml-10 mt-2`}>
              Lịch sử đơn hàng
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
