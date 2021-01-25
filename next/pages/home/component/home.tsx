import { IconHandHeart } from "../../../lib/svg/icon-hand-heart";
import { IconMap } from "../../../lib/svg/icon-map";
import { IconShip } from "../../../lib/svg/icon-ship";
import { IconShoppingOnline } from "../../../lib/svg/icon-shopping-online";
import { NewsData } from "./news-data";
import { ProductData } from "../../../components/shared/product/data/product-data";
import { HomeData } from "../data/home-data";
import { Carousel } from "../../../components/shared/carousel";
import { ProductList } from "../../../components/shared/product/product-list";
import { SectionHeader } from "./section-header";
export function Home() {
  return (
    <>
      <Carousel infinite autoPlay={3000} animationSpeed={1000}>
        {HomeData.sliderImages.map((image, index) => (
          <img key={index} src={image} alt="" />
        ))}
      </Carousel>
      <div className="container-1 grid grid-cols-3 gap-3 py-12">
        {HomeData.bannerImages.map((image, index) => (
          <img key={index} src={image} alt="" />
        ))}
      </div>
      <div className="container-1 py-8">
        <SectionHeader text="Sản phẩm bán chạy" />
        <ProductList />
      </div>
      <div className="container-1 py-8">
        <div className="justify-center w-full">
          <h6 className="uppercase text-center">Sản phẩm mới</h6>
        </div>
        <ProductList />
      </div>
      <div className="container-1 py-8">
        <div className="justify-center w-full">
          <h6 className="uppercase text-center">Chỉ có tại khothuocsi.vn</h6>
        </div>
        <ProductList />
      </div>
      <div className="container-1 py-8">
        <div className="justify-center w-full">
          <h6 className="uppercase text-center">Lựa chọn của bạn</h6>
        </div>
        <ProductList />
      </div>
      <div className="container-1 flex py-8">
        <div className="p-4 flex items-center flex-col">
          <div className="w-16">
            <IconShip />
          </div>
          <div className="uppercase py-4 text-green-400">Miễn phí giao vận</div>
          <div className="descrip">
            <p className="text-center">
              Miễn phí vận chuyển cho các đơn hàng trên 300,000VNĐ và nhận hàng nhanh chóng.
            </p>
          </div>
        </div>
        <div className="border-l"></div>
        <div className="p-4 flex items-center flex-col">
          <div className="w-16">
            <IconHandHeart />
          </div>
          <div className="uppercase py-4 text-green-400">TẬN TÂM PHỤC VỤ</div>
          <div className="descrip">
            <p className="text-center">
              Dịch vụ chăm sóc khách hàng chuyên nghiệp luôn sẵn sàng giải đáp mọi thắc mắc của bạn.
              Hotline miễn phí: 1800 6821
            </p>
          </div>
        </div>
        <div className="border-l"></div>
        <div className="p-4 flex items-center flex-col">
          <div className="w-16">
            <IconMap />
          </div>
          <div className="uppercase py-4 text-green-400">CỬA HÀNG GẦN BẠN</div>
          <div className="descrip">
            <p className="text-center">
              Pharmacity đang mở rộng hệ thống cửa hàng gần bạn để chăm sóc bạn tốt hơn. Hãy ghé
              thăm và trải nghiệm nhé!
            </p>
          </div>
        </div>
        <div className="border-l"></div>
        <div className="p-4 flex items-center flex-col">
          <div className="w-20">
            <IconShoppingOnline />
          </div>
          <div className="uppercase py-4 text-green-400">MUA HÀNG TRỰC TUYẾN</div>
          <div className="descrip">
            <p className="text-center">
              Giá bán trên trang chỉ áp dụng khi mua sắm trên trang thương mại điện tử của
              Pharmacity.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full py-8">
        <img
          src="https://scontent-sin6-3.xx.fbcdn.net/v/t1.15752-9/141910721_420388555702107_6501062765822356905_n.png?_nc_cat=110&ccb=2&_nc_sid=ae9488&_nc_ohc=7sMouzaypgYAX84T7oT&_nc_ht=scontent-sin6-3.xx&oh=ed4e5bdb35b5240951c2b4e49569d54e&oe=602FCB5F"
          alt=""
        />
      </div>
      <div className="container-1 py-8">
        <div className="justify-center w-full">
          <h6 className="uppercase text-center">Tin mới nhất</h6>
        </div>
        <div className="grid grid-cols-4 gap-8 py-8">
          {NewsData.map((item, index) => {
            return (
              <div className="flex items-center flex-col cursor-pointer hover:shadow" key={index}>
                <div className="img">
                  <img src={item.img} alt="" className="w-full h-auto" />
                </div>
                <div className="px-4 py-3 h-16">
                  <p className="text-center text-sm">{item.title}</p>
                </div>
                <div className="px-4 py-3">
                  <p className="text-center text-xs text-gray-400">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
