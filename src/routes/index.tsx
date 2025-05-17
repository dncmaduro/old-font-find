import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Textarea, Button, Stack, Group, Title } from '@mantine/core'
import { useClipboard } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import '@mantine/core/styles.css' // Import Mantine styles
import '@mantine/notifications/styles.css' // Import Mantine notifications styles

export const Route = createFileRoute('/')({
  component: RouteComponent
})

// Basic Unicode to TCVN3 mapping based on analysis and common conversions.
// This mapping might need further refinement for less common characters or specific font variations.
const unicodeToTcvn3Map: { [key: string]: string } = {
  Ă: '¨',
  ă: '¨',
  Â: '©',
  â: '©',
  Ê: 'ª',
  ê: 'ª',
  Ô: '«',
  ô: '«',
  Ơ: '¬',
  ơ: '¬',
  Ư: '−',
  ư: '−',
  Đ: '§',
  đ: '§',

  Á: '¸',
  á: '¸',
  À: 'µ',
  à: 'µ',
  Ả: '¶',
  ả: '¶',
  Ã: '·',
  ã: '·',
  Ạ: '¹',
  ạ: '¹',

  Ấ: 'Ê',
  ấ: 'Ê',
  Ầ: 'Ç',
  ầ: 'Ç',
  Ẩ: 'È',
  ẩ: 'È',
  Ẫ: 'É',
  ẫ: 'É',
  Ậ: 'Ë',
  ậ: 'Ë',

  Ắ: '¾',
  ắ: '¾',
  Ằ: '»',
  ằ: '»',
  Ẳ: '¼',
  ẳ: '¼',
  Ẵ: '½',
  ẵ: '½',
  Ặ: 'Æ',
  ặ: 'Æ',

  É: 'Ð',
  é: 'Ð',
  È: 'Ì',
  è: 'Ì',
  Ẻ: 'Î',
  ẻ: 'Î',
  Ẽ: 'Ï',
  ẽ: 'Ï',
  Ẹ: 'Ñ',
  ẹ: 'Ñ',

  Ế: 'Õ',
  ế: 'Õ',
  Ề: 'Ó',
  ề: 'Ó',
  Ể: 'Ó',
  ể: 'Ó',
  Ễ: 'Ô',
  ễ: 'Ô',
  Ệ: 'Ö',
  ệ: 'Ö',

  Í: 'Ý',
  í: 'Ý',
  Ì: '×',
  ì: '×',
  Ỉ: 'Ø',
  ỉ: 'Ø',
  Ĩ: 'Ü',
  ĩ: 'Ü',
  Ị: 'Þ',
  ị: 'Þ',

  Ó: 'ã',
  ó: 'ã',
  Ò: 'ß',
  ò: 'ß',
  Ỏ: 'á',
  ỏ: 'á',
  Õ: 'â',
  õ: 'â',
  Ọ: 'ä',
  ọ: 'ä',

  Ố: 'è',
  ố: 'è',
  Ồ: 'å',
  ồ: 'å',
  Ổ: 'æ',
  ổ: 'æ',
  Ỗ: 'ç',
  ỗ: 'ç',
  Ộ: 'é',
  ộ: 'é',

  Ớ: 'í',
  ớ: 'í',
  Ờ: 'ê',
  ờ: 'ê',
  Ở: 'ë',
  ở: 'ë',
  Ỡ: 'ì',
  ỡ: 'ì',
  Ợ: 'î',
  ợ: 'î',

  Ú: 'ó',
  ú: 'ó',
  Ù: 'ï',
  ù: 'ï',
  Ủ: 'ñ',
  ủ: 'ñ',
  Ũ: 'ò',
  ũ: 'ò',
  Ụ: 'ô',
  ụ: 'ô',

  Ứ: 'ø',
  ứ: 'ø',
  Ừ: 'õ',
  ừ: 'õ',
  Ử: 'ö',
  ử: 'ö',
  Ữ: '÷',
  ữ: '÷',
  Ự: 'ù',
  ự: 'ù',

  Ý: 'ý',
  ý: 'ý',
  Ỳ: 'ú',
  ỳ: 'ú',
  Ỷ: 'û',
  ỷ: 'û',
  Ỹ: 'ü',
  ỹ: 'ü',
  Ỵ: 'þ',
  ỵ: 'þ',

  // Add uppercase mappings where different from lowercase
  // Based on the example VĂN KIỆN ĐẢNG => V¨n kiÖn ®¶ng
  // Many uppercase accented characters in Unicode map to a base letter + a special character in TCVN3
  // This requires a more complex lookup than a simple one-to-one map for all cases.
  // For simplicity in this direct mapping, some uppercase mappings are direct based on common TCVN3 fonts.
  // A truly accurate TCVN3 conversion might need character composition logic.
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
  F: 'F',
  G: 'G',
  H: 'H',
  I: 'I',
  J: 'J',
  K: 'K',
  L: 'L',
  M: 'M',
  N: 'N',
  O: 'O',
  P: 'P',
  Q: 'Q',
  R: 'R',
  S: 'S',
  T: 'T',
  U: 'U',
  V: 'V',
  W: 'W',
  X: 'X',
  Y: 'Y',
  Z: 'Z',

  // Lowercase basic alphabet (most are direct mappings in TCVN3)
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd',
  e: 'e',
  f: 'f',
  g: 'g',
  h: 'h',
  i: 'i',
  j: 'j',
  k: 'k',
  l: 'l',
  m: 'm',
  n: 'n',
  o: 'o',
  p: 'p',
  q: 'q',
  r: 'r',
  s: 's',
  t: 't',
  u: 'u',
  v: 'v',
  w: 'w',
  x: 'x',
  y: 'y',
  z: 'z',

  ' ': ' ',
  '.': '.',
  ',': ',',
  ';': ';',
  ':': ':',
  '!': '!',
  '?': '?',
  '(': '(',
  ')': ')'
  // Add other common punctuation and symbols
}

function convertUnicodeToTcvn3(unicodeText: string): string {
  let tcvn3Text = ''
  for (let i = 0; i < unicodeText.length; i++) {
    const char = unicodeText[i]
    // Look up the character in the mapping.
    // If not found, append the original character.
    tcvn3Text += unicodeToTcvn3Map[char] || char
  }
  return tcvn3Text
}

function RouteComponent() {
  const [unicodeInput, setUnicodeInput] = useState('')
  const [tcvn3Output, setTcvn3Output] = useState('')
  const clipboard = useClipboard({ timeout: 500 })

  const handleConvert = () => {
    const convertedText = convertUnicodeToTcvn3(unicodeInput)
    setTcvn3Output(convertedText)
  }

  const handleCopy = () => {
    clipboard.copy(tcvn3Output)
    notifications.show({
      title: 'Đã sao chép',
      message: 'Đã sao chép văn bản TCVN3 vào clipboard.',
      color: 'teal',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6"></path>
          <path d="M16 12l-4 4-4-4"></path>
          <path d="M12 16V4"></path>
        </svg>
      ) // Example icon
    })
  }

  return (
    <Stack gap="md" p="md">
      <Title order={1}>Chuyển đổi tiếng Việt Unicode sang TCVN3 (Kiểu cũ)</Title>

      <Textarea
        label="Nhập văn bản Unicode"
        placeholder="Dán văn bản tiếng Việt Unicode vào đây..."
        minRows={5}
        value={unicodeInput}
        onChange={(event) => setUnicodeInput(event.currentTarget.value)}
      />

      <Group>
        <Button onClick={handleConvert}>Chuyển đổi sang TCVN3</Button>
        <Button onClick={handleCopy} disabled={!tcvn3Output} variant="default">
          Sao chép kết quả
        </Button>
      </Group>

      <Textarea
        label="Kết quả TCVN3"
        placeholder="Kết quả chuyển đổi sẽ hiển thị ở đây..."
        minRows={5}
        value={tcvn3Output}
        readOnly
      />
    </Stack>
  )
}
