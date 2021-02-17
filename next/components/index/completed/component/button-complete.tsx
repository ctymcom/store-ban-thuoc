export function ListButton(props) {
    const { type, listButton } = props;
    const styleButton = (type, href) => {
        let tempStyle: string = 'block w-4/5 mx-auto md:w-3/5 md:ml-10 border border-gray-300 rounded p-2 mt-2 ';
        if (href !== "/oder-history") {
            if (type === "successed")
                tempStyle += "bg-primary text-white";
            if (type === "failed")
                tempStyle += "bg-red-500 text-white";
        } else {
            if (type === "successed")
                tempStyle += "text-primary";
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