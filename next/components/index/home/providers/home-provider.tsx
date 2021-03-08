import { createContext, useContext, useEffect, useState } from "react";

import { Feedback, FeedbackService } from "../../../../lib/repo/feedback.repo";
import { Post, PostService } from "../../../../lib/repo/post.repo";
import { Product } from "../../../../lib/repo/product.repo";
import { ProductContainerService } from "../../../../lib/repo/productContainer.repo";
import { SettingService } from "../../../../lib/repo/setting.repo";

export const HomeContext = createContext<
  Partial<{
    loadDone?: boolean;
    feedbacks?: Feedback[];
    posts?: Post[];
    productGroups?: {
      title: string;

      products: Product[];
    }[];
    banners1: Banner[];
    banners2: Banner[];
    banners3: Banner[];
    features: {
      image: string;
      title: string;
      content: string;
    }[];
  }>
>({});

interface Banner {
  image: string;
  link: string;
}

export function HomeProvider(props) {
  const [loadDone, setLoadDone] = useState(false);
  const [feedbacks, setFeedbacks] = useState(null);
  const [posts, setPosts] = useState(null);
  const [productGroups, setProductGroups] = useState([]);
  const [banners1, setBanners1] = useState(null);
  const [banners2, setBanners2] = useState(null);
  const [banners3, setBanners3] = useState(null);
  const [features, setFeatures] = useState(null);

  const loadHomeData = () => {
    const containers = ["SẢN PHẨM BÁN CHẠY", "SẢN PHẨM MỚI NHẤT"];
    FeedbackService.query({
      query: [
        FeedbackService.getAllQuery(),
        PostService.getAllQuery({
          query: {
            limit: 4,
            filter: { status: "PUBLIC", slug: { __exists: true } },
            order: { priority: -1 },
          },
        }),
        SettingService.getAllQuery({
          query: {
            limit: 0,
            filter: { key: { __in: ["BANNER_1", "BANNER_2", "BANNER_3", "FEATURE"] } },
          },
        }),
        ProductContainerService.getAllQuery(),
        // ...containers.map(x => ProductService.getAllQuery({query: { limit: 10, filter: { containers: x } }}))
      ],
    }).then((res) => {
      setFeedbacks(res.data.g0.data);
      setPosts(res.data.g1.data);
      setBanners1(
        res.data.g2.data.find((x) => x.key == "BANNER_1").value.items.filter((i) => i.visible)
      );
      setBanners2(
        res.data.g2.data.find((x) => x.key == "BANNER_2").value.items.filter((i) => i.visible)
      );
      setBanners3(
        res.data.g2.data.find((x) => x.key == "BANNER_3").value.items.filter((i) => i.visible)
      );
      setFeatures(res.data.g2.data.find((x) => x.key == "FEATURE").value.items);
      setProductGroups(
        res.data.g3.data.map((x, i) => ({
          title: x.name,
          products: x.products,
        }))
      );
      // setProductGroups(containers.map((x, i) => ({
      //   title: x,
      //   products: res.data['g' + (i + 3)].data,
      // })))
      setLoadDone(true);
    });
  };

  useEffect(() => {
    loadHomeData();
  }, []);

  return (
    <HomeContext.Provider
      value={{ loadDone, feedbacks, posts, productGroups, banners1, banners2, banners3, features }}
    >
      {props.children}
    </HomeContext.Provider>
  );
}

export const useHomeContext = () => useContext(HomeContext);
