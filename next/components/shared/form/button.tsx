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
    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
        {text}
    </button>
}