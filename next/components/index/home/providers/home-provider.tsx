import { createContext, useContext, useEffect, useState } from "react";
import { Feedback, FeedbackService } from "../../../../lib/repo/feedback.repo";
import { Post, PostService } from "../../../../lib/repo/post.repo";
import { Product, ProductService } from "../../../../lib/repo/product.repo";
import { Spinner } from "../../../shared/utilities/spinner";

export const HomeContext = createContext<{
  loadDone?: boolean
  feedbacks?: Feedback[]
  posts?: Post[]
  productGroups?: {
    title: string
    products: Product[]
  }[]
}>({});

export function HomeProvider(props) {
  const [loadDone, setLoadDone] = useState(false);
  const [feedbacks, setFeedbacks] = useState(null);
  const [posts, setPosts] = useState(null);
  const [productGroups, setProductGroups] = useState([]);

  const loadHomeData = () => {    
    const containers = ['SẢN PHẨM BÁN CHẠY', 'SẢN PHẨM MỚI NHẤT']
    FeedbackService.query({
      query: [
        FeedbackService.getAllQuery(),
        PostService.getAllQuery({ query: { limit: 4, filter: { status: 'PUBLIC' }, order: { priority: -1 } }}),
        ...containers.map(x => ProductService.getAllQuery({query: { limit: 5, filter: { containers: x } }}))
      ]
    }).then(res => {
      setFeedbacks(res.data.g0.data)
      setPosts(res.data.g1.data)
      setProductGroups(containers.map((x, i) => ({
        title: x,
        products: res.data['g' + (i + 2)].data, 
      })))
      setLoadDone(true)
    })
  }

  useEffect(() => {
    loadHomeData();
  }, []);

  return <HomeContext.Provider value={{ loadDone, feedbacks, posts, productGroups }}>
    {props.children}
  </HomeContext.Provider>;
}

export const useHomeContext = () => useContext(HomeContext);