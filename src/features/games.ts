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

export async function getGames(): Promise<any> {
    let data: any = await invoke('get_games');
    return JSON.parse(data).sort((a: any, b: any) => a.name.localeCompare(b.name));
}

export function setGame(game: any) {
    return invoke('set_game', game);
}

export function getSrcPath(): Promise<String> {
    return invoke('get_src_path')
}

export function editGame(games: any) {
    invoke('edit_games', {games: JSON.stringify(games)});
}

export function deleteGameFolder(game: string) {
    invoke('delete_game_folder', {game: game});
}