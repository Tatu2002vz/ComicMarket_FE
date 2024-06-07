const getTime = (time) => {
  const utcDate = new Date(time);
  // Chuyển đổi sang múi giờ VNT (UTC+7)
  // const vntOffset = 7 * 60; // Độ lệch múi giờ VNT tính bằng phút
  const vntTime = new Date(utcDate.getTime());

  // Lấy thông tin ngày và giờ trong múi giờ VNT
  const vntYear = vntTime.getFullYear();
  const vntMonth = vntTime.getMonth() + 1; // Tháng trong JavaScript tính từ 0 đến 11
  const vntDay = vntTime.getDate();
  const vntHours = vntTime.getHours();
  const vntMinutes = vntTime.getMinutes();
  const vntSeconds = vntTime.getSeconds();
    return `${vntYear}-${vntMonth}-${vntDay} ${vntHours}:${vntMinutes}:${vntSeconds}`
};

export default getTime;
