// Feasibility probe (not used by the site). Usage, from a folder with astronomy-engine@2.1.19 installed:
//   node panchangam-probe.cjs "$PWD" 2026-11-11
// Computes sunrise/sunset, tithi, nakshatra, rahukalam, abhijit for Singarayapalem, fully offline.
const A = require(process.argv[2] + '/node_modules/astronomy-engine');
const obs = new A.Observer(16.41031, 81.15019, 5);
const TITHI = ['పాడ్యమి','విదియ','తదియ','చవితి','పంచమి','షష్ఠి','సప్తమి','అష్టమి','నవమి','దశమి','ఏకాదశి','ద్వాదశి','త్రయోదశి','చతుర్దశి','పూర్ణిమ/అమావాస్య'];
const NAK = ['అశ్విని','భరణి','కృత్తిక','రోహిణి','మృగశిర','ఆర్ద్ర','పునర్వసు','పుష్యమి','ఆశ్లేష','మఖ','పుబ్బ','ఉత్తర','హస్త','చిత్త','స్వాతి','విశాఖ','అనూరాధ','జ్యేష్ఠ','మూల','పూర్వాషాఢ','ఉత్తరాషాఢ','శ్రవణం','ధనిష్ఠ','శతభిషం','పూర్వాభాద్ర','ఉత్తరాభాద్ర','రేవతి'];
const ist = (t) => t.date.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
// Lahiri ayanamsa, linear approximation (good to ~1' for this century)
const ayanamsa = (t) => 23.853 + (50.29 / 3600) * (t.tt / 365.25);
const sunLon = (t) => A.SunPosition(t).elon;
const moonLon = (t) => A.EclipticGeoMoon(t).lon;
const norm = (x) => ((x % 360) + 360) % 360;
const tithiIdx = (t) => Math.floor(norm(moonLon(t) - sunLon(t)) / 12);
const nakIdx = (t) => Math.floor(norm(moonLon(t) - ayanamsa(t)) / (360 / 27));
// find when f(t) changes from its value at t0 (bisection over next 2 days)
function nextChange(f, t0) {
  const v = f(t0); let lo = t0, hi = t0.AddDays(2);
  for (let i = 0; i < 40; i++) { const mid = lo.AddDays((hi.ut - lo.ut) / 2); f(mid) === v ? (lo = mid) : (hi = mid); }
  return hi;
}
const day = new Date(process.argv[3] + 'T00:00:00+05:30');
const sunrise = A.SearchRiseSet(A.Body.Sun, obs, +1, day, 1);
const sunset = A.SearchRiseSet(A.Body.Sun, obs, -1, day, 1);
const ti = tithiIdx(sunrise), paksha = ti < 15 ? 'శుక్ల' : 'కృష్ణ';
const ni = nakIdx(sunrise);
const weekday = sunrise.date.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'short' });
// Rahukalam: day split into 8 parts; part index by weekday (Sun..Sat)
const RAHU = { Sun: 8, Mon: 2, Tue: 7, Wed: 5, Thu: 6, Fri: 4, Sat: 3 };
const part = (sunset.ut - sunrise.ut) / 8, r = RAHU[weekday] - 1;
const mid = sunrise.AddDays((sunset.ut - sunrise.ut) / 2);
console.log({
  date: process.argv[3], weekday,
  sunrise: ist(sunrise), sunset: ist(sunset),
  tithi: `${paksha} ${TITHI[ti % 15]} (until ${ist(nextChange(tithiIdx, sunrise))})`,
  nakshatra: `${NAK[ni]} (until ${ist(nextChange(nakIdx, sunrise))})`,
  rahukalam: `${ist(sunrise.AddDays(part * r))} – ${ist(sunrise.AddDays(part * (r + 1)))}`,
  abhijit: `${ist(mid.AddDays(-24 / 1440))} – ${ist(mid.AddDays(24 / 1440))}`,
});
