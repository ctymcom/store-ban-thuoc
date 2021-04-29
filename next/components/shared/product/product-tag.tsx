import { Product } from "../../../lib/repo/product.repo";
import { ProductTag as Tag } from "./../../../lib/repo/product-tag.repo";

interface PropsType extends ReactProps {
  tag: Tag;
  saleRate?: number;
  product: Product;
}
export function ProductTag({ tag, ...props }: PropsType) {
  let tagContent = null;
  let tagClassName = `flex items-center text-sm font-semibold rounded-sm py-1 px-2 `;
  let tagStyle = {};
  switch (tag.code) {
    case "FLASHSALE": {
      tagClassName += `bg-gray-100 text-yellow-500`;
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
      tagClassName += `bg-gray-100 text-red-500`;
      tagContent = (
        <>
          <img className="h-5" src="/assets/img/date.png" />
          <span className="pl-1">{tag.name}</span>
        </>
      );
      break;
    }
    case "SALESUP": {
      tagClassName += `bg-gray-100`;
      tagStyle = { color: tag.color };
      tagContent = (
        <>
          <img className="h-5" src="/assets/img/increase.png" />
          <span className="pl-1">
            {tag.name} {props.product.upRate ? `${props.product.upRate}%` : ""}
          </span>
        </>
      );
      break;
    }
    case "SALESDOWN": {
      tagClassName += `bg-gray-100`;
      tagStyle = { color: tag.color };
      tagContent = (
        <>
          <img className="h-5" src="/assets/img/decrease.png" />
          <span className="pl-1">
            {tag.name} {props.product.downRate ? `${props.product.downRate}%` : ""}
          </span>
        </>
      );
      break;
    }
    case "BANCHAY": {
      tagClassName += `bg-primary text-white shadow`;
      tagContent = (
        <>
          <img className="h-5" src="/assets/img/hotsale.png" />
          <span className="pl-1">{tag.name}</span>
        </>
      );
      break;
    }
    default: {
      tagClassName += `bg-primary-light text-primary`;
      tagContent = tag.name;
      break;
    }
  }

  return (
    <div key={tag.code} className="p-1">
      <span style={tagStyle} className={tagClassName}>
        {tagContent}
      </span>
    </div>
  );
}
