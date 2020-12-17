export function TableStatusItem({ value, color }) {
    return <td className="px-4 py-3 text-xs">
    <span
      className={`px-2 py-1 font-semibold leading-tight text-${color}-700 bg-${color}-100 rounded-full dark:bg-${color}-700 dark:text-${color}-100`}
    >
      {value}
    </span>
  </td>
}