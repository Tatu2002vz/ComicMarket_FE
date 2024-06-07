import calculateTime from '../utils/calculateTime'
import icons from '../utils/icons'
const {BiSolidLeftArrow} = icons
const Comment = ({ data }) => {
  const time = data?.createdAt
  return (
    <div className="flex w-full rounded-md">
      <div className="w-[50px] mr-4">
        <img
          src={`${process.env.REACT_APP_API_IMAGE}${data.avatar}`}
          alt="avatar"
          className="w-full object-cover"
        />
      </div>
      <div className='w-full mb-6 relative'>
        <div className="px-[10px] pb-[10px] mb-[10px] w-full bg-[#303956] rounded-md">
          <p className="font-semibold leading-10">
            {data?.user} {" "}
            {
              (data?.user !== null && data?.user !== undefined) && <span className="font-normal">- Chapter {data?.chapter}</span>
            }
          </p>
          <hr className="w-full border-[#ccc]" />
          <p className="leading-8 mt-[10px]">{data?.content}</p>
            <BiSolidLeftArrow size={16} color='#303956' className='absolute right-full translate-x-1 top-3'/>
        </div>
        <p className='ml-1 text-sm'>{time && calculateTime(time)}</p>
      </div>
    </div>
  );
};

export default Comment;
