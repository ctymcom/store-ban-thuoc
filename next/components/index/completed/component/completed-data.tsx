const listContent = [
    "Đơn hàng được đặt thành công",
    "Chúng tôi sẽ vận chuyển đơn hàng này ngay khi xác nhận chuyển khoản thành công",
]
const listButtonSuccessed = [
    {
        title: "Trở về trang chủ",
        href: "/home"
    },
    {
        title: "Lịch sử đơn hàng",
        href: "/oder-history"
    }
]
const listButtonFailed = [
    {
        title: "Trở về trang Thanh toán",
        href: "/checkout"
    },
    {
        title: "Trở về trang chủ",
        href: "/oder-history"
    }

]
export const statusSuccessed = {
    header: "Đặt hàng thành công.",
    type: "successed",
    listContent,
    img: "../../../../../../public/assets/images/completed.png",
    listButton: listButtonSuccessed
}
export const statusFailed = {
    header: "Đặt hàng thành công",
    type: "failed",
    listContent,
    img: "../../../../../assets/images/product.png",
    listButton: listButtonFailed
}