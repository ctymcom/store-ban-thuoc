export function PaginationNextBtnCusTom({ onClick }) {
    return <li>
      <button
        className="flex ml-1.5 items-center justify-center px-2.5 py-2.5 rounded-full border-2 focus:outline-none focus:shadow-outline-purple border-gray-600 hover:text-primary hover:border-primary"
        aria-label="Next"
        onClick={onClick}
      >
        <svg className='w-4 h-4 fill-current' viewBox="0 0 8 14">
          <g id="chevron-left" transform="translate(16 19) rotate(180)">
            <g id="Group_27" data-name="Group 27">
              <path id="Shape-2" data-name="Shape" d="M2.414,7,7.707,1.707A1,1,0,0,0,6.293.293l-6,6a1,1,0,0,0,0,1.414l6,6a1,1,0,1,0,1.414-1.414Z" transform="translate(8 5)" />
            </g>
          </g>
        </svg>
      </button>
    </li >
  }