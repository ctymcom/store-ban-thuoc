import { SectionHeader } from "./section-header"
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im'
import { NewsCard } from './../../../shared/news/news-card';

export function HomeNews() {

  const newsList = [
    {
      title: 'Sơ cứu kịp thời, không lo về giá – Sale đỉnh mùa Giáng sinh',
      createdAt: new Date(),
      description: 'Chăm sóc toàn diện cho vết thương Nhờ sự có mặt lâu đời Chăm sóc toàn diện cho vết thương Nhờ sự có mặt lâu đờiChăm sóc toàn diện cho vết thương Nhờ sự có mặt lâu đời',
      img: 'https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.15752-9/139744858_462665754753451_1282920204244320868_n.png?_nc_cat=110&ccb=2&_nc_sid=ae9488&_nc_ohc=nt8NK6JnxEYAX_oN1iS&_nc_ht=scontent.fsgn5-3.fna&oh=0e5d3b425a1bcb00f37d815594ce7d1e&oe=6031FDA7'
    },
    {
      title: 'Năm 2020 đầy biến động sắp khép lại, năm mới này hãy trao nhau những món quà',
      createdAt: new Date(),
      description: 'Một năm mới lại đến, ai cũng mong muốn dành những điều tốt đẹp đến Một năm mới lại đến, ai cũng mong muốn dành những điều tốt đẹp đến',
      img: 'https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.15752-9/139693067_800009700587344_2814185635710777702_n.png?_nc_cat=107&ccb=2&_nc_sid=ae9488&_nc_ohc=eFAVzgWkrLQAX--rpPQ&_nc_ht=scontent.fsgn5-1.fna&oh=fc2742d8968383de9aa434358fa7a8c2&oe=6030D76F'
    },
    {
      title: 'Mật ong, sữa ong chúa thì ai cũng biết, nhưng keo ong là gì và có công dụng như thế nào?',
      createdAt: new Date(2020),
      description: 'Loài ong đem đến nhiều sản phẩm quý giá cho sức khỏe con người, trong Một năm mới lại đến, ai cũng mong muốn dành những điều tốt đẹp đến',
      img: 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.15752-9/141023223_684403858865812_390893860291851543_n.png?_nc_cat=111&ccb=2&_nc_sid=ae9488&_nc_ohc=Ur29kdDmCcwAX_eRDDw&_nc_ht=scontent-sin6-1.xx&oh=4de46e43d4fab152db1e6d97aee8205b&oe=6031E3AC'
    },
    {
      title: 'Tưng bừng năm mới, đổi quà liền tay',
      createdAt: new Date(2020),
      description: 'Than hoạt tính – Cứu tinh cho da đầu nhờn, ngứa và gàu Căng thẳng, Một năm mới lại đến, ai cũng mong muốn dành những điều tốt đẹp đến',
      img: 'https://scontent.fsgn5-7.fna.fbcdn.net/v/t1.15752-9/140117741_447345979777618_5715237662382296802_n.png?_nc_cat=103&ccb=2&_nc_sid=ae9488&_nc_ohc=biLokEYQil4AX9qhu4Q&_nc_ht=scontent.fsgn5-7.fna&oh=7179f2d8141e3fc1a69b901d4891deeb&oe=6032DBD3'
    },
  ]

  return (
    <>
      <SectionHeader text="Tin mới nhất" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {
          newsList.map((news, index) => 
            <NewsCard {...news}/>
          )
        }
      </div>
      <div className="flex-center mt-4">
        <button className="btn-outline rounded-full is-primary h-12 w-48">
          Xem tất cả
        </button>
      </div>
    </>
  )
}