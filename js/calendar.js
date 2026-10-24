// ماژول رندر شبکه تقویم جلالی خالص و برنامه روزانه (بدون تعطیلات/مناسبت‌ها)
import { JalaliEngine, JALALI_MONTH_NAMES } from './jalali.js';
export function buildMonthGridModel(jy, jm) {
  const length = JalaliEngine.getJalaliMonthLength(jy, jm);
  const startOffset = JalaliEngine.getJalaliDayOfWeek(jy, jm, 1);
  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push({ empty: true });
  for (let jd = 1; jd <= length; jd++) {
    cells.push({ empty: false, jy, jm, jd, dateStr: JalaliEngine.formatJalali(jy, jm, jd) });
  }
  return { jy, jm, monthName: JALALI_MONTH_NAMES[jm - 1], isLeap: JalaliEngine.isLeapJalaliYear(jy), cells };
}
