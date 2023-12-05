import { pageLinks } from "../data"
import PageLink from "./PageLink"

const PageLinks = (props) => {
  const type = props.type
  const itemClass = type + "-link"

  return (
    <ul className={`${type}-links`}>
      {pageLinks.map((link) => {
        return <PageLink key={link.id} link={link} itemClass={itemClass} />
      })}
    </ul>
  )
}
export default PageLinks
