import { useState } from "react"
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im'
import useInterval from "../../../../hooks/useInterval"
import { SectionHeader } from "./section-header"


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
  {
    name: 'Nguyễn Ánh Dương',
    title: 'Bác sĩ Tim Mạch',
    avatar: 'https://image.freepik.com/free-photo/young-asian-doctor-woman-holding-folder_1187-24028.jpg',
    content: `Đặt hàng dễ dàng và nhanh chóng, tôi luôn tin cậy chất lượng hàng từ thuocsi.`
  },
  {
    name: 'Tăng Hoàng Dũng',
    title: 'Bác sĩ Tiết niệu',
    avatar: 'https://t4.ftcdn.net/jpg/03/10/37/43/360_F_310374365_fiIJLNqEeYVbXO0PpyUauQvZRreCMEdr.jpg',
    content: `Nhờ thuocsi mà tôi không cần phải phân vân khi cần được cung ứng nguồn thuốc chất lượng đúng lúc.`
  },
]

const partitionArray = (array: any[], size) => array.sort((a, b) => a.content > b.content ? 1 : 0).map((e,i) => (i % size === 0) ? array.slice(i, i + size) : null).filter( (e) => e )

const feedbackGroups = partitionArray(feedbacks, 2)
export function HomeFeedback() {

  const [activeIndex, setActiveIndex] = useState(0);

  useInterval(() => {
    if (activeIndex >= feedbackGroups.length - 1) {
      setActiveIndex(0)
    } else {
      setActiveIndex(index => index + 1)
    }
  }, 5000)

  return (
    <>
      <SectionHeader text="Cảm nhận từ khách hàng"/>
      <div className="relative">
      {
        feedbackGroups.map((group, index) => 
          <div key={index} className={"grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 top-0 " + 
          (index == 0 ? "absolute " : "") + (activeIndex == index ? "animate-emerge" : "opacity-0")}>
            {
              group.map((feedback, index) => 
                <div className="flex flex-col items-center md:flex-row md:items-start p-5 border border-primary rounded" key={index}>
                  <div className="w-16 lg:w-20 flex-shrink-0">
                    <div className="image-wrapper round">
                      <img src={feedback.avatar}/>
                    </div>
                  </div>
                  <div className="pl-0 mt-2 text-center md:pl-4 lg:pl-8 md:mt-0 md:text-left">
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
        )
      }
      </div>
    </>
  )
}