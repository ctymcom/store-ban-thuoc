import { TableStatusItem } from "./table-status-item";
import { TableTileItem } from './table-tile-item';
import { Pagination } from '../../../lib/graphql/pagination';
import { TablePagination } from "./table-pagination";
import { TableLinkItem } from "./table-link-item";
export enum TableDataItemType {
    text = "text",
    tile = 'tile',
    number = 'number',
    status = 'status',
    date = 'date',
    link = 'link',
    custom = 'custom'

}
export type TableDataItem = {
    type: TableDataItemType,
    value?: any,
    value2?: any,
    image?: any,
    color?: string,
    builder?: (item: TableDataItem) => JSX.Element
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
                const key = "" + r.key + index;
                  switch(i.type) {
                      case TableDataItemType.tile:
                          return <TableTileItem key={key} title={i.value} description={i.value2} image={i.image} />;
                      case TableDataItemType.status:
                          return <TableStatusItem key={key} value={i.value} color={i.color} />
                      case TableDataItemType.link:
                          return <TableLinkItem key={key} value={i.value} display={i.value2} />
                      case TableDataItemType.custom:
                          return <td key={"" + r.key + index} className="px-4 py-3 text-sm"> {i.builder(i)} </td>
                      case TableDataItemType.number:
                      case TableDataItemType.text:
                      case TableDataItemType.date:
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