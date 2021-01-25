export function PaginationFirstPageButton({ onClick }) {
    return <li>
        <button
            className="flex items-center justify-center w-10 h-10 rounded-full border-2 focus:outline-none focus:shadow-outline-purple"
            aria-label="Previous"
            onClick={onClick}
        >
            <svg aria-hidden="true"
                className="w-3 h-3 fill-current"
                viewBox="0 0 14 14">
                <g id="chevron-left" transform="translate(6)">
                    <g id="Group_27" data-name="Group 27">
                        <path id="Shape-3" data-name="Shape" d="M2.414,7l5.293,5.293a1,1,0,1,1-1.414,1.414l-6-6a1,1,0,0,1,0-1.414l6-6A1,1,0,0,1,7.707,1.707Z" />
                    </g>
                </g>
                <g id="chevron-left-2" data-name="chevron-left">
                    <g id="Group_27-2" data-name="Group 27">
                        <path id="Shape-4" data-name="Shape" d="M2.414,7l5.293,5.293a1,1,0,1,1-1.414,1.414l-6-6a1,1,0,0,1,0-1.414l6-6A1,1,0,0,1,7.707,1.707Z" />
                    </g>
                </g>
            </svg>
        </button>
    </li >
}