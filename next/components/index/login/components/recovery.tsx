import { useRouter } from "next/router";
import { MutableRefObject, useCallback, useRef, useState } from "react";
import useDevice from "../../../../lib/hooks/useDevice";
import { useAuth } from "../../../../lib/providers/auth-provider";
import { useToast } from "../../../../lib/providers/toast-provider";

interface PropsType extends ReactProps {
  setMode: Function;
}
export function Recovery(props: PropsType) {
  const [email, setEmail] = useState("");

  const { recoveryPassword } = useAuth();
  const { isDesktop } = useDevice();

  const ref = useCallback((input) => {
    if (input && isDesktop) input.focus();
  }, []);

  const toast = useToast();

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.info("Yêu cầu nhập đầy đủ thông tin");
    } else {
      recoveryPassword(email)
        .then((res) => {
          toast.success("Vui lòng kiểm tra email để hồi phục lại mật khẩu.", { autoClose: 8000 });
          props.setMode("login");
        })
        .catch((err) => {
          toast.error("Nhận email lấy mật khẩu thất bại. " + err.message);
        });
    }
  };

  return (
    <form className="flex flex-col items-center animate-emerge" onSubmit={onFormSubmit}>
      <div className="uppercase text-primary font-bold text-center text-lg">Quên mật khẩU</div>
      <input
        ref={ref}
        className="form-input mt-4 min-w-2xs sm:min-w-xs"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="w-full flex flex-col items-center mt-4">
        <button type="submit" className="btn-primary btn-lg w-full">
          Gửi email quên mật khẩu
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
