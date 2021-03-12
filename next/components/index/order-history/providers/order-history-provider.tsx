import { createContext, useContext, useEffect, useState } from "react";
import { Order, OrderService } from "../../../../lib/repo/order.repo";
import { useAuth } from "../../../../lib/providers/auth-provider";
import { Pagination } from "../../../../lib/repo/crud.repo";

export const OrderContext = createContext<
  Partial<{
    listOrder: Order[];
    setListOrder: Function;
    pagination: Pagination;
    setPagination: Function;
  }>
>({});

export function OrderProvider({ children }: any) {
  const [listOrder, setListOrder] = useState<Order[]>(null);
  const { user } = useAuth();
  const [pagination, setPagination] = useState<Pagination>({
    limit: 10,
    page: 1,
    total: 0,
  });

  useEffect(() => {
    loadListOrder();
  }, []);

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

  return (
    <OrderContext.Provider
      value={{
        listOrder,
        setListOrder,
        pagination,
        setPagination,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrderContext = () => useContext(OrderContext);
