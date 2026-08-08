function render(){let view;if(route==="home")view=homeView();else if(route==="quick")view=quickView();else if(route==="assessment-intro")view=assessmentIntroView();else if(route==="assessment")view=assessmentView();else if(route==="assessment-phase-complete")view=assessmentPhaseCompleteView(currentFlow?.completedPhase??"pre");else if(route==="dashboard")view=dashboardView();else if(route==="emergency")view=emergencyView();else if(route==="data")view=dataView();else view=homeView();app.innerHTML=view;bindEvents();}
function bindEvents(){
 document.querySelectorAll("[data-route]").forEach((element)=>element.addEventListener("click",()=>{const next=element.dataset.route;if(next==="home"&&currentFlow?.type==="quick")currentFlow=null;if(next!=="emergency"&&currentFlow?.type==="emergency")currentFlow=null;setRoute(next);}));
 document.querySelectorAll("[data-action]").forEach((element)=>element.addEventListener("click",()=>handleAction(element.dataset.action)));
 document.querySelectorAll("[data-select-action]").forEach((element)=>element.addEventListener("click",()=>{currentFlow.selections.actionId=element.dataset.selectAction;render();}));
 document.querySelectorAll("[data-select-signal]").forEach((element)=>element.addEventListener("click",()=>{currentFlow.selections.signalIds=[element.dataset.selectSignal];render();}));
 document.querySelectorAll("[data-assessment-action]").forEach((element)=>element.addEventListener("click",()=>{state.activeAssessment.selections.actionId=element.dataset.assessmentAction;state=saveState(state);render();}));
 document.querySelectorAll("[data-assessment-judgment]").forEach((element)=>element.addEventListener("click",()=>{state.activeAssessment.selections.judgment=element.dataset.assessmentJudgment;state=saveState(state);render();}));
 document.querySelectorAll("[data-assessment-signal]").forEach((element)=>element.addEventListener("click",()=>{const id=element.dataset.assessmentSignal;const selected=new Set(state.activeAssessment.selections.signalIds);selected.has(id)?selected.delete(id):selected.add(id);state.activeAssessment.selections.signalIds=[...selected];state=saveState(state);render();}));
 document.querySelectorAll("[data-assessment-confidence]").forEach((element)=>element.addEventListener("click",()=>{state.activeAssessment.selections.confidence=Number(element.dataset.assessmentConfidence);state=saveState(state);render();}));
 document.querySelectorAll("[data-emergency-request]").forEach((element)=>element.addEventListener("click",()=>{const selected=new Set(currentFlow.answers.requests??[]);const id=element.dataset.emergencyRequest;selected.has(id)?selected.delete(id):selected.add(id);currentFlow.answers.requests=[...selected];render();}));
 document.querySelectorAll("[data-emergency-official]").forEach((element)=>element.addEventListener("click",()=>{currentFlow.answers.official=element.dataset.emergencyOfficial;render();}));
 const importInput=document.querySelector("#importFile");if(importInput)importInput.addEventListener("change",handleImport);
}
function handleAction(actionName){switch(actionName){
 case "start-quick":startQuick();break;
 case "submit-quick":{const question=currentFlow.questions[currentFlow.index];const response=createResponse(question,{...currentFlow.selections,judgment:null},"quick");currentFlow.responses.push(response);currentFlow.step="feedback";render();break;}
 case "next-quick":{if(currentFlow.index+1>=currentFlow.questions.length)currentFlow.step="complete";else{currentFlow.index+=1;currentFlow.selections={actionId:null,signalIds:[]};currentFlow.step="answer";startQuestionTimer();}render();break;}
 case "finish-quick":finishQuick(true);break;
 case "quit-flow":if(confirm("要離開這次快練嗎？未完成的快練不會保存。"))finishQuick(false);break;
 case "start-assessment":startAssessment(false);break;
 case "restart-assessment":if(confirm("要刪除未完成進度並重新開始嗎？"))startAssessment(true);break;
 case "resume-assessment":startAssessment(false);break;
 case "pause-assessment":state=saveState(state);currentFlow=null;setRoute("home");toast(state.storageMode==="memory"?"目前為暫時記憶模式；重新整理或關閉頁面可能遺失進度":"進度已保存在這台裝置");break;
 case "submit-assessment":submitAssessmentQuestion();break;
 case "next-assessment":advanceAssessmentQuestion();break;
 case "continue-phase":continueAssessmentPhase();break;
 case "emergency-next":currentFlow.step=2;render();break;
 case "emergency-back":currentFlow.step=1;render();break;
 case "emergency-result":currentFlow.step=3;render();break;
 case "restart-emergency":currentFlow={type:"emergency",step:1,answers:{}};render();break;
 case "export-json":downloadFile(`signalsafe-${new Date().toISOString().slice(0,10)}.json`,exportState(state),"application/json");break;
 case "export-csv":downloadFile(`signalsafe-${new Date().toISOString().slice(0,10)}.csv`,sessionsToCsv(state.sessions),"text/csv;charset=utf-8");break;
 case "clear-data":if(confirm("確定清除這台裝置上的所有 SignalSafe 資料？此操作無法復原。")){state=clearState();currentFlow=null;toast("本機資料已清除","success");render();}break;
 default:break;}}
function submitAssessmentQuestion(){const assessment=state.activeAssessment;const question=currentAssessmentQuestion();const response=createResponse(question,assessment.selections,assessment.phase);assessment.responses.push(response);assessment.step=assessment.phase==="training"?"feedback":"submitted";state=saveState(state);if(assessment.phase==="training")render();else advanceAssessmentQuestion();}
function advanceAssessmentQuestion(){const assessment=state.activeAssessment;const total=assessment.questionOrder[assessment.phase].length;if(assessment.questionIndex+1>=total){currentFlow={type:"assessment",completedPhase:assessment.phase};route="assessment-phase-complete";state=saveState(state);render();return;}assessment.questionIndex+=1;assessment.selections=blankAssessmentSelections();assessment.step="answer";state=saveState(state);startQuestionTimer();render();}
function continueAssessmentPhase(){const completed=currentFlow.completedPhase;if(completed==="post"){finishAssessment();return;}const next=completed==="pre"?"training":"post";state.activeAssessment.phase=next;state.activeAssessment.phaseIndex+=1;state.activeAssessment.questionIndex=0;state.activeAssessment.selections=blankAssessmentSelections();state.activeAssessment.step="answer";state=saveState(state);currentFlow={type:"assessment"};route="assessment";startQuestionTimer();render();}
async function handleImport(event){const file=event.target.files?.[0];if(!file)return;try{const text=await file.text();if(!confirm("匯入會取代這台裝置上的現有紀錄，確定繼續？"))return;state=importState(text);toast("資料已匯入","success");render();}catch(error){toast(error.message||"匯入失敗","error");}finally{event.target.value="";}}
document.addEventListener("visibilitychange",()=>{if(!questionStartedAt)return;if(document.hidden)hiddenStartedAt=performance.now();else if(hiddenStartedAt){interruptedDuration+=performance.now()-hiddenStartedAt;hiddenStartedAt=null;}});
window.addEventListener("online",render);window.addEventListener("offline",render);
if("serviceWorker" in navigator&&location.protocol!=="file:")window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(console.warn));
render();
