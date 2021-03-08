import { createContext, useContext, useEffect, useState } from "react";
import { Post, PostService } from "../../../../lib/repo/post.repo";

export const PostDetailsContext = createContext<
  Partial<{
    post: Post;
    importantPosts: Post[];
    latestPosts: Post[];
  }>
>({});

interface PropsType extends ReactProps {
  postId: string;
}

export function PostDetailsProvider({ postId, ...props }: PropsType) {
  const [post, setPost] = useState<Post>();
  const [importantPosts, setImportantPosts] = useState<Post[]>();
  const [latestPosts, setLatestPosts] = useState<Post[]>();

  useEffect(() => {
    PostService.getOne({ id: postId }).then((res) => {
      setPost(res);
      console.log(res);
    });
    PostService.query({
      query: [
        PostService.getAllQuery({
          query: {
            limit: 4,
            filter: { _id: { __ne: postId }, status: "PUBLIC" },
            order: { createdAt: -1 },
          },
        }),
        PostService.getAllQuery({
          query: {
            limit: 4,
            filter: { _id: { __ne: postId }, status: "PUBLIC" },
            order: { priority: -1 },
          },
        }),
      ],
    }).then((res) => {
      setLatestPosts(res.data.g0.data);
      setImportantPosts(res.data.g1.data);
    });
  }, []);

  return (
    <PostDetailsContext.Provider value={{ post, importantPosts, latestPosts }}>
      {props.children}
    </PostDetailsContext.Provider>
  );
}

export const usePostDetailsContext = () => useContext(PostDetailsContext);
