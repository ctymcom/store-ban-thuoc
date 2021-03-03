import { IconHandHeart } from "../../../../public/assets/icons/icon-hand-heart";
import { IconMap } from "../../../../public/assets/icons/icon-map";
import { IconShip } from "../../../../public/assets/icons/icon-ship";
import { IconShoppingOnline } from "../../../../public/assets/icons/icon-shopping-online";
import { useHomeContext } from './../providers/home-provider';
export function HomeFeature() {

  const { features } = useHomeContext()

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
      {
        features.map((feature, index) => 
          <div className="p-6 flex items-center flex-col" key={index}>
            <div className="w-16 h-16">
                {feature.image}
            </div>
            <div className="uppercase py-4 font-semibold text-primary">{feature.title}</div>
            <div className="text-gray-700">
                <p className="text-center">{feature.content}</p>
            </div>
        </div>  
        )
      }
        
    </div>
  )
}