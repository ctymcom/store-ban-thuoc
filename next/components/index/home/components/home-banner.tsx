
export function HomeBanner() {
  
  const banners = [
    {
      image: "https://i.imgur.com/GDe9XNf.jpg"
    },
    {
      image: "https://i.imgur.com/bTbcQq3.jpg"
    },
    {
      image: "https://i.imgur.com/BwBrQ3d.jpg"
    },
    {
      image: "https://i.imgur.com/yNbyXbN.jpg"
    },
    {
      image: "https://i.imgur.com/l648sLm.jpg"
    },
    { image: "https://i.imgur.com/ru7DXLg.jpg"
    },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {banners.map((banner, index) => (
          <div className="image-wrapper ratio-16-9" key={index}>
            <img key={index} src={banner.image} alt="" />
          </div>
        ))}
    </div>
  )
}