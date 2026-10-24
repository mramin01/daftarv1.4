// ماژول پشتیبان‌گیری JSON، بازیابی، گالری پیوست‌ها و ساخت آرشیو ZIP
export function serializeBackup(state) {
  return JSON.stringify(state, null, 2);
}
export function parseAndValidateBackup(jsonString) {
  const parsed = JSON.parse(jsonString);
  if (!parsed || !Array.isArray(parsed.tasks) || !Array.isArray(parsed.shifts)) {
    throw new Error('ساختار فایل پشتیبان نامعتبر است.');
  }
  return parsed;
}
