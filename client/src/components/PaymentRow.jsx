const PaymentRow = ({ label, amount, percent, tx }) => {
  return (
    <div className="space-y-2 mb-6">
      <div className="flex justify-between font-medium text-sm">
        <span>{label}</span>
        <span>{amount}</span>
      </div>

      <div className="h-2 bg-orange-100 rounded-full">
        <div
          className="h-2 bg-[#d97706] rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-[#c2410c]">
        <span>{tx}</span>
        <span>{percent}%</span>
      </div>
    </div>
  );
};

export default PaymentRow;
