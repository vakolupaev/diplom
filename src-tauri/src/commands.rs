use std::{io::{Read}};
use tauri::{path::BaseDirectory, Manager};

#[tauri::command]
pub fn get_users(handle: tauri::AppHandle) -> String {
    let resource_path = handle.path().resolve("resources/users/users.json", BaseDirectory::Resource).unwrap();
    // println!("{:?}", resource_path);
    
    let mut file = std::fs::File::open(&resource_path).unwrap();
    let mut buffer = String::new();
    match file.read_to_string(&mut buffer) {
        Ok(_) => {drop(file); buffer},
        Err(_) => "".to_string()
    }
}

#[tauri::command]
pub fn set_users(handle: tauri::AppHandle, users: String) {
    let resource_path = handle.path().resolve("resources/users/users.json", BaseDirectory::Resource).unwrap();
    println!("{:?}", users);
    let _ = std::fs::write(&resource_path, users);
}

#[tauri::command]
pub fn get_path(app: tauri::AppHandle) -> String {
    let resource_path = app.path().resolve("resources/users/users.json", BaseDirectory::Resource).unwrap();
    // println!("{:?}", resource_path);
    
    resource_path.to_string_lossy().to_string()
}