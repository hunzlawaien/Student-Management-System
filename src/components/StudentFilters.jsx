import { Search } from "lucide-react";

function StudentFilters({
  searchTerm,
  onSearchChange,
  selectedGrade,
  onGradeChange,
  selectedSection,
  onSectionChange,
}) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 rounded-xl border border-gray-200 bg-white p-4 md:grid-cols-3">
      <div>
        <label
          htmlFor="student-search"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Search students
        </label>

        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            id="student-search"
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Name, email or roll number"
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="grade-filter"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Filter by class
        </label>

        <select
          id="grade-filter"
          value={selectedGrade}
          onChange={(event) => onGradeChange(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        >
          <option value="All">All Classes</option>

          {Array.from({ length: 10 }, (_, index) => (
            <option key={index + 1} value={`Class ${index + 1}`}>
              Class {index + 1}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="section-filter"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Filter by section
        </label>

        <select
          id="section-filter"
          value={selectedSection}
          onChange={(event) => onSectionChange(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        >
          <option value="All">All Sections</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
          <option value="C">Section C</option>
        </select>
      </div>
    </div>
  );
}

export default StudentFilters;
