const StatisticsCard = ({icon, className, title, description, total}) => {
    return ( <div className={`h-[220px] ${className} rounded-md p-10 basis-1/3 text-white`}>
        <p className="mb-4 text-[18px] relative">
            {title}
            <span className="absolute right-0 top-0 text-2xl">{icon}</span>
        </p>
        <p className="text-3xl mb-12">{total}</p>
        <p>{description}</p>
    </div> );
}
 
export default StatisticsCard;