import { PaginationRound } from "../../shared/utilities/pagination/pagination-round";
import { NotificationList } from "./component/notification-list";
import { NotificationNav } from "./component/notification-nav";
export function NotificationPage () {
    return  <>
            <div className="h-auto w-9/12 ml-4">
                <div className="grid grid-rows-1">
                    <div className="w-full flex justify-between mt-0 my-28">
                        <div className="notification">
                            <NotificationNav/>
                            <ul className="notification-list">
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