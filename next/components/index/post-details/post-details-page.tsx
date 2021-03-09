import { Spinner } from "../../shared/utilities/spinner";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { usePostDetailsContext } from "./providers/post-details-provider";
import { SectionHeader } from "../home/components/section-header";
import { PostCard } from "../../shared/post/post-card";

export function PostDetailsPage() {
  const { post, latestPosts, importantPosts } = usePostDetailsContext();

  return (
    <>
      {!post ? (
        <Spinner />
      ) : (
        <div className="main-container py-12">
          <div className="flex flex-col md:flex-row">
            <div className="flex-grow pr-6">
              <div className="text-gray-700">
                {format(parseISO(post.createdAt), "dd ") +
                  format(parseISO(post.createdAt), "MM yyyy - HH:mm")}
              </div>
              <div className="text-gray-800 text-3xl mt-2 font-semibold">{post.title}</div>
              <div className="text-gray-600 text-lg mt-4">{post.excerpt}</div>
              <div
                className="ql-editor ql-snow mt-5"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>
            </div>
            <div className="flex-shrink-0 flex-grow-0 w-80">
              <SectionHeader text="Tin tức mới nhất" />
              {latestPosts?.map((post) => (
                <div key={post.id} className="mb-4">
                  <PostCard post={post}></PostCard>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full mt-5">
            <SectionHeader text="Tin tức được quan tâm" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {importantPosts?.map((post) => (
                <PostCard key={post.id} post={post}></PostCard>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
