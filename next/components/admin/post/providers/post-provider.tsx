import { createContext, useEffect, useState } from "react";
import { Post, PostRepository } from "../../../../lib/repo/post.repo";
import { QueryInput } from "../../../../lib/graphql/query-input";
import { Pagination } from './../../../../lib/graphql/pagination';
// Nơi chứa dữ liệu
export const PostContext = createContext<{
  [x: string]: any;
  Posts?: Post[]; // Danh sách bài post
  Pagination?: Pagination; // Thông tin phân trang
  loadPosts?: (cache?: boolean) => Promise<Post[]>;
  query?: QueryInput;
}>({});

// Nơi sản xuất dữ liệu
export function PostProvider({ children }: any) {
  const postRepo = new PostRepository();
  const [posts, setPosts] = useState<Post[]>([]); // Sản xuất ra Danh sách post
  const [pagination, setPagination] = useState<Pagination>({
    limit: 5,
    page: 1,
    offset: 0,
    total: 0,
  });
  const [query, setQuery] = useState<QueryInput>({
    page: 1,
    limit: 10,
    order: { createdAt: -1 },
  });
  function loadPosts(cache: boolean = true) {
    return postRepo.getAll({ query, cache }).then((res) => {
      setPagination(res.pagination);
      setPosts(res.data);
      return res.data;
    });
  }
  useEffect(() => {
    loadPosts();
  }, [query]);

  return (
    <PostContext.Provider value={{ posts, pagination, loadPosts, setQuery }}>
      {children}
    </PostContext.Provider>
  );
}
