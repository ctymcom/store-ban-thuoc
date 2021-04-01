import Link from "next/link";
import { useState, useEffect } from "react";

export function ContentStatus(props) {
  const [idOrder, setIdOrder] = useState("");
  useEffect(() => {
    let idStor = localStorage.getItem("idOrder");
    if (idStor) {
      setIdOrder(idStor);
    }
  }, []);
  return (
    <>
      <div className="text-center md:text-left">
        <h3 className="text-3xl md:text-4xl font-bold mx-auto my-4 whitespace-nowrap text-primary">
          Đặt hàng thành công
        </h3>
        <div className="w-full sm:w-5/6 mx-auto">
          <p>
            Cảm ơn bạn đã mua hàng tại{" "}
            <span className="block sm:inline mx-auto font-bold text-primary">Kho thuốc sĩ</span>
          </p>
          <div className="flex flex-wrap items-center gap-2 mx-auto">
            <p className="mx-auto">Mã đơn hàng của bạn là</p>
            {/* <Link href={{ pathname: "/profile/order-details", query: { id: idOrder } }}> */}
            <button className="btn-primary my-2 w-3/5 sm:w-auto mx-auto">{idOrder}</button>
            {/* </Link> */}
          </div>
        </div>
        <div className="w-full sm:w-4/5 mx-auto">
          <p className="whitespace-nowrap">Đơn hàng được đặt thành công.</p>
          <p className="">
            Chúng tôi sẽ vận chuyển đơn hàng này ngay khi xác nhận chuyển khoản thành công
          </p>
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
