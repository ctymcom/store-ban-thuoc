import { useRouter } from 'next/router';
import React from "react";
import { ImageUploader } from "../../../shared/form/image-uploader";
import { Input } from "../../../shared/form/input";
import { SelectMulti } from "../../../shared/form/select-multi";
import { TextArea } from "../../../shared/form/text-area";
import { usePostDetailsContext } from './../providers/post-details-provider';

interface PropsType extends ReactProps {
}

export function PostDetailsForm({ ...props }: PropsType) {

  const router = useRouter()
  const { post, savePost, tags, createTag } = usePostDetailsContext()

  const onSavePost = () => {
    savePost().then(() => {
      router.push('/admin/post')
    })
  }

  return <>
    <div className="p-5 flex flex-col space-y-4 rounded-r" style={{ backgroundColor: '#E6EAEE' }}>
      <ImageUploader
        label="Hình đại diện"
        value={post.featureImage}
        onChanged={(value) => (post.featureImage = value)}
      />
      <Input
        label="Link đăng bài"
        placeholder="Nhập link đăng bài"
        value={post.slug}
        onChanged={(value) => (post.slug = value)}
      />
      <Input
        inputType="datetime-local"
        label="Ngày đăng bài"
        value={post.publishedAt ? post.publishedAt.toString() : null}
        onChanged={(value) => (post.publishedAt = new Date(value))}
      />
      <SelectMulti
        style="bg-white"
        label="Tag trong bài đăng"
        placeholder="Nhập tên tag"
        addOnEmpty
        values={post.tags.map((t) => ({ value: t.id, display: t.name }))}
        options={tags.map(t => ({ value: t.id, display: t.name }))}
        onValuesChanged={(values) => post.tagIds = values}
        onAddNew={(value) => createTag(value).then(t => ({ value: t.id, display: t.name }))}
      />
      <TextArea
        label="Trích dẫn"
        placeholder="Nhập trích dẫn"
        value={post.excerpt}
        onChanged={(value) => (post.excerpt = value)}
      />
      <div className="mt-2">
        <button className="btn-primary w-full btn-lg uppercase" onClick={ () => onSavePost() }>
          <span>{ post.id ? 'Cập nhật bài đăng' : 'Tạo bài đăng mới' }</span>
        </button>
      </div>
    </div>
  </>
}
              