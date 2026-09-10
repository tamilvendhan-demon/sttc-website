(function(){
  'use strict';
  let enginePromise = null;
  const MODEL = 'Qwen3-0.6B-q4f16_1-MLC';

  function setStatus(text){
    const el = document.getElementById('connectBtn');
    if (el) el.textContent = text;
  }

  function webgpuAvailable(){ return typeof navigator !== 'undefined' && !!navigator.gpu; }

  async function getEngine(){
    if (!webgpuAvailable()) throw new Error('This browser does not support WebGPU.');
    if (!enginePromise) {
      enginePromise = (async function(){
        setStatus('🟡 Loading Thedal AI…');
        const webllm = await import('https://esm.run/@mlc-ai/web-llm@0.2.84');
        const engine = await webllm.CreateMLCEngine(MODEL, {
          initProgressCallback: function(p){
            const pct = Math.round(Math.max(0, Math.min(1, p.progress || 0)) * 100);
            setStatus('🟡 Thedal AI ' + pct + '%');
          }
        });
        setStatus('🟢 Thedal AI Ready');
        return engine;
      })().catch(function(e){ enginePromise = null; setStatus('⚪ Thedal AI'); throw e; });
    }
    return enginePromise;
  }

  function normalize(content, systemPrompt){
    const out = [{role:'system', content:systemPrompt || 'You are Thedal AI, a capable, friendly, practical AI assistant for artisans and small businesses. Answer naturally. Match Tamil, Tanglish, Hindi or English. Do not pretend to have access to information you do not have.'}];
    if (Array.isArray(content)) {
      content.forEach(function(m){
        if (!m || !m.role) return;
        if (typeof m.content === 'string') out.push({role:m.role, content:m.content});
        else if (Array.isArray(m.content)) {
          const text=m.content.filter(function(p){return p&&p.type==='text';}).map(function(p){return p.text||'';}).join('\n');
          if(text) out.push({role:m.role,content:text});
        }
      });
    } else out.push({role:'user',content:String(content||'')});
    return out;
  }

  async function localAI(content, systemPrompt, opts){
    const engine=await getEngine();
    const messages=normalize(content,systemPrompt);
    const result=await engine.chat.completions.create({messages:messages,temperature:typeof opts.temperature==='number'?opts.temperature:0.7,max_tokens:opts.maxTokens||1200,stream:false});
    return result?.choices?.[0]?.message?.content || '';
  }

  async function serverAI(content, systemPrompt, opts){
    const messages=[];
    if(systemPrompt) messages.push({role:'system',content:systemPrompt});
    if(Array.isArray(content)) content.forEach(function(m){if(m&&m.role)messages.push(m);});
    else messages.push({role:'user',content:String(content||'')});
    const r=await fetch('/api/openai/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:messages,max_tokens:opts.maxTokens||4096,temperature:typeof opts.temperature==='number'?opts.temperature:0.7})});
    const d=await r.json();
    if(!r.ok) throw new Error(d?.error||'AI request failed');
    return d?.choices?.[0]?.message?.content || '';
  }

  window.requireApiKey=function(){return true;};
  window.openApiKeyModal=function(){
    const p=document.getElementById('assistantPanel'); if(p) p.classList.add('open');
  };
  window.callOpenAI=async function(content,systemPrompt,opts){
    opts=opts||{};
    const hasImage=Array.isArray(content)&&content.some(function(m){return Array.isArray(m?.content)&&m.content.some(function(p){return p?.type==='image_url';});});
    if(hasImage){
      try{return await serverAI(content,systemPrompt,opts);}catch(e){throw new Error('Image AI needs a connected vision model. Text AI is available locally in this browser.');}
    }
    try{return await localAI(content,systemPrompt,opts);}catch(localErr){
      try{return await serverAI(content,systemPrompt,opts);}catch(serverErr){
        throw new Error('Thedal AI could not start. Use Chrome/Edge with WebGPU enabled, then try again.');
      }
    }
  };

  window.toggleAssistant=function(){
    const p=document.getElementById('assistantPanel'); if(p) p.classList.toggle('open');
    const i=document.getElementById('assistantInput'); if(i) setTimeout(function(){i.focus();},50);
  };

  window.thedalAIReady=true;
  setStatus('⚪ Thedal AI');
})();
