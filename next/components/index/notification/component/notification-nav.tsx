import Link from "next/link";


export function NotificationNav() {
    return <>
            <ul className="notification__list flex border-b-4 pb-1 space-x-20 mb-4">
                <li className="notification__item">
                    <Link href="/profile/notification">
                        <a className="notification__link uppercase text-lg px-3 border-b-4 pb-1.5 text-primary border-primary">Tất cả thông báo</a>
                    </Link>
                    
                </li>
                
            </ul>
    </>;
}