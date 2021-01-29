import { createContext, useEffect, useState } from "react";
import { Pagination } from "../../../../lib/graphql/pagination";
import { Post, PostRepository } from "../../../../lib/repo/post-repo";
// Nơi chứa dữ liệu
export const PostContext = createContext<{
  [x: string]: any;
  Posts?: Post[]; // Danh sách bài post
  Pagination?: Pagination; // Thông tin phân trang
}>({});

// Nơi sản xuất dữ liệu
export function PostProvider({ children }: any) {
  const postRepo = new PostRepository();
  const [Posts, setPosts] = useState<Post[]>([]); // Sản xuất ra Danh sách post
  const [Pagination, setPagination] = useState<Pagination>({
    limit: 5,
    page: 1,
    offset: 0,
    total: 0,
  }); // Sản xuất ra Thông tin trang
  function loadPosts(pagination: Pagination, cache: boolean = true) {
    return postRepo
      .getAll({ query: { limit: pagination.limit, page: pagination.page }, cache })
      .then((res) => {
        setPagination(res.pagination);
        setPosts(res.data);
      });
  }
  useEffect(() => {
    loadPosts(Pagination);
  }, []);

  return (
    <PostContext.Provider value={{ Posts, Pagination, loadPosts }}>{children}</PostContext.Provider>
  );
}
