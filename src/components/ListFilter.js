const ListFilter = ({ list, setValue, id, setFilter }) => {
  const handleClick = async (data) => {
    setValue(data.name);
    if (id === 1) {
      setFilter((prev) => {
        return { ...prev, genre: data._id };
      });
    }
    if (id === 2) {
      let sortBy = "";
      if (data.id === 1) sortBy = "viewCount";
      if (data.id === 2) sortBy = "title";
      if (data.id === 3) sortBy = "follow";
      setFilter((prev) => {
        return { ...prev, sort: `-${sortBy}` };
      });
    }
    // let comicApi
    // if (!id) {
    //   comicApi = await apiGetAllComic();
    // } else {
    //   comicApi = await apiGetComicFilter(filter);
    // }
    // setComics(comicApi?.mes);
  };

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 absolute top-full left-0 bg-color-float p-4 translate-y-2 delay-1000">
      {list.map((item, index) => {
        return (
          <div
            onClick={() => {
              handleClick(item);
            }}
            key={index}
            className="text-sm leading-7 hover:bg-main rounded-md cursor-pointer"
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

export default ListFilter;
