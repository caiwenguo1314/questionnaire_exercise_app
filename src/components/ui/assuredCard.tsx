import { useEffect, useState } from "react";
import { AssuredPerson } from "../../types/form";
import useQuestionnaireContext from "hooks/useQuestionnaireContext";
/* 定义CardData接口 */
// interface AssuredCardData {
//   name: string;
//   /* 已数组形式接收insurance对象，方便map */
//   insurance: {
//     insurancePiece: string;
//     insuranceNumber: string;
//   }[];
// }
/* 组件本身 */
export default function AssuredCard({
  /* 接受一个props,并解构复制 */
  AssuredCardData,
}: {
  /* 定义接受一个包含data结构形式对象的数组 */
  AssuredCardData: AssuredPerson[];
}) {
  /* 创建一个useState来管理点击的状态，为了实现每个card的单独控制， */
  const [selected, setSelected] = useState<boolean[]>(
    Array(AssuredCardData.length).fill(false)
  );
  const { selectedCardData, setSelectedCardData } = useQuestionnaireContext();
  /* 找到选中的卡片 */
  // useEffect(() => {
  //   const selectedCard: number = selected.findIndex((item) => item === true);
  //   if (selectedCard !== -1) {
  //     setSelectedCardData(AssuredCardData[selectedCard]);
  //   }
  //   console.log(selectedCardData);
  // }, [selected]);

  /* 创建一个单击响应函数，来改变card的状态，其中如果卡片的index和状态数组的i相等，正变为true其他为false，如果想储存状态就要用item */
  const handleClick = (index: number) => {
    /* useState中的set函数，源码中会判断 当传入函数时把当前状态传入函数作为参数，如果为参数时直接修改当前状态 */
    setSelected((prev) => {
      const tempSelected = prev.map((item, i) => (i === index ? !item : false));
      if (tempSelected[index]) {
        setSelectedCardData(AssuredCardData[index]);
      } else {
        setSelectedCardData(null);
      }      
      return tempSelected;
    });

  };
  useEffect (() => {
    console.log(selectedCardData); 
  }, [selectedCardData])
  return (
    <div>
      {/* 遍历 */}
      {AssuredCardData.map((item, index) => (
        <div
          key={index}
          className="w-full h-32 bg-white border-none rounded-3xl mt-4 shadow-md"
        >
          {/* 处理选中，开相对定位，绑单击事件，这是一个类radio的checkBox,外圈,通过index更新 */}
          <div
            className={`w-5 h-5 border rounded-full relative top-3 left-5 ${
              selected.indexOf(true) === index
                ? "bg-blue-500"
                : " border-gray-600"
            } flex justify-center items-center shadow-lg `}
            /* 传入index，实参 */
            onClick={() => handleClick(index)}
          >
            {/* 内圈强制居中 */}
            <div
              className={`w-2 h-2  rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "bg-white" ${
                selected.indexOf(true) === index ? "bg-white" : "border-none"
              }`}
            ></div>
          </div>
          {/* name */}
          <div className="relative left-14 -top-4 font-bold text-2xl">
            {item.name}
          </div>
          {/* 对保险内容进行遍历 */}
          <div className="flex relative left-10 top-6 gap-8">
            {item.insurance.map((item, index) => (
              <div key={index}>
                <div>{item.insurancePiece}</div>
                <div>{item.insuranceNumber}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
