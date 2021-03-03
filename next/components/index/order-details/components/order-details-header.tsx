interface PropsType extends ReactProps {
  id: string
  status: 'success'
}
export function OrderDetailsHeader(props: PropsType) {
  return <div className="flex flex-col lg:flex-row justify-between border-b-4 border-primary-300 pb-2">
    <span className="text-gray-700 uppercase font-semibold mb-0.5 lg:mb-0">ID Đơn hàng: {props.id}</span>
    <span className="text-primary uppercase font-semibold">{props.status == 'success' && 'Đặt hàng thành công'}</span>
  </div>
}