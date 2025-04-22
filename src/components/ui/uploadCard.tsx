import { FolderOpenOutlined, RightOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";

export default function UploadCard({ item }: { item: { name: string } }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardStyle =
    "w-5/12 border h-14 rounded-2xl my-4 mr-10 ml-2 flex items-center p-4 justify-between";
  const upDocumentClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);     
      console.log("已选择文件:", file.name);
    }
  };
  return (
    /* 用模版字符串 提出style */
    <div className={`${cardStyle}`} onClick={upDocumentClick}>
      <div className="flex items-center">
        <div className="border rounded-full w-8 h-8 flex justify-center">
          <FolderOpenOutlined />
        </div>
        {/* 传入每个卡片的名字 */}
        <span className="text-xs pl-2 w-56">
          {item.name}
          <span className="text-red-700 pl-1">*</span>
        </span>
      </div>
      <div>
        <RightOutlined className="text-xs" />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={handleFileChange}
      />
    </div>
  );
}
