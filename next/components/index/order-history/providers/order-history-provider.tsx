import { createContext, useContext, useEffect, useState } from "react";
import { Order, OrderService } from "../../../../lib/repo/order.repo";
import { useAuth } from "../../../../lib/providers/auth-provider";
import { Pagination } from "../../../../lib/repo/crud.repo";
import { OrderStatus, OrderStatusService } from "../../../../lib/repo/order-status.repo";
import { useRouter } from "next/router";
import { cloneDeep } from "lodash";

export const OrderHistoryContext = createContext<
  Partial<{
    orders: Order[];
    setListOrder: Function;
    pagination: Pagination;
    setPagination: Function;
    status: string;
    statuses: OrderStatus[];
  }>
>({});

export function OrderProvider({ children }: any) {
  const [orders, setOrders] = useState<Order[]>(null);
  const [statuses, setStatuses] = useState<OrderStatus[]>();
  const [status, setStatus] = useState("");
  const { user } = useAuth();
  const router = useRouter();
  const [pagination, setPagination] = useState<Pagination>({
    limit: 10,
    page: 1,
    total: 0,
  });

  useEffect(() => {
    loadOrderStatus();
  }, []);

  useEffect(() => {
    if (statuses && user) {
      loadListOrder();
    }
  }, [pagination.page, status, statuses, user]);

  useEffect(() => {
    setStatus(router.query["status"] as string);
  }, [router.query]);

  const loadListOrder = () => {
    setOrders(null);
    let statusCode = statuses.find((x) => x.name2 == status)?.code || undefined;
    OrderService.getAll({
      query: {
        limit: pagination.limit,
        page: pagination.page,
        order: { createdAt: -1 },
        filter: { userId: user?.id, status: statusCode },
      },
    }).then((res) => {
      let orders = cloneDeep(res.data);
      orders.forEach(
        (order) =>
          (order.statusText = statuses.find((x) => x.code == order.status)?.name || "Không có")
      );
      setOrders(orders);
      setPagination({ ...pagination, total: res.pagination.total });
    });
  };

  const loadOrderStatus = () => {
    OrderStatusService.getAll({
      query: {
        limit: 0,
      },
    }).then((res) => {
      setStatuses(res.data);
    });
  };

  return (
    <OrderHistoryContext.Provider
      value={{
        orders,
        pagination,
        setPagination,
        status,
        statuses,
      }}
    >
      {children}
    </OrderHistoryContext.Provider>
  );
}

export const useOrdeHistoryContext = () => useContext(OrderHistoryContext);
