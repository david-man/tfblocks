const Link = ({href, children} : any) => {
    return <a href = {href} target = "_blank" className = 'text-blue-600 hover:underline' rel="noopener noreferrer">{children}</a>
}
export default Link