import { Header } from "./components";

const HeaderOnly = ({ children }) => {
  return (
    <>
      <Header />
      <div className="pt-[70px]">{children}</div>
    </>
  );
};

export default HeaderOnly;
