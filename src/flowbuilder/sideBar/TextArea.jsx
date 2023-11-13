import React, { useState } from "react";

function ResponsiveTextarea({ placeholder }) {
  const [text, setText] = useState("");

  return (
    <textarea
      className="w-full min-h-[400px] px-4 py-2 border rounded-md"
      placeholder={placeholder}
      value={text}
      onChange={(e) => setText(e.currentTarget.value)}
    />
  );
}

export default ResponsiveTextarea;
