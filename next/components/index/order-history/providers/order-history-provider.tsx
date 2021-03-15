import { createContext, useContext, useEffect, useState } from "react";
import { Order, OrderService } from "../../../../lib/repo/order.repo";
import { useAuth } from "../../../../lib/providers/auth-provider";
import { Pagination } from "../../../../lib/repo/crud.repo";
import { OrderStatus, OrderStatusService } from "../../../../lib/repo/order-status.repo";

export const OrderContext = createContext<
  Partial<{
    listOrder: Order[];
    setListOrder: Function;
    pagination: Pagination;
    setPagination: Function;
    listOrderStatus: OrderStatus[];
    setListOrderStatus: Function;
  }>
>({});

export function OrderProvider({ children }: any) {
  const [listOrder, setListOrder] = useState<Order[]>(null);
  const [listOrderStatus, setListOrderStatus] = useState<OrderStatus[]>(null);
  const { user } = useAuth();
  const [pagination, setPagination] = useState<Pagination>({
    limit: 10,
    page: 1,
    total: 0,
  });

  useEffect(() => {
    loadListOrder();
    loadListOrderStatus();
  }, [pagination.page]);

  const loadListOrder = () => {
    OrderService.getAll({
      query: {
        limit: pagination.limit,
        page: pagination.page,
        order: { createdAt: -1 },
        filter: { userId: user?.id },
      },
      fragment: OrderService.shortFragment,
    }).then((res) => {
      setListOrder(res.data);
      setPagination({ ...pagination, total: res.pagination.total });
    });
  };
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
  const loadOrderStatus = () => {
    // OrderStatusService.getOne({});
    // OrderStatusService.getAll({
    //   query: {
    //     limit: 0,
    //   },
    //   fragment: OrderStatusService.shortFragment,
    // }).then((res) => {
    //   setListOrderStatus(res.data);
    // });
  };

  return (
    <OrderContext.Provider
      value={{
        listOrder,
        setListOrder,
        pagination,
        setPagination,
        listOrderStatus,
        setListOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrderContext = () => useContext(OrderContext);
