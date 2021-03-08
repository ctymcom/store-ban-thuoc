import { useRouter } from "next/router";
import { useState, useCallback, useRef, MutableRefObject } from "react";
import { LOGIN_PATHNAME, useAuth } from "../../../../lib/providers/auth-provider";
import useDevice from "./../../../../lib/hooks/useDevice";
import ReCAPTCHA from "react-google-recaptcha";
import { useToast } from "../../../../lib/providers/toast-provider";

interface PropsType extends ReactProps {
  setMode: Function;
}
export function Register(props: PropsType) {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { register } = useAuth();
  const { isDesktop } = useDevice();
  const router = useRouter();

  const recaptchaRef: MutableRefObject<any> = useRef();

  const ref = useCallback((input) => {
    if (input && isDesktop) input.focus();
  }, []);

  const toast = useToast();

  const onFormSubmit = async (e) => {
    e.preventDefault();
    await recaptchaRef.current.executeAsync();
    if (!nickname || !email || !phone) {
      toast.info("Yêu cầu nhập đầy đủ thông tin");
    } else {
      register(nickname, email, phone)
        .then((res) => {
          toast.success("Đăng ký thành công. Vui lòng kiểm tra email để xem thông tin đăng nhập.");
          let pathname = sessionStorage.getItem(LOGIN_PATHNAME);
          router.replace(pathname || "/");
        })
        .catch((err) => {
          toast.error("Đăng ký thất bại. " + err.message);
        });
    }
  };

  return (
    <form className="flex flex-col items-center animate-emerge" onSubmit={onFormSubmit}>
      <div className="uppercase text-primary font-bold text-center text-lg">Đăng ký</div>
      <input
        className="form-input mt-8 min-w-2xs sm:min-w-xs"
        placeholder="Tên hiển thị"
        ref={ref}
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <input
        className="form-input mt-4 min-w-2xs sm:min-w-xs"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="form-input mt-4 min-w-2xs sm:min-w-xs"
        placeholder="Số điện thoại"
        type="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <div className="w-full flex flex-col items-center mt-4">
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey="6Lf9mHYaAAAAAC6iHPb_CU0qFSq4XFq54BpjTq9B"
        />
        <button type="submit" className="btn-primary btn-lg w-full">
          Đăng ký
        </button>
        <div className="flex justify-center mt-2 w-full">
          <button
            type="button"
            className="btn-default hover:underline"
            onClick={() => props.setMode("login")}
          >
            Quay lại đăng nhập
          </button>
        </div>
      </div>
    </form>
  );
}
