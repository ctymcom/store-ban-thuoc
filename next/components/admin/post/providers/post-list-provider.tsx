import { createContext, useContext, useEffect, useState } from "react";
import { Pagination } from "../../../../lib/repo/crud.repo";
import { Post, PostService } from "../../../../lib/repo/post.repo";
// Nơi chứa dữ liệu
export const PostListContext = createContext<{
  posts?: Post[];
  loadPosts?: Function;
  page?: number
  setPage?: Function;
  limit?: number
  total?: number
  order?: any
  setOrder?: Function
  search?: any
  setSearch?: Function
  orderOptions?: Options[]
  togglePostStatus?: Function
}>({});

const ORDER_OPTIONS = [
  { value: 'latest', label: 'Sắp xếp mới nhất' },
  { value: 'oldest', label: 'Sắp xếp cũ nhất' },
]
export function PostListProvider({ children }: any) {
  const [posts, setPosts] = useState<Post[]>([]); // Sản xuất ra Danh sách post
  
  const [order, setOrder] = useState(ORDER_OPTIONS[0].value);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const loadPosts = (cache?: boolean) => {
    setPosts(null);

    let orderObj = {}
    switch (order) {
      case 'latest': {
        orderObj = { createdAt: -1 }
        break
      }
      case 'oldest': {
        orderObj = { createdAt: 1 }
        break
      }
    }
    return PostService.getAll({ query: {
      order: orderObj,
      search,
      limit,
      page,
    }, cache }).then(res => {
      setPosts(res.data)
      setTotal(res.pagination.total)
    })
  }

  const togglePostStatus = (post) => {
    let status = post.status == 'PUBLIC' ? 'DRAFT' : 'PUBLIC'
    PostService.update({ id: post.id, data: { status } }).then(res => {
      loadPosts(false)
    })
  }

  useEffect(() => {
    loadPosts()
  }, [order, search, page]);

  return (
    <PostListContext.Provider value={{ posts, loadPosts, page, limit, total, togglePostStatus,
      setPage, order, setOrder, search, setSearch, orderOptions: ORDER_OPTIONS }}>
      {children}
    </PostListContext.Provider>
  );
}

export const usePostListContext = () => useContext(PostListContext)