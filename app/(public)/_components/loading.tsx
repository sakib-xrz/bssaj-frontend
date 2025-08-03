import React from 'react';
import { BounceLoader } from "react-spinners";

function Loading() {
  return (
    <div className="w-full h-[500px] flex items-center justify-center">
      <BounceLoader color='#14B3F1' />
    </div>
  );
}

export default Loading;