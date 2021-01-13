import { IconUser } from "../../../../../lib/svg";

export function ViewListUserpage(props) {
    return <>
        <div className="w-full py-3">
            <div className="w-full">
                <div className="w-full">
                    <div className="user w-full border-2 border-gray-200 p-3">
                        <div className="profile-container">
                            <div className="w-24 flex items-center">
                                <div className="avt w-full h-full flex justify-center items-center">
                                    <div className="container w-16 h-16 flex justify-center items-center bg-yellow-100 rounded-xl">
                                        <i className="w-12 h-12 z-10">
                                            <IconUser />
                                        </i >
                                    </div>
                                </div>
                                <div className="name">
                                    <div className="nickname">

                                    </div>
                                    <div className="fullname">

                                    </div>
                                </div>
                            </div>
                            <div className="btn-edit">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}