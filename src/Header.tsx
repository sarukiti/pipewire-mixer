import Setting from "./Setting"
import "./App.css";
import "./Header.css"

function Header(){
    return(
        <div id="header">
            <div id="logo">PIPEMIXER</div>
            <Setting/>
        </div>
    )
}

export default Header;