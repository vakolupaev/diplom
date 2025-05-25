import { invoke } from "@tauri-apps/api/core";

export function create_excel(users: string) {
    console.log(users)
    return invoke('create_excel', {data: users});
}
