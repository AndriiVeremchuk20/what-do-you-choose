"use client";

import {TypeAnimation} from "react-type-animation";

const Error404 = () => {

return    <div className="flex h-3/4 w-3/4 flex-col items-center justify-center">
        <TypeAnimation
          sequence={["$)$", 1000, "404"]}
          cursor={false}
          speed={20}
          className="text-6xl"
        />

        <TypeAnimation
          sequence={["PAGE NOT FOUND..."]}
          cursor={false}
          className="text-4xl"
          speed={10}
        />
      </div>
}


export default Error404;
