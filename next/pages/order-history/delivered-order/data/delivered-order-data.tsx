let now = new Date();
let data = [
    {
        id_oder: 'SDF13Z5A63',
        delivery_time: now,
        intend_time: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2),
        total_product: 5,
        total_price: 1703000
    }
]
data = [...data, ...data]
data = [...data, ...data]
data = [...data, ...data]
data = [...data, ...data]
data = [...data, ...data]
data = [...data, ...data]

export const DeliveredOrderData = data