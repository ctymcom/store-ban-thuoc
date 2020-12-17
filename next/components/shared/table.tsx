import { data } from "jquery"
import { TableStatusItem } from "./table/table-status-item";
import { TableTileItem } from './table/table-tile-item';
import { Pagination } from '../../lib/graphql/pagination';
import { TablePagination } from "./table/table-pagination";
export enum TableDateItemType {
    text = "text",
    tile = 'tile',
    number = 'number',
    status = 'status',
    date = 'date'

}
export type TableDataItem = {
    type: TableDateItemType,
    value?: any,
    value2?: any,
    image?: any,
    color?: string
}
export type TableProps = {
    headers: string[],
    data: {
      cells: TableDataItem[],
      item: any,
      key: string
    }[],
    pagination?: Pagination,
    onPageChanged?: (page: number) => void
}
export function Table({ headers, data, pagination, onPageChanged }: TableProps) {
  
    return <div className="w-full overflow-hidden rounded-lg shadow-xs">
    <div className="w-full overflow-x-auto">
      <table className="w-full whitespace-no-wrap">
        <thead>
          <tr
            className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
          >
            { headers.map(h => <th key={h} className="px-4 py-3">{h}</th> )}
          </tr>
        </thead>
        <tbody
          className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
        >
          {data.map((r, index) => <tr key={"" + r.key + index} className="text-gray-700 dark:text-gray-400">
              {r.cells.map((i, index) => {
                  switch(i.type) {
                      case TableDateItemType.tile:
                          return <TableTileItem key={"" + r.key + index} title={i.value} description={i.value2} image={i.image} />;
                      case TableDateItemType.status:
                          return <TableStatusItem key={"" + r.key + index} value={i.value} color={i.color} />
                      case TableDateItemType.number:
                      case TableDateItemType.text:
                      case TableDateItemType.date:
                      default:
                         return <td key={"" + r.key + index} className="px-4 py-3 text-sm"> {i.value} </td>
                  }
              })}
          </tr>)}
        </tbody>
      </table>
    </div>
    { pagination && <TablePagination pagination={pagination} onPageChanged={(page) => onPageChanged && onPageChanged(page)}/>}
  </div>
}