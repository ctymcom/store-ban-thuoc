import { PaginationRound } from "../../shared/utilities/pagination/pagination-round";
import { NotificationList } from "./component/notification-list";

export function NotificationPage () {

    return  <>
            <div className="h-auto w-full lg:w-8/12 xl:w-10/12 ml-0 md:ml-0">
                <div className="">
                    <div className="w-full flex justify-between mt-0 my-28">
                        <div className="notification w-full">
                            <ul className="hidden md:flex border-b-4 justify-center md:justify-start mt-4 lg:mt-0">
                                <li className="">
                                    <p className="uppercase text-base px-3 pb-1.5 border-b-4 border-primary rounded-sm">Tất cả thông báo</p>
                                </li>
                            </ul>
                            <ul className="notification-list w-full h-full pt-0 md:pt-6">
                                <NotificationList/>
                            </ul>
                            <ul className="pavigation-pages flex mt-4 justify-between w-full">
                                <PaginationRound
                                    limit={8}
                                    page={1}
                                    total={143}
                                    onPageChange={(page) => {}}
                                />
                            </ul>
                        </div>
                    </div> 
                </div>
            </div>
    </>;
}