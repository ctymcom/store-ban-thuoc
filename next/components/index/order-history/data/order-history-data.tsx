
let now = new Date();
let data = [
    {
        id_oder: 'SDF13Z5',
        delivery_time: now,
        intend_time: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3),
        total_product: 5,
        total_price: 17030000000,
        status: 'pending'
    },
    {
        id_oder: 'SDF13Z5',
        delivery_time: now,
        intend_time: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3),
        total_product: 5,
        total_price: 17030000000,
        status: 'delivering'
    },
    {
        id_oder: 'SDF13Z5',
        delivery_time: now,
        intend_time: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3),
        total_product: 5,
        total_price: 17030000000,
        status: 'complete'
    },
    {
        id_oder: 'SDF13Z5',
        delivery_time: now,
        intend_time: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3),
        total_product: 5,
        total_price: 17030000000,
        status: 'canceled'
    }
]
data = [...data, ...data]
data = [...data, ...data]
data = [...data, ...data]
// data = [...data, ...data]
// data = [...data, ...data]
// data = [...data, ...data]
// data = [...data, ...data]
// data = [...data, ...data]
// data = [...data, ...data]
// data = [...data, ...data]


export const OrderHistoryData = data