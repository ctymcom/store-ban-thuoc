import { useState, useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { NumberPipe } from "../../../lib/pipes/number";
import { PayMoney } from "../cart/components/pay-money";
import { FormCheck } from "./components/form-check";
import { listMoneyCheckout, transferInformation } from "./components/form-check-data";
import TransferInformation from "./components/transfer-information";
import CheckBoxSquare from "./components/check-box-square";
import AddressDialog from "./components/address-dialog";
import { Spinner } from "../../shared/utilities/spinner";
import { useCheckoutContext } from "./providers/checkout-provider";
import { useCart, CartProduct } from "../../../lib/providers/cart-provider";
import { Button } from "./../../shared/utilities/form/button";
import { MethodCheckout, Order } from "../../../lib/repo/checkout.repo";
import { GraphService } from "../../../lib/repo/graph.repo";
import { useToast } from "../../../lib/providers/toast-provider";
import gql from "graphql-tag";
import router from "next/router";

export function CheckOutPage() {
  const [isCheck, setIsCheck] = useState(true);
  const [deliMethodCS, setDeliMethod] = useState<MethodCheckout>(null);
  const [paymentMethodCS, setPaymentMethod] = useState<MethodCheckout>(null);
  const [checkPaymentMethodCS, setCheckPaymentMethod] = useState(false);
  const [note, setNote] = useState<string>("");
  const toast = useToast();
  const { cartTotal, cartProducts, setcartProducts, promotion, setPromotion } = useCart();
  const {
    addressSelected,
    setShowDialogAddress,
    showDialogAddress,
    loadingCheckout,
    paymenMethods,
    deliveryMethods,
  } = useCheckoutContext();
  useEffect(() => {
    listMoneyCheckout[0].money = cartTotal;
  }, []);
  useEffect(() => {
    if (paymentMethodCS?.code === "CK") {
      setCheckPaymentMethod(true);
    } else {
      setCheckPaymentMethod(false);
    }
  }, [paymentMethodCS]);
  const checkBeforeMutate = () => {
    if (!addressSelected) {
      toast.warn("Bạn chưa chọn địa chỉ giao hàng");
      return false;
    }
    return true;
  };
  const confirmOrder = async (data: any) => {
    let mutationName = "createOrder";
    const res = await GraphService.apollo.mutate({
      mutation: gql`
          mutation mutationName($data: CreateOrderInput!) {
            ${mutationName} (
              data: $data
            ) {
              id
              createdAt
              updatedAt
              userId
              code
              orderNumber
              addressId
              fullAddress
              contactName
              address
              provinceId
              districtId
              wardId
              phone
              location
              subtotal
              discount
              amount
              promotionCode
              paymentMethod
              deliveryMethod
              usePoint
              status
            }
          }
        `,
      variables: {
        data,
      },
    });
    if (res.data) {
      let task = [
        setPromotion(""),
        setcartProducts([]),
        localStorage.removeItem("cartProductStorage"),
      ];
      await Promise.all(task);
      router.replace("/complete");
    }
  };
  const handleConfirmOrder = async () => {
    if (checkBeforeMutate()) {
      await confirmOrder({
        promotionCode: promotion,
        paymentMethod: paymentMethodCS.code,
        deliveryMethod: deliMethodCS.code,
        addressId: addressSelected.id,
        note: note,
        usePoint: false,
        items: [
          ...cartProducts.map((item) => ({
            productId: item.productId,
            qty: item.qty,
          })),
        ],
      });
    }
  };

  const setStyleBtn = () => {
    let style = "w-full text-16 py-6 my-2";
    return isCheck ? style + " btn-primary" : style + " btn-disabled";
  };

  return !loadingCheckout ? (
    <div className="lg:flex justify-between gap-4 md:gap-8 xl:gap-16">
      <div className="w-full lg:w-2/3 xl:w-3/4 gap-4">
        <div className="w-full">
          <div>
            <FormCheck
              setMethod={setDeliMethod}
              title="Phương thức vận chuyển"
              checkList={deliveryMethods}
            />
          </div>
          <div className="mt-6">
            <FormCheck
              setMethod={setPaymentMethod}
              title="Phương thức thanh toán"
              checkList={paymenMethods}
            />
          </div>
          <div className="w-full mt-4">
            {checkPaymentMethodCS ? <TransferInformation info={transferInformation} /> : <></>}
          </div>
        </div>
        <div className="w-full text-16  my-5">
          <h4 className="uppercase text-16">Ghi chú khác</h4>
          <p className="text-14">
            Trường hợp không tìm được thuốc như mong muốn. Quý khách vui lòng điền yêu cầu vào bên
            dưới. Chúng tôi sẽ liên hệ mua thuốc và báo giá sớm nhất có thể.
          </p>
          <textarea
            className="w-full border-2 border-gray-300 rounded-md p-3 outline-none"
            placeholder="Nhập ghi chú của bạn"
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="w-full lg:w-1/3 xl:w-1/4">
        <div className="w-full md:flex lg:inline-block md:gap-5 mb-10">
          <div className="w-full md:w-1/2 lg:w-full mb-10">
            <div className="flex justify-between items-center border-b-2">
              <div className="flex justify-between items-center gap-1 whitespace-nowrap">
                <i className="text-primary text-16 ">
                  <IoLocationSharp />
                </i>
                <h4 className="uppercase text-16">Địa chỉ giao hàng</h4>
              </div>
              <p
                className={`${addressSelected ? "text-primary text-16  cursor-pointer" : "hidden"}`}
                onClick={() => setShowDialogAddress(true)}
              >
                Thay đổi
              </p>
            </div>
            <div className="my-2 text-16 ">
              {addressSelected ? (
                <>
                  <p className="text-16 font-bold">{addressSelected.contactName}</p>
                  <p>{addressSelected.fullAddress}</p>
                  <p>{addressSelected.phone}</p>
                </>
              ) : (
                <div className="mx-auto w-2/3 items-center text-14">
                  <p>Bạn chưa có địa chỉ giao hàng?</p>
                  <button className="btn-primary w-full" onClick={() => setShowDialogAddress(true)}>
                    Bấm vào đây để tạo
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-full">
            <div className="border-b-4 pb-2">
              <PayMoney listMoney={listMoneyCheckout} />
            </div>
            <div className="flex justify-between pt-2 text-16 ">
              <p>Thành tiền</p>
              <p className="font-bold text-primary">{NumberPipe(cartTotal, false)} VND</p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center gap-1 text-16  whitespace-nowrap">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => {
                setIsCheck(!isCheck);
              }}
            >
              <CheckBoxSquare checked={isCheck} />
              <p>Tôi đồng ý với</p>
            </div>
            <p className="text-primary cursor-pointer">Điều khoản sử dụng</p>
          </div>
          <Button
            className={setStyleBtn()}
            disabled={!isCheck}
            asyncLoading
            onClick={async () => await handleConfirmOrder()}
            text="Đặt mua"
          />
          <p className="whitespace-nowrap text-center text-12 md:text-16">
            (Xin vui lòng kiểm tra lại đơn hàng trước khi Đặt mua)
          </p>
        </div>
      </div>
      <AddressDialog
        key="AddressDialog"
        isOpen={showDialogAddress}
        setShowDialog={setShowDialogAddress}
      />
    </div>
  ) : (
    <Spinner />
  );
}
