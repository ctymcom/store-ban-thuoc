import { ProductTag as Tag } from "./../../../lib/repo/product-tag.repo";

interface PropsType extends ReactProps {
  tag: Tag;
  saleRate?: number;
}
export function ProductTag({ tag, ...props }: PropsType) {
  let tagContent = null;
  let tagClassName = `flex items-center font-semibold `;
  switch (tag.code) {
    case "FLASHSALES": {
      tagClassName += `bg-gray-100 py-1 px-3 text-yellow-500`;
      tagContent = (
        <>
          <img className="h-5" src="/assets/img/flash.png" />
          <span className="px-1">{tag.name}</span>
          <img className="h-5" src="/assets/img/flash.png" />
        </>
      );
      break;
    }
    case "DATEOFF": {
      tagClassName += `bg-gray-100 py-1 px-3 text-red-500`;
      tagContent = (
        <>
          <img className="h-5" src="/assets/img/date.png" />
          <span className="pl-1">{tag.name}</span>
        </>
      );
      break;
    }
    case "SALESUP": {
      tagClassName += `bg-gray-100 py-1 px-3 text-red-500`;
      tagContent = (
        <>
          <img className="h-5" src="/assets/img/increase.png" />
          <span className="pl-1">
            {tag.name} {props.saleRate ? `${props.saleRate}%` : ""}
          </span>
        </>
      );
      break;
    }
    case "SALESDOWN": {
      tagClassName += `bg-gray-100 py-1 px-3 text-red-500`;
      tagContent = (
        <>
          <img className="h-5" src="/assets/img/increase.png" />
          <span className="pl-1">
            {tag.name} {props.saleRate ? `${props.saleRate}%` : ""}
          </span>
        </>
      );
      break;
    }
    default: {
      tagClassName += `bg-primary-light py-1 px-3 text-primary`;
      tagContent = tag.name;
      break;
    }
  }

  return (
    <div key={tag.code} className="p-1">
      <span className={tagClassName}>{tagContent}</span>
    </div>
  );
}
