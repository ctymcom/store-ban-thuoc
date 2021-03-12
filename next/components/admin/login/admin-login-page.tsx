import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { LOGIN_PATHNAME, useAuth } from "../../../lib/providers/auth-provider";
import { useToast } from "../../../lib/providers/toast-provider";
import { USER_ROLES } from "../../../lib/repo/arito-user.repo";
import { Button } from "../../shared/utilities/form/button";
import { Form } from "./../../shared/utilities/form/form";

export default function AdminLoginPage() {
  const { checkUser, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    checkUser(USER_ROLES.map((x) => x.value)).then((res) => {
      if (res) {
        router.replace("/admin");
      }
    });
  }, []);

  const ref = useCallback((input) => {
    if (input) input.focus();
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const onFormSubmit = () => {
    if (!username || !password) {
      toast.info("Yêu cầu nhập đầy đủ");
    } else {
      setLoading(true);
      login(username, password, "editor")
        .then((res) => {
          let pathname = sessionStorage.getItem(LOGIN_PATHNAME);
          router.replace(pathname || "/admin");
        })
        .catch((err) => {
          toast.error(err.message);
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-center bg-no-repeat bg-cover flex-center bg-primary-light">
        <Form
          className="bg-gray-50 shadow-lg rounded-sm min-h-sm max-w-lg w-2/3 flex flex-col items-center p-8 border border-gray-200"
          onSubmit={onFormSubmit}
        >
          <img className="w-32" src="/assets/img/logo.png/" />
          <div className="text-gray-600 font-semibold text-center text-2xl mt-6 my-4">
            Đăng nhập
          </div>
          <label className="text-gray-700 font-semibold ml-1 mb-1 w-full">Tên tài khoản</label>
          <input
            className="form-input w-full min-w-xs mb-6 border-gray-300 rounded-sm"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            ref={ref}
          />
          <label className="text-gray-700 font-semibold ml-1 mb-1 w-full">Mật khẩu</label>
          <input
            className="form-input w-full min-w-xs mb-8 border-gray-300 rounded-sm"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex">
            <Button primary submit className="h-12 px-8" text="Đăng nhập" isLoading={loading} />
          </div>
        </Form>
      </div>
    </>
  );
}
