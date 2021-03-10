import { useRouter } from "next/router";
import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { LOGIN_PATHNAME, useAuth } from "../../../../lib/providers/auth-provider";
import { useToast } from "../../../../lib/providers/toast-provider";
import { Button } from "../../../shared/utilities/form/button";
import useDevice from "./../../../../lib/hooks/useDevice";
import { Form } from "./../../../shared/utilities/form/form";

interface PropsType extends ReactProps {
  setMode: Function;
  recaptchaRef: MutableRefObject<any>;
}
let token = "";
export function Register(props: PropsType) {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { register } = useAuth();
  const { isDesktop } = useDevice();
  const router = useRouter();

  useEffect(() => {
    if (router.query["email"]) {
      setEmail(router.query["email"] as string);
      router.replace("/login");
    }
  }, [router.query]);

  const ref = useCallback((input) => {
    if (input && isDesktop) input.focus();
  }, []);

  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const onFormSubmit = async () => {
    if (!nickname || !email || !phone) {
      toast.info("Yêu cầu nhập đầy đủ thông tin");
      return;
    }

    try {
      setLoading(true);
      if (!token) {
        token = await props.recaptchaRef.current.executeAsync();
      }
      await register(nickname, email, phone);
      toast.success("Đăng ký thành công. Vui lòng kiểm tra email để xem thông tin đăng nhập.", {
        autoClose: 10000,
      });
      let pathname = sessionStorage.getItem(LOGIN_PATHNAME);
      router.replace(pathname || "/");
    } catch (err) {
      console.error(err);
      toast.error("Đăng ký thất bại. " + err.message);
      setLoading(false);
    }
  };

  return (
    <Form className="flex flex-col items-center animate-emerge" onSubmit={onFormSubmit}>
      <div className="uppercase text-primary font-bold text-center text-lg">Đăng ký</div>
      <input
        className="form-input mt-8 min-w-2xs sm:min-w-xs"
        placeholder="Tên hiển thị"
        ref={ref}
        value={nickname}
        name="nickname"
        onChange={(e) => setNickname(e.target.value)}
      />
      <input
        className="form-input mt-4 min-w-2xs sm:min-w-xs"
        placeholder="Email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="form-input mt-4 min-w-2xs sm:min-w-xs"
        placeholder="Số điện thoại"
        type="phone"
        name="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <div className="w-full flex flex-col items-center mt-4">
        <Button
          primary
          large
          type="submit"
          className="w-full mt-4"
          text="Đăng ký"
          isLoading={loading}
        />
        <div className="flex justify-center mt-2 w-full">
          <Button
            className="hover:underline"
            text="Quay lại đăng nhập"
            onClick={() => props.setMode("login")}
          />
        </div>
      </div>
    </Form>
  );
}
