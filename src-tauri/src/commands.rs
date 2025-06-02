use std::io::{Read, Write};
use rust_xlsxwriter::*;
use serde::Deserialize;
use serde_json::{Value};
use tauri::{ipc::{InvokeError, Response}, path::BaseDirectory, Error, Manager};

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


#[tauri::command(rename_all = "snake_case")]
pub fn get_game_picture(app: tauri::AppHandle, game_object: String) -> Response {
    let resource_path = app
        .path()
        .resolve(game_object, BaseDirectory::Resource)
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

#[derive(Debug, Deserialize)]
struct QUEST {
    id: u8,
    label: String,
    res: i16
}

#[derive(Debug, Deserialize)]
struct RESULT {
    date: String,
    results: Vec<QUEST>
}

#[derive(Debug, Deserialize)]
struct USER {
    name: String,
    results: Vec<RESULT>
}

#[tauri::command(rename_all = "snake_case")]
pub fn create_excel(app: tauri::AppHandle, data: String) -> Result<(), String>{
    
    let mut workbook = Workbook::new();

    let d: Value = serde_json::from_str(data.as_str()).unwrap();
    let d: Vec<USER> = serde_json::from_value(d).unwrap();
    println!("{:?}", d);

    let worksheet = workbook.add_worksheet();

    worksheet.set_column_width(0, 30).expect("msg");
    worksheet.set_column_width(1, 30).expect("msg");
    worksheet.set_column_width(2, 30).expect("msg");
    worksheet.set_column_width(3, 30).expect("msg");
    worksheet.set_column_width(4, 30).expect("msg");

    worksheet.write(0, 0, "Номер").expect("msg");
    worksheet.write(0, 1, "Дата").expect("msg");
    worksheet.write(0, 2, "ФИО").expect("msg");
    worksheet.write(0, 3, "Количество баллов").expect("msg");
    worksheet.write(0, 4, "Уровень (1-5)").expect("msg");

    let mut idx = 0;
    for i in d {
        for j in i.results {
            let sum = j.results.iter().map(|f| f.res).sum::<i16>();
            let mut lvl = 0;
            if sum <= -11 {
                lvl = 5
            }
            if sum <= -1 && sum > -11 {
                lvl = 4
            }
            if sum <= 13 && sum > -1 {
                lvl = 3
            }
            if sum <= 23 && sum > 13 {
                lvl = 2
            }
            if sum >= 24 {
                lvl = 1
            }

            worksheet.write(idx + 1, 0, idx + 1).expect("msg");
            worksheet.write(idx + 1, 1, j.date).expect("msg");
            worksheet.write(idx + 1, 2, i.name.to_string()).expect("msg");
            worksheet.write(idx + 1, 3, sum).expect("msg");
            worksheet.write(idx + 1, 4, lvl).expect("msg");
            
            idx+=1;
        }
    }

    let filename = "Динамика.xlsx";
    let resource_path = app
        .path()
        .resolve(filename, BaseDirectory::Desktop)
        .unwrap();

    match workbook.save(&resource_path) {
        Ok(_) => (),
        Err(_) => ()
    }
    ;

    Ok(())
}


#[derive(Debug, Deserialize)]
struct OBJECT {
    correct: bool,
    img: String
}

#[derive(Debug, Deserialize)]
struct GAME {
    name: String,
    objects: Vec<OBJECT>
}


#[tauri::command]
pub fn get_games(handle: tauri::AppHandle) -> String {
    let resource_path = handle
        .path()
        .resolve("games/games.json", BaseDirectory::Resource)
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
pub fn set_game(handle: tauri::AppHandle, request: tauri::ipc::Request) {
    // let d: Value = serde_json::from_str(&game.as_str()).unwrap();
    // let d: GAME = serde_json::from_value(d).unwrap();

    
    let tauri::ipc::InvokeBody::Json(d) = request.body().to_owned() else {
        return ();
    };

    // let d = serde_json::from_value(d).unwrap();

    // println!("{:?}", d);
    
    // d.objects.iter().all(|x| {
    //     let resource_path = &x.img;
    //     let v: Vec<&str> = resource_path.split('\\').collect();
    //     match v.last() {
    //         Some(last) => {
    //             let composite_dist = format!("games/{}/{}", d.name, last).to_string();
    //             let resource_dest_path = handle
    //                 .path()
    //                 .resolve(&composite_dist, BaseDirectory::Resource).unwrap();
    //             std::fs::copy(&resource_path, &resource_dest_path).unwrap();
    //         },
    //         None => ()
    //     }
        
    //     false
    // });
    // let _ = std::fs::remove_file(&resource_path);
    // match std::fs::OpenOptions::new().write(true).create(true).open(&resource_path) {
    //     Ok(mut file) => {
    //         match file.write_all(games.as_bytes()) {
    //             Ok(_) => String::new(),
    //             Err(e) => e.to_string(),
    //         }
    //     },
    //     Err(e) => e.to_string()
    // }
}
