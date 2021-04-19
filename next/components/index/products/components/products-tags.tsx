import { useProductsContext } from "./../providers/products-provider";

interface PropsType {}
export function ProductsTags(props: PropsType) {
  const { tags, setTags } = useProductsContext();

  const toggleTag = (index) => {
    let newTags = [...tags];
    newTags[index].active = !newTags[index].active;
    setTags(newTags);
  };

  return (
    <>
      <div className="flex flex-wrap -mx-3 -mb-2">
        {tags.map((tag, index) => (
          <span key={index} className="px-1.5 mb-1.5">
            <span
              className={
                "flex justify-center items-center h-10 rounded-full border border-primary px-3 cursor-pointer whitespace-nowrap transition " +
                (tag.active
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "hover:text-primary hover:bg-primary-light")
              }
              onClick={() => toggleTag(index)}
            >
              {tag.name}
            </span>
          </span>
        ))}
      </div>
    </>
  );
}
