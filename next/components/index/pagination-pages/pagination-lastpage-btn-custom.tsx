export function PaginationLastPageBtnCustom({ onClick }) {
    return <li>
        <button
            className="flex ml-3 items-center justify-center px-2.5 py-2.5 rounded-full border-2 focus:outline-none focus:shadow-outline-purple border-gray-600 hover:text-primary hover:border-primary"
            aria-label="Previous"
            onClick={onClick}
        >
            <svg aria-hidden="true"
                className="w-4 h-4 fill-current"
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