
const Button = ({ text, css, onClick }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onClick()
  };
  return (
    <button
      onClick={handleClick}
      className={`w-[140px] h-[40px] rounded-full py-[1px] px-[6px] border-[2px] flex items-center justify-center  ${css}`}
    >
      {text}
    </button>
  );
};


export default Button;
