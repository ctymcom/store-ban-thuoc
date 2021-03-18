import { Spinner } from "../../shared/utilities/spinner";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { usePostDetailsContext } from "./providers/post-details-provider";
import { SectionHeader } from "../home/components/section-header";
import { PostCard } from "../../shared/post/post-card";
import BreadCrumbs from "../../shared/utilities/breadcrumbs/breadcrumbs";
import { useEffect, useState } from "react";
import { PostList } from "../../shared/post/post-list";

export function PostDetailsPage() {
  const { post, latestPosts, importantPosts } = usePostDetailsContext();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    if (post) {
      setBreadcrumbs([
        {
          href: "/",
          label: "Trang chủ",
        },
        {
          href: "/posts",
          label: "Tin tức",
        },
        {
          label: post.title,
        },
      ]);
    }
  }, [post]);

  return (
    <>
      {!post ? (
        <Spinner />
      ) : (
        <div className="main-container py-12">
          {!!breadcrumbs.length && <BreadCrumbs className="pb-4" breadcrumbs={breadcrumbs} />}
          <div className="flex flex-col lg:flex-row">
            <div className="flex-grow pb-6 lg:pb-0 lg:pr-6">
              <div className="text-gray-700">
                {format(parseISO(post.createdAt), "dd ") +
                  format(parseISO(post.createdAt), "MM yyyy - HH:mm")}
              </div>
              <div className="text-gray-800 text-3xl mt-2 font-semibold">{post.title}</div>
              {post.slug == "lien-he" && (
                <div className="w-full mt-8 h-96 shadow-md">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1959.787621554649!2d106.69029059662462!3d10.76718235928839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f166975fa01%3A0xa3d4e0e05339437d!2zQ05DVCBj4buVIHBo4bqnbiBBcm1lcGhhY28sIFjDrSBuZ2hp4buHcCBkxrDhu6NjIHBo4bqpbSAxNTAs!5e0!3m2!1svi!2s!4v1616057443839!5m2!1svi!2s"
                    className="w-full h-full"
                    loading="lazy"
                  ></iframe>
                </div>
              )}
              <div className="text-gray-600 text-lg mt-4">{post.excerpt}</div>
              <div
                className="ql-editor ql-snow mt-5"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>
            </div>
            <div className="flex-shrink-0 flex-grow-0 w-full lg:w-72">
              <SectionHeader text="Tin tức mới nhất" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
                {latestPosts?.map((post) => (
                  <div key={post.id} className="mb-4">
                    <PostCard post={post}></PostCard>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full mt-8">
            <SectionHeader text="Tin tức được quan tâm" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {importantPosts?.map((post) => (
                <PostCard key={post.id} post={post}></PostCard>
              ))}
            </div>
            {/* {importantPosts && <PostList title="Tin tức được quan tâm" posts={importantPosts} />} */}
          </div>
        </div>
      )}
    </>
  );
}
