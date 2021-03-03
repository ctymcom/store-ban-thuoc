import { FormProfile } from './components/form-profile';
import { user } from './components/data-profile';
import { useProfileUserContext } from './providers/profile-user-provider';



export function ProfileUserPage() {

    // const { user } = useProfileUserContext();

    return <>
        <div className="w-full">
            <FormProfile/>
        </div>
    </>;
}