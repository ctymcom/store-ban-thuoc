import Link from "next/link";
import { ProductList } from "../components/shared/product/product-list";
import { ProfileUser } from "./profile-user-layout/profile-user";
import { useRouter } from "next/router";

interface PropsType extends ReactProps {
    [x: string]: any;
    breadcrumbs: 'account-user' | 'order' | 'notification' | 'reward-point' | 'order-details';
  }

export function ProfileUserLayout(props: PropsType) {

    let title = '';
    switch (props.breadcrumbs) {
        case 'account-user': title = "Tài khoản của tôi"; break;
        case 'order': title = "Đơn hàng"; break;
        case 'notification': title = "Thông báo"; break;
        case 'reward-point': title = "Điểm tích luỹ"; break;
        case 'order-details': title = "Chi tiết đơn hàng"; break;
    }
    
    const router = useRouter();
    return (
        <>
            <div className="main-container h-auto pl-4">
                <div className="grid grid-rows-1">
                    <div className="breadbcrum">
                        <ul className="breadbcrum flex h-10 items-center mt-8 uppercase">
                            <Link href="/">
                                <a className="breadbcrum hover:text-primary mr-1"> Trang chủ</a>
                            </Link>
                            <span> / </span>
                            <li>
                                <span className="breadbcrum text-primary ml-1">
                                {/* {
                                    router.pathname == "/profile" ? "Tài khoản của tôi" : 
                                    (router.pathname == "/profile/order-history" ? "Đơn hàng" : 
                                    (router.pathname == "/profile/notification" ? "Thông báo" : 
                                    (router.pathname == "/profile/reward-point" ? "Điểm tích luỹ" : 
                                    (router.pathname == "/profile/order-details" ? "Chi tiết đơn hàng" : "Đơn hàng"))))
                                }     */}
                                {title}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full flex justify-between mt-8 mb-0">
                        <div className="account__user-info w-1/4">
                            <ProfileUser/>
                        </div>
                        {props.children}
                    </div> 
                    <div className="similar-products">
                        {
                            router.pathname == "/profile/order-history" ||
                            router.pathname == "/profile/order-history/wait-confirm-order" ||
                            router.pathname == "/profile/order-history/wait-delivery-order" || 
                            router.pathname == "/profile/order-history/delivered-order" || 
                            router.pathname == "/profile/order-history/canceled-order"? <ProductList type='similar-products' /> : ""
                        }
                    </div> 
                </div>
            </div>
        </>
    );
}