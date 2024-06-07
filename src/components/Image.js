import React, { useState, useEffect } from 'react';

const Image = ({ item, index , ...props }) => {
  const [loading, setLoading] = useState(true);

  return loading === false ? <div className="px-1 md:max-w-3xl relative mx-auto w-full h-[400px] object-cover skeleton mb-1 last:mb-0"><div className="loader absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div></div> : <img
            key={index}
            // src={`${process.env.REACT_APP_API_IMAGE}${item}`}
            src={
              item.includes("http")
                ? item
                : `${process.env.REACT_APP_API_IMAGE}${item}`
            }
            onError={(e) => {
              console.log(e);
              setLoading(false)
            }}
            alt=""
            className="px-1 md:max-w-3xl mx-auto w-full object-cover"
          />
};

export default Image;