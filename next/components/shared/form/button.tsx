type ButtonProps = {
    text: string,
    type?: "button" | "submit" | "reset",
    onClick?: (e) => void
}
export function Button({ text, onClick }: ButtonProps) {
    return <button onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick(e);
    }}
        className="w-full inline-flex justify-center text-center text-xs py-2 px-4 border border-transparent shadow-sm rounded-md text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none ">
        {text}
    </button>
}