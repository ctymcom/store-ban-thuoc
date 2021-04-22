import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { LOGIN_PATHNAME, useAuth } from "../../../../lib/providers/auth-provider";
import { useToast } from "../../../../lib/providers/toast-provider";
import { Button } from "../../../shared/utilities/form/button";
import useDevice from "./../../../../lib/hooks/useDevice";
import { Form } from "./../../../shared/utilities/form/form";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

interface PropsType extends ReactProps {
  setMode: Function;
}
export function Login(props: PropsType) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const { login } = useAuth();
  const { isDesktop } = useDevice();
  const router = useRouter();

  const ref = useCallback((input) => {
    if (input && isDesktop) input.focus();
  }, []);

  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const onFormSubmit = () => {
    if (!username || !password) {
      toast.info("Yêu cầu nhập đầy đủ thông tin");
    } else {
      setLoading(true);
      login(username, password, "user")
        .then((res) => {
          let pathname = sessionStorage.getItem(LOGIN_PATHNAME);
          router.replace(pathname || "/");
        })
        .catch((err) => {
          toast.error(err.message);
          setLoading(false);
        });
    }
  };

  return (
    <Form className="flex flex-col items-center animate-emerge" onSubmit={onFormSubmit}>
      <div className="uppercase text-primary font-bold text-center text-lg">Đăng nhập</div>
      <input
        className="form-input mt-8 min-w-2xs sm:min-w-xs"
        placeholder="Email hoặc Số điện thoại"
        ref={ref}
        value={username}
        name="nickname"
        onChange={(e) => setUsername(e.target.value)}
      />

      <div className="w-full relative overflow-hidden">
        <input
          className="form-input mt-4 min-w-2xs sm:min-w-xs"
          placeholder="Mật khẩu"
          type={showPass ? "text" : "password"}
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {showPass ? (
          <Button
            className="absolute flex flex-col pb-1 -right-2 top-5"
            onClick={() => setShowPass(!showPass)}
            icon={<HiOutlineEyeOff />}
          />
        ) : (
          <Button
            className="absolute flex flex-col pb-1 -right-2 top-5"
            onClick={() => setShowPass(!showPass)}
            icon={<HiOutlineEye />}
          />
        )}
      </div>
      <div className="w-full flex flex-col items-center mt-4">
        <Button primary large submit className="w-full mt-4" text="Đăng nhập" isLoading={loading} />
        <div className="flex justify-between mt-2 w-full">
          <Button
            className="hover:underline"
            text="Đăng ký"
            onClick={() => props.setMode("register")}
          />
          <Button
            className="hover:underline"
            text="Quên mật khẩu"
            onClick={() => props.setMode("recovery")}
          />
        </div>
      </div>
    </Form>
  );
}
