// ماژول دفترچه ایده‌ها (Impact/Effort) و ماتریس تصمیم‌گیری (Pros/Cons)
export const calculateIdeaPriorityIndex = function calculateIdeaPriorityIndex(impact, effort) {
      const imp = Math.min(10, Math.max(1, Number(impact) || 5));
      const eff = Math.min(10, Math.max(1, Number(effort) || 5));
      // Higher impact and lower effort yields higher priority score (scale 0-100)
      return Math.round(((imp * 1.4) / (eff * 0.4 + 1)) * 10);
    };
