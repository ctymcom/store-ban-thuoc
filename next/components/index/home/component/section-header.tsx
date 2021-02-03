type SectionHeaderProps = {
  [x: string]: any;
  text: string;
};
export function SectionHeader({ text, ...props }: SectionHeaderProps) {
  return (
    <div className="justify-center w-full">
      <h6 className="uppercase text-center">{text}</h6>
      <style jsx>{`
        h6 {
          display: flex;
          width: 100%;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        h6:before,
        h6:after {
          content: "";
          border-top: 2px solid rgb(214, 214, 214);
          margin: 0 20px 0 0;
          flex: 1 0 20px;
        }

        h6:after {
          margin: 0 0 0 20px;
        }
      `}
      </style>
    </div>
  );
}
