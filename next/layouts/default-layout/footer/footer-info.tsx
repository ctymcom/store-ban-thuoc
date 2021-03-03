import { useState } from "react";

interface PropsType extends ReactProps {
  item?: any
}

export function FooterInfo({ item }:PropsType) {
  const [ShowMore, setShowMore] = useState(false);
  console.log(item);
  
  return <>
      <p className="sm:py-1 md:pb-4 md:leading-7 text-sm sm:text-base md:text-lg">
        Thuocsi.vn được thành lập từ năm 2018, là một trong những startup thành công trong lĩnh vực công nghệ về y tế
      </p>
      <p className="mt-4 md:mt-0 sm:mb-8 md:mb-4 md:leading-7 text-sm sm:text-base md:text-lg">
        Hiện tại là cổng điện tử cung cấp thuốc cho hơn 1.000 nhà thuốc và phòng khám trên
        khắp Việt Nam.
      </p>
      {ShowMore ? (
        <>
          <p className="mt-4 sm:-mt-3.5 md:mt-0 sm:mb-9 md:mb-4 md:leading-7 text-sm sm:text-base md:text-lg">
            Là một trong những nơi làm việc thu hút các tài năng trẻ với đam mê ứng dụng công
            nghệ 4.0 vào nền Y Tế
                      </p>
        </>
      ) : (
          ""
        )}
      <p
        className="text-yellow-400 cursor-pointer mt-4 sm:-mt-4 md:mt-0 text-sm sm:text-base md:text-lg"
        onClick={() => {
          setShowMore(!ShowMore);
        }}
      >
        {ShowMore ? "Thu gọn" : "Tìm hiểu thêm"}
      </p>
  </>;
}