const calculateTime = (time) => {
  const difference = Math.floor((Date.now() - new Date(time)) / (1000 * 60));
  switch (true) {
    case difference <= 0:
      return "Vài giây trước";
    case difference < 60:
      return `${difference} phút trước`;
    case difference < 24 * 60:
      return `${Math.floor(difference / 60)} giờ trước`;
    default:
      return `${Math.floor(difference / 60 / 24)} ngày trước`;
  }
};
export default calculateTime;
