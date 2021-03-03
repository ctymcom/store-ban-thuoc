import Link from "next/link";
import { ProductList } from "../components/shared/product/product-list";
import { ProfileUser } from "./profile-user-layout/profile-user";

interface PropsType extends ReactProps {
    [x: string]: any;
    breadcrumb? : string;
    showLabelBreadcrumb?: string;
}

export function ProfileUserLayout({
    breadcrumb = '',
    showLabelBreadcrumb = '',
    ...props
}: PropsType) {

    let showSimilarProducts = null;
    switch (breadcrumb) {
        case 'account-user': showLabelBreadcrumb = "Tài khoản của tôi"; break;
        case 'order': showLabelBreadcrumb = "Đơn hàng"; break;
        case 'notification': showLabelBreadcrumb = "Thông báo"; break;
        case 'reward-point': showLabelBreadcrumb = "Điểm thưởng"; break;
        case 'order-details': showLabelBreadcrumb = "Chi tiết đơn hàng"; break;
    };

    
    return (
        <>
            <div className="main-container h-auto xs:pl-3 sm:pl-4 md:pl-4 lg:pl-0 xs:pr-3 sm:pr-4 md:pr-4 lg:pr-0">
                <div className="w-full ">
                    <div className="max-w-full text-center text-xs md:text-base">
                        <ul className="flex h-10 w-full items-center mt-2 md:mt-8 uppercase px-5 md:px-0 font-extralight">
                            <Link href="/">
                                <a className="hover:text-primary mr-1"> Trang chủ</a>
                            </Link>
                            <span> / </span>
                            <li>
                                <span className="text-primary ml-1">{showLabelBreadcrumb}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full flex flex-col lg:flex-row justify-between lg:space-x-20 mt-0 md:mt-6 mb-0">
                        <div className="w-full lg:w-96">
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