export function TableTileItem({ title, description, image }) {
    return <td className="px-4 py-3">
    <div className="flex items-center text-sm">
      <div>
        { image && <img
            className="object-cover w-full h-full rounded-full"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&facepad=3&fit=facearea&s=707b9c33066bf8808c934c8ab394dff6"
            alt=""
            loading="lazy"
            />}
        <p className="font-semibold">{title}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  </td>
}