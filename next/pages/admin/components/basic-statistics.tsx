import { statistic_data } from '../components/basic-statistics-data'
export function BasicStatistics(props) {
    return (
        <>
            <div className="wrapper">
                <div className="container">
                    <div className="container-title">
                        <div className="title inline">
                            <h2 className="inline text-xl">Thống kê cơ bản</h2>
                        </div>
                        <div className="time inline">
                            <p className='inline text-xs text-gray-400'> ( Hôm nay 03:00 GMT+7 10:00 )</p>
                        </div>
                        <div className="small-note">
                            <p className='inline text-xs text-gray-400'>Dữ liệu tổng quan</p>
                        </div>
                    </div>
                    <div className="container-statistics p-4 grid grid-cols-4 gap-4">
                        {statistic_data.map((item, index) => {
                            return (
                                <>
                                    <div key={index} className="item-statistic p-2 hover:shadow col">
                                        <div className="infor text-center">
                                            <div className="title">
                                                <p className=''>{item.title}</p>
                                            </div>
                                            <div className="data-infor pt-2 text-primary-600">
                                                <p className='text-3xl text-primary-500 font-bold'>{item.data}</p>
                                                <p className=' text-primary-500 text-sm'>{item.unit}</p>
                                            </div>
                                        </div>
                                        <div className={item.growth < 0 ? "growth bg-gray-100 rounded-lg h-16 mt-5" : "growth bg-primary-100 rounded-lg h-16 mt-5"}>
                                            <div className="growth-infor p-2 flex flex-col justify-center">
                                                <p className="text-secondary-600 text-sm">{item.growth < 0 ? `Giảm ${item.growth}%` : `Tăng ${item.growth}%`}</p>
                                                <p className='text-xs text-gray-500 '>so với cùng kì năm trước</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
