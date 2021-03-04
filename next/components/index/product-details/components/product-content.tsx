import { useProductDetailsContext } from "../providers/product-details-provider";

export function ProductContent() {
  const { product } = useProductDetailsContext();
  const scrollTo = (id) => {
    document
      .getElementById("tab-" + id)
      .scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    setTimeout(() => {
      document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  return (
    <>
      <div className="flex w-full no-scrollbar bg-white sticky top-16 pt-2 md:top-32 z-10 md:pt-4">
        {product.tabs.map((tab, index) => (
          <a
            key={tab.name}
            id={"tab-" + tab.name}
            onClick={() => scrollTo(tab.name)}
            className="flex-grow text-center px-3 pb-2 font-semibold text-primary hover:text-primary cursor-pointer border-b-2 whitespace-nowrap"
          >
            {tab.name}
          </a>
        ))}
      </div>
      <div>
        {product.tabs.map((tab) => (
          <div className="relative mt-7" key={tab.name}>
            <div className="absolute -top-48" id={tab.name}></div>
            <h3 className="font-bold text-lg leading-9">{tab.name}</h3>
            <p
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: tab.content }}
            ></p>
          </div>
        ))}
      </div>
    </>
  );
}
