import { SectionHeader } from "./section-header"
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im'

export function HomeFeedback() {

  const feedbacks = [
    {
      name: 'Trần Anh Minh',
      title: 'Bác sĩ - Phòng mạch Tai Mũi Họng',
      avatar: 'https://st2.depositphotos.com/1930953/5700/i/600/depositphotos_57007925-stock-photo-asian-doctor.jpg',
      content: `Chất lượng sản phẩm của thuocsi.vn đã được kiểm duyệt đầy đủ với nguồn gốc xuất xứ rõ ràng, đặt hàng dễ dàng và nhanh chóng.`
    },
    {
      name: 'Mai Như Quỳnh',
      title: 'Bác sĩ - Phòng khám tâm lý',
      avatar: 'https://image.freepik.com/free-photo/asian-female-doctor-posing-medicine-specialist_144627-30222.jpg',
      content: `Chị biết và đặt thuocsi được hơn 1 năm, chị có thể dễ dàng xem giá các thuốc và cân chỉnh đơn hàng ngoài ra mỗi ngày đều có sản phẩm mới giúp nhà thuốc đa dạng hơn danh mục hàng.`
    },
  ]

  return (
    <>
      <SectionHeader text="Cảm nhận từ khách hàng"/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {
          feedbacks.map((feedback, index) => 
            <div className="flex p-5 border border-primary rounded" key={index}>
              <div className="w-20 flex-shrink-0">
                <div className="image-wrapper round">
                  <img src={feedback.avatar}/>
                </div>
              </div>
              <div className="pl-8">
                <div className="text-primary text-lg font-bold">{feedback.name}</div>
                <div className="text-gray-800 text-lg font-semibold">{feedback.title}</div>
                <div className="text-gray-700 mt-2 relative">
                  <i className="absolute left-0 top-0 text-primary"><ImQuotesLeft/></i>
                  <p className="px-6">{feedback.content}</p>
                  <i className="absolute right-0 bottom-0 text-primary"><ImQuotesRight/></i>
                </div>
              </div>
          </div>  
          )
        }
      </div>
    </>
  )
}