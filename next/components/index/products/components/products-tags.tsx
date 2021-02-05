interface PropsType {
  tags: { 
    name: string 
    active?: boolean
  }[]
  setTags: Function
}
export function ProductsTags(props: PropsType) {

  const toggleTag = (tag, index) => {
    let tags = [...props.tags]
    tags[index].active = !tags[index].active
    props.setTags(tags)
  }

  return <>
      <div className="flex flex-wrap -mx-3 -mb-2">
          {
            props.tags.map((tag, index) => (
              <span  key={index} className="px-1.5 mb-1.5">
                <span className={"btn-outline rounded-full border-primary px-3 whitespace-nowrap " + 
                  (tag.active ?'bg-primary text-white hover:bg-primary-dark hover:text-white':'')}
                onClick={() => toggleTag(tag, index)}>{tag.name}</span>
              </span>
            ))
          }
      </div>
  </>
}