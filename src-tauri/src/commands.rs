use rust_xlsxwriter::*;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use tauri_plugin_dialog::DialogExt;
use std::{fs, io::{Read, Write}};
use tauri::{
    ipc::Response,
    path::BaseDirectory, Manager,
};

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
        .resolve("users/users.json", BaseDirectory::Resource)
        .unwrap();
    println!("{:?}", users);
    let _ = std::fs::remove_file(&resource_path);
    match std::fs::OpenOptions::new()
        .write(true)
        .create(true)
        .open(&resource_path)
    {
        Ok(mut file) => match file.write_all(users.as_bytes()) {
            Ok(_) => String::new(),
            Err(e) => e.to_string(),
        },
        Err(e) => e.to_string(),
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
    let data = std::fs::read(&game_object);
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
    res: i16,
}

#[derive(Debug, Deserialize)]
struct RESULT {
    date: String,
    results: Vec<QUEST>,
}

#[derive(Debug, Deserialize)]
struct USER {
    name: String,
    results: Vec<RESULT>,
}

#[tauri::command(rename_all = "snake_case")]
pub fn create_excel(app: tauri::AppHandle, data: String) -> Result<(), String> {
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
            worksheet
                .write(idx + 1, 2, i.name.to_string())
                .expect("msg");
            worksheet.write(idx + 1, 3, sum).expect("msg");
            worksheet.write(idx + 1, 4, lvl).expect("msg");

            idx += 1;
        }
    }

    let filename = "Динамика.xlsx";
    let resource_path = app
        .path()
        .resolve(filename, BaseDirectory::Desktop)
        .unwrap();

    match workbook.save(&resource_path) {
        Ok(_) => (),
        Err(_) => (),
    };

    Ok(())
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct OBJECT {
    correct: bool,
    img: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct GAME {
    name: String,
    actor: String,
    bg: String,
    objects: Vec<OBJECT>,
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
pub fn get_src_path(handle: tauri::AppHandle) -> String {
  let file_path = handle.dialog().file().blocking_pick_file();

  match file_path {
      Some(obj) => obj.to_string(),
      None => "".to_string()
  }
}



#[tauri::command]
pub fn set_game(handle: tauri::AppHandle, request: tauri::ipc::Request) {
    let tauri::ipc::InvokeBody::Json(d) = request.body().to_owned() else {
        return ();
    };

    let mut d: GAME= serde_json::from_value(d).unwrap();

    let resource_path = handle
        .path()
        .resolve("games", BaseDirectory::Resource)
        .unwrap();

    let mut src = resource_path.to_str().unwrap().to_string();
    src += "\\";
    src += &d.name;

    println!("{:?}", src);
    fs::create_dir(src).unwrap();


    let actor_res_path = &d.actor;
    let last = actor_res_path.split(".").last().unwrap();
    let composite_actor_dist = format!("games/{}/actor.{}", d.name, last).to_string();
    let resource_actor_dest_path = handle
            .path()
            .resolve(&composite_actor_dist, BaseDirectory::Resource).unwrap();
    std::fs::copy(&actor_res_path, &resource_actor_dest_path).unwrap();

    let bg_res_path = &d.bg;
    let last = bg_res_path.split(".").last().unwrap();
    let composite_bg_dist = format!("games/{}/bg.{}", d.name, last).to_string();
    let resource_bg_dest_path = handle
            .path()
            .resolve(&composite_bg_dist, BaseDirectory::Resource).unwrap();
    std::fs::copy(&bg_res_path, &resource_bg_dest_path).unwrap();

    let mut s: Vec<OBJECT> = vec![];
    d.objects.iter_mut().enumerate().for_each(|i,| {
        let idx = i.0;
        let x = i.1;
        let resource_path = &x.img;

        let last = resource_path.split(".").last().unwrap();

        let composite_dist = format!("games/{}/{}.{}", d.name, idx, last).to_string();
        let mut ready = x.clone();
        
        let resource_dest_path = handle
            .path()
            .resolve(&composite_dist, BaseDirectory::Resource).unwrap();
        ready.img = resource_dest_path.to_str().unwrap().to_string();
        s.push(ready);
        std::fs::copy(&resource_path, &resource_dest_path).unwrap();
    });

    let readygame: GAME = GAME { 
        name: d.name,
        actor: resource_actor_dest_path.to_str().unwrap().to_string(),
        bg: resource_bg_dest_path.to_str().unwrap().to_string(),
        objects: s 
    };

    let resource_path = handle
        .path()
        .resolve("games/games.json", BaseDirectory::Resource)
        .unwrap();

    let mut file = std::fs::File::open(&resource_path).unwrap();
    let mut buffer = String::new();
    file.read_to_string(&mut buffer).unwrap();
    let b = buffer;
    let mut r: Vec<GAME> = serde_json::from_str(b.as_str()).unwrap();

    r.push(readygame);
    let f = serde_json::to_string(&r).unwrap();
    let _ = std::fs::remove_file(&resource_path);
    match std::fs::OpenOptions::new().write(true).create(true).open(&resource_path) {
        Ok(mut file) => {
            match file.write_all(f.as_bytes()) {
                Ok(_) => {},
                Err(_) => {},
            }
        },
        Err(_) => {}
    }
}

#[tauri::command]
pub fn edit_games(handle: tauri::AppHandle, games: String) {
    let resource_path = handle
        .path()
        .resolve("games/games.json", BaseDirectory::Resource)
        .unwrap();

    let _ = std::fs::remove_file(&resource_path);
    match std::fs::OpenOptions::new().write(true).create(true).open(&resource_path) {
        Ok(mut file) => {
            match file.write_all(games.as_bytes()) {
                Ok(_) => {},
                Err(_) => {},
            }
        },
        Err(_) => {}
    }
}

#[tauri::command]
pub fn delete_game_folder(handle: tauri::AppHandle, game: String) {
    let p = format!("games/{}", game);
    let resource_path = handle
        .path()
        .resolve(p, BaseDirectory::Resource)
        .unwrap();

    let _ = std::fs::remove_dir_all(&resource_path);
}
