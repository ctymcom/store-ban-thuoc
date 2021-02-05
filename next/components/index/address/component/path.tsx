import router from 'next/router';
import React from 'react';

export const Path = (props) => {
    const { pathname } = router;
    const goPage = (href) => {
        router.push(href)

    }
    return (
        <div className="flex uppercase text-sm pt-10">
            {
                props.listPath.map((item, index) => {
                    return <p className={pathname === item.href ? "cursor-pointer text-primary" : "cursor-pointer"}
                        key={index} onClick={() => { goPage(item.href) }}>{item.name}</p>
                })
            }
        </div >
    );
}
