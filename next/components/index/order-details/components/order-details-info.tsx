interface PropsType extends ReactProps {
  name: string
  phone: string
  address: string
  deliveryType: string
  deliveryExpectedDate: string
  paymentType: string
  paymentStatus: string
}
export function OrderDetailsInfo(props: PropsType) {

  const infos = [
    {
      title: 'Thông tin giao hàng',
      text: props.name + " - " + props.phone,
      subtext: props.address
    },
    {
      title: 'Hình thức vận chuyển',
      text: props.deliveryType,
      subtext: props.deliveryExpectedDate
    },
    {
      title: 'Phương thức thanh toán',
      text: props.paymentType,
      subtext: props.paymentStatus
    },
  ]

  return <div className="flex flex-wrap -m-3">
    {
      infos.map((info, index) => 
        <div className="border border-gray-400 rounded p-4 m-3 min-w-2xs max-w-xs" key={index}>
          <div className="text-lg text-primary font-bold mb-2">{info.title}</div>
          <div className="text-gray-700 font-semibold mb-1">{info.text}</div>
          <div className="text-gray-600">{info.subtext}</div>
        </div>
      )
    }
  </div>
}