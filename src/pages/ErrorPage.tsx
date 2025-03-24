import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404😻</h1>
        <p className="text-xl text-gray-600 mb-4">页面似乎迷路了...</p>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2 w-32"
        >
          返回上一页
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-32"
        >
          返回首页
        </button>
      </div>
    </div>
  );
}
