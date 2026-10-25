export function isOpenableFile(url?: string | null) {
  return Boolean(url && !url.startsWith('#'));
}
