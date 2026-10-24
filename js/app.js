// نقطه ورود اصلی اپلیکیشن ماژولار دفتر (Daftar)
import { JalaliEngine } from './jalali.js';
import { StorageEngine } from './storage.js';
import { calculateSubtaskProgress } from './tasks.js';
import { calculateShiftTotalHours, calculateIncidentMTTR } from './shifts.js';
import { calculateIdeaPriorityIndex } from './ideas.js';

console.log('Daftar Modular App Initialized — Today:', JalaliEngine.today());
