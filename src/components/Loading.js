const Loading = () => {
  return (
    <div className="fixed w-full h-full top-0 left-0 bg-mainBg/75 z-50">
      <div className="loader absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};

export default Loading;
