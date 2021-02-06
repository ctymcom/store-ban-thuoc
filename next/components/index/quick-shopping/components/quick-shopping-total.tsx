
import { useState } from 'react';
import { NumberPipe } from '../../../../lib/pipes/number';

interface PropsType extends ReactProps {
  total: number
}
export function QuickShoppingTotal(props: PropsType) {
  return <div className="border border-gray-100 rounded-lg shadow-md overflow-hidden">
    <div className="flex justify-between p-4">
      <div className="text-lg text-gray-700 font-semibold">Tổng tiền</div>
      <div className="text-lg text-primary font-bold">{NumberPipe(props.total, true)}</div>
    </div>
    <button className="btn-primary w-full h-14 rounded-tl-none rounded-tr-none text-md font-bold uppercase">Đến trang giỏ hàng</button>
  </div>
}