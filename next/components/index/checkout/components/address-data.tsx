export type MyAddress ={
    id: number,
    name: string,
    default: boolean,
    address: string,
    numberPhone: string,
}
export const listAddressData:MyAddress[] = [
    {
        id: 1,
        name: "Lý Thanh Liêm",
        default: true,
        address: "M2 Jamona, Đường Đào Trí Từ, Phường Phú Thuận, Quận 7, Hồ Chí Minh",
        numberPhone: "0378760880",
    },
    {
        id: 2,
        name: "Lý Thanh Liêm",
        default: false,
        address: "M2 Jamona, Đường Đào Trí Từ, Phường Phú Thuận, Quận 7, Hồ Chí Minh",
        numberPhone: "0378760880",
    },
    {
        id: 3,
        name: "Lý Thanh Liêm",
        default: false,
        address: "M2 Jamona, Đường Đào Trí Từ, Phường Phú Thuận, Quận 7, Hồ Chí Minh",
        numberPhone: "0378760880",
    },
    {
        id: 4,
        name: "Lý Thanh Liêm",
        default: false,
        address: "M2 Jamona, Đường Đào Trí Từ, Phường Phú Thuận, Quận 7, Hồ Chí Minh",
        numberPhone: "0378760880",
    },
    {
        id: 5,
        name: "Lý Thanh Liêm",
        default: false,
        address: "M2 Jamona, Đường Đào Trí Từ, Phường Phú Thuận, Quận 7, Hồ Chí Minh",
        numberPhone: "0378760880",
    },
    {
        id: 6,
        name: "Lý Thanh Liêm",
        default: false,
        address: "M2 Jamona, Đường Đào Trí Từ, Phường Phú Thuận, Quận 7, Hồ Chí Minh",
        numberPhone: "0378760880",
    }
]
export const listPath = [
    {
        name: "Trang chủ /",
        href: "/home",
    },
    {
        name: "Địa chỉ giao hàng ",
        href: "/address",
    }
]