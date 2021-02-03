import { ListButton } from './button-complete';
export function ContentStatus(props) {
    const { status } = props;
    const compStyle = (type: string) => {
        let tempType: string = '';
        tempType += "text-4xl font-bold mx-10 my-4";
        if (type === "successed")
            tempType += " text-primary";
        if (type === "failed")
            tempType += " text-red-300";
        return tempType;
    }
    return <>
        <div>
            <h3 className={compStyle(status.type)}>{status.header}</h3>
            <div className="mx-16 my-10">
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