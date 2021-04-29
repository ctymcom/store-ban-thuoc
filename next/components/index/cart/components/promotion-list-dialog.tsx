import React, { useEffect } from "react";
import { Dialog } from "../../../shared/utilities/dialog/dialog";
import { HiOutlineTicket } from "react-icons/hi";
import ListCode from "./list-code";
import { usePromotionContext } from "../providers/promotion-provider";
interface Proptype extends ReactProps {
  isOpen: boolean;
  setShowDialog: Function;
  choseCode: Function;
}
const PromotionListDialog = (props: Proptype) => {
  const { loadAll } = usePromotionContext();
  useEffect(() => {
    if (props.isOpen) {
      loadAll();
    }
  }, [props.isOpen]);
  return (
    <Dialog
      width="410px"
      isOpen={props.isOpen}
      onClose={() => props.setShowDialog(false)}
      title="Mã khuyến mãi"
      icon={<HiOutlineTicket />}
      key={1}
    >
      <Dialog.Body>
        <ListCode choseCode={props.choseCode} />
      </Dialog.Body>
    </Dialog>
  );
};

export default PromotionListDialog;
