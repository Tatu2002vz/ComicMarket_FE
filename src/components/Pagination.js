import { useLocation, useNavigate } from "react-router-dom";
const Pagination = ({ list, total }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname, search } = location;
  let convertFinal;
  if (search !== "") {
    let convert = search
      .replace("?", "")
      .split("&")
      .map((item) => {
        return item.split("=");
      });
    convertFinal = convert.reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  } else {
    convertFinal = { page: "1" };
  }
  let listPage = [];
  if(total) {
    for (let i = 1; i <= +total; i++) {
      listPage.push(i);
    }
    const handleClick = (item) => {
      navigate(`${pathname}?page=${item}`);
    };
    return (
      <div className="flex justify-center">
        {listPage.map((item, index) => {
          return (
            <nav
              key={index}
              className={`px-1 py-1 mx-1 border rounded-full w-10 h-10 flex items-center justify-center hover:bg-main cursor-pointer ${
                convertFinal.page === item.toString() && "bg-main"
              }`}
              onClick={() => {
                handleClick(item);
              }}
            >
              {" "}
              {item}
            </nav>
          );
        })}
      </div>
    );
  }
};

export default Pagination;
