import { PostCard } from "../../shared/post/post-card";
import { Spinner } from "../../shared/utilities/spinner";
import { usePostsContext } from "./providers/posts-provider";
import useScreen from "./../../../lib/hooks/useScreen";

export function PostsPage() {
  const { posts, loading, total, loadPosts } = usePostsContext();
  const screenMd = useScreen("md");

  return (
    <>
      <div className="py-4 px-2 md:py-12 main-container max-w-6xl">
        {!posts ? (
          <Spinner />
        ) : (
          <>
            {screenMd && (
              <div className="w-full md:mb-12 lg:mb-20">
                <PostCard post={posts[0]} large />
              </div>
            )}
            <div className="w-full grid xs:grid-cols-2 md:grid-cols-3 gap-2 xs:gap-4 md:gap-6 lg:gap-8">
              {posts.slice(screenMd ? 1 : 0).map((post, index) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            {posts?.length < total && (
              <div className="mt-5 flex-center">
                <button
                  className="btn-primary px-10 h-12 mx-auto"
                  disabled={loading}
                  onClick={() => loadPosts()}
                >
                  Tải thêm
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
