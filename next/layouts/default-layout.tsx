import { Footer } from "./default-layout/footer";
import { HeadSEO } from "./default-layout/head-seo";
import { Header } from "./default-layout/header/header";
// import Sidebar from './components/sidebar';

interface PropsType extends ReactProps {
  title?: string
}

export function DefaultLayout({
  title = "Kho Thuốc Sỉ",
  ...props
}: PropsType) {
  return (
    <>
      <HeadSEO title={title}></HeadSEO>
      <Header/>
        <div className="w-full min-h-screen">
          {props.children}
        </div>
      <Footer/>
    </>
  );
}
