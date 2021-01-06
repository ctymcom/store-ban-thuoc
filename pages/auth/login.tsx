import LoginPage from '../../next/pages/login/login-page';
import { NonAuthMiddleware } from '../../next/providers/auth-provider';

export default () => {
    return <>
      <LoginPage />
    </>
}

export const getServerSideProps = NonAuthMiddleware();