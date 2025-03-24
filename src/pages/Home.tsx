import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full mx-4 ">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">
              欢迎参与问卷调查
            </h1>
            <p className="text-gray-600">
              这是一份关于保单实际情况的调查问卷，请安装实际情况如实填写。
            </p>
            <button
              onClick={() => navigate("/form/policySelect")}
              className="w-4/5 py-3 m-auto bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center "
            >
              <span>开始填写</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
