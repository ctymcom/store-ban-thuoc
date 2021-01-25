type HeaderCategoryProps = {
    [x: string]: any;
    title?: string;
}
export function HeaderCategory({ title, ...props }: HeaderCategoryProps) {
    return <div className="py-2">
        <h1 className="text-green-500 py-3 ">{title}</h1>
        <div className="w-8 border-b-2 border-gray-200 rounded-md"></div>
    </div>
}