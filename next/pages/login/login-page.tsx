import { useRouter } from 'next/router';

import { Button } from '../../components/shared/form/button';
import { Input } from '../../components/shared/form/input';
import { firebase } from '../../lib/firebase-client';
import { SetAuthToken } from '../../lib/graphql/auth.link';
import { UserRepository } from '../../lib/repo/user.repo';

export default function LoginPage() {
  const userLogin: any = {}
  const imageLink = "https://guvaedu.com/public/images-thumbnail/san-pham/khoa-hoc-avatarlhmsize-300-300-0.jpg";
  const userRepo = new UserRepository();
  const router = useRouter();
  const login = async () => {
    const { email, password } = userLogin;
    firebase.auth().signInWithEmailAndPassword(email, password).then(async state => {
      const token = await state.user.getIdToken();
      const loginData = await userRepo.login(token);
      SetAuthToken(loginData.token);
      router.push('/');
    })
  }
    return <>
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div
        className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800"
      >
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={imageLink}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={imageLink}
              alt="Office"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1
                className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200"
              >
                Đăng nhập
              </h1>
              <form>
                <Input 
                  name="email"
                  label="Email"
                  placeholder="admin@gmail.com"
                  required={true}
                  inputType="email"
                  onChanged={value => userLogin.email = value}
                />
                <Input 
                  name="password"
                  label="Mật khẩu"
                  placeholder="***************"
                  required={true}
                  inputType="password"
                  onChanged={value => userLogin.password = value}
                />
                <Button text="Đăng nhập" onClick={login} />
              </form>
              <hr className="my-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
}