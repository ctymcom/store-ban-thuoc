
export function NotificationNav() {

    const className = 'uppercase text-base px-3 pb-1.5 border-b-4 border-primary rounded-sm';

    return <>
            <ul className="flex border-b-4 justify-center md:justify-start mt-4 lg:mt-0">
                <li className="">
                    <p className={`${className} hidden md:block`}>Tất cả thông báo</p>
                    <p className={`${className} block md:hidden`}>Thông báo</p>
                </li>
            </ul>
    </>;
}