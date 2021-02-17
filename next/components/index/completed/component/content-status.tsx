import { ListButton } from './button-complete';
export function ContentStatus(props) {
    const { status } = props;
    const compStyle = (type: string) => {
        let tempType: string = '';
        tempType += "text-2xl md:text-4xl font-bold mx-10 my-0 md:my-4";
        if (type === "successed")
            tempType += " text-primary";
        if (type === "failed")
            tempType += " text-red-300";
        return tempType;
    }
    return <>
        <div className="text-center md:text-left">
            <h3 className={compStyle(status.type)}>{status.header}</h3>
            <div className="w-4/5 mx-auto my-5 md:my-10">
                {
                    status.listContent.map((item: any, index: any) => {
                        return <p key={index}>{item}</p>
                    })
                }
            </div>
            <div>
                <ListButton type={status.type} listButton={status.listButton} />
            </div>
        </div>
    </>
}