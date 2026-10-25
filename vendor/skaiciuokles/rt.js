/* Excel formulių vykdymo modulis (pogrupis) – Helstomm skaičiuoklėms */
class XErr{constructor(c){this.c=c;}toString(){return this.c;}}
const E=c=>new XErr(c);
const isE=v=>v instanceof XErr;
class XArr{constructor(rows){this.v=rows;}}
const isA=v=>v instanceof XArr;
let VAL=[],DONE=[],OVR={};
function g(i){
  if(DONE[i])return VAL[i];
  let v;
  if(i in OVR)v=OVR[i];
  else if(i in CONST)v=CONST[i];
  else{DONE[i]=true;VAL[i]=E('#CIRC!');v=FUNCS[i]();if(isA(v))v=v.v[0][0];}
  VAL[i]=v;DONE[i]=true;return v;}
function R(ids){return new XArr(ids.map(r=>r.map(i=>g(i))));}
/* --- tipų keitimas --- */
function num(v){ // → number arba XErr
  if(v===null||v===undefined||v==='')return 0;
  if(typeof v==='number')return v;
  if(typeof v==='boolean')return v?1:0;
  if(isE(v))return v;
  if(typeof v==='string'){const t=v.trim();if(t!==''&&!isNaN(Number(t)))return Number(t);return E('#VALUE!');}
  return E('#VALUE!');}
function str(v){
  if(v===null||v===undefined)return '';
  if(typeof v==='boolean')return v?'TRUE':'FALSE';
  if(typeof v==='number'){if(Number.isInteger(v))return String(v);let s=String(Number(v.toPrecision(15)));if(s.includes('e')){s=v.toPrecision(15).replace(/\.?0+(e)/,'$1');}return s;}
  return String(v);}
function rank(v){return typeof v==='number'?0:typeof v==='string'?1:2;}
function cmp(a,b){ // Excel palyginimas
  if(a===null||a===undefined)a=(typeof b==='string')?'':(typeof b==='boolean'?false:0);
  if(b===null||b===undefined)b=(typeof a==='string')?'':(typeof a==='boolean'?false:0);
  const ra=rank(a),rb=rank(b);if(ra!==rb)return ra<rb?-1:1;
  if(typeof a==='string'){const x=a.toLowerCase(),y=b.toLowerCase();return x<y?-1:x>y?1:0;}
  if(typeof a==='boolean'){return a===b?0:(a?1:-1);}
  return a<b?-1:a>b?1:0;}
function bmap(a,b,f){
  if(isA(a)||isA(b)){
    const A=isA(a)?a.v:null,B=isA(b)?b.v:null;
    const nr=Math.max(A?A.length:1,B?B.length:1),nc=Math.max(A?A[0].length:1,B?B[0].length:1);
    const out=[];for(let r=0;r<nr;r++){const row=[];for(let c=0;c<nc;c++){
      const x=A?(A[A.length===1?0:r]||[])[A[0].length===1?0:c]:a,y=B?(B[B.length===1?0:r]||[])[B[0].length===1?0:c]:b;
      row.push(x===undefined||y===undefined?E('#N/A'):f(x,y));}out.push(row);}
    return new XArr(out);}
  return f(a,b);}
function OP(op,a,b){
  return bmap(a,b,(x,y)=>{
    if(op==='&'){if(isE(x))return x;if(isE(y))return y;return str(x)+str(y);}
    if(['=','<>','<','>','<=','>='].includes(op)){if(isE(x))return x;if(isE(y))return y;const c=cmp(x,y);
      return op==='='?c===0:op==='<>'?c!==0:op==='<'?c<0:op==='>'?c>0:op==='<='?c<=0:c>=0;}
    const p=num(x),q=num(y);if(isE(p))return p;if(isE(q))return q;
    switch(op){case '+':return p+q;case '-':return p-q;case '*':return p*q;
      case '/':return q===0?E('#DIV/0!'):p/q;
      case '^':{const r=Math.pow(p,q);return isNaN(r)?E('#NUM!'):r;}}
    return E('#VALUE!');});}
function NEG(a){return bmap(a,0,(x)=>{const p=num(x);return isE(p)?p:-p;});}
function flat(args,opt={}){ // reikšmės funkcijoms MAX/MIN/SUM
  const out=[];
  for(const a of args){
    if(isA(a)){for(const row of a.v)for(const x of row){if(isE(x)){if(opt.skipErr)continue;out.push(x);}else if(typeof x==='number')out.push(x);}}
    else if(a===null)continue;
    else if(isE(a))out.push(a);
    else{const p=num(a);out.push(p);}
  }return out;}
function firstErr(xs){for(const x of xs)if(isE(x))return x;return null;}
function rnd(x,d){const m=Math.pow(10,d);const s=Math.sign(x);return s*Math.round(Math.abs(x)*m*(1+1e-15)+1e-9*0)/m;}
function exround(x,d){ // Excel ROUND
  const m=Math.pow(10,d);let y=Math.abs(x)*m;y=Number(y.toPrecision(15));return Math.sign(x)*Math.round(y)/m;}
function fixed(x,d,noc){
  d=d===undefined?2:d;const v=exround(x,d);let s=Math.abs(v).toFixed(Math.max(0,d));
  if(!noc){const p=s.split('.');p[0]=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,FMT.th);s=p.join('.');}
  s=s.replace('.',FMT.dec);return (v<0?'-':'')+s;}
const FMT={dec:',',th:' '};
function wild(c){return new RegExp('^'+c.replace(/[.+^${}()|[\]\\]/g,'\\$&').replace(/\*/g,'.*').replace(/\?/g,'.')+'$','is');}
function crit(cr){
  if(typeof cr==='number')return x=>typeof x==='number'&&x===cr;
  const s=str(cr);const m=s.match(/^(<=|>=|<>|<|>|=)?(.*)$/s);const op=m[1]||'=',rest=m[2];
  const n=Number(rest);const isn=rest!==''&&!isNaN(n);
  return x=>{
    if(isn&&op!=='='&&op!=='<>'){if(typeof x!=='number')return false;return op==='<'?x<n:op==='>'?x>n:op==='<='?x<=n:x>=n;}
    if(isn){const eq=typeof x==='number'&&x===n;return op==='='?eq:!eq;}
    const xs=x===null?'':typeof x==='string'?x:null;
    let eq=xs!==null&&wild(rest).test(xs);if(op==='<>')return !eq;
    if(op==='='||op===''){return eq;}
    if(xs===null)return false;const c=cmp(xs,rest);return op==='<'?c<0:op==='>'?c>0:op==='<='?c<=0:c>=0;};}
const F={
  IF:(c,a,b)=>{if(isA(c))c=c.v[0][0];if(isE(c))return c;let t;if(typeof c==='string'){const u=c.toUpperCase();if(u==='TRUE')t=true;else if(u==='FALSE')t=false;else return E('#VALUE!');}else t=!!num(c);
    return t?(a?a():true):(b?b():false);},
  IFERROR:(a,b)=>{const v=a();return isE(v)?b():v;},
  CHOOSE:(i,...xs)=>{const n=num(i);if(isE(n))return n;const k=Math.floor(n);if(k<1||k>xs.length)return E('#VALUE!');return xs[k-1]();},
  AND:(...xs)=>{const v=flatBool(xs);if(isE(v))return v;return v.every(x=>x);},
  OR:(...xs)=>{const v=flatBool(xs);if(isE(v))return v;return v.some(x=>x);},
  NOT:(a)=>{const n=num(a);return isE(n)?n:!n;},
  MAX:(...xs)=>{const v=flat(xs);const e=firstErr(v);if(e)return e;return v.length?Math.max(...v):0;},
  MIN:(...xs)=>{const v=flat(xs);const e=firstErr(v);if(e)return e;return v.length?Math.min(...v):0;},
  SUM:(...xs)=>{const v=flat(xs);const e=firstErr(v);if(e)return e;return v.reduce((s,x)=>s+x,0);},
  ROUND:(x,d)=>{x=num(x);d=num(d);if(isE(x))return x;if(isE(d))return d;return exround(x,Math.trunc(d));},
  ROUNDUP:(x,d)=>{x=num(x);d=num(d||0);if(isE(x))return x;const m=Math.pow(10,Math.trunc(d));const y=Number((Math.abs(x)*m).toPrecision(15));return Math.sign(x)*Math.ceil(y)/m;},
  ROUNDDOWN:(x,d)=>{x=num(x);d=num(d||0);if(isE(x))return x;const m=Math.pow(10,Math.trunc(d));const y=Number((Math.abs(x)*m).toPrecision(15));return Math.sign(x)*Math.floor(y)/m;},
  CEILING:(x,s)=>{x=num(x);s=num(s===undefined?1:s);if(isE(x))return x;if(isE(s))return s;if(s===0)return 0;return Math.ceil(Number((x/s).toPrecision(15)))*s;},
  INT:(x)=>{x=num(x);return isE(x)?x:Math.floor(x);},
  ABS:(x)=>{x=num(x);return isE(x)?x:Math.abs(x);},
  MOD:(a,b)=>{a=num(a);b=num(b);if(isE(a))return a;if(isE(b))return b;if(b===0)return E('#DIV/0!');return a-b*Math.floor(a/b);},
  SQRT:(x)=>{x=num(x);if(isE(x))return x;return x<0?E('#NUM!'):Math.sqrt(x);},
  SIN:(x)=>{x=num(x);return isE(x)?x:Math.sin(x);},COS:(x)=>{x=num(x);return isE(x)?x:Math.cos(x);},
  TAN:(x)=>{x=num(x);return isE(x)?x:Math.tan(x);},ATAN:(x)=>{x=num(x);return isE(x)?x:Math.atan(x);},
  RADIANS:(x)=>{x=num(x);return isE(x)?x:x*Math.PI/180;},DEGREES:(x)=>{x=num(x);return isE(x)?x:x*180/Math.PI;},
  N:(x)=>{if(isA(x))x=x.v[0][0];return typeof x==='number'?x:typeof x==='boolean'?(x?1:0):isE(x)?x:0;},
  ISNUMBER:(x)=>{if(isA(x))x=x.v[0][0];return typeof x==='number';},
  ISERROR:(x)=>{if(isA(x))x=x.v[0][0];return isE(x);},
  LEN:(x)=>{if(isE(x))return x;return str(x).length;},
  CHAR:(x)=>{if(isE(x))return x;return String.fromCharCode(num(x));},
  PI:()=>Math.PI,EXP:(x)=>{x=num(x);return isE(x)?x:Math.exp(x);},
  TRIM:(x)=>{if(isE(x))return x;return str(x).replace(/^ +| +$/g,'').replace(/ {2,}/g,' ');},
  SEARCH:(f,t,s)=>{if(isE(f))return f;if(isE(t))return t;const st=(s===undefined?1:num(s));const re=new RegExp(str(f).toLowerCase().replace(/[.+^${}()|[\]\\]/g,'\\$&').replace(/\*/g,'.*').replace(/\?/g,'.'));const m=str(t).toLowerCase().slice(st-1).search(re);return m<0?E('#VALUE!'):m+st;},
  LEFT:(x,n)=>{if(isE(x))return x;n=n===undefined||n===null?1:num(n);return str(x).substring(0,n);},
  FIXED:(x,d,noc)=>{x=num(x);if(isE(x))return x;d=d===undefined||d===null?2:num(d);const nc=noc===undefined||noc===null?false:!!num(noc);return fixed(x,d,nc);},
  INDEX:(a,r,c)=>{if(!isA(a))return a;r=num(r);c=(c===undefined||c===null)?null:num(c);if(isE(r))return r;if(c!==null&&isE(c))return c;
    const V=a.v;let rr,cc;if(c===null){if(V.length===1){rr=1;cc=r;}else{rr=r;cc=1;}}else{rr=r;cc=c;}
    if(rr<1||cc<1||rr>V.length||cc>V[0].length)return E('#REF!');const v=V[Math.floor(rr)-1][Math.floor(cc)-1];return v===null?0:v;},
  MATCH:(v,a,t)=>{t=t===undefined||t===null?1:num(t);const xs=a.v.length===1?a.v[0]:a.v.map(r=>r[0]);if(isE(v))return v;
    if(t===0){const re=typeof v==='string'&&/[*?]/.test(v)?wild(v):null;for(let i=0;i<xs.length;i++){const x=xs[i];if(re?(typeof x==='string'&&re.test(x)):(x!==null&&cmp(x,v)===0))return i+1;}return E('#N/A');}
    let best=-1;for(let i=0;i<xs.length;i++){const x=xs[i];if(x===null)continue;const c=cmp(x,v);if(t>0?c<=0:c>=0)best=i;else break;}return best<0?E('#N/A'):best+1;},
  VLOOKUP:(v,a,col,rl)=>{const ex=(rl===undefined||rl===null)?false:!num(rl);col=num(col);const V=a.v;
    if(!ex){let b=-1;for(let i=0;i<V.length;i++){if(V[i][0]===null)continue;if(cmp(V[i][0],v)<=0)b=i;else break;}return b<0?E('#N/A'):V[b][col-1];}
    for(let i=0;i<V.length;i++)if(V[i][0]!==null&&cmp(V[i][0],v)===0){const r=V[i][col-1];return r===null?0:r;}return E('#N/A');},
  COUNTIF:(a,cr)=>{const f=crit(cr);let n=0;if(!isA(a))a=new XArr([[a]]);for(const row of a.v)for(const x of row)if(!isE(x)&&f(x))n++;return n;},
  SUMPRODUCT:(...xs)=>{const arrs=xs.map(x=>isA(x)?x.v:[[x]]);let s=0;const nr=arrs[0].length,nc=arrs[0][0].length;
    for(let r=0;r<nr;r++)for(let c=0;c<nc;c++){let p=1;for(const A of arrs){const x=A[r][c];if(isE(x))return x;p*=typeof x==='number'?x:typeof x==='boolean'?(x?1:0):0;}s+=p;}return s;},
  AGGREGATE:(fn,opt,a,k)=>{fn=num(fn);const v=[];const A=isA(a)?a.v:[[a]];for(const row of A)for(const x of row){if(isE(x))continue;if(typeof x==='number')v.push(x);}
    if(fn===14){k=num(k);v.sort((p,q)=>q-p);return k>=1&&k<=v.length?v[k-1]:E('#NUM!');}
    if(fn===15){k=num(k);v.sort((p,q)=>p-q);return k>=1&&k<=v.length?v[k-1]:E('#NUM!');}
    if(fn===4)return v.length?Math.max(...v):0;if(fn===5)return v.length?Math.min(...v):0;if(fn===9)return v.reduce((s,x)=>s+x,0);return E('#VALUE!');},
};
function flatBool(xs){const out=[];for(const a of xs){
  if(isA(a)){for(const row of a.v)for(const x of row){if(isE(x))return x;if(typeof x==='boolean')out.push(x);else if(typeof x==='number')out.push(x!==0);}}
  else{if(isE(a))return a;if(a===null)continue;if(typeof a==='string'){const u=a.toUpperCase();if(u==='TRUE')out.push(true);else if(u==='FALSE')out.push(false);else return E('#VALUE!');}else out.push(!!num(a));}}
  if(!out.length)return E('#VALUE!');return out;}
/* API */
const XL={
  reset(){VAL=[];DONE=[];},
  set(k,v){const i=CELLKEYS[k];if(i===undefined)throw new Error('nėra langelio '+k);OVR[i]=v;XL.reset();},
  clear(){OVR={};XL.reset();},
  get(k){const i=CELLKEYS[k];if(i===undefined)throw new Error('nėra langelio '+k);return g(i);},
  has(k){return CELLKEYS[k]!==undefined;},
  isErr:isE,fixed,FMT,
};
