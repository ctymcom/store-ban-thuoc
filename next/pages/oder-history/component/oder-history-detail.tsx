import { NavigationPages } from "./navigation-pages";
import { OderHisttoryList } from "./oder-history-list";


export function OderHistoryDetail() {
    return <>
        <ul className="oder-history__list flex justify-between  border-b-4 pb-1">
            <li className="oder-history__item">
                <a href="#" className="oder-history__link uppercase font-semibold text-sm px-3 border-b-4 pb-1.5 text-success border-success">Tất cả</a>
            </li>
            <li className="oder-history__item hover:border-success">
                <a href="#" className="oder-history__link uppercase font-semibold text-sm px-3 hover:text-success">Chờ xác nhận</a>
            </li>
            <li className="oder-history__item">
                <a href="#" className="oder-history__link uppercase font-semibold text-sm px-3 hover:text-success">Đang giao</a>
            </li>
            <li className="oder-history__item">
                <a href="#" className="oder-history__link uppercase font-semibold text-sm px-3 hover:text-success">Đã giao</a>
            </li>
            <li className="oder-history__item">
                <a href="#" className="oder-history__link uppercase font-semibold text-sm px-3 hover:text-success">Đã hủy</a>
            </li>
        </ul>
        <div className="oder-history__info-list">
            <OderHisttoryList/>
        </div>
        <ul className="navigation-pages flex ">
            <NavigationPages/>
        </ul>
    </>;
}