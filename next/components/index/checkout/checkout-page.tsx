import { useState, useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { NumberPipe } from "../../../lib/pipes/number";
import { PayMoney } from "../cart/components/pay-money";
import { FormCheck } from "./components/form-check";
import { transferInformation } from "./components/form-check-data";
import TransferInformation from "./components/transfer-information";
import CheckBoxSquare from "./components/check-box-square";
import AddressDialog from "./components/address-dialog";
import { Spinner } from "../../shared/utilities/spinner";
import { useCheckoutContext } from "./providers/checkout-provider";
import { useCart, CartProduct } from "../../../lib/providers/cart-provider";
import { Button } from "./../../shared/utilities/form/button";
import { MethodCheckout } from "../../../lib/repo/checkout.repo";
import { GraphService } from "../../../lib/repo/graph.repo";
import { useToast } from "../../../lib/providers/toast-provider";
import gql from "graphql-tag";
import router from "next/router";

export function CheckOutPage() {
  const [isCheck, setIsCheck] = useState(true);
  const [deliMethodCS, setDeliMethod] = useState<MethodCheckout>(null);
  const [paymentMethodCS, setPaymentMethod] = useState<MethodCheckout>(null);
  const [showInfor, setShowInfor] = useState(false);
  const [items, setItems] = useState<{ productId: string; qty: number }[]>([]);
  const [note, setNote] = useState<string>("");
  const [cartAmount, setCartAmount] = useState(0);
  const [listMoneyCheckout, setListMoneyCheckout] = useState([
    {
      title: "Tổng tiền hàng",
      money: 0,
    },
    {
      title: "Voucher giảm giá",
      money: 0,
    },
  ]);
  const toast = useToast();
  const { cartTotal, cartProducts, setCartProducts, promotion, setPromotion, usePoint } = useCart();
  const {
    addressSelected,
    setShowDialogAddress,
    showDialogAddress,
    loadingCheckout,
    paymenMethods,
    deliveryMethods,
  } = useCheckoutContext();
  useEffect(() => {
    cartProducts.forEach((item: CartProduct) => {
      let listItemNew = items;
      if (item.active) {
        let itemNew = { productId: item.productId, qty: item.qty };
        listItemNew.push(itemNew);
        setItems([...listItemNew]);
      }
    });
  }, []);
  useEffect(() => {
    if (paymentMethodCS?.code === "CK") {
      setShowInfor(true);
    } else {
      setShowInfor(false);
    }
    if (paymentMethodCS !== null && deliMethodCS !== null && addressSelected) {
      draftOrder({
        promotionCode: promotion,
        paymentMethod: paymentMethodCS.code,
        deliveryMethod: deliMethodCS.code,
        addressId: addressSelected.id,
        note: note,
        usePoint,
        items,
      });
    }
  }, [paymentMethodCS, addressSelected, deliMethodCS]);
  const checkBeforeMutate = () => {
    if (!addressSelected) {
      toast.warn("Bạn chưa chọn địa chỉ giao hàng");
      return false;
    }
    return true;
  };
  const confirmOrder = async (data: any) => {
    console.log(data);

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
      let listItemNew = [];
      cartProducts.forEach((item) => {
        if (!item.active) {
          listItemNew.push(item);
        }
      });
      let task = [
        setPromotion(""),
        setCartProducts([...listItemNew]),
        localStorage.setItem(
          "cartProductStorage",
          JSON.stringify(
            cartProducts?.map((item) => {
              return { productId: item.productId, qty: item.qty, active: item.active };
            })
          )
        ),
      ];
      await Promise.all(task);
      router.replace("/complete");
    }
  };
  const draftOrder = async (data: any) => {
    console.log(data);

    let mutationName = "generateDraftOrder";
    const res = await GraphService.apollo.mutate({
      mutation: gql`
          mutation mutationName($data: CreateOrderInput!) {
            ${mutationName} (
              data: $data
            ) {
              subtotal
              discount
              amount
            }
          }
        `,
      variables: {
        data,
      },
    });
    if (res.data) {
      console.log(res);
      const { amount, discount, subtotal } = res.data.generateDraftOrder;
      let listNew = listMoneyCheckout;
      listNew[0].money = subtotal;
      listNew[1].money = discount;
      setCartAmount(amount);
      setListMoneyCheckout([...listNew]);
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
        usePoint,
        items,
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
            {showInfor ? <TransferInformation info={transferInformation} /> : <></>}
          </div>
        </div>
        <div className="w-full text-16  my-5">
          <h4 className="uppercase text-16">Ghi chú khác</h4>
          <p className="text-14 pb-2">
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
            <div className="flex justify-between items-center border-b-2 pb-1">
              <div className="flex justify-between items-center gap-1 whitespace-nowrap">
                <i className="text-primary text-16 ">
                  <IoLocationSharp />
                </i>
                <h4 className="uppercase text-16">Địa chỉ giao hàng</h4>
              </div>
              <button
                className={`${
                  addressSelected
                    ? "btn-default text-primary hover:text-primary-dark px-1"
                    : "hidden"
                }`}
                onClick={() => setShowDialogAddress(true)}
              >
                Thay đổi
              </button>
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
          {addressSelected ? (
            <div className="w-full md:w-1/2 lg:w-full">
              <div className="border-b-4 pb-2">
                <PayMoney listMoney={listMoneyCheckout} />
              </div>
              <div className="flex justify-between pt-2 text-16 ">
                <p>Thành tiền</p>
                <p className="font-bold text-primary">{NumberPipe(cartAmount, false)} VND</p>
              </div>
            </div>
          ) : (
            <p className="text-16">Vui lòng chọn địa chỉ để xem "THÀNH TIỀN"</p>
          )}
        </div>
        <div className="w-full">
          <div className="flex items-center gap-1 text-16  whitespace-nowrap">
            <div className="flex items-center gap-1 cursor-pointer">
              <CheckBoxSquare
                checked={isCheck}
                text={"Tôi đồng ý với"}
                onClick={(e) => setIsCheck(e)}
              />
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
          <p className="whitespace-nowrap text-center text-12 md:text-14">
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
