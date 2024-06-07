import { useEffect, useState } from "react";
import { apiGetAllPurchase } from "../../apis";
import getTime from "../../utils/getTime";

const IncomeManager = () => {
  const [purchase, setPurchase] = useState(null);
  const fetchPurchase = async () => {
    const purchaseApi = await apiGetAllPurchase();
    if (purchaseApi?.success) {
      setPurchase(purchaseApi?.mes);
    }
  };
  useEffect(() => {
    fetchPurchase();
  }, []);
  return (
    <div className="p-5 overflow-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th>STT</th>
            <th>Người mua</th>
            <th>Tên truyện</th>
            <th>Ảnh bìa</th>
            <th>Chapter</th>
            <th>Ngày mua</th>
          </tr>
        </thead>
        <tbody>
          {purchase?.map((item, index) => {
            return (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td >{item?.user?.fullname}</td>
                <td>{item?.comic?.title}</td>
                <td>
                  <img src={item?.comic?.coverImage} alt="" className="h-10 mx-auto" />
                </td>
                <td className="text-center">
                    Chapter {item?.chapter?.chapNumber}
                </td>
                <td className="text-center">{getTime(item?.updatedAt)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};

export default IncomeManager;
