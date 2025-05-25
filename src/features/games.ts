import { invoke } from "@tauri-apps/api/core";

export async function getGamePicture(path: string): Promise<any> {
    let data: any = await invoke('get_game_picture', {game_object: path});
    let arr = new Uint8Array(data);
    var blob = new Blob( [ arr ] );
    var imageUrl = URL.createObjectURL(blob);
    return imageUrl
    // return JSON.parse(data).sort((a: any, b: any) => a.name.localeCompare(b.name));
}

export function setGamePicture(users: any) {
    return invoke('set_game_picture', {
        users: JSON.stringify(users)
    });
}

export function getPath() {
    return invoke('get_path');
}
