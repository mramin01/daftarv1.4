// مجموعه تست‌های خودکار واحد و یکپارچگی برنامه دفتر (Daftar)
import { JalaliEngine } from '../js/jalali.js';
import { calculateSubtaskProgress } from '../js/tasks.js';
import { calculateShiftTotalHours, calculateIncidentMTTR } from '../js/shifts.js';
import { calculateIdeaPriorityIndex } from '../js/ideas.js';

export function runAllDaftarTests() {
  const results = [];
  const assert = (name, cond, detail) => results.push({ name, passed: Boolean(cond), detail });
  const j1 = JalaliEngine.gregorianToJalali(2026, 3, 21);
  assert('تبدیل میلادی به جلالی (نوروز ۱۴۰۵)', j1.jy === 1405 && j1.jm === 1 && j1.jd === 1, JSON.stringify(j1));
  return results;
}
