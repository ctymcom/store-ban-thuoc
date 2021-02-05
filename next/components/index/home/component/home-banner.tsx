
export function HomeBanner() {

  const banners = [
    {
      image: "https://scontent-sin6-3.xx.fbcdn.net/v/t1.15752-9/141222954_246218120278719_5997877537810110707_n.png?_nc_cat=110&ccb=2&_nc_sid=ae9488&_nc_ohc=N5JqCqaZ5AkAX-OHW6Y&_nc_ht=scontent-sin6-3.xx&oh=9e53fac0abc201ab863fb42569c343b1&oe=60325062",
    },
    {
      image: "https://scontent-sin6-2.xx.fbcdn.net/v/t1.15752-9/141639150_1376730039331224_3415912069657551318_n.png?_nc_cat=108&ccb=2&_nc_sid=ae9488&_nc_ohc=Tbi6IjdbXgIAX-BksVK&_nc_ht=scontent-sin6-2.xx&oh=0263df91ee9e033e494b21a9b4670c5b&oe=602FD3D3",
    },
    {
      image: "https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.15752-9/141205153_1075912362821373_3184814676590729168_n.png?_nc_cat=100&ccb=2&_nc_sid=ae9488&_nc_ohc=QmggNykV2PoAX_tvKkm&_nc_ht=scontent.fsgn5-5.fna&oh=23c70a2e04a4f26d73a1f3f44fbc89ed&oe=60313800",
    },
    {
      image: "https://scontent-sin6-2.xx.fbcdn.net/v/t1.15752-9/141790569_228069908910905_9027221011818501028_n.png?_nc_cat=102&ccb=2&_nc_sid=ae9488&_nc_ohc=DHs-nUkTfFcAX8iog8I&_nc_ht=scontent-sin6-2.xx&oh=bce7ddc72e39e1142335f8b72a08d78a&oe=602FA7DC",
    },
    {
      image: "https://scontent-sin6-2.xx.fbcdn.net/v/t1.15752-9/141531610_670227540313641_4358901841505878016_n.png?_nc_cat=105&ccb=2&_nc_sid=ae9488&_nc_ohc=Zms3pzr8VjQAX85CPjB&_nc_ht=scontent-sin6-2.xx&oh=d203c7618bee1ce82f614ffbd0fb5c96&oe=602E98E8",
    },
    {
      image: "https://scontent-sin6-2.xx.fbcdn.net/v/t1.15752-9/141038697_321624412524295_4311571797850030468_n.png?_nc_cat=105&ccb=2&_nc_sid=ae9488&_nc_ohc=g88YJKDvvmMAX9r7833&_nc_ht=scontent-sin6-2.xx&oh=e9c0b63a0889ad0c00f87f2eaa6110db&oe=6030EB91",
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