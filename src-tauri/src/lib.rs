// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }
mod commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::get_users,
            commands::set_users,
            commands::get_path,
            commands::get_game_picture,
            commands::create_excel,
            commands::get_games,
            commands::set_game,
            commands::get_src_path,
            commands::edit_games,
            commands::delete_game_folder
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
