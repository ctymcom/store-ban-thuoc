import { Bar } from 'react-chartjs-2'
export function ChartPoint() {
    return (
        <>
            <div className="wrapper">
                <div className="container ">
                    <div className="title">
                        <h3 className='inline text-xl'>Phân tích số liệu hội viên</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className='inline'>
                            <g id="Group_38506" data-name="Group 38506" transform="translate(-338.163 267.641)">
                                <g id="Group_38500" data-name="Group 38500" transform="translate(340.471 -265.332)">
                                    <path id="Path_10685" data-name="Path 10685" d="M350.468-263.024a7.694,7.694,0,0,1,7.694,7.647,7.682,7.682,0,0,1-7.661,7.736,7.681,7.681,0,0,1-7.723-7.674A7.682,7.682,0,0,1,350.468-263.024Zm.017,1.4a6.307,6.307,0,0,0-6.311,6.22,6.3,6.3,0,0,0,6.28,6.37,6.311,6.311,0,0,0,6.311-6.221A6.3,6.3,0,0,0,350.486-261.628Z" transform="translate(-342.779 263.024)" fill="#9b9b9b" />
                                    <path id="Path_10686" data-name="Path 10686" d="M356.753-248.718q0-1.122,0-2.245c0-.06,0-.12,0-.18a.707.707,0,0,1,.687-.693.684.684,0,0,1,.712.694q.016,2.454,0,4.908a.686.686,0,0,1-.714.693.7.7,0,0,1-.686-.724C356.746-247.082,356.753-247.9,356.753-248.718Z" transform="translate(-349.765 257.43)" fill="#9b9b9b" />
                                    <path id="Path_10687" data-name="Path 10687" d="M357.449-256.032a.708.708,0,0,1,.715.692.7.7,0,0,1-.7.7.7.7,0,0,1-.7-.676A.705.705,0,0,1,357.449-256.032Z" transform="translate(-349.77 259.528)" fill="#9b9b9b" />
                                </g>
                                <g id="Group_38501" data-name="Group 38501" transform="translate(338.163 -267.641)">
                                    <rect id="Rectangle_1716" data-name="Rectangle 1716" width="20" height="20" transform="translate(0 0)" fill="none" />
                                    <rect id="Rectangle_1717" data-name="Rectangle 1717" width="15.385" height="15.385" transform="translate(2.308 2.308)" fill="none" />
                                </g>
                            </g>
                        </svg>

                    </div>
                    <div className="note">
                        <p className='inline text-sm text-gray-400'>Biểu đồ tăng trưởng hội viên theo từng tháng tính tới hiện tại</p>
                    </div>
                    <div className="chart">
                        <div className="container-chart">
                            <Bar
                                height={150}
                                width={300}
                                data={{
                                    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11'],
                                    position: 'bottom',
                                    align: 'left',
                                    datasets: [{
                                        label: 'Số lượng điểm thưởng tích lũy năm nay',
                                        data: [750, 555, 250, 450, 250, 480, 555, 762, 360, 688],
                                        backgroundColor: [
                                            'rgb(231, 77, 61,1)'
                                        ],
                                        borderColor: [
                                            'rgb(231, 77, 61,1)',
                                        ],
                                        borderWidth: 2
                                    },
                                    {
                                        label: 'Số lượng điểm thưởng tích lũy cùng kỳ năm trước',
                                        data: [582, 145, 258, 753, 457, 124, 578, 457, 378, 123],
                                        backgroundColor: [
                                            'rgb(251, 209, 9,1)',
                                        ],
                                        borderColor: [
                                            'rgb(251, 209, 9,1)',
                                        ],
                                        borderWidth: 2
                                    }]
                                }}
                                options={{
                                    responsive: true,
                                    legend: {
                                        position: 'bottom',
                                        align: 'left'
                                    },
                                    scales: {
                                        xAxes: [{
                                            stacked: true,
                                        }],
                                        yAxes: [{
                                            stacked: true
                                        }]
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
