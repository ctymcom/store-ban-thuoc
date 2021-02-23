import { cloneDeep } from "lodash";
import { createContext, useContext, useEffect, useState } from "react";
import { Post, PostService } from "../../../../lib/repo/post.repo";
import { Tag, TagService } from './../../../../lib/repo/tag.repo';

export const PostDetailsContext = createContext<{
  post?: Post
  savePost?: Function
  tags?: Tag[]
  createTag?: Function
}>({});


export function PostDetailsProvider({ postId, children }: any) {

  const [post, setPost] = useState<Post>(null);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    TagService.getAll({ query: { limit: 0 }}).then(res => {
      setTags(res.data)
    })
  }, []);

  useEffect(() => {
    if (postId) {
      PostService.getOne({ id: postId }).then(res => {
        setPost(cloneDeep(res))
      })
    } else {
      setPost({
        title: '',
        excerpt: '',
        content: '',
        featureImage: '',
        slug: '',
        priority: null,
        tags: [],
        tagIds: [],
        publishedAt: new Date()
      })
    }
  }, [postId]);

  const createTag = (name: string) => {
    return TagService.create({ data: { name }}).then(res => {
      setTags([...tags, res]);
      return res;
    })
  }

  const savePost = () => {
    let { title, content, slug, publishedAt, excerpt, tagsIds, featureImage, priority } = post
    return PostService.createOrUpdate({ id: post.id, data: { title, content, slug, publishedAt, excerpt, tagsIds, featureImage, priority } })
  }

  return (
    <PostDetailsContext.Provider value={{ post, savePost, tags, createTag }}>
      {children}
    </PostDetailsContext.Provider>
  );
}

export const usePostDetailsContext = () => useContext(PostDetailsContext)