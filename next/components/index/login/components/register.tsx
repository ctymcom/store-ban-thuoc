import { useRouter } from "next/router";
import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { LOGIN_PATHNAME, useAuth } from "../../../../lib/providers/auth-provider";
import { useToast } from "../../../../lib/providers/toast-provider";
import { RadioButton } from "../../../shared/form/radio-button";
import { Button } from "../../../shared/utilities/form/button";
import useDevice from "./../../../../lib/hooks/useDevice";
import { Form } from "./../../../shared/utilities/form/form";
import { DatePicker } from "../../../shared/utilities/form/date";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

interface PropsType extends ReactProps {
  setMode: Function;
  recaptchaRef: MutableRefObject<any>;
}
let token = "";
export function Register(props: PropsType) {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [repass, setRepass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const [aritoRegisInput, setAritoRegisInput] = useState({
    password: "",
    birthday: "",
    companyType: "",
    companyName: "",
  });
  const { register } = useAuth();
  const { isDesktop } = useDevice();
  const router = useRouter();

  useEffect(() => {
    if (router.query["email"]) {
      setEmail(router.query["email"] as string);
      router.replace("/login");
    }
  }, [router.query]);
  const [timeOut, setTimeOut] = useState(null);

  useEffect(() => {
    clearTimeout(timeOut);
    let timeout = null;
    timeout = setTimeout(function () {
      if (repass !== aritoRegisInput.password) {
        toast.error("Mật khẩu nhập lại chưa đúng");
      }
    }, 1000);
    setTimeOut(timeout);
  }, [repass]);

  const ref = useCallback((input) => {
    if (input && isDesktop) input.focus();
  }, []);

  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const onFormSubmit = async () => {
    const { password, birthday, companyType, companyName } = aritoRegisInput;
    if (!nickname || !email || !phone || !password || !birthday || !companyType || !companyName) {
      toast.info("Quý Khách vui lòng nhập đầy đủ các thông tin");
      return;
    }

    try {
      setLoading(true);
      if (!token) {
        token = await props.recaptchaRef.current.executeAsync();
      }
      await register(nickname, email, phone, password, birthday, companyType, companyName);
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
        className="form-input mt-4"
        placeholder="Số điện thoại"
        type="phone"
        name="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <DatePicker
        className="mt-4 min-w-2xs sm:min-w-xs"
        name="date"
        placeholder="Ngày sinh (dd/mm/yyyy)"
        value={aritoRegisInput.birthday}
        onChange={(e) => setAritoRegisInput({ ...aritoRegisInput, birthday: e })}
      />
      <div className="w-full relative overflow-hidden">
        <input
          className="form-input mt-4 min-w-2xs sm:min-w-xs"
          placeholder="Mật khẩu"
          type={showPass ? "text" : "password"}
          name="password"
          value={aritoRegisInput.password}
          onChange={(e) => setAritoRegisInput({ ...aritoRegisInput, password: e.target.value })}
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
      <div className="w-full relative overflow-hidden">
        <input
          className="form-input mt-4 min-w-2xs sm:min-w-xs"
          placeholder="Nhập lại mật khẩu"
          type={showRePass ? "text" : "password"}
          name="password"
          value={repass}
          onChange={(e) => setRepass(e.target.value)}
        />
        {showRePass ? (
          <Button
            className="absolute flex flex-col pb-1 -right-2 top-5"
            onClick={() => setShowRePass(!showRePass)}
            icon={<HiOutlineEyeOff />}
          />
        ) : (
          <Button
            className="absolute flex flex-col pb-1 -right-2 top-5"
            onClick={() => setShowRePass(!showRePass)}
            icon={<HiOutlineEye />}
          />
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-3 justify-between">
        <p>Hình thức kinh doanh</p>
        <RadioButton
          label="Nhà thuốc"
          name="companyType"
          id="1"
          onClick={(e) => setAritoRegisInput({ ...aritoRegisInput, companyType: e.target.id })}
        />
        <RadioButton
          label="Phòng khám"
          name="companyType"
          id="2"
          onClick={(e) => setAritoRegisInput({ ...aritoRegisInput, companyType: e.target.id })}
        />
        <RadioButton
          label="Trình dược viên"
          name="companyType"
          id="3"
          onClick={(e) => setAritoRegisInput({ ...aritoRegisInput, companyType: e.target.id })}
        />
      </div>
      <input
        className="form-input mt-4 min-w-2xs sm:min-w-xs"
        placeholder="Tên nhà thuốc, quầy thuốc hoặc phòng khám"
        type="text"
        name="text"
        value={aritoRegisInput.companyName}
        onChange={(e) => setAritoRegisInput({ ...aritoRegisInput, companyName: e.target.value })}
      />
      <div className="w-full flex flex-col items-center mt-4">
        <Button primary large submit className="w-full mt-4" text="Đăng ký" isLoading={loading} />
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
