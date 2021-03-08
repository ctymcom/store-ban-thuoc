import { createContext, useContext, useEffect, useState } from "react";

import useDebounce from "../../../../lib/hooks/useDebounce";
import { Pagination } from "../../../../lib/repo/crud.repo";
import { Product, ProductService } from "../../../../lib/repo/product.repo";
import { Post, PostService } from "./../../../../lib/repo/post.repo";

export const PostsContext = createContext<
  Partial<{
    posts: Post[];
    loading: boolean;
    total: number;
    loadPosts: Function;
  }>
>({});

export function PostsProvider(props) {
  const [posts, setPosts] = useState<Post[]>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const loadPosts = async () => {
    setLoading(true);
    let res = await PostService.getAll({
      query: {
        limit: posts ? 9 : 10,
        offset: posts ? posts.length : 0,
        order: { priority: -1 },
        filter: { status: "PUBLIC", slug: { __exists: true } },
      },
    });

    if (posts) {
      setPosts([...posts, ...res.data]);
    } else {
      setPosts([...res.data]);
    }
    setTotal(res.total);

    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <PostsContext.Provider value={{ posts, loading, total, loadPosts }}>
      {props.children}
    </PostsContext.Provider>
  );
}

export const usePostsContext = () => useContext(PostsContext);
