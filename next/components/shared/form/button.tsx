type ButtonProps = {
    style?: string,
    text: string,
    type?: "button" | "submit" | "reset",
    onClick?: (e) => void
}
export function Button({ text, onClick, style = ' bg-primary-500 ', ...props }: ButtonProps) {
    return <button onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick(e);
    }}
        className="w-full inline-flex justify-center text-center text-sm py-2 px-4 border border-transparent shadow-sm rounded-md text-white bg-secondary-500 hover:bg-secondary-400 focus:outline-none ">
        {props.children}
    </button>
}