import { Input } from "../../../../components/shared/form/input";
import { SelectBox } from "../../../../components/shared/form/select-box";
import { TextArea } from "../../../../components/shared/form/text-area";
import { IconUpload } from "../../../../lib/svg/icon-upload";
import { Card } from "../../../../components/shared/card/card";
export function CreatePost() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-semibold">Đăng bài</div>
      </div>
      <div className="my-10 flex justify-between space-x-4 ">
        <Card className="m-h-screen w-full">
          <div className="px-2 py-4">
            <h3 className="text-sm font-semibold py-1">Tiêu đề</h3>
            <Input placeholder="Nhập tiêu đề" />
          </div>
          <div className="px-2 py-4">
            <h3 className="text-sm font-semibold py-1">Nội dung</h3>
            <TextArea placeholder="Nhập nội dung" />
          </div>
        </Card>

        <Card className="bg-gray-200 w-full max-w-sm">
          <div className="">
            <h3 className="text-sm font-semibold py-4 px-2">Thiết lập</h3>
            <div className="text-gray-400 bg-white rounded shadow m-2 flex flex-col items-center justify-center px-20 py-10">
              <div className="w-10">
                <IconUpload />
              </div>
              <p className="text-xs">Upload hình ảnh</p>
            </div>
          </div>
          <div className="px-2 py-4">
            <h3 className="text-sm font-semibold py-1">Link đăng bài</h3>
            <Input placeholder="Nhập link đăng bài" />
          </div>
          <div className="px-2 py-4">
            <h3 className="text-sm font-semibold py-1">Ngày đăng bài</h3>
            <div className="text-gray-400 rounded shadow  grid grid-cols-2 gap-5">
              <div className="bg-white px-2 py-2 rounded">16:26</div>
              <div className="bg-white px-2 py-2 rounded">28/1/2020</div>
            </div>
          </div>
          <div className="px-2 py-4">
            <h3 className="text-sm font-semibold py-1">Tag trong bài đăng</h3>
            <div className="text-gray-400 rounded shadow  grid grid-cols-1 gap-5">
              <SelectBox options={["Marketing", "Coder"]} style="bg-white" />
            </div>
          </div>
          <div className="px-2 py-4">
            <h3 className="text-sm font-semibold py-1">Trích dẫn</h3>
            <TextArea placeholder="Nhập trích dẫn" />
          </div>
        </Card>
      </div>
    </div>
  );
}
