export function PaginationPrevButton({ onClick }) {
    return <li>
    <button
      className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
      aria-label="Previous"
      onClick={onClick}
    >
      <svg
        aria-hidden="true"
        className="w-4 h-4 fill-current"
        viewBox="0 0 20 20"
      >
        <path
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
          fillRule="evenodd"
        ></path>
      </svg>
    </button>
  </li>
}