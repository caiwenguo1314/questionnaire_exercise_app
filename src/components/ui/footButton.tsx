import React from "react";

export default function FootButton({
  /* 接收的参数，名字，步骤，点击事件 */
  label,
  current,
  onClick,
}: {
  /* 定义参数 */
  label: string;
  current: number;
  onClick: () => void;
}) {
  return (
    <div>
      <button
        className={`${
          true ? "bg-blue-500" : "bg-gray-500"
        } text-white border rounded-full w-28 h-10 mr-4`}
        /* 点击事件 */
        onClick={true ? onClick : () => {}}
      >{/* 判断最后一步，是的话改成Submit，current后期要替代成steps.length */}
        {current === 4 && label === "Continue" ? "Submit" : label}
      </button>
    </div>
  );
}
