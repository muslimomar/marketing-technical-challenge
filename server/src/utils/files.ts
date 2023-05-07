import path from "path";

export const getFileNameWithoutExt = (file: string) => path.parse(file).name;