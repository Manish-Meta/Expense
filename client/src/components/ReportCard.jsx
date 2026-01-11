const ReportCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  progress,
}) => {
  return (
    <div className="bg-white rounded-xl p-5 space-y-3 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-[#c2410c]">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        <Icon className={`size-6 ${iconColor}`} />
      </div>

      {progress && (
        <div>
          <div className="h-2 bg-orange-100 rounded-full">
            <div
              className="h-2 bg-[#d97706] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <p className="text-xs text-[#c2410c]">{subtitle}</p>
    </div>
  );
};

export default ReportCard;
