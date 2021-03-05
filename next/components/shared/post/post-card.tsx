import { format, isSameYear, parseISO } from "date-fns";
import { post } from "jquery";
import Link from "next/link";
import LazyLoad from "react-lazyload";

import { Post } from "../../../lib/repo/post.repo";

interface PropsType extends ReactProps {
  post: Post;
  large?: boolean;
}
export function PostCard({ post, large = false, ...props }: PropsType) {
  let date = parseISO(post.createdAt.toString());
  let dateText = format(date, "dd") + " tháng " + format(date, "MM, yyyy - HH:mm");

  return (
    <Link href={"/post/" + post.slug}>
      {large ? (
        <a className="flex cursor-pointer rounded hover:shadow-lg transition group overflow-hidden border border-gray-400">
          <div className="w-1/2">
            <LazyLoad>
              <div className="image-wrapper ratio-16-9 overflow-hidden border-r border-gray-300">
                <img
                  className="transition transform group-hover:scale-110"
                  src={post.featureImage}
                  onError={(e) => {
                    (e.target as any).src = "/assets/img/default.png";
                  }}
                />
              </div>
            </LazyLoad>
          </div>
          <div className="p-4 lg:p-8">
            <div className="pb-4 text-gray-600 text-base font-light group-hover:text-primary">
              {dateText}
            </div>
            <div className="mb-6 max-h-20 text-xl text-gray-800 font-semibold text-ellipsis-2 group-hover:text-primary-dark">
              {post.title}
            </div>
            <div className=" text-lg text-gray-500 group-hover:text-primary text-ellipsis-3 h-18 font-normal">
              {post.excerpt}
            </div>
          </div>
        </a>
      ) : (
        <a className="flex flex-col cursor-pointer rounded hover:shadow-md transition group overflow-hidden border border-gray-400">
          <div className="w-full">
            <LazyLoad>
              <div className="image-wrapper ratio-16-9 overflow-hidden border-b border-gray-300">
                <img
                  className="transition transform group-hover:scale-110"
                  src={post.featureImage}
                  onError={(e) => {
                    (e.target as any).src = "/assets/img/default.png";
                  }}
                />
              </div>
            </LazyLoad>
          </div>
          <div className="px-3 pt-4 pb-0.5 text-gray-600 text-sm font-light group-hover:text-primary">
            {dateText}
          </div>
          <div className="px-3 mb-1 max-h-20 text-lg text-gray-800 font-semibold text-ellipsis-2 group-hover:text-primary-dark">
            {post.title}
          </div>
          <div className="px-3 mb-4 text-gray-500 group-hover:text-primary text-ellipsis-3 h-18 font-normal">
            {post.excerpt}
          </div>
        </a>
      )}
    </Link>
  );
}
