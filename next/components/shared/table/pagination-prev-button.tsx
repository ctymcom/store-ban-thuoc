export function PaginationPrevButton({ onClick }) {
  return <li>
    <button
      className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
      aria-label="Previous"
      onClick={onClick}
    >
      <i className=''>
        <svg className='w-3 h-3 fill-current' viewBox="0 0 8 14">
          <g id="Group_27" data-name="Group 27" transform="translate(-8 -5)">
            <path id="Shape-2" data-name="Shape" d="M2.414,7,7.707,1.707A1,1,0,0,0,6.293.293l-6,6a1,1,0,0,0,0,1.414l6,6a1,1,0,1,0,1.414-1.414Z" transform="translate(8 5)" />
          </g>
        </svg>
      </i>
    </button>
  </li>
}