import { atom } from "jotai";

const mixerButtons = {
    A1: false,
    A2: false,
    A3: false,
    B1: false,
    B2: false
}

export const deviceIn1Atom = atom("");
export const deviceIn2Atom = atom("");
export const deviceIn3Atom = atom("");
export const deviceOut1Atom = atom("");
export const deviceOut2Atom = atom("");
export const deviceOut3Atom = atom("");