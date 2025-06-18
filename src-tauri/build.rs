fn main() {
    _windows_app_manifest();
    // tauri_build::build();
}

fn _windows_app_manifest() {
    let mut windows = tauri_build::WindowsAttributes::new();
    let manifest = include_str!("diplom-rs.exe.xml");

    windows = windows.app_manifest(manifest);

    let attrs = tauri_build::Attributes::new().windows_attributes(windows);
    tauri_build::try_build(attrs).expect("failed to run build script");
}
