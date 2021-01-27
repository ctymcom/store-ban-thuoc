import moment from 'moment-timezone';

export const OrderHistoryData = [
    {
        id_oder: 'SDF13Z5A65',
        delivery_time: moment().tz("Asia/Ho_Chi_Minh").subtract(5, 'days').format("DD-MM"),
        intend_time: moment().tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY"),
        total_product: 3,
        total_price: '1.203.000',
    },
    {
        id_oder: 'SDF13Z5A64',
        delivery_time: moment().tz("Asia/Ho_Chi_Minh").subtract(5, 'days').format("DD-MM"),
        intend_time: moment().tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY"),
        total_product: 4,
        total_price: '1.803.000',
    },
    {
        id_oder: 'SDF13Z5A63',
        delivery_time: moment().tz("Asia/Ho_Chi_Minh").subtract(4, 'days').format("DD-MM"),
        intend_time: moment().tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY"),
        total_product: 5,
        total_price: '1.703.000',
    },
    {
        id_oder: 'SDF13Z5A62',
        delivery_time: moment().tz("Asia/Ho_Chi_Minh").subtract(2, 'days').format("DD-MM"),
        intend_time: moment().tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY"),
        total_product: 6,
        total_price: '1.503.000',
    },
    {
        id_oder: 'SDF13Z5A61',
        delivery_time: moment().tz("Asia/Ho_Chi_Minh").subtract(3, 'days').format("DD-MM"),
        intend_time: moment().tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY"),
        total_product: 7,
        total_price: '1.400.000',
    },
    {
        id_oder: 'SDF13Z5A60',
        delivery_time: moment().tz("Asia/Ho_Chi_Minh").subtract(4, 'days').format("DD-MM"),
        intend_time: moment().tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY"),
        total_product: 3,
        total_price: '1.300.000',
    }
];