interface PropsType extends ReactProps {
  id: string
  status: 'success'
}
export function OrderDetailsHeader(props: PropsType) {
  return <div className="flex justify-between border-b-2 border-primary-300 pb-2">
    <span className="text-gray-700 uppercase font-semibold">ID Đơn hàng: {props.id}</span>
    <span className="text-primary uppercase font-semibold">{props.status == 'success' && 'Đặt hàng thành công'}</span>
  </div>
}