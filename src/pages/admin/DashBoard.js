import { useEffect, useState } from "react";
import { StatisticsCard } from "../../components";
import {
  apiGetAllUser,
  apiGetAllComic,
  apiGetAllChapter,
  apiGetAllPurchase,
} from "../../apis";
import icons from "../../utils/icons";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);
// import Chart from 'react-apexcharts'

const { FaUser, FaBookOpen, CgEreader, GiMoneyStack } = icons;
const DashBoard = () => {
  const [total, setTotal] = useState({
    totalUsers: 0,
    totalComics: 0,
    totalChapters: 0,
    totalIncome: 0,
    income: null,
  });
  const fetchData = async () => {
    const allUser = await apiGetAllUser();
    const allComic = await apiGetAllComic();
    const allChapter = await apiGetAllChapter();
    const allPurchase = await apiGetAllPurchase();
    if (allUser.success) {
      setTotal((prev) => ({ ...prev, totalUsers: allUser?.mes?.length }));
    }
    if (allComic.success) {
      setTotal((prev) => ({ ...prev, totalComics: allComic?.counts }));
    }
    if (allChapter.success) {
      setTotal((prev) => ({ ...prev, totalChapters: allChapter?.mes }));
    }
    if (allPurchase.success) {
      const total = Array.from(allPurchase?.mes).reduce((acc, cur) => {
        return acc + cur?.chapter.price;
      }, 0);
      setTotal((prev) => ({
        ...prev,
        totalIncome: total,
        income: allPurchase?.mes,
      }));
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const data = {
    labels: total?.income
      ?.map((item) => {
        return new Date(item?.createdAt).getDate();
      })
      .reduce(
        (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
        []
      ).map(item => `Ngày ${item}`),
    datasets: [
      {
        data: total?.income
          ?.map((item) => {
            return new Date(item?.createdAt).getDate() + 1;
          })
          .reduce(
            (unique, item) =>
              unique.includes(item) ? unique : [...unique, item],
            []
          )
          .map((item) => {
            let sum = 0;
            for (let el of total?.income) {
              if (new Date(el?.createdAt).getDate() + 1 === +item) {
                sum += el?.chapter?.price;
              }
            }
            return sum;
          }),
        label: "Thu nhập",
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
        // barPercentage: 0.1,
        categoryPercentage: 0.1,
      },
      
    ],
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Pie Chart',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Arial, sans-serif',
          color: '#fff',
        },
      },
      legend: {
        labels: {
          font: {
            size: 14,
            family: 'Arial, sans-serif',
            color: '#fff',
          },
        },
      },
    },
  };

  return (
    <div>
      <div className="grid md:gap-10 p-10 md:grid-cols-3 gap-3">
        <StatisticsCard
          className={"bg-gradient-to-r from-[#FFB86C] to-[#FE6BCA]"}
          total={total.totalIncome}
          icon={<GiMoneyStack />}
          title={"Total Income"}
          description={"Increased 60% compared to last month"}
        />
        <StatisticsCard
          className={"bg-gradient-to-r from-[#FFBF96] to-[#FE7D96]"}
          total={total.totalUsers}
          icon={<FaUser />}
          title={"Total Users"}
          description={"Increased 60% compared to last month"}
        />
        <StatisticsCard
          className={"bg-gradient-to-r from-[#8FCAF9] to-[#1C8BE4]"}
          total={total.totalComics}
          icon={<FaBookOpen />}
          title={"Total Comics"}
          description={"Increased 60% compared to last month"}
        />
        <StatisticsCard
          className={"bg-gradient-to-r from-[#83D9D2] to-[#1CCFB4]"}
          total={total.totalChapters}
          icon={<CgEreader />}
          title={"Total Chapters"}
          description={"Increased 60% compared to last month"}
        />
      </div>
      <div className="">
        <Bar data={data}  />
      </div>
    </div>
  );
};

export default DashBoard;
