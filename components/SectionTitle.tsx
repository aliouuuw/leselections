import React from "react";

const SectionTitle: React.FC<{ title: String }> = ({ title }) => (
  <div className="w-fit h-fit p-2 border-l border-primary">
    <h2>{title}</h2>
  </div>
);

export default SectionTitle;
