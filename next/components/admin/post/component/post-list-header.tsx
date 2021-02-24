import Link from "next/link";
import { Input } from "../../../shared/utilities/form/input";
import { Select } from "../../../shared/utilities/form/select";
import { usePostListContext } from './../providers/post-list-provider';

interface PropsType extends ReactProps {
  
}

export function PostListHeader(props: PropsType) {

  const { order, setOrder, orderOptions, search, setSearch } = usePostListContext()

  return <>
    <div className="flex justify-between items-center h-12">
      <div className="text-xl text-gray-800 font-semibold">Bài viết</div>
      <div className="flex items-center">
        <Input className="rounded-r-none" placeholder="Tìm kiếm bài viết" value={search} onChange={(val) => setSearch(val)} />
        <Select className="rounded-l-none" value={order} options={orderOptions} onChange={(val) => { setOrder(val); }}/>
        <Link href="/admin/post/create">
          <a className="btn-primary h-10 px-6 ml-3">
            <span>Tạo bài viết mới</span>
          </a>
        </Link>
      </div>
    </div>
  </>
}