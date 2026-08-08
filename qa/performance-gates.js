const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),skip=new Set(['node_modules','platforms','.git']);
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{
 const p=path.join(d,e.name); if(e.isDirectory()) return skip.has(e.name)?[]:walk(p); return [p];
});}
const files=walk(root).filter(p=>/\.(js|java)$/.test(p));
if(!files.length) throw new Error('Performance gate aborted: no JS/Java files discovered.');
const patterns=[
 /document\.write\s*\(/,
 /while\s*\([^)]*\)\s*\{[^}]{0,200}fetch\s*\(/s
];
const bad=[];
for(const f of files){const t=fs.readFileSync(f,'utf8'); for(const r of patterns) if(r.test(t)) bad.push(`${path.relative(root,f)}: ${r}`);}
if(bad.length) throw new Error('Performance regressions:\n'+bad.join('\n'));
console.log(`Performance gates: PASS (${files.length} JS/Java files scanned)`);
