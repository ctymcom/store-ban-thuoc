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
            <div className="main-container h-auto sm:pl-4 md:pl-4 lg:pl-0 sm:pr-4 md:pr-4 lg:pr-0">
                <div className="w-full">
                    <div className="breadbcrum max-w-full text-center text-sm md:text-base">
                        <ul className="breadbcrum flex h-10 w-full items-center mt-8 uppercase text-center justify-center md:justify-center lg:justify-start">
                            <Link href="/">
                                <a className="breadbcrum hover:text-primary mr-1"> Trang chủ</a>
                            </Link>
                            <span> / </span>
                            <li>
                                <span className="breadbcrum text-primary ml-1">{showLabelBreadcrumb}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full flex flex-col lg:flex-row justify-between lg:space-x-20 mt-3 md:mt-8 mb-0">
                        <div className="w-full lg:w-1/4">
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