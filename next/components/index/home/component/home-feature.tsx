import { IconHandHeart } from "../../../../public/assets/icons/icon-hand-heart";
import { IconMap } from "../../../../public/assets/icons/icon-map";
import { IconShip } from "../../../../public/assets/icons/icon-ship";
import { IconShoppingOnline } from "../../../../public/assets/icons/icon-shopping-online";
export function HomeFeature() {

  const features = [
    {
      title: 'Miễn phí giao vận',
      icon: <IconShip />,
      desc: 'Miễn phí vận chuyển cho các đơn hàng trên 300,000VNĐ và nhận hàng nhanh chóng.'
    },
    {
      title: 'TẬN TÂM PHỤC VỤ',
      icon: <IconHandHeart />,
      desc: `Dịch vụ chăm sóc khách hàng chuyên nghiệp luôn sẵn sàng giải đáp mọi thắc mắc của bạn. Hotline miễn phí: 1800 6821`
    },
    {
      title: 'CỬA HÀNG GẦN BẠN',
      icon: <IconMap />,
      desc: `ThuocSi.vn đang mở rộng hệ thống cửa hàng gần bạn để chăm sóc bạn tốt hơn. Hãy ghé thăm và trải nghiệm nhé!`
    },
    {
      title: 'MUA HÀNG TRỰC TUYẾN',
      icon: <IconShoppingOnline />,
      desc: 'Giá bán trên trang chỉ áp dụng khi mua sắm trên trang thương mại điện tử của ThuocSi.vn'
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
      {
        features.map((feature, index) => 
          <div className="p-6 flex items-center flex-col" key={index}>
            <div className="w-16 h-16">
                {feature.icon}
            </div>
            <div className="uppercase py-4 font-semibold text-primary">{feature.title}</div>
            <div className="text-gray-700">
                <p className="text-center">{feature.desc}</p>
            </div>
        </div>  
        )
      }
        
    </div>
  )
}