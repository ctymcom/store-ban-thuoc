type SectionHeaderProps = {
  [x: string]: any;
  text: string;
};
export function SectionHeader({ text, ...props }: SectionHeaderProps) {
  return (
    <div className="justify-center w-full">
      <h6 className="uppercase text-center">{text}</h6>
    </div>
  );
}
