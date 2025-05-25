import { invoke } from "@tauri-apps/api/core";

export async function getUsers(): Promise<any> {
    let data: any = await invoke('get_users');
    return JSON.parse(data).sort((a: any, b: any) => a.name.localeCompare(b.name));
}

export function setUsers(users: any) {
    return invoke('set_users', {
        users: JSON.stringify(users)
    });
}

export function getPath() {
    return invoke('get_path');
}