import { useState, useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { NumberPipe } from "../../../lib/pipes/number";
import { PayMoney } from "../cart/components/pay-money";
import { FormCheck } from "./components/form-check";
import TransferInformation from "./components/transfer-information";
import CheckBoxSquare from "./components/check-box-square";
import AddressDialog from "./components/address-dialog";
import { Spinner } from "../../shared/utilities/spinner";
import { useCheckoutContext } from "./providers/checkout-provider";
import { useCart, CartProduct } from "../../../lib/providers/cart-provider";
import { Button } from "./../../shared/utilities/form/button";
import { MethodCheckout, BankAccount } from "../../../lib/repo/checkout.repo";
import { GraphService } from "../../../lib/repo/graph.repo";
import { useToast } from "../../../lib/providers/toast-provider";
import gql from "graphql-tag";
import router from "next/router";
import ListCartCheckout from "./components/list-cart-checkout";
import { Textarea } from "../../shared/utilities/form/textarea";
import { Order, OrderRepository, OrderService } from "../../../lib/repo/order.repo";
import { BankAccounts } from "./components/bank-accounts";

export function CheckOutPage() {
  const { cartTotal, cartProducts, setCartProducts, promotion, setPromotion, usePoint } = useCart();
  const [isCheck, setIsCheck] = useState(true);
  const [deliMethodCS, setDeliMethod] = useState<MethodCheckout>(null);
  const [paymentMethodCS, setPaymentMethod] = useState<MethodCheckout>(null);
  const [showInfor, setShowInfor] = useState(false);
  const [items, setItems] = useState<{ productId: string; qty: number }[]>([]);
  const [note, setNote] = useState<string>("");
  const [cartAmount, setCartAmount] = useState(0);
  const [showAllAccoutBank, setShowAllAccoutBank] = useState(false);
  const [listMoneyCheckout, setListMoneyCheckout] = useState([]);
  const toast = useToast();
  const {
    addressSelected,
    setShowDialogAddress,
    showDialogAddress,
    loadingCheckout,
    paymenMethods,
    deliveryMethods,
    policy,
  } = useCheckoutContext();
  useEffect(() => {
    let listItemNew = [];
    cartProducts.forEach((item: CartProduct) => {
      if (item.active) {
        let itemNew = { productId: item.productId, qty: item.qty };
        listItemNew.push(itemNew);
      }
    });
    setItems([...listItemNew]);
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
  }, [paymentMethodCS, addressSelected, deliMethodCS, usePoint == false]);
  const checkBeforeMutate = () => {
    if (!addressSelected) {
      toast.warn("B???n ch??a ch???n ?????a ch??? giao h??ng");
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
              ${OrderService.fullFragment}
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
      const order = res.data.createOrder as Order;
      let orId = order.orderNumber;

      let task = [
        localStorage.setItem("idOrder", orId),
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
      let taskend = await Promise.all(task);
      if (taskend) {
        if (order.partnerData && order.partnerData != "") {
          router.replace(order.partnerData);
        } else {
          router.replace("/complete");
        }
      }
    }
  };
  const draftOrder = async (data: any) => {
    let mutationName = "generateDraftOrder";
    console.log(data);

    const res = await GraphService.apollo.mutate({
      mutation: gql`
          mutation mutationName($data: CreateOrderInput!) {
            ${mutationName} (
              data: $data
            ) {
              subtotal
              discount
              discountPoint
              discountPayment
              amount
              discountPointValue
            }
          }
        `,
      variables: {
        data,
      },
    });
    if (res.data) {
      const {
        amount,
        discount,
        subtotal,
        discountPoint,
        discountPayment,
        discountPointValue,
      } = res.data.generateDraftOrder;
      console.log(res.data.generateDraftOrder);

      let listNew = [
        {
          title: "T???ng ti???n h??ng",
          money: subtotal,
        },
      ];
      // listNew[0].money = subtotal;
      if (discount > 0)
        listNew.push({ title: `Khuy???n m??i ${data.promotionCode}`, money: -discount });
      if (discountPayment > 0)
        listNew.push({ title: `??u ????i thanh to??n`, money: -discountPayment });
      if (discountPoint > 0) listNew.push({ title: `?????i ??i???m`, money: -discountPointValue });
      // listNew[2].money = discountPayment;
      // listNew[3].money = discountPoint;
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

  return !loadingCheckout ? (
    <div className="lg:flex justify-between gap-4 md:gap-8 xl:gap-16">
      <div className="w-full lg:w-2/3 gap-4">
        <div className="w-full">
          <div>
            <FormCheck
              setMethod={setDeliMethod}
              title="Ph????ng th???c v???n chuy???n"
              checkList={deliveryMethods}
            />
          </div>
          <div className="mt-6">
            <FormCheck
              setMethod={setPaymentMethod}
              title="Ph????ng th???c thanh to??n"
              checkList={paymenMethods}
            />
          </div>
          <div className="w-full mt-4">{showInfor && <BankAccounts />}</div>
        </div>
        <div className="w-full text-16 my-5">
          <h4 className="uppercase text-16">Ghi ch?? kh??c</h4>
          <p className="text-14 pb-2">
            Tr?????ng h???p kh??ng t??m ???????c thu???c nh?? mong mu???n. Qu?? kh??ch vui l??ng ??i???n y??u c???u v??o b??n
            d?????i. Ch??ng t??i s??? li??n h??? mua thu???c v?? b??o gi?? s???m nh???t c?? th???.
          </p>
          <Textarea
            value={note}
            className=" border-2 border-gray-300 rounded-md p-3 outline-none"
            placeholder="Nh???p ghi ch?? c???a b???n"
            onChange={(e) => setNote(e)}
          />
        </div>
      </div>
      <div className="w-full lg:w-1/3">
        <div className="w-full md:flex lg:inline-block md:gap-5 mb-10">
          <div className="w-full md:w-1/3 lg:w-full my-3">
            <div className="flex justify-between items-center border-b-2">
              <div className="flex justify-between items-center gap-1 whitespace-nowrap">
                <i className="text-primary text-16 ">
                  <IoLocationSharp />
                </i>
                <h4 className="uppercase text-16">?????a ch??? giao h??ng</h4>
              </div>
              <button
                className={`${
                  addressSelected
                    ? "btn-default p-0 text-primary hover:text-primary-dark px-1"
                    : "hidden"
                }`}
                onClick={() => setShowDialogAddress(true)}
              >
                Thay ?????i
              </button>
            </div>
            <div className="my-2 text-16 ">
              {addressSelected ? (
                <>
                  <p className="text-16 font-bold">
                    {addressSelected.contactName} - {addressSelected.phone}
                  </p>
                  <p>{addressSelected.fullAddress}</p>
                </>
              ) : (
                <div className="mx-auto w-2/3 items-center text-14">
                  <p>B???n ch??a c?? ?????a ch??? giao h??ng?</p>
                  <button className="btn-primary w-full" onClick={() => setShowDialogAddress(true)}>
                    B???m v??o ????y ????? t???o
                  </button>
                </div>
              )}
            </div>
          </div>
          <ListCartCheckout title="Danh s??ch s???n ph???m" className="w-full md:w-1/3 lg:w-full" />
          <div className="w-full md:w-1/3 lg:w-full">
            <PayMoney listMoney={addressSelected ? listMoneyCheckout : []} />
            <div className="flex justify-between text-16 ">
              <p>Th??nh ti???n</p>
              <p className="font-bold text-primary">{NumberPipe(cartAmount, false)} VND</p>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-full mx-auto">
          <div className="flex items-center gap-1 text-16 whitespace-nowrap">
            <div className="flex items-center gap-1 cursor-pointer">
              <CheckBoxSquare
                checked={isCheck}
                text={"T??i ?????ng ?? v???i"}
                onClick={(e) => setIsCheck(e)}
              />
            </div>
            <a
              className="text-primary cursor-pointer hover:underline"
              href={policy}
              target="_blank"
            >
              ??i???u kho???n s??? d???ng
            </a>
          </div>
          <Button
            className={"w-full text-16 py-3 my-2"}
            disabled={!isCheck}
            primary
            asyncLoading
            onClick={async () => await handleConfirmOrder()}
            text="?????t mua"
          />
          <p className="whitespace-nowrap text-center text-12 md:text-14">
            (Xin vui l??ng ki???m tra l???i ????n h??ng tr?????c khi ?????t mua)
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
