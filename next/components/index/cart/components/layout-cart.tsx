import { HiOutlineChevronRight } from "react-icons/hi";
import router from "next/router";
import { useRouter } from "next/router";
import { useAuth, LOGIN_PATHNAME } from "../../../../lib/providers/auth-provider";
import { useEffect } from "react";
import { Spinner } from "../../../shared/utilities/spinner";
import { useCart } from "../../../../lib/providers/cart-provider";
import Link from "next/link";
export function LayoutCart(props) {
  const router = useRouter();
  const { user } = useAuth();
  const { cartProducts } = useCart();
  useEffect(() => {
    if (user === null) {
      sessionStorage.setItem(LOGIN_PATHNAME, router.pathname);
      router.replace("/login");
    }
  }, [user]);
  let listStep = [
    {
      name: "cart",
      path: "/cart",
      actv: false,
      cur: false,
    },
    {
      name: "checkout",
      path: "/checkout",
      actv: false,
      cur: false,
    },
    {
      name: "complete",
      path: "/complete",
      actv: false,
      cur: false,
    },
  ];
  try {
    let stepCur = listStep.findIndex((step) => step.path === router.pathname);
    if (stepCur !== -1) {
      listStep.forEach((item) => {
        item.cur = false;
      });
      if (stepCur !== 2) {
        for (let index = 0; index < stepCur; index++) {
          listStep[index].actv = true;
        }
      }
      listStep[stepCur].cur = true;
    }
  } catch (error) {}
  const styleSteps = (id: string) => {
    let style = "flex justify-around items-center cursor-pointer ";
    let index = listStep.findIndex((item) => item.name === id);
    if (listStep[index].actv) {
      style += " text-gray-600 hover:text-primary";
    }
    if (listStep[index].cur) {
      style += " text-primary";
    }
    return style;
  };
  return (
    <>
      {user ? (
        <>
          {cartProducts?.length || listStep[2].cur ? (
            <div className="main-container text-gray-700 text-20">
              <div className="text-18 sm:text-28 lg:text-32 w-11/22 sm:w-1/2 xl:w-1/3 mx-auto my-10 text-center uppercase whitespace-nowrap text-gray-300 flex items-center justify-center">
                <h2
                  className={styleSteps("cart")}
                  onClick={() => (listStep[0].actv ? router.push("/cart") : "")}
                >
                  {" "}
                  Giỏ Hàng
                </h2>
                <h2
                  className={styleSteps("checkout")}
                  onClick={() => (listStep[1].actv ? router.push("/checkout") : "")}
                >
                  <i>
                    <HiOutlineChevronRight />
                  </i>
                  Thanh Toán
                </h2>
                <h2
                  className={styleSteps("complete")}
                  onClick={() => (listStep[2].actv ? router.push("/complete") : "")}
                >
                  <i>
                    <HiOutlineChevronRight />
                  </i>
                  Hoàn tất
                </h2>
              </div>
              {props.children}
            </div>
          ) : (
            <div className="w-full sm:w-1/5 mx-auto mt-40 text-center">
              Bạn chưa có sản phẩm nào trong giỏ hàng?
              <Link href="/">
                <button className="btn-primary my-6">Quay về trang chủ</button>
              </Link>
            </div>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}
