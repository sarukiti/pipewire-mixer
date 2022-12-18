import { Suspense } from "react";
import { Menu, MenuItem } from '@szhsin/react-menu';
import { invoke } from "@tauri-apps/api/tauri";
import { deviceIn1Atom, deviceIn2Atom, deviceIn3Atom, deviceOut1Atom, deviceOut2Atom, deviceOut3Atom } from "./context/Atoms";
import '@szhsin/react-menu/dist/index.css';
import "./App.css";
import "./Setting.css"
import { useAtom } from "jotai";

let inputDeviceList: string[] | undefined;
let outputDeviceList: string[] | undefined;

function getInputDeviceList() {
    console.log("Rustから読み込み");
    if (!inputDeviceList) throw invoke("get_input_device_list").then(d => (inputDeviceList = (d as string).split(",")));
    return inputDeviceList;
}

function getOutputDeviceList() {
    console.log("Rustから読み込み");
    if (!outputDeviceList) throw invoke("get_output_device_list").then(d => (outputDeviceList = (d as string).split(",")));
    return outputDeviceList;
}

const DataLoader: React.FC<{ deviceType: string }> = (props) => {
    let data: string[];
    const [deviceIn1, setDeviceIn1] = useAtom(deviceIn1Atom);
    const [deviceIn2, setDeviceIn2] = useAtom(deviceIn2Atom);
    const [deviceIn3, setDeviceIn3] = useAtom(deviceIn3Atom);
    const [deviceOut1, setDeviceOut1] = useAtom(deviceOut1Atom);
    const [deviceOut2, setDeviceOut2] = useAtom(deviceOut2Atom);
    const [deviceOut3, setDeviceOut3] = useAtom(deviceOut3Atom);

    switch (props.deviceType.split(" ")[0]) {
        case "INPUT":
            data = getInputDeviceList();
            break;
        case "OUTPUT":
            data = getOutputDeviceList();
            break;
        default:
            data = [];
            break;
    }
    return (
        <div>
            {data.map(device => (
                <MenuItem onClick={() => {
                    switch (props.deviceType) {
                        case "INPUT 1":
                            setDeviceIn1(v => v = device);
                            break;
                        case "INPUT 2":
                            setDeviceIn2(v => v = device);
                            break;
                        case "INPUT 3":
                            setDeviceIn3(v => v = device);
                            break;
                        case "OUTPUT 1":
                            setDeviceOut1(v => v = device);
                            break;
                        case "OUTPUT 2":
                            setDeviceOut2(v => v = device);
                            break;
                        case "OUTPUT 3":
                            setDeviceOut3(v => v = device);
                            break;
                    }
                }}>{device}</MenuItem>
            ))}
        </div>
    )
}

const Input: React.FC<{ type: string, device: string }> = (props) => {
    return (
        <div id="input_container">
            <div id="type">{props.type}</div>
            <Menu menuButton={<div className="device">{props.device}</div>}>
                <Suspense>
                    <DataLoader deviceType={props.type} />
                </Suspense>
            </Menu>
            <div id="setting_separator" />
        </div>
    )
}

function Setting() {
    const [deviceIn1] = useAtom(deviceIn1Atom);
    const [deviceIn2] = useAtom(deviceIn2Atom);
    const [deviceIn3] = useAtom(deviceIn3Atom);
    const [deviceOut1] = useAtom(deviceOut1Atom);
    const [deviceOut2] = useAtom(deviceOut2Atom);
    const [deviceOut3] = useAtom(deviceOut3Atom);

    const input_list = [{
        type: "INPUT 1",
        device: deviceIn1
    }, {
        type: "INPUT 2",
        device: deviceIn2
    }, {
        type: "INPUT 3",
        device: deviceIn3
    }, {
        type: "VIRTUAL INPUT 1",
        device: "PIPEWIRE VAIO"
    }, {
        type: "VIRTUAL INPUT 2",
        device: "PIPEMIXER AUX"
    }];

    const output_list = [{
        type: "OUTPUT 1",
        button_mark: "A1"
    }, {
        type: "OUTPUT 2",
        button_mark: "A2"
    }, {
        type: "OUTPUT 3",
        button_mark: "A3"
    }]

    return (
        <div id="setting_container">
            <Input type={input_list[0].type} device={input_list[0].device}/>
            <Input type={input_list[1].type} device={input_list[1].device}/>
            <Input type={input_list[2].type} device={input_list[2].device}/>
            <Input type={input_list[3].type} device={input_list[3].device}/>
            <Input type={input_list[4].type} device={input_list[4].device}/>
            <div id="output_container">
                <div id="out_button_container">
                    {
                        output_list.map((item: { type: string; button_mark: string; }) => (
                            <Menu menuButton={<button id="out_button" className="button_text">{item.button_mark}</button>}>
                                <Suspense>
                                    <DataLoader deviceType={item.type} />
                                </Suspense>
                            </Menu>
                        ))
                    }
                </div>
                <div id="out_text_container">
                    <div id="type">OUTPUT</div>
                    <div className="device">A1: {deviceOut1}</div>
                    <div className="device">A2: {deviceOut2}</div>
                    <div className="device">A3: {deviceOut3}</div>
                </div>
            </div>
        </div>
    )
}

export default Setting;