import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { LOGIN_PATHNAME, useAuth } from "../../../../lib/providers/auth-provider";
import { useToast } from "../../../../lib/providers/toast-provider";
import useDevice from "./../../../../lib/hooks/useDevice";

interface PropsType extends ReactProps {
  setMode: Function;
}
export function Login(props: PropsType) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const { isDesktop } = useDevice();
  const router = useRouter();

  const ref = useCallback((input) => {
    if (input && isDesktop) input.focus();
  }, []);

  const toast = useToast();

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.info("Yêu cầu nhập đầy đủ thông tin");
    } else {
      login(username, password, "user")
        .then((res) => {
          let pathname = sessionStorage.getItem(LOGIN_PATHNAME);
          router.replace(pathname || "/");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <form className="flex flex-col items-center animate-emerge" onSubmit={onFormSubmit}>
      <div className="uppercase text-primary font-bold text-center text-lg">Đăng nhập</div>
      <input
        className="form-input mt-8 min-w-2xs sm:min-w-xs"
        placeholder="Tên đăng nhập hoặc Email"
        ref={ref}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="form-input mt-4 min-w-2xs sm:min-w-xs"
        placeholder="Mật khẩu"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="w-full flex flex-col items-center mt-4">
        <button type="submit" className="btn-primary btn-lg w-full">
          Đăng nhập
        </button>
        <div className="flex justify-between mt-2 w-full">
          <button
            type="button"
            className="btn-default hover:underline"
            onClick={() => props.setMode("register")}
          >
            Đăng ký
          </button>
          <button
            type="button"
            className="btn-default hover:underline"
            onClick={() => props.setMode("recovery")}
          >
            Quên mật khẩu
          </button>
        </div>
      </div>
    </form>
  );
}
