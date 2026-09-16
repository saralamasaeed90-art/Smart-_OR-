const steps=["Patient Identification","Safety Check","Time Out","Surgical Count","Specimen Safety","Confirm"];
let state=JSON.parse(localStorage.getItem("smartORFlow")||"null")||{
 step:0, patient:{id:"12345678",name:"Ahmed Mohammed",procedure:"Laparoscopic Cholecystectomy",site:"Abdomen — Right Upper Quadrant",surgeon:"Dr. Khalid",or:"OR-03",notes:""},
 checks:["Allergy","Consent","Antibiotic prophylaxis","Blood availability","Imaging available","Implant / Prosthesis","Special equipment"],
 checked:[true,true,true,true,true,false,true],
 timeOut:[true,true,true,true],
 count:[["Gauze",20,20],["Needles",8,8],["Instruments",35,35]],
 specimen:[true,true,true,true,true],
 activity:["Case created","Patient identity confirmed"]
};
const $=s=>document.querySelector(s);
function save(){localStorage.setItem("smartORFlow",JSON.stringify(state));}
function renderSteps(){$("#steps").innerHTML=steps.map((s,i)=>`<div class="step ${i===state.step?"active":i<state.step?"done":""}">${i+1}. ${s}</div>`).join("")}
function render(){
 renderSteps();
 const screens=[patient,safety,timeout,count,specimen,confirm];
 $("#screen").innerHTML=screens[state.step]();
 $("#backBtn").style.visibility=state.step===0?"hidden":"visible";
 $("#nextBtn").textContent=state.step===5?"Finish":"Next";
 $("#status").textContent=state.step===5?"Ready to proceed":"Step "+(state.step+1)+" of 6";
 $("#activity").innerHTML=state.activity.slice(-6).reverse().map(x=>`<li>${x}</li>`).join("");
}
function patient(){let p=state.patient;return `<div class="screen-title"><h2>1. Patient Information</h2><span class="status-pill">Secure</span></div><div class="form">
${["id","name","procedure","site","surgeon","or"].map(k=>`<div class="field"><label>${k.toUpperCase()}</label><input data-p="${k}" value="${p[k]||""}"></div>`).join("")}</div><div class="notes-card"><div class="notes-title">📝 Notes / ملاحظات</div><textarea class="notes-input" data-p="notes" placeholder="Write notes here...">${p.notes||""}</textarea></div><div class="checks" style="margin-top:16px">${["Patient identity confirmed","Procedure confirmed","Surgical site confirmed"].map(x=>`<div class="check"><input type="checkbox" checked>${x}</div>`).join("")}</div>`}
function safety(){return `<div class="screen-title"><h2>2. Pre-operative Safety Check</h2><span class="status-pill">Checklist</span></div><div class="checks">${state.checks.map((x,i)=>`<label class="check"><input type="checkbox" data-c="${i}" ${state.checked[i]?"checked":""}>${x}</label>`).join("")}</div>`}
function timeout(){return `<div class="screen-title"><h2>3. TIME OUT</h2><span class="status-pill">STOP BEFORE INCISION</span></div><div class="checks">${["Patient confirmed","Procedure confirmed","Site confirmed","Position confirmed"].map((x,i)=>`<label class="check"><input type="checkbox" data-t="${i}" ${state.timeOut[i]?"checked":""}>${x}</label>`).join("")}</div><div class="field" style="margin-top:16px"><label>TEAM CONFIRMATION</label><b>Surgeon: Dr. Khalid • Anesthesia: Dr. Sara • Nurse: Lina</b></div>`}
function count(){return `<div class="screen-title"><h2>4. Surgical Count</h2><span class="status-pill">Count Required</span></div><div class="count"><b>Item</b><b>Expected</b><b>Counted</b><b>✓</b>${state.count.flatMap((r,i)=>[...r.map((v,j)=>`<div>${j?`<input class="cnt" data-i="${i}" data-j="${j}" value="${v}" style="width:100%;border:0;background:transparent;font-weight:700">`:v}</div>`),`<div>✓</div>`]).join("")}</div><div class="field" style="margin-top:16px"><label>CLOSING COUNT</label><b>All counts must match before closure.</b></div>`}
function specimen(){return `<div class="screen-title"><h2>5. Specimen Safety</h2><span class="status-pill">Verification</span></div><div class="checks">${["Patient identification","Specimen type","Correct container","Correct labeling","Label matches request","Specimen sent"].map((x,i)=>`<label class="check"><input type="checkbox" data-s="${i}" ${state.specimen[i]?"checked":""}>${x}</label>`).join("")}</div>`}
function confirm(){return `<div style="text-align:center;padding:35px 10px"><div style="font-size:72px;color:#1da28f">✓</div><h2>SAFE TO PROCEED</h2><p>All six digital safety steps are completed and recorded for this case.</p><div class="field" style="text-align:left;margin-top:20px"><label>CASE</label><b>${state.patient.or} • ${state.patient.procedure}</b></div></div>`}
document.addEventListener("input",e=>{
 if(e.target.dataset.p) { state.patient[e.target.dataset.p]=e.target.value; if(e.target.dataset.p==="procedure" || e.target.dataset.p==="or") { const p=state.patient; $("#caseLabel").textContent=`${p.or} • ${p.procedure}`; } }
 if(e.target.dataset.c !== undefined) state.checked[+e.target.dataset.c]=e.target.checked;
 if(e.target.dataset.t !== undefined) state.timeOut[+e.target.dataset.t]=e.target.checked;
 if(e.target.dataset.s !== undefined) state.specimen[+e.target.dataset.s]=e.target.checked;
 if(e.target.classList.contains("cnt")) state.count[+e.target.dataset.i][+e.target.dataset.j]=+e.target.value;
 save();
});
$("#nextBtn").onclick=()=>{if(state.step<5){state.step++;state.activity.push(steps[state.step]+" completed");save();render()}else{state.activity.push("Case confirmed SAFE TO PROCEED");save();alert("SMART OR: Case confirmed SAFE TO PROCEED.");render()}};
$("#backBtn").onclick=()=>{if(state.step>0){state.step--;render()}};
$("#resetBtn").onclick=()=>{localStorage.removeItem("smartORFlow");location.reload()};
$("#newCaseBtn").onclick=()=>{state={...state,step:0,activity:["New case created"],patient:{...state.patient,id:"NEW-"+Date.now().toString().slice(-6)}};save();render()};
render();