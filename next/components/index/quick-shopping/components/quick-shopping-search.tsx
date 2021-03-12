import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import { useQuickShoppingContext } from "../providers/quick-shopping-provider";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useScreen from "../../../../lib/hooks/useScreen";

interface PropsType extends ReactProps {}
export function QuickShoppingSearch(props: PropsType) {
  const { search, setSearch } = useQuickShoppingContext();
  const router = useRouter();
  useEffect(() => {
    if (router.query.search) {
      setSearch(router.query.search);
      router.replace("/quick-shopping");
    }
  }, [router.query]);
  const screenMd = useScreen("md");

  return (
    <div className="relative flex items-center">
      <input
        className="w-full px-12 h-12 border rounded border-gray-500 hover:border-primary focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-20"
        placeholder="Tìm kiếm nhanh thuốc"
        autoFocus={screenMd}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <i className="absolute left-4 text-gray-500">
        <HiOutlineSearch />
      </i>
      {search && (
        <button
          className="btn-default hover-danger p-0 h-12 w-10 absolute right-0"
          onClick={() => setSearch("")}
        >
          <i>
            <HiOutlineX />
          </i>
        </button>
      )}
    </div>
  );
}
