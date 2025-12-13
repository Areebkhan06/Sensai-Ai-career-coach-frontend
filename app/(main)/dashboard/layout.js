import React, { Suspense } from "react";
const layout = ({ children }) => {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="sm:text-6xl text-5xl font-bold gradient-title">Industry Insights</h1>
      </div>
      {children}
    </div>
  );
};

export default layout;
