export function PaginationLastPageButton({ onClick }) {
    return <li>
        <button
            className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
            aria-label="Previous"
            onClick={onClick}
        >
            <svg aria-hidden="true"
                className="w-3 h-3 fill-current"
                viewBox="0 0 14 14">
                <g id="Group_2445" data-name="Group 2445" transform="translate(-596 -1398)">
                    <g id="chevron-left" transform="translate(612 1417) rotate(180)">
                        <g id="Group_27" data-name="Group 27">
                            <path id="Shape-3" data-name="Shape" d="M2.414,7,7.707,1.707A1,1,0,0,0,6.293.293l-6,6a1,1,0,0,0,0,1.414l6,6a1,1,0,1,0,1.414-1.414Z" transform="translate(8 5)" />

                        </g>
                    </g>
                    <g id="chevron-left-2" data-name="chevron-left" transform="translate(618 1417) rotate(180)">
                        <g id="Group_27-2" data-name="Group 27">
                            <path id="Shape-4" data-name="Shape" d="M2.414,7,7.707,1.707A1,1,0,0,0,6.293.293l-6,6a1,1,0,0,0,0,1.414l6,6a1,1,0,1,0,1.414-1.414Z" transform="translate(8 5)" />
                        </g>
                    </g>
                </g>
            </svg>
        </button>
    </li >
}