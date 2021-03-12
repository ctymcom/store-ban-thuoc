import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { OrderStatus, OrderStatusService } from "../../../../lib/repo/order-status.repo";

export const OrderStatusContext = createContext<
  Partial<{
    listOrderStatus: OrderStatus[];
    setListOrderStatus: Function;
  }>
>({});

export function OrderStatusProvider({ children }: any) {
  const [listOrderStatus, setListOrderStatus] = useState<OrderStatus[]>(null);
  const router = useRouter();
  const { status } = router.query;

  useEffect(() => {
    loadListOrderStatus();
  }, []);

  const loadListOrderStatus = () => {
    OrderStatusService.getAll({
      query: {
        limit: 0,
      },
      fragment: OrderStatusService.shortFragment,
    }).then((res) => {
      setListOrderStatus(res.data);
    });
  };

  return (
    <OrderStatusContext.Provider
      value={{
        listOrderStatus,
        setListOrderStatus,
      }}
    >
      {children}
    </OrderStatusContext.Provider>
  );
}

export const useOrderStatusContext = () => useContext(OrderStatusContext);
