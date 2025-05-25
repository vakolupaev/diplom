use std::io::{Read, Write};
use serde_json::json;
use tauri::{ipc::Response, path::BaseDirectory, Manager};

#[tauri::command]
pub fn get_users(handle: tauri::AppHandle) -> String {
    let resource_path = handle
        .path()
        .resolve("users/users.json", BaseDirectory::Resource)
        .unwrap();

    let mut file = std::fs::File::open(&resource_path).unwrap();
    let mut buffer = String::new();
    match file.read_to_string(&mut buffer) {
        Ok(_) => {
            drop(file);
            buffer
        }
        Err(_) => "".to_string(),
    }
}

#[tauri::command]
pub fn set_users(handle: tauri::AppHandle, users: String) -> String {
    let resource_path = handle
        .path()
        .resolve("users/users.json", BaseDirectory::Resource).unwrap();
    println!("{:?}", users);
    let _ = std::fs::remove_file(&resource_path);
    match std::fs::OpenOptions::new().write(true).create(true).open(&resource_path) {
        Ok(mut file) => {
            match file.write_all(users.as_bytes()) {
                Ok(_) => String::new(),
                Err(e) => e.to_string(),
            }
        },
        Err(e) => e.to_string()
    }
}

#[tauri::command]
pub fn get_path(app: tauri::AppHandle) -> String {
    let resource_path = app
        .path()
        .resolve("users/users.json", BaseDirectory::Resource)
        .unwrap();
    // println!("{:?}", resource_path);

    resource_path.to_string_lossy().to_string()
}


#[tauri::command]
pub fn get_game_picture(app: tauri::AppHandle, gameObject: String) -> Response {
    let resource_path = app
        .path()
        .resolve(gameObject, BaseDirectory::Resource)
        .unwrap();
    let data = std::fs::read(&resource_path);
    match data {
        Ok(data) => tauri::ipc::Response::new(data),
        Err(e) => {
            println!("{:?}", e);
            tauri::ipc::Response::new("err".to_string())
        }
    }
    
}