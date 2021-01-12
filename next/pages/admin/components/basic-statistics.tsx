import { statistic_data } from '../components/basic-statistics-data'
export function BasicStatistics() {
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
                    <div className="container-statistics p-4 mt-1 flex">
                        {statistic_data.map((item, index) => {
                            return (
                                <>
                                    <div key={index} className="item-statistic w-48 max-w-xl p-2 m-2 hover:shadow">
                                        <div className="infor text-center">
                                            <div className="title">
                                                <p className=''>{item.title}</p>
                                            </div>
                                            <div className="data-infor pt-2 text-red-600">
                                                <p className='text-3xl text-red-500 font-bold'>{item.data}</p>
                                                <p className=' text-red-500 text-sm'>{item.unit}</p>
                                            </div>
                                        </div>
                                        <div className={item.growth < 0 ? "growth bg-gray-100 rounded-lg h-16 mt-5" : "growth bg-red-100 rounded-lg h-16 mt-5"}>
                                            <div className="growth-infor p-2">
                                                <p className="text-yellow-600 text-sm">{item.growth < 0 ? `Giảm ${item.growth}%` : `Tăng ${item.growth}%`}</p>
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