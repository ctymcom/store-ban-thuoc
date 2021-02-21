
export function HomeBanner() {
  
  const banners = [
    {
      image: "https://i.imgur.com/XMTJQSx.png"
    },
    {
      image: "https://i.imgur.com/jriMx2e.jpg"
    },
    {
      image: "https://i.imgur.com/ycOejfb.png"
    },
    {
      image: "https://i.imgur.com/OY7IIUM.png"
    },
    {
      image: "https://i.imgur.com/i9lJPRX.png"
    },
    {
      image: "https://i.imgur.com/y3RgrFT.jpg"
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