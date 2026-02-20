export interface Tool {
  name: string;
  slug: string;
  description: string;
  category: string;
  icon: string;
}

export const categories = [
  { name: "Developer", slug: "developer", icon: "dev" },
  { name: "PDF & Document", slug: "pdf", icon: "pdf" },
  { name: "Encoding", slug: "encoding", icon: "enc" },
  { name: "Text", slug: "text", icon: "txt" },
  { name: "Image", slug: "image", icon: "img" },
  { name: "Generator", slug: "generator", icon: "gen" },
] as const;

export const tools: Tool[] = [
  // Developer
  { name: "JSON Formatter", slug: "json-formatter", description: "Format, validate and minify JSON data", category: "developer", icon: "{}" },
  { name: "Timestamp Converter", slug: "timestamp", description: "Convert between Unix timestamps and dates", category: "developer", icon: "ts" },
  { name: "Color Picker", slug: "color-picker", description: "Convert between HEX, RGB, and HSL colors", category: "developer", icon: "rgb" },
  { name: "Regex Tester", slug: "regex-tester", description: "Test and debug regular expressions", category: "developer", icon: "/.*/" },
  { name: "JSON/CSV Converter", slug: "json-csv", description: "Convert between JSON arrays and CSV format", category: "developer", icon: "csv" },
  { name: "JSON Diff", slug: "text-diff", description: "Compare two JSON objects and highlight differences", category: "developer", icon: "+/-" },

  // PDF & Document
  { name: "PDF Merge", slug: "pdf-merge", description: "Combine multiple PDF files into one document", category: "pdf", icon: "M" },
  { name: "PDF Split", slug: "pdf-split", description: "Extract specific pages from a PDF file", category: "pdf", icon: "S" },
  { name: "PDF to Image", slug: "pdf-to-image", description: "Convert PDF pages to PNG images", category: "pdf", icon: "P2I" },
  { name: "Image to PDF", slug: "image-to-pdf", description: "Convert images into a PDF document", category: "pdf", icon: "I2P" },
  { name: "Markdown to HTML", slug: "markdown-to-html", description: "Convert Markdown text to HTML markup", category: "pdf", icon: "md" },
  { name: "Markdown Preview", slug: "markdown-preview", description: "Live preview of Markdown with syntax highlighting", category: "pdf", icon: "eye" },

  // Encoding
  { name: "Base64 Encode/Decode", slug: "base64", description: "Encode and decode Base64 strings", category: "encoding", icon: "b64" },
  { name: "URL Encode/Decode", slug: "url-encode", description: "Encode and decode URL components", category: "encoding", icon: "%%" },
  { name: "SHA Hash Generator", slug: "md5-hash", description: "Generate SHA-1, SHA-256, SHA-512 hashes", category: "encoding", icon: "#" },

  // Text
  { name: "Text Counter", slug: "text-counter", description: "Count words, characters, lines and paragraphs", category: "text", icon: "wc" },

  // Image
  { name: "Image to Base64", slug: "image-to-base64", description: "Convert images to Base64 encoded strings", category: "image", icon: "img" },

  // Generator
  { name: "QR Code Generator", slug: "qrcode", description: "Generate QR codes from text or URLs", category: "generator", icon: "qr" },
  { name: "UUID Generator", slug: "uuid-generator", description: "Generate random UUIDs (v4) in bulk", category: "generator", icon: "uid" },
  { name: "Lorem Ipsum Generator", slug: "lorem-ipsum", description: "Generate placeholder text for designs and layouts", category: "generator", icon: "lip" },
];

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter(t => t.category === category);
}
