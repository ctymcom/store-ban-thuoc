import { Icon404Page, Icon500Page } from "../../../lib/svg";

export function Error500() {
    return <>
        <div className="w-full h-screen bg-gray-200">
            <div className="w-full h-full flex items-center justify-center flex-col">
                <div className="p-5">
                    <Icon500Page />
                </div>
                <h1 className='text-5xl text-primary-500'>Error 500</h1>
                <h3 className='text-2xl py-5'>Internal Server Error</h3>
                <div className="btn">
                    <div className="py-3 px-28 bg-primary-500 text-white">
                        Trở về trang chủ
                    </div>
                </div>
            </div>
        </div>
    </>
}