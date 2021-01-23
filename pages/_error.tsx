

export function Error({ statusCode }) {
    return (<>
        Lỗi
    </>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 500
    return { statusCode }
}
