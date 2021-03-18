import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { CheckoutService } from "../../../../lib/repo/checkout.repo";
import { OrderStatusService } from "../../../../lib/repo/order-status.repo";
import { Order, OrderService } from "../../../../lib/repo/order.repo";

export const OrderDetailsContext = createContext<
  Partial<{
    order: Order;
  }>
>({});

export function OrderDetailsProvider(props) {
  const [order, setOrder] = useState<Order>(null);
  const router = useRouter();

  const loadOrderDetails = async (id: string) => {
    setOrder(null);

    let paymentMethods, deliveryMethods, statuses;
    let tasks = [];
    tasks.push(
      CheckoutService.getMethods("getAllPaymentMethod").then((res) => (paymentMethods = res))
    );
    tasks.push(
      CheckoutService.getMethods("getAllDeliveryMethod").then((res) => (deliveryMethods = res))
    );
    tasks.push(
      OrderStatusService.getAll({
        query: {
          limit: 0,
        },
      }).then((res) => (statuses = res.data))
    );
    let tasksResult = await Promise.all(tasks);

    let res = await OrderService.getOne({ id });
    setOrder({
      ...res,
      paymentMethodText: paymentMethods.find((x) => x.code == res.paymentMethod)?.name || "",
      deliveryMethodText: deliveryMethods.find((x) => x.code == res.deliveryMethod)?.name || "",
      statusText: statuses.find((x) => x.code == res.status)?.name || "Không có",
    });
  };

  useEffect(() => {
    let id = router.query["id"] as string;
    if (id) {
      console.log("RHERE", id);
      loadOrderDetails(id);
    } else {
      router.replace("/");
    }
  }, [router.query]);

  return (
    <OrderDetailsContext.Provider value={{ order }}>{props.children}</OrderDetailsContext.Provider>
  );
}

export const useOrderDetailsContext = () => useContext(OrderDetailsContext);
