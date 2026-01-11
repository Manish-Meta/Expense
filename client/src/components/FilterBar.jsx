import { Search } from "lucide-react";

const FilterBar = ({ statuses, categories, onSearch }) => {
  return (
    <div className="w-full bg-white rounded-lg p-4 flex flex-col md:flex-row gap-4 border border-[#d9770633]">
      
      <div className="relative w-full md:w-2/3">
        <Search className="absolute top-2 left-2 text-[#92400E]" size={16} />
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search..."
          className="w-full pl-7 py-2 text-xs border rounded focus:ring-[#92400E]"
        />
      </div>

      <div className="grid grid-cols-5 gap-3 w-full md:w-1/3">
        <select className="col-span-2 text-xs border rounded px-2">
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>

        <select className="col-span-2 text-xs border rounded px-2">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>

        <button className="col-span-1 text-xs border rounded">
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
