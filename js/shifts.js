// ماژول ثبت شیفت، محاسبه اضافه‌کاری و شاخص MTTR رخدادهای پایش
export const SHIFT_TYPES = {
  "morning": {
    "label": "شیفت صبح (۰۷:۰۰ تا ۱۵:۰۰)",
    "baseHours": 8,
    "badge": "bg-sky-500/15 text-sky-300 border-sky-400/30"
  },
  "evening": {
    "label": "شیفت عصر (۱۵:۰۰ تا ۲۳:۰۰)",
    "baseHours": 8,
    "badge": "bg-amber-500/15 text-amber-300 border-amber-400/30"
  },
  "night": {
    "label": "شیفت شب (۲۳:۰۰ تا ۰۷:۰۰)",
    "baseHours": 8,
    "badge": "bg-indigo-500/15 text-indigo-300 border-indigo-400/30"
  },
  "day": {
    "label": "روزکار (۰۸:۰۰ تا ۱۷:۰۰)",
    "baseHours": 9,
    "badge": "bg-emerald-500/15 text-emerald-300 border-emerald-400/30"
  },
  "oncall": {
    "label": "آنکال (On-Call ۲۴ساعته)",
    "baseHours": 4,
    "badge": "bg-rose-500/15 text-rose-300 border-rose-400/30"
  },
  "off": {
    "label": "مرخصی / استراحت",
    "baseHours": 0,
    "badge": "bg-stone-500/15 text-stone-300 border-stone-400/30"
  }
};
export const calculateShiftTotalHours = function calculateShiftTotalHours(type, overtimeHours) {
      const base = SHIFT_TYPES[type] ? SHIFT_TYPES[type].baseHours : 8;
      const ot = Math.max(0, Number(overtimeHours) || 0);
      return base + ot;
    };
export const calculateIncidentMTTR = function calculateIncidentMTTR(startTime, resolutionTime) {
      if (!startTime || !resolutionTime) return 0;
      const [sh, sm] = toEnDigits(startTime).split(':').map(Number);
      const [eh, em] = toEnDigits(resolutionTime).split(':').map(Number);
      if (isNaN(sh) || isNaN(sm) || isNaN(eh) || isNaN(em)) return 0;
      let startMin = sh * 60 + sm;
      let endMin = eh * 60 + em;
      if (endMin < startMin) endMin += 24 * 60; // Crossed midnight
      return endMin - startMin;
    };
