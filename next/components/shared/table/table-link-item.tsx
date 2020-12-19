export type TableLinkItemProps = {
    value: string,
    display?: string
}
export function TableLinkItem({ value, display }: TableLinkItemProps) {
    return <td className="px-4 py-3 text-sm text-blue-500"> 
        <a href={value} target="_blank">{display || value}</a>
    </td>
}