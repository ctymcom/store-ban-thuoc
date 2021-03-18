import { OrderStatus } from "../../../../lib/repo/order-status.repo";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
interface PropsType extends ReactProps {
  statuses: OrderStatus[];
  status: string;
}

export function OrderHistoryStatus({ status, statuses, ...props }: PropsType) {
  const href = "/profile/order-history";
  const [statusMenu, setStatusMenu] = useState([]);

  useEffect(() => {
    if (statuses) {
      setStatusMenu([
        {
          href,
          name: "Tất cả",
          status: null,
        },
        ...[...statuses]
          .sort((a, b) => (a.position < b.position ? -1 : 1))
          .map((x) => ({
            href,
            name: x.name,
            status: x.name2,
          })),
      ]);
    }
  }, [statuses]);

  useEffect(() => {
    if (statuses) {
      setTimeout(() => {
        scrollTo(status || "all");
      });
    }
  }, [statuses, status]);

  const scrollTo = (status) => {
    let el = document.getElementById("tab-" + status);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <div className="flex w-full no-scrollbar pb-2">
      {statusMenu.map((menu) => (
        <Link
          key={menu.status}
          href={{ pathname: menu.href, query: menu.status ? { status: menu.status } : {} }}
        >
          <a
            id={menu.status ? `tab-${menu.status}` : `tab-all`}
            className={`uppercase font-semibold whitespace-nowrap text-sm md:text-base lg:text-lg p-2 border-b-4 flex-grow text-center ${
              status == menu.status
                ? `text-primary border-primary hover:text-primary-dark`
                : `text-gray-700 border-gray-200 hover:text-primary`
            }`}
          >
            {menu.name}
          </a>
        </Link>
      ))}
    </div>
  );
}
