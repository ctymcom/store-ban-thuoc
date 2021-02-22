import { FormProfile } from './component/form-profile';
import { user } from './component/data-profile';
import Link from 'next/link';
import { ProfileUserLayout } from '../../../layouts/profile-user-layout';
export function ProfileUserPage() {
    return <>
        <div className="main-container h-auto w-9/12 ml-5">
            <FormProfile user={user}/>
        </div>
    </>;
}