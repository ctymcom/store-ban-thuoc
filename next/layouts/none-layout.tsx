import { HeadSEO } from "./default-layout/head-seo";
interface PropsType extends ReactProps {
  title?: string
};
export function NoneLayout({
  title = "Kho Thuốc Sỉ",
  ...props
}: PropsType) {
  return (
    <>
      <HeadSEO title={title}></HeadSEO>
      <div className="w-full min-h-screen">
        {props.children}
      </div>
    </>
  );
}
