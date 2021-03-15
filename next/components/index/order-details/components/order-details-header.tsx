interface PropsType extends ReactProps {
  code?: string;
  status?: string;
}
export function OrderDetailsHeader({ code, status }: PropsType) {
  return (
    <div className="flex flex-col lg:flex-row justify-between border-b-2 border-primary-300 pb-2">
      <span className="text-gray-700 uppercase font-semibold mb-0.5 lg:mb-0">
        Mã Đơn hàng: {code}
      </span>
      <span className="text-primary uppercase font-semibold">Tình Trạng: {status}</span>
    </div>
  );
}
