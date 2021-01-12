export function Card(props) {
    const { width } = props
    return (
        <div className={`px-4 py-3 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800 ${width}`} >
            { props.children}
        </div >
    )
}