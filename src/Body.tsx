import Meter from "./Meter";
import "./App.css";
import "./Body.css"

function Body() {
    return (
        <div id="body">
            <Meter deviceType="input1"/>
            <Meter deviceType="input2"/>
            <Meter deviceType="input3"/>
            <Meter deviceType="vinput1"/>
            <Meter deviceType="vinput2"/>
        </div>
    )
}

export default Body;