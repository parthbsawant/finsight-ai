import { createChart } from 'lightweight-charts';

// Let's inspect what createChart returns
console.log("createChart:", typeof createChart);
const dummyDiv = typeof window !== 'undefined' ? document.createElement('div') : null;
if (!dummyDiv) {
    console.log("This requires a DOM environment. We will just check the exports.");
    import('lightweight-charts').then(pkg => console.log(Object.keys(pkg)));
}
