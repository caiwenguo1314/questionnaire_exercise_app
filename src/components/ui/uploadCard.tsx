import { FolderOpenOutlined, RightOutlined, CheckCircleFilled, CloudUploadOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";

interface UploadCardProps {
  item: {
    name: string;
    required?: boolean;
  };
}

export default function UploadCard({ item }: UploadCardProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const upDocumentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // 模拟上传过程
      setTimeout(() => {
        setSelectedFile(file);
        setIsUploading(false);
        console.log("已选择文件:", file.name);
      }, 1000);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCardStyle = () => {
    let baseStyle = "w-full border-2 rounded-xl p-4 transition-all duration-300 cursor-pointer hover:shadow-md ";
    
    if (selectedFile) {
      baseStyle += "border-green-300 bg-green-50 hover:border-green-400 ";
    } else if (isUploading) {
      baseStyle += "border-blue-300 bg-blue-50 ";
    } else {
      baseStyle += "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 ";
    }
    
    return baseStyle;
  };

  return (
    <div className={getCardStyle()} onClick={!isUploading ? upDocumentClick : undefined}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {/* 图标区域 */}
          <div className={`rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 ${
            selectedFile 
              ? 'bg-green-100 text-green-600' 
              : isUploading 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-gray-100 text-gray-500'
          }`}>
            {selectedFile ? (
              <CheckCircleFilled className="text-lg" />
            ) : isUploading ? (
              <CloudUploadOutlined className="text-lg animate-pulse" />
            ) : (
              <FolderOpenOutlined className="text-lg" />
            )}
          </div>
          
          {/* 文档信息区域 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <h4 className={`text-sm font-medium leading-tight ${
                selectedFile ? 'text-green-800' : 'text-gray-800'
              }`}>
                {item.name}
                {item.required !== false && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </h4>
            </div>
            
            {/* 文件状态信息 */}
            <div className="mt-1">
              {isUploading ? (
                <p className="text-xs text-blue-600 font-medium">Uploading...</p>
              ) : selectedFile ? (
                <div className="space-y-1">
                  <p className="text-xs text-green-700 font-medium truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-green-600">
                    {formatFileSize(selectedFile.size)} • Uploaded
                  </p>
                </div>
              ) : (
                <p className="text-xs text-gray-500">
                  Click to upload • PDF, DOC, DOCX, JPG, PNG
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* 右侧箭头 */}
        {!isUploading && (
          <div className="flex-shrink-0 ml-2">
            <RightOutlined className={`text-sm transition-colors ${
              selectedFile ? 'text-green-500' : 'text-gray-400'
            }`} />
          </div>
        )}
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={handleFileChange}
        disabled={isUploading}
      />
    </div>
  );
}
