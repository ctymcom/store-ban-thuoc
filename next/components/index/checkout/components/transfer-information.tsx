import React from "react";
interface PropsType extends ReactProps {
  info: {
    title: string;
    content: string;
  }[];
}
const TransferInformation = (props: PropsType) => {
  const coppyToClip = (value: string) => {
    let listener = (e: ClipboardEvent) => {
      e.clipboardData.setData("text/plain", value);
      e.preventDefault();
    };

    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
  };
  return (
    <div className="p-3 border rounded w-full xl:w-11/12 border-primary bg-green-50 text-16">
      {props.info.map((item, index) => {
        return (
          <div className="grid grid-cols-3 items-center leading-8" key={index}>
            <p className="col-span-3 md:col-span-1 text-gray-400">{item.title}: </p>
            <div className="col-span-3 md:col-span-2">
              <p className="inline-block">{item.content}</p>
              <button
                className={item.title === "Số tài khoản" ? "inline-block btn-default" : "hidden"}
                onClick={(e) => {
                  coppyToClip(item.content);
                }}
              >
                Sao chép
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransferInformation;
