export const unicodeToBroken: Record<string, string> = {
  ệ: 'Ö',
  đ: 'ç',
  ộ: '¶',
  ư: '¨',
  ê: '«',
  á: '¹',
  ã: 'µ',
  ă: '¸',
  â: '©',
  ó: '¾',
  è: '«',
  ị: 'Þ',
  í: 'Ý'
  // ... bổ sung dần cho đủ nhu cầu!
}

export function convertUnicodeToBroken(str: string): string {
  return str
    .split('')
    .map((c) => unicodeToBroken[c] ?? c)
    .join('')
}
