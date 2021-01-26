import { ProfileUser } from '../../oder-history/component/profile-user';

export function Notification() {
    return  <>
            <div className="container-1 h-auto">
                <div className="grid grid-rows-1">
                    <div className="oder-account w-full flex justify-between my-28">
                        <div className="account__user w-1/4">
                            <ProfileUser/>
                        </div>
                        <div className="oder-history w-3/5">
                            Notification
                        </div>
                    </div> 
                </div>
            </div>
    </>;
}