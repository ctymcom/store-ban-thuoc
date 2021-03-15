import { createContext, useContext, useEffect, useState } from "react";
import { Order, OrderService } from "../../../../lib/repo/order.repo";

export const OrderDetailsContext = createContext<
  Partial<{
    order: Order;
  }>
>({});

interface PropsType extends ReactProps {
  orderId?: any;
}

export function OrderDetailsProvider({ orderId, children }: PropsType) {
  const [order, setOrder] = useState<Order>(null);

  const loadOrderDetails = async () => {
    setOrder(null);
    let res = await OrderService.getOne({ id: orderId });
    setOrder(res);
  };

  useEffect(() => {
    loadOrderDetails();
  }, [orderId]);

  // console.log(order);
  // console.log("OderId " + orderId);

  return <OrderDetailsContext.Provider value={{ order }}>{children}</OrderDetailsContext.Provider>;
}

export const useOrderDetailsContext = () => useContext(OrderDetailsContext);
