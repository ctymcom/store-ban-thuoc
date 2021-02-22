import format from "date-fns/format";

interface PropsType extends ReactProps {
  timelines: {
    datetime: Date
    content: string
  }[]
}
export function OrderDetailsTimeline(props: PropsType) {
  return <div className="py-4">
    <div className="text-gray-700 font-semibold mb-2">Tình trạng đơn hàng</div>
    {
      props.timelines.map((timeline, index) => 
        <div className="flex items-start relative mb-4 timeline" key={index}>
          <span className={"inline-block w-2 h-2 rounded-full mt-2 z-10 " + (index == 0?'bg-primary':'bg-gray-400')}></span>
          <span className="text-gray-500 font-semibold tabular-nums w-36 pl-2">{format(timeline.datetime, 'HH:mm dd-MM-yyyy')}</span>
          <span className="text-gray-600 pl-3">{timeline.content}</span>
        </div>
      )
    }
    <style jsx>{`
      .timeline:not(:last-child)::before {
        content: '';
        position: absolute;
        left: 0.25rem;
        top: 0.75rem;
        height: 2rem;
        border-left: 1px dashed;
      }
    `}</style>
  </div>
}