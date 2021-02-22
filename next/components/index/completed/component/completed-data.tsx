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
        href: "/profile/order-history"
    }
]
const listButtonFailed = [
    {
        title: "Trở về trang Thanh toán",
        href: "/checkout"
    },
    {
        title: "Trở về trang chủ",
        href: "/profile/order-history"
    }

]
export const statusSuccessed = {
    header: "Đặt hàng thành công.",
    type: "successed",
    listContent,
    img: "/assets/img/completed.png",
    listButton: listButtonSuccessed
}
export const statusFailed = {
    header: "Đặt hàng thành công",
    type: "failed",
    listContent,
    img: "/assets/img/product.png",
    listButton: listButtonFailed
}