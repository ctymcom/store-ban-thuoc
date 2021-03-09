import { useRouter } from "next/router";
import { MutableRefObject, useCallback, useRef, useState } from "react";
import useDevice from "../../../../lib/hooks/useDevice";
import { useAuth } from "../../../../lib/providers/auth-provider";
import { useToast } from "../../../../lib/providers/toast-provider";
import { Button } from "../../../shared/utilities/form/button";
import { Form } from "./../../../shared/utilities/form/form";

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
  const [loading, setLoading] = useState(false);

  const onFormSubmit = async () => {
    if (!email) {
      toast.info("Yêu cầu nhập đầy đủ thông tin");
    } else {
      setLoading(true);
      recoveryPassword(email)
        .then((res) => {
          toast.success("Vui lòng kiểm tra email để hồi phục lại mật khẩu.", { autoClose: 8000 });
          props.setMode("login");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Nhận email lấy mật khẩu thất bại. " + err.message);
          setLoading(false);
        });
    }
  };

  return (
    <Form className="flex flex-col items-center animate-emerge" onSubmit={onFormSubmit}>
      <div className="uppercase text-primary font-bold text-center text-lg">Quên mật khẩU</div>
      <input
        ref={ref}
        className="form-input mt-4 min-w-2xs sm:min-w-xs"
        placeholder="Email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="w-full flex flex-col items-center mt-4">
        <Button
          primary
          large
          type="submit"
          className="w-full mt-4"
          text="Gửi email quên mật khẩu"
          isLoading={loading}
        />
        <div className="flex justify-center mt-2 w-full">
          <Button
            default
            className="hover:underline"
            text="Quay lại đăng nhập"
            onClick={() => props.setMode("login")}
          />
        </div>
      </div>
    </Form>
  );
}
