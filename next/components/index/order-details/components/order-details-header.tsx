interface PropsType extends ReactProps {
  id?: string;
  status?: number;
  listOrderStatus?: any[];
}
export function OrderDetailsHeader({ id, status, listOrderStatus }: PropsType) {
  function showStatusOrder(status) {
    let label = "";
    listOrderStatus?.forEach(function (value) {
      if (value?.code === status) {
        label = value?.name;
      }
      if (status === 0) {
        label = "Không xác định";
      }
    });
    return label;
  }
  return (
    <div className="flex flex-col lg:flex-row justify-between border-b-4 border-primary-300 pb-2">
      <span className="text-gray-700 uppercase font-semibold mb-0.5 lg:mb-0">
        ID Đơn hàng: {id}
      </span>
      <span className="text-primary uppercase font-semibold">
        Tình Trạng: {showStatusOrder(status)}
      </span>
    </div>
  );
}
