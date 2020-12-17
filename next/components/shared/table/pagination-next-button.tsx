export function PaginationNextButton({ onClick }) {
    return <li>
    <button
      className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
      aria-label="Next"
      onClick={onClick}
    >
      <svg
        className="w-4 h-4 fill-current"
        aria-hidden="true"
        viewBox="0 0 20 20"
      >
        <path
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
          fillRule="evenodd"
        ></path>
      </svg>
    </button>
  </li>
}