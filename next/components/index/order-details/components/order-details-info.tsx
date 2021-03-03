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
      title: 'Địa chỉ giao hàng',
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
        <div className="border-t-2 sm:border-2 border-gray-200 md:rounded p-4 sm:p-3 m-0 sm:m-1.5 md:m-2.5 min-w-full sm:min-w-xs md:min-w-2xs xl:min-w-xs sm:max-w-2xs md:max-w-2xs lg:max-w-2xs info" key={index}>
          <div className="text-lg text-primary font-normal md:font-medium lg:font-bold mb-1 lg:mb-2">{info.title}</div>
          <div className="text-gray-700 font-bold lg:font-semibold mb-0 lg:mb-1">{info.text}</div>
          <div className="text-gray-600 text-sm ">{info.subtext}</div>
        </div>
      )
    }
    <style jsx>{`
      .info:last-child {
        border-bottom: 2px solid #e5e7eb;
        margin-right: 0px;
      }
    
    `}
    </style>

  </div>
}