import { useEffect, useState } from "react";
import { PostList } from "./component/post-list";
import { PostListHeader } from "./component/post-list-header";
import { PostListContext, PostListProvider, usePostListContext } from "./providers/post-list-provider";
import { PaginationRound } from './../../shared/utilities/pagination/pagination-round';
import { Spinner } from "../../shared/utilities/spinner";
import { Pagination } from "../../../lib/repo/crud.repo";

export function PostListPage() {

    const { page, limit, total, setPage, posts } = usePostListContext()
    
    return <>
        <div className="max-w-7xl">
            <PostListHeader/>
            {
                !posts ? <Spinner/> :
                <PostList posts={posts}/>
            }
            <div className="flex justify-end mt-2">
                <PaginationRound 
                    limit={limit} page={page} total={total}
                    onPageChange={(page) => { setPage(page) }}
                />
            </div>
        </div>
    </>
}