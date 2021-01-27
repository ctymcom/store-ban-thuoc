export function ListButton(props) {
    const { type, listButton } = props;
    const styleButton = (type, href) => {
        let tempStyle: string = 'block w-3/5 ml-10 border border-gray-300 rounded p-2 mt-2 ';
        if (href !== "/oder-history") {
            if (type === "successed")
                tempStyle += "bg-primary-500 text-white";
            if (type === "failed")
                tempStyle += "bg-red-500 text-white";
        } else {
            if (type === "successed")
                tempStyle += "text-primary-500";
            if (type === "failed")
                tempStyle += "text-red-500";
        }
        return tempStyle;
    }
    return <>
        {
            listButton.map((item, index) => {
                return <button key={index} className={styleButton(type, item.href)}><a href={item.href}>{item.title}</a></button>
            })
        }
    </>
}