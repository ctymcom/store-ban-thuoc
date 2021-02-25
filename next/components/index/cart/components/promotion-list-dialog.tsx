import React from 'react';
import { Dialog } from '../../../shared/utilities/dialog/dialog';
import { HiOutlineTicket } from 'react-icons/hi';
import ListCode from './list-code';
interface Proptype extends ReactProps{
  isOpen: boolean,
  listPromotionCode: any[],
  setShowDialog: Function,
  choseCode:Function
}
const PromotionListDialog = (props:Proptype) => {
  return (
    <div>
      <Dialog width="410px" isOpen={props.isOpen}
            onClose={() => props.setShowDialog(false)}
            title="Mã khuyến mãi"
            icon={<HiOutlineTicket/>}
        >
            <Dialog.Body>
                <ListCode listPromotionCode={props.listPromotionCode} choseCode={props.choseCode}/>
            </Dialog.Body>
        </Dialog>
    </div>
  );
}

export default PromotionListDialog
;