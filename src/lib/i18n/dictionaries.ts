export type Locale = "en" | "zh";

export type Dictionary = Record<string, string>;

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    // Nav & Footer
    "nav.tools": "tools",
    "nav.source": "source",
    "footer.local": "All processing happens locally in your browser.",

    // Homepage
    "home.tagline": "Developer Toolkit",
    "home.heading": "Fast tools that respect your {accent}.",
    "home.headingAccent": "privacy",
    "home.subtitle": "Everything runs locally in your browser. No servers, no tracking, no nonsense.",

    // Categories
    "category.developer": "Developer",
    "category.pdf": "PDF & Document",
    "category.encoding": "Encoding",
    "category.text": "Text",
    "category.image": "Image",
    "category.generator": "Generator",

    // Tool names
    "tool.json-formatter.name": "JSON Formatter",
    "tool.timestamp.name": "Timestamp Converter",
    "tool.color-picker.name": "Color Picker",
    "tool.regex-tester.name": "Regex Tester",
    "tool.json-csv.name": "JSON/CSV Converter",
    "tool.text-diff.name": "JSON Diff",
    "tool.pdf-merge.name": "PDF Merge",
    "tool.pdf-split.name": "PDF Split",
    "tool.pdf-to-image.name": "PDF to Image",
    "tool.image-to-pdf.name": "Image to PDF",
    "tool.markdown-to-html.name": "Markdown to HTML",
    "tool.markdown-preview.name": "Markdown Preview",
    "tool.base64.name": "Base64 Encode/Decode",
    "tool.url-encode.name": "URL Encode/Decode",
    "tool.md5-hash.name": "SHA Hash Generator",
    "tool.text-counter.name": "Text Counter",
    "tool.image-to-base64.name": "Image to Base64",
    "tool.qrcode.name": "QR Code Generator",
    "tool.uuid-generator.name": "UUID Generator",
    "tool.lorem-ipsum.name": "Lorem Ipsum Generator",

    // Tool descriptions
    "tool.json-formatter.description": "Format, validate and minify JSON data",
    "tool.timestamp.description": "Convert between Unix timestamps and dates",
    "tool.color-picker.description": "Convert between HEX, RGB, and HSL colors",
    "tool.regex-tester.description": "Test and debug regular expressions with real-time matching",
    "tool.json-csv.description": "Convert between JSON arrays and CSV format",
    "tool.text-diff.description": "Compare two JSON objects and highlight differences",
    "tool.pdf-merge.description": "Combine multiple PDF files into one document",
    "tool.pdf-split.description": "Extract specific pages from a PDF file",
    "tool.pdf-to-image.description": "Convert PDF pages to PNG images",
    "tool.image-to-pdf.description": "Convert images into a PDF document",
    "tool.markdown-to-html.description": "Convert Markdown text to HTML markup",
    "tool.markdown-preview.description": "Live preview of Markdown with syntax highlighting",
    "tool.base64.description": "Encode and decode Base64 strings",
    "tool.url-encode.description": "Encode and decode URL components",
    "tool.md5-hash.description": "Generate SHA-1, SHA-256, SHA-512 hashes using Web Crypto API",
    "tool.text-counter.description": "Count words, characters, lines and paragraphs",
    "tool.image-to-base64.description": "Convert images to Base64 encoded strings",
    "tool.qrcode.description": "Generate QR codes from text or URLs",
    "tool.uuid-generator.description": "Generate random UUIDs (v4) in bulk",
    "tool.lorem-ipsum.description": "Generate placeholder text for designs and layouts",

    // ToolLayout
    "toolLayout.back": "tools",
    "toolLayout.related": "Related",

    // Shared actions
    "action.clear": "Clear",
    "action.copy": "Copy",
    "action.copied": "Copied",
    "action.encode": "Encode",
    "action.decode": "Decode",
    "action.generate": "Generate",
    "action.convert": "Convert",
    "action.download": "Download",
    "action.format": "Format",
    "action.minify": "Minify",
    "action.compare": "Compare",

    // JSON Formatter
    "jsonFormatter.input": "input",
    "jsonFormatter.output": "output",
    "jsonFormatter.placeholder": '{"key": "value"}',

    // Base64
    "base64.input": "input",
    "base64.output": "output",
    "base64.placeholder": "Enter text or Base64 string...",
    "base64.encodeFailed": "Encoding failed",
    "base64.invalidBase64": "Invalid Base64 string",

    // URL Encode
    "urlEncode.input": "input",
    "urlEncode.output": "output",
    "urlEncode.placeholder": "Enter text or URL encoded string...",
    "urlEncode.invalid": "Invalid URL encoded string",

    // Timestamp
    "timestamp.unixLabel": "unix timestamp",
    "timestamp.unixPlaceholder": "1700000000",
    "timestamp.dateLabel": "date string",
    "timestamp.datePlaceholder": "2024-01-01T00:00:00Z",
    "timestamp.toDate": "To Date →",
    "timestamp.toTimestamp": "To Timestamp →",
    "timestamp.current": "Current Timestamp",
    "timestamp.result": "result",
    "timestamp.invalidTs": "Invalid timestamp",
    "timestamp.invalidDate": "Invalid date",
    "timestamp.seconds": "Seconds: {s}",
    "timestamp.milliseconds": "Milliseconds: {ms}",

    // SHA Hash
    "shaHash.input": "input text",
    "shaHash.placeholder": "Enter text to hash...",
    "shaHash.generate": "Generate Hashes",
    "shaHash.generating": "Hashing...",

    // QR Code
    "qrcode.label": "text or url",
    "qrcode.placeholder": "https://example.com",
    "qrcode.alt": "QR Code",
    "qrcode.error": "Failed to generate QR code",

    // Color Picker
    "colorPicker.hex": "hex",
    "colorPicker.rgb": "rgb",
    "colorPicker.rgbPlaceholder": "255, 128, 0",
    "colorPicker.hsl": "hsl",
    "colorPicker.hslPlaceholder": "30, 80%, 55%",

    // Regex Tester
    "regex.pattern": "pattern",
    "regex.patternPlaceholder": "[a-z]+",
    "regex.flagsPlaceholder": "gi",
    "regex.testString": "test string",
    "regex.testPlaceholder": "Enter text to test against...",
    "regex.noMatches": "No matches",
    "regex.invalidRegex": "Invalid regex",
    "regex.matches": "matches ({count})",
    "regex.groups": "groups:",

    // Text Counter
    "textCounter.input": "input text",
    "textCounter.placeholder": "Paste or type your text here...",
    "textCounter.chars": "chars",
    "textCounter.noSpaces": "no spaces",
    "textCounter.words": "words",
    "textCounter.lines": "lines",
    "textCounter.paragraphs": "paragraphs",
    "textCounter.bytes": "bytes (utf-8)",

    // Image to Base64
    "imgBase64.dropText": "Click or drag an image",
    "imgBase64.dropActive": "Drop image here",
    "imgBase64.preview": "Preview",
    "imgBase64.output": "base64 output",

    // UUID Generator
    "uuid.count": "count",
    "uuid.copyAll": "Copy All",
    "uuid.output": "output",
    "uuid.copySingle": "copy",
    "uuid.copiedSingle": "ok",

    // Lorem Ipsum
    "lorem.paragraphs": "paragraphs",
    "lorem.startWith": 'Start with "Lorem ipsum"',
    "lorem.output": "output",

    // JSON/CSV
    "jsonCsv.jsonToCsv": "JSON → CSV",
    "jsonCsv.csvToJson": "CSV → JSON",
    "jsonCsv.jsonInput": "json input",
    "jsonCsv.csvInput": "csv input",
    "jsonCsv.jsonPlaceholder": '[{"name":"Alice","age":30}]',
    "jsonCsv.csvPlaceholder": "name,age\nAlice,30",
    "jsonCsv.csvOutput": "csv output",
    "jsonCsv.jsonOutput": "json output",
    "jsonCsv.arrayError": "JSON must be an array of objects",

    // JSON Diff
    "jsonDiff.original": "original",
    "jsonDiff.originalPlaceholder": '{"name": "Alice", "age": 30}',
    "jsonDiff.modified": "modified",
    "jsonDiff.modifiedPlaceholder": '{"name": "Alice", "age": 31}',
    "jsonDiff.diff": "diff",
    "jsonDiff.noDiff": "Paste JSON on both sides and click Compare",
    "jsonDiff.invalidJson": "Invalid JSON",

    // Markdown to HTML
    "mdHtml.markdown": "markdown",
    "mdHtml.placeholder": "# Hello World",
    "mdHtml.output": "html output",

    // Markdown Preview
    "mdPreview.editor": "editor",
    "mdPreview.placeholder": "Type Markdown here...",
    "mdPreview.preview": "preview",

    // PDF Merge
    "pdfMerge.upload": "upload PDFs",
    "pdfMerge.dropText": "Drop PDF files here or click to browse",
    "pdfMerge.files": "files ({count})",
    "pdfMerge.merge": "Merge",
    "pdfMerge.merging": "Merging...",
    "pdfMerge.error": "Failed to merge PDFs",
    "pdfMerge.preview": "Preview",
    "pdfMerge.download": "Download",
    "pdfMerge.resultPreview": "Merged result",

    // PDF Split
    "pdfSplit.upload": "upload PDF",
    "pdfSplit.fileInfo": "{name} — {count} page",
    "pdfSplit.fileInfoPlural": "{name} — {count} pages",
    "pdfSplit.pageRange": "page range",
    "pdfSplit.rangePlaceholder": "e.g. 1-3, 5, 7-9",
    "pdfSplit.split": "Split",
    "pdfSplit.splitting": "Splitting...",
    "pdfSplit.selectError": "Please select a PDF file",
    "pdfSplit.readError": "Failed to read PDF",
    "pdfSplit.rangeError": "No valid pages in range",
    "pdfSplit.error": "Failed to split PDF",
    "pdfSplit.rendering": "Rendering pages...",
    "pdfSplit.selectAll": "Select All",
    "pdfSplit.deselectAll": "Deselect All",
    "pdfSplit.download": "Download",
    "pdfSplit.selectedCount": "{count} pages selected",
    "pdfSplit.dropText": "Drop a PDF file here or click to browse",
    "pdfSplit.resultPreview": "Split result",

    // PDF to Image
    "pdfImage.upload": "upload PDF",
    "pdfImage.scale": "scale",
    "pdfImage.converting": "Converting pages...",
    "pdfImage.selectError": "Please select a PDF file",
    "pdfImage.error": "Failed to convert PDF",
    "pdfImage.dropText": "Drop a PDF file here or click to browse",
    "pdfImage.pageAlt": "Page {num}",
    "pdfImage.downloadPage": "Download Page {num}",

    // Image to PDF
    "imgPdf.upload": "upload images",
    "imgPdf.dropText": "Drop images here or click to browse",
    "imgPdf.formats": "PNG, JPG, WebP, GIF supported",
    "imgPdf.images": "images ({count})",
    "imgPdf.create": "Create PDF",
    "imgPdf.creating": "Creating...",
    "imgPdf.error": "Failed to create PDF",
    "imgPdf.download": "Download",
    "imgPdf.resultPreview": "PDF preview",
  },

  zh: {
    // Nav & Footer
    "nav.tools": "工具",
    "nav.source": "源码",
    "footer.local": "所有处理均在浏览器本地完成。",

    // Homepage
    "home.tagline": "开发者工具箱",
    "home.heading": "快速工具，尊重你的{accent}。",
    "home.headingAccent": "隐私",
    "home.subtitle": "一切在浏览器本地运行。无服务器、无追踪、无废话。",

    // Categories
    "category.developer": "开发者",
    "category.pdf": "PDF 与文档",
    "category.encoding": "编码",
    "category.text": "文本",
    "category.image": "图片",
    "category.generator": "生成器",

    // Tool names
    "tool.json-formatter.name": "JSON 格式化",
    "tool.timestamp.name": "时间戳转换",
    "tool.color-picker.name": "颜色选择器",
    "tool.regex-tester.name": "正则测试",
    "tool.json-csv.name": "JSON/CSV 转换",
    "tool.text-diff.name": "JSON 对比",
    "tool.pdf-merge.name": "PDF 合并",
    "tool.pdf-split.name": "PDF 拆分",
    "tool.pdf-to-image.name": "PDF 转图片",
    "tool.image-to-pdf.name": "图片转 PDF",
    "tool.markdown-to-html.name": "Markdown 转 HTML",
    "tool.markdown-preview.name": "Markdown 预览",
    "tool.base64.name": "Base64 编解码",
    "tool.url-encode.name": "URL 编解码",
    "tool.md5-hash.name": "SHA 哈希生成",
    "tool.text-counter.name": "文本计数",
    "tool.image-to-base64.name": "图片转 Base64",
    "tool.qrcode.name": "二维码生成",
    "tool.uuid-generator.name": "UUID 生成器",
    "tool.lorem-ipsum.name": "Lorem Ipsum 生成",

    // Tool descriptions
    "tool.json-formatter.description": "格式化、验证和压缩 JSON 数据",
    "tool.timestamp.description": "在 Unix 时间戳和日期之间转换",
    "tool.color-picker.description": "在 HEX、RGB 和 HSL 颜色之间转换",
    "tool.regex-tester.description": "实时匹配测试和调试正则表达式",
    "tool.json-csv.description": "在 JSON 数组和 CSV 格式之间转换",
    "tool.text-diff.description": "比较两个 JSON 对象并高亮差异",
    "tool.pdf-merge.description": "将多个 PDF 文件合并为一个文档",
    "tool.pdf-split.description": "从 PDF 文件中提取指定页面",
    "tool.pdf-to-image.description": "将 PDF 页面转换为 PNG 图片",
    "tool.image-to-pdf.description": "将图片转换为 PDF 文档",
    "tool.markdown-to-html.description": "将 Markdown 文本转换为 HTML 标记",
    "tool.markdown-preview.description": "带语法高亮的 Markdown 实时预览",
    "tool.base64.description": "编码和解码 Base64 字符串",
    "tool.url-encode.description": "编码和解码 URL 组件",
    "tool.md5-hash.description": "使用 Web Crypto API 生成 SHA-1、SHA-256、SHA-512 哈希",
    "tool.text-counter.description": "统计字数、字符数、行数和段落数",
    "tool.image-to-base64.description": "将图片转换为 Base64 编码字符串",
    "tool.qrcode.description": "从文本或 URL 生成二维码",
    "tool.uuid-generator.description": "批量生成随机 UUID (v4)",
    "tool.lorem-ipsum.description": "生成用于设计和布局的占位文本",

    // ToolLayout
    "toolLayout.back": "工具",
    "toolLayout.related": "相关工具",

    // Shared actions
    "action.clear": "清除",
    "action.copy": "复制",
    "action.copied": "已复制",
    "action.encode": "编码",
    "action.decode": "解码",
    "action.generate": "生成",
    "action.convert": "转换",
    "action.download": "下载",
    "action.format": "格式化",
    "action.minify": "压缩",
    "action.compare": "对比",

    // JSON Formatter
    "jsonFormatter.input": "输入",
    "jsonFormatter.output": "输出",
    "jsonFormatter.placeholder": '{"key": "value"}',

    // Base64
    "base64.input": "输入",
    "base64.output": "输出",
    "base64.placeholder": "输入文本或 Base64 字符串...",
    "base64.encodeFailed": "编码失败",
    "base64.invalidBase64": "无效的 Base64 字符串",

    // URL Encode
    "urlEncode.input": "输入",
    "urlEncode.output": "输出",
    "urlEncode.placeholder": "输入文本或 URL 编码字符串...",
    "urlEncode.invalid": "无效的 URL 编码字符串",

    // Timestamp
    "timestamp.unixLabel": "Unix 时间戳",
    "timestamp.unixPlaceholder": "1700000000",
    "timestamp.dateLabel": "日期字符串",
    "timestamp.datePlaceholder": "2024-01-01T00:00:00Z",
    "timestamp.toDate": "转为日期 →",
    "timestamp.toTimestamp": "转为时间戳 →",
    "timestamp.current": "当前时间戳",
    "timestamp.result": "结果",
    "timestamp.invalidTs": "无效的时间戳",
    "timestamp.invalidDate": "无效的日期",
    "timestamp.seconds": "秒: {s}",
    "timestamp.milliseconds": "毫秒: {ms}",

    // SHA Hash
    "shaHash.input": "输入文本",
    "shaHash.placeholder": "输入要哈希的文本...",
    "shaHash.generate": "生成哈希",
    "shaHash.generating": "计算中...",

    // QR Code
    "qrcode.label": "文本或网址",
    "qrcode.placeholder": "https://example.com",
    "qrcode.alt": "二维码",
    "qrcode.error": "二维码生成失败",

    // Color Picker
    "colorPicker.hex": "hex",
    "colorPicker.rgb": "rgb",
    "colorPicker.rgbPlaceholder": "255, 128, 0",
    "colorPicker.hsl": "hsl",
    "colorPicker.hslPlaceholder": "30, 80%, 55%",

    // Regex Tester
    "regex.pattern": "正则表达式",
    "regex.patternPlaceholder": "[a-z]+",
    "regex.flagsPlaceholder": "gi",
    "regex.testString": "测试字符串",
    "regex.testPlaceholder": "输入要测试的文本...",
    "regex.noMatches": "无匹配",
    "regex.invalidRegex": "无效的正则表达式",
    "regex.matches": "匹配 ({count})",
    "regex.groups": "分组:",

    // Text Counter
    "textCounter.input": "输入文本",
    "textCounter.placeholder": "在此粘贴或输入文本...",
    "textCounter.chars": "字符",
    "textCounter.noSpaces": "无空格",
    "textCounter.words": "词数",
    "textCounter.lines": "行数",
    "textCounter.paragraphs": "段落",
    "textCounter.bytes": "字节 (utf-8)",

    // Image to Base64
    "imgBase64.dropText": "点击或拖拽图片",
    "imgBase64.dropActive": "将图片拖放到此处",
    "imgBase64.preview": "预览",
    "imgBase64.output": "Base64 输出",

    // UUID Generator
    "uuid.count": "数量",
    "uuid.copyAll": "全部复制",
    "uuid.output": "输出",
    "uuid.copySingle": "复制",
    "uuid.copiedSingle": "ok",

    // Lorem Ipsum
    "lorem.paragraphs": "段落数",
    "lorem.startWith": '以 "Lorem ipsum" 开头',
    "lorem.output": "输出",

    // JSON/CSV
    "jsonCsv.jsonToCsv": "JSON → CSV",
    "jsonCsv.csvToJson": "CSV → JSON",
    "jsonCsv.jsonInput": "JSON 输入",
    "jsonCsv.csvInput": "CSV 输入",
    "jsonCsv.jsonPlaceholder": '[{"name":"Alice","age":30}]',
    "jsonCsv.csvPlaceholder": "name,age\nAlice,30",
    "jsonCsv.csvOutput": "CSV 输出",
    "jsonCsv.jsonOutput": "JSON 输出",
    "jsonCsv.arrayError": "JSON 必须是对象数组",

    // JSON Diff
    "jsonDiff.original": "原始",
    "jsonDiff.originalPlaceholder": '{"name": "Alice", "age": 30}',
    "jsonDiff.modified": "修改后",
    "jsonDiff.modifiedPlaceholder": '{"name": "Alice", "age": 31}',
    "jsonDiff.diff": "差异",
    "jsonDiff.noDiff": "在两侧粘贴 JSON 后点击对比",
    "jsonDiff.invalidJson": "无效的 JSON",

    // Markdown to HTML
    "mdHtml.markdown": "Markdown",
    "mdHtml.placeholder": "# Hello World",
    "mdHtml.output": "HTML 输出",

    // Markdown Preview
    "mdPreview.editor": "编辑器",
    "mdPreview.placeholder": "在此输入 Markdown...",
    "mdPreview.preview": "预览",

    // PDF Merge
    "pdfMerge.upload": "上传 PDF",
    "pdfMerge.dropText": "拖放 PDF 文件到此处或点击浏览",
    "pdfMerge.files": "文件 ({count})",
    "pdfMerge.merge": "合并",
    "pdfMerge.merging": "合并中...",
    "pdfMerge.error": "PDF 合并失败",
    "pdfMerge.preview": "预览",
    "pdfMerge.download": "下载",
    "pdfMerge.resultPreview": "合并结果",

    // PDF Split
    "pdfSplit.upload": "上传 PDF",
    "pdfSplit.fileInfo": "{name} — {count} 页",
    "pdfSplit.fileInfoPlural": "{name} — {count} 页",
    "pdfSplit.pageRange": "页码范围",
    "pdfSplit.rangePlaceholder": "例如 1-3, 5, 7-9",
    "pdfSplit.split": "拆分",
    "pdfSplit.splitting": "拆分中...",
    "pdfSplit.selectError": "请选择 PDF 文件",
    "pdfSplit.readError": "读取 PDF 失败",
    "pdfSplit.rangeError": "范围内无有效页面",
    "pdfSplit.error": "PDF 拆分失败",
    "pdfSplit.rendering": "正在渲染页面...",
    "pdfSplit.selectAll": "全选",
    "pdfSplit.deselectAll": "取消全选",
    "pdfSplit.download": "下载",
    "pdfSplit.selectedCount": "已选 {count} 页",
    "pdfSplit.dropText": "拖放 PDF 文件到此处或点击浏览",
    "pdfSplit.resultPreview": "拆分结果",

    // PDF to Image
    "pdfImage.upload": "上传 PDF",
    "pdfImage.scale": "缩放",
    "pdfImage.converting": "正在转换页面...",
    "pdfImage.selectError": "请选择 PDF 文件",
    "pdfImage.error": "PDF 转换失败",
    "pdfImage.dropText": "拖放 PDF 文件到此处或点击浏览",
    "pdfImage.pageAlt": "第 {num} 页",
    "pdfImage.downloadPage": "下载第 {num} 页",

    // Image to PDF
    "imgPdf.upload": "上传图片",
    "imgPdf.dropText": "拖放图片到此处或点击浏览",
    "imgPdf.formats": "支持 PNG、JPG、WebP、GIF",
    "imgPdf.images": "图片 ({count})",
    "imgPdf.create": "生成 PDF",
    "imgPdf.creating": "生成中...",
    "imgPdf.error": "PDF 生成失败",
    "imgPdf.download": "下载",
    "imgPdf.resultPreview": "PDF 预览",
  },
};
