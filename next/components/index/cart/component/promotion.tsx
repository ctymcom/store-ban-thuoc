import { useState } from "react";

export function Promotion(props) {

    const [code, setCode] = useState('')

    const returnPromotionCode = () => {
        console.log(props)
        if (props.PrUsing) props.setPrUsing(null)
        else
            props.setPrUsing({
                code,
            })
    }
    return (<>
        <div className="flex border-b-4 pb-2 mt-2.5 items-center">
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="15.976" height="20" viewBox="0 0 15.976 20">
                <g id="Group_38413" data-name="Group 38413" transform="translate(-128.171 -28.673)">
                    <path id="Path_10591" data-name="Path 10591" d="M162.1,59.3l-2.276-9.672a.245.245,0,0,0-.475-.006L156.5,60.427a.245.245,0,0,0,.29.3l5.121-1.138A.245.245,0,0,0,162.1,59.3Z" transform="translate(-17.96 -13.164)" fill="#42b54a" />
                    <g id="Group_38412" data-name="Group 38412" transform="translate(128.171 28.673)">
                        <path id="Path_10592" data-name="Path 10592" d="M138.948,58.923c.294.077.511-.166.591-.473l0-.014a.55.55,0,0,0-.294-.719c-.294-.077-.507.152-.591.473l0,.014A.55.55,0,0,0,138.948,58.923Z" transform="translate(-134.8 -47.079)" fill="#42b54a" />
                        <path id="Path_10593" data-name="Path 10593" d="M141.168,33.237,138,29.019a.866.866,0,0,0-1.044-.272l-4.744,2.109a.866.866,0,0,0-.486.573L128.2,44.966A.865.865,0,0,0,128.745,46l7.341,2.622a.866.866,0,0,0,1.122-.573l4.1-14.05A.866.866,0,0,0,141.168,33.237ZM131.3,39.623l0-.014a1.208,1.208,0,0,1,1.489-.917,1.189,1.189,0,0,1,.838,1.512l0,.014a1.208,1.208,0,0,1-1.489.917A1.189,1.189,0,0,1,131.3,39.623Zm4.628,3.8,0,.014a1.207,1.207,0,0,1-1.489.917,1.189,1.189,0,0,1-.838-1.512l0-.014a1.208,1.208,0,0,1,1.489-.917A1.189,1.189,0,0,1,135.932,43.42Zm.1-3.521a.368.368,0,0,1-.132.2l-4.15,3.382a.34.34,0,0,1-.318.07.323.323,0,0,1-.237-.405.352.352,0,0,1,.133-.2l4.149-3.382a.34.34,0,0,1,.318-.07A.323.323,0,0,1,136.036,39.9Zm.767-8.234a.959.959,0,1,1,.96-.959A.959.959,0,0,1,136.8,31.665Z" transform="translate(-128.171 -28.673)" fill="#42b54a" />
                        <path id="Path_10594" data-name="Path 10594" d="M145.527,66.5c-.293-.077-.507.152-.591.473l0,.014a.55.55,0,0,0,.294.719c.294.077.511-.165.591-.473l0-.014A.55.55,0,0,0,145.527,66.5Z" transform="translate(-138.781 -52.651)" fill="#42b54a" />
                    </g>
                </g>
            </svg>
            <p className="uppercase px-2">Mã khuyến mãi</p>
        </div>
        <div className="py-4 w-full">
            {
                props.promotion ? (
                    <div>
                        <h4 className="text-xl text-primary font-semibold">
                            Mã ưu đãi {props.promotion.code}</h4>
                        <p>Giảm giá: {props.promotion.value}%</p>
                    </div>
                ) : (
                        <div>
                            <input id="Input__Promotion"
                                className="block w-full border-2 border-gray-300 rounded my-3 px-2 py-1"
                                type="text"
                                placeholder="Nhập mã ưu đãi"
                                value={code}
                                onChange={(e) => setCode(e.target.value)} />
                        </div>
                    )
            }
        </div>
        <button onClick={() => returnPromotionCode()} type="button"
            className="border-2 border-gray-300 rounded bg-gray-200 w-full text-gray-400 py-1 px-2 text-center">
            {props.promotion ? "Hủy áp dụng" : "Áp dụng"}
        </button>
    </>)
}