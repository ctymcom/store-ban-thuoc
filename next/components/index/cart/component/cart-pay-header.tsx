import {HiOutlineChevronRight} from "react-icons/hi";
import router from 'next/router';
interface Proptype extends ReactProps{
    name:string
}
export function CartPayHeader(props:Proptype) {
    let listStep=[
        {
        name:"cart",
        path:"/cart",
        actv:false,
        cur:false
    },
    {
        name:"checkout",
        path:"/checkout",
        actv:false,
        cur:false
    },
    {
        name:"complete",
        path:"/complete",
        actv:false,
        cur:false
    }
    ]
    try {
        let stepCur = listStep.findIndex(step=>step.name===props.name);
        if(stepCur!==-1){
            listStep.forEach((item)=>{
                item.cur=false;
            })
            for(let index=0;index<stepCur;index++){
                listStep[index].actv=true;
            }
            listStep[stepCur].cur=true;
        }
    } catch (error) {
        
    }
    const styleSteps = (id:string)=>{
        let style ="flex justify-around items-center cursor-pointer ";
        let index = listStep.findIndex(item=>item.name===id);
        console.log(listStep[index]);
        
        if(listStep[index].actv){    
            style+=" text-gray-600 hover:text-primary";
        }
        if(listStep[index].cur){
            style+=" text-primary hover:text-primary-dark"
        }
        return style;
    }
    return <div className="text-sm sm:text-xl md:text-2xl lg:text-3xl w-5/6 sm:w-4/5 md:w-3/5 lg:w-2/5 mx-auto my-10 text-center uppercase sm:whitespace-nowrap text-gray-300 flex items-center">
            <h2 className={styleSteps("cart")} onClick={() => listStep[0].actv? router.push('/cart'):""}> Giỏ Hàng</h2>
            <h2 className={styleSteps("checkout")} onClick={() => listStep[1].actv? router.push('/checkout'):""}><i><HiOutlineChevronRight/></i>Thanh Toán</h2> 
            <h2 className={styleSteps("complete")} onClick={() => listStep[2].actv? router.push('/complete'):""}><i><HiOutlineChevronRight/></i>Hoàn tất</h2>
        </div>
}