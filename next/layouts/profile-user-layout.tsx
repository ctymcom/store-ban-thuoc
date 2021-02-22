import Link from "next/link";
import { ProductList } from "../components/shared/product/product-list";
import { ProfileUser } from "./profile-user-layout/profile-user";

interface PropsType extends ReactProps {
    [x: string]: any;
    breadcrumbs?: 'account-user' | 'order' | 'notification' | 'reward-point' | 'order-details';
}

export function ProfileUserLayout(props: PropsType) {

    let showLabelBreadcrumb = '';
    let showSimilarProducts = null;
    switch (props.breadcrumbs) {
        case 'account-user': showLabelBreadcrumb = "Tài khoản của tôi"; break;
        case 'order': showLabelBreadcrumb = "Đơn hàng"; break;
        case 'notification': showLabelBreadcrumb = "Thông báo"; break;
        case 'reward-point': showLabelBreadcrumb = "Điểm tích luỹ"; break;
        case 'order-details': showLabelBreadcrumb = "Chi tiết đơn hàng"; break;
    };
    
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
                                <span className="breadbcrum text-primary ml-1">{showLabelBreadcrumb}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full flex justify-between mt-8 mb-0">
                        <div className="account__user-info w-1/4">
                            <ProfileUser/>
                        </div>
                        {props.children}
                    </div> 
                    {/* <div className="similar-products">
                        { showSimilarProducts }
                    </div>  */}
                </div>
            </div>
        </>
    );
}