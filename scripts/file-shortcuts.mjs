import { stat } from "node:fs/promises";
import { isAbsolute, basename, resolve } from "node:path";

export const fileShortcuts = async (paths) => {
  if (!Array.isArray(paths) || paths.length < 1 || paths.length > 100) throw new Error("Bir seferde en fazla 100 dosya ekleyin.");
  return Promise.all([...new Set(paths)].map(async (path) => {
    if (typeof path !== "string" || !isAbsolute(path) || path.includes("\0")) throw new Error("Geçersiz dosya yolu.");
    const info = await stat(path); if (!info.isFile()) throw new Error("Yalnızca dosyalar eklenebilir.");
    return { name: basename(path), path: resolve(path) };
  }));
};
