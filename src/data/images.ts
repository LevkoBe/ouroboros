export interface ImageData {
  src: string;
}

function generateImages(
  count: number,
  prefix: string,
  ext = ".jpg",
  folder = "/images/gallery"
) {
  return Array.from({ length: count }, (_, i) => ({
    src: `${folder}/${prefix}${String(i + 1).padStart(4, "0")}${ext}`,
  }));
}

export const images: ImageData[] = generateImages(114, "photo_");
