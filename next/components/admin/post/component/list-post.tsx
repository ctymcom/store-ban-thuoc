import { useRouter } from "next/router";
import React, { useState } from "react";

import { SelectBox } from "../../../../components/shared/form/select-box";
import { TablePagination } from "../../../shared/table/table-pagination";
import { PostContext, PostProvider } from "../providers/post-provider";
import { PostCard } from "./post-card";

export function ListPost() {
  const router = useRouter();
  return (
    <PostProvider>
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">Bài viết</div>
        <div className="flex items-center">
          <SelectBox options={["Tất cả bài viết", "Bản nháp"]} style="py-1 " />
          <div className="flex items-center border border-gray-300 rounded-md px-2">
            <p className="text-sm font-semibold">Sắp xếp: </p>
            <SelectBox
              options={["Tất cả bài viết", "Bản nháp"]}
              style="border-none font-semibold py-1 "
            />
          </div>
          <div className="ml-4">
            <div
              className="px-3 py-2 text-sm bg-primary-500 cursor-pointer text-white rounded"
              onClick={() => {
                router.push("/admin/post/create-post");
              }}
            >
              Tạo bài viết
            </div>
          </div>
        </div>
      </div>
      <div className="py-8">
        <div className="grid grid-cols-4 gap-8 py-2">
          <PostContext.Consumer>
            {({ Posts }) => Posts.map((item, index) => <PostCard post={item} key={item.id} />)}
          </PostContext.Consumer>
        </div>
        <PostContext.Consumer>
          {({ Pagination, setQuery, query }) => (
            <TablePagination
              pagination={Pagination}
              onPageChanged={(e) => setQuery({ ...query, page: e })}
            />
          )}
        </PostContext.Consumer>
      </div>
    </PostProvider>
  );
}
