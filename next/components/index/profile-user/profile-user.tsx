import { FormProfile } from './component/form-profile';

export function ProfileUserPage() {
    return <>
        <div className="main-container h-auto w-9/12 ml-5">
            <div className="grid grid-rows-1">
                <div className="flex justify-between mt-0 my-28">
                    <div className="w-full">
                        <FormProfile />
                    </div>
                </div>
            </div>
        </div>
    </>;
}