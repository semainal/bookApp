import "./header.css"
import notebook from "../../img/notebook.jpg"

export default function Header() {
  return (
    <div className="header">
        <img className="headerImg" src={notebook} alt="" />
    </div>
  )
}
