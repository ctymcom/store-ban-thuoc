import { FormProfile } from './component/form-profile';

export function ProfileUserPage() {
    return <>
        <div className="main-container h-auto w-full sm:w-9/12 md:w-full ml-0 lg:ml-12 md:mt-12 lg:mt-0">
            <div className="grid grid-rows-1">
                <div className="flex justify-between mt-6 md:mt-0 my-28">
                    <div className="w-full">
                        <FormProfile />
                    </div>
                </div>
            </div>
        </div>
    </>;
}