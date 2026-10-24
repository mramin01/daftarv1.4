// ماژول مدیریت کارها، چک‌لیست زیرکارها و پیوست فایل/تصویر
export function calculateSubtaskProgress(subtasks) {
  if (!Array.isArray(subtasks) || subtasks.length === 0) return 0;
  const done = subtasks.filter(s => s.done).length;
  return Math.round((done / subtasks.length) * 100);
}
export function filterAndSortTasks(tasks, { query = '', status = 'all', priority = 'all', category = 'all' } = {}) {
  const q = query.trim().toLowerCase();
  return tasks.filter(t => {
    if (status !== 'all' && t.status !== status) return false;
    if (priority !== 'all' && t.priority !== priority) return false;
    if (category !== 'all' && t.category !== category) return false;
    if (q && !(t.title.toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q))) return false;
    return true;
  });
}
