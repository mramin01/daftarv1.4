// ماژول محاسباتی تقویم خالص جلالی (بدون هیچ‌گونه مناسبت یا تعطیلات پیش‌فرض)
export const JALALI_MONTH_NAMES = ["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];
export const JALALI_WEEKDAYS = ["شنبه","یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه"];
export const JalaliEngine = {
  gregorianToJalali: gregorianToJalali(gy, gm, gd) {
        gy = Number(gy); gm = Number(gm); gd = Number(gd);
        const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        let jy = (gy <= 1600) ? 0 : 979;
        gy -= (gy <= 1600) ? 621 : 1600;
        const gy2 = (gm > 2) ? (gy + 1) : gy;
        let days = (365 * gy)
          + Math.floor((gy2 + 3) / 4)
          - Math.floor((gy2 + 99) / 100)
          + Math.floor((gy2 + 399) / 400)
          - 80 + gd + g_d_m[gm - 1];
        jy += 33 * Math.floor(days / 12053);
        days %= 12053;
        jy += 4 * Math.floor(days / 1461);
        days %= 1461;
        if (days > 365) {
          jy += Math.floor((days - 1) / 365);
          days = (days - 1) % 365;
        }
        const jm = (days < 186) ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
        const jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
        return { jy, jm, jd };
      },
  jalaliToGregorian: jalaliToGregorian(jy, jm, jd) {
        jy = Number(jy); jm = Number(jm); jd = Number(jd);
        let gy = (jy <= 979) ? 621 : 1600;
        jy -= (jy <= 979) ? 0 : 979;
        let days = (365 * jy)
          + (Math.floor(jy / 33) * 8)
          + Math.floor(((jy % 33) + 3) / 4)
          + 78 + jd
          + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
        gy += 400 * Math.floor(days / 146097);
        days %= 146097;
        if (days > 36524) {
          gy += 100 * Math.floor(--days / 36524);
          days %= 36524;
          if (days >= 365) days++;
        }
        gy += 4 * Math.floor(days / 1461);
        days %= 1461;
        if (days > 365) {
          gy += Math.floor((days - 1) / 365);
          days = (days - 1) % 365;
        }
        let gd = days + 1;
        const sal_a = [
          0, 31,
          ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28,
          31, 30, 31, 30, 31, 31, 30, 31, 30, 31
        ];
        let gm;
        for (gm = 0; gm < 13; gm++) {
          const v = sal_a[gm];
          if (gd <= v) break;
          gd -= v;
        }
        return { gy, gm, gd };
      },
  isLeapJalaliYear: isLeapJalaliYear(jy) {
        jy = Number(jy);
        const g = this.jalaliToGregorian(jy, 12, 30);
        const back = this.gregorianToJalali(g.gy, g.gm, g.gd);
        return back.jy === jy && back.jm === 12 && back.jd === 30;
      },
  getJalaliMonthLength: getJalaliMonthLength(jy, jm) {
        jy = Number(jy); jm = Number(jm);
        if (jm >= 1 && jm <= 6) return 31;
        if (jm >= 7 && jm <= 11) return 30;
        return this.isLeapJalaliYear(jy) ? 30 : 29;
      },
  getJalaliDayOfWeek: getJalaliDayOfWeek(jy, jm, jd) {
        const g = this.jalaliToGregorian(jy, jm, jd);
        const d = new Date(g.gy, g.gm - 1, g.gd);
        // Saturday = 0, Sunday = 1, ..., Friday = 6
        return (d.getDay() + 1) % 7;
      },
  formatJalali: formatJalali(jy, jm, jd) {
        return `${jy}/${String(jm).padStart(2, '0')}/${String(jd).padStart(2, '0')}`;
      },
  parseJalaliString: parseJalaliString(str) {
        const clean = toEnDigits(String(str || '').trim());
        const m = clean.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
        if (!m) return null;
        const jy = Number(m[1]), jm = Number(m[2]), jd = Number(m[3]);
        if (jm < 1 || jm > 12) return null;
        if (jd < 1 || jd > this.getJalaliMonthLength(jy, jm)) return null;
        return { jy, jm, jd };
      },
  today: today() {
        const now = new Date();
        return this.gregorianToJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());
      }
};
