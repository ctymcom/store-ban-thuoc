import { Checkbox } from '../../../components/shared/form/checkbox';
export function FormCheck(props){
    const {title ,checkList} = props;
    const UOT = "Chọn Nhà vận chuyển"
    const styleH = (title) =>{
        if (title!==UOT) {
            return "border-b-2 text-2xl uppercase mt-4";
        }
        else{
            return "text-primary-500 text-xl mt-2";
        }
    }
    return <>
        <h3 className={styleH(title)}>{title}</h3>
        <div className= "flex">
        {
            checkList.map((item,index)=>{
                return <div className = "m-2 p-2 border-2 rounded" key = {index}>
                    <div className = "flex items-center">
                        <Checkbox/>
                        <div>                        
                            <h4 className ="text-xl">{item.title}</h4>
                            <p>{item.content}</p>
                        </div>
                        </div>
                </div>
            })
        }
        </div>
    </>
}