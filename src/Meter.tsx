import { useState } from "react";
import { useAtom } from "jotai";
//import { mixerInput1Atom } from "./context/Atoms";
import "./App.css"
import "./Meter.css"

const value_array = [...Array(101)].map((_, i) => i).reverse();

const Meter: React.FC<{ deviceType: string }> = ({ deviceType: string }) => {
    const [volume, changeVolume] = useState(0);
    const [A1State, setA1State] = useState(false);
    const [A2State, setA2State] = useState(false);
    const [A3State, setA3State] = useState(false);
    const [B1State, setB1State] = useState(false);
    const [B2State, setB2State] = useState(false);
    const [MuteButtonState, setMuteButtonState] = useState(false);

    return (
        <div id="mixer_container">
            <div id="volume_value" className="device">{volume}%</div>
            <input className="ver_slider" type="range" value={value_array[volume]} onChange={event => changeVolume(value_array[parseInt(event.target.value)])}></input>
            <div id="mix_button_container">
                <button id="mix_button" className={A1State? "mix_button_clicked":""} onClick={()=>{
                    setA1State(v => v = !v);
                }}>A1</button>
                <button id="mix_button" className={A2State? "mix_button_clicked":""} onClick={()=>{
                    setA2State(v => v = !v);
                }}>A2</button>
                <button id="mix_button" className={A3State? "mix_button_clicked":""} onClick={()=>{
                    setA3State(v => v = !v);
                }}>A3</button>
                <button id="mix_button" className={B1State? "mix_button_clicked":""} onClick={()=>{
                    setB1State(v => v = !v);
                }}>B1</button>
                <button id="mix_button" className={B2State? "mix_button_clicked":""} onClick={()=>{
                    setB2State(v => v = !v);
                }}>B2</button>
                <button id="mix_button_large" className={MuteButtonState? "mix_button_clicked":""} onClick={()=>{
                    setMuteButtonState(v => v = !v);
                }}>Mute</button>
            </div>
            <div id="meter_separator" />
        </div>
    )
}
export default Meter;