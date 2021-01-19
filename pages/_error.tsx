import { Error500 } from "../next/pages/errors/component/error500"

export function Error({ statusCode }) {
    return (<>
        {statusCode ?
            <Error500 /> : <Error500 />}
    </>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 500
    return { statusCode }
}
