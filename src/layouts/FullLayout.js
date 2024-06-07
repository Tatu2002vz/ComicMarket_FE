import { useNavigate, useParams } from "react-router-dom";
import { apiGetChapter } from "../apis";
import { Header, ChapterController } from "./components";
import {Report} from '../components'
import { createContext, useEffect, useState } from "react";
import { chapterError } from "../enum/listError";
export const chapterContext = createContext();

const DefaultLayout = ({ children }) => {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const navigate = useNavigate()
  const fetchChapter = async () => {
    const resp = await apiGetChapter(id);
    if (resp?.status === 401) {
      navigate("/");
    }
    if (resp?.success) {
      setChapter(resp.mes);
    }
  };
  useEffect(() => {
    fetchChapter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <chapterContext.Provider value={{chapter}}>
      <div className="relative">
      <Header />
      <div className="bg-mainBg pt-[70px] pb-16 relative">
        <div className="max-w-main mx-auto">{children}</div>
        {showReport && (
          <Report
            setShowReport={setShowReport}
            errorComic={`Chapter ${chapter.chapNumber} - ${chapter?.comic?.title}`}
            errorReport={chapterError}
            isComic={true}
          />
        )}
      </div>
      <ChapterController chapNumber={chapter?.chapNumber} setShowReport={setShowReport} />
    </div>
    </chapterContext.Provider>
  );
};

export default DefaultLayout;
