import { ProfileUser } from '../../order-history/component/profile-user';

export function ProfileAccount() {
    return <>
        <div className="main-container h-auto">
            <div className="grid grid-rows-1">
                <div className="oder-account w-full flex justify-between my-28">
                    <div className="account__user w-1/4">
                        <ProfileUser activeIndex={1} />
                    </div>
                    <div className="oder-history w-3/5">
                        Profile Account
                    </div>
                </div>
            </div>
        </div>
    </>;
}