import { useHomeContext } from './../providers/home-provider';
import LazyLoad from 'react-lazyload';

export function HomeFeature() {

  const { features } = useHomeContext()

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
      {
        features.map((feature, index) => 
          <div className="p-6 flex items-center flex-col" key={index}>
            <div className="w-16 h-16 md:w-20 md:h-20">
              <LazyLoad><img className="w-full h-full object-contain" src={feature.image}></img></LazyLoad>
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