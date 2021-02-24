import { FormProfile } from './component/form-profile';
import { user } from './component/data-profile';
export function ProfileUserPage() {
    return <>
        <div className="w-full">
            <FormProfile user={user}/>
        </div>
    </>;
}