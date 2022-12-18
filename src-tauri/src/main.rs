#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::{cell::RefCell, collections::HashMap, rc::Rc};
use pipewire::{
    link::{Link, LinkChangeMask, LinkListener, LinkState},
    prelude::*,
    properties,
    registry::{GlobalObject, Registry},
    spa::{Direction, ForeignDict},
    types::ObjectType,
    Context, Core, MainLoop,
};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_input_device_list() -> String {
    String::from("Mic,USB Audio,Audio Mixer")
}

#[tauri::command]
async fn get_output_device_list() -> String {
    String::from("BEHRINGER USB AUDIO,Echo dot-WDA")
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_input_device_list,
            get_output_device_list])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
