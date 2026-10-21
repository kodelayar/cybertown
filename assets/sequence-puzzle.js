/* Shared ordering puzzle: drag cards, or select a card and then a numbered slot. */
(()=>{'use strict';
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
class SequencePuzzle{
 constructor(root,{cards,size,order=[],poolOrder,disabled=false,onChange=()=>{},label='Sequence puzzle'}){
  root._cyberSequence?.destroy();this.events=new AbortController();root._cyberSequence=this;
  const listen=(type,handler)=>root.addEventListener(type,handler,{signal:this.events.signal});
  this.root=root;this.cards=cards;this.disabled=disabled;this.onChange=onChange;this.selected=null;
  const seen=new Set();this.order=Array.from({length:size},(_,i)=>{const id=order[i];if(!cards.some(card=>card.id===id)||seen.has(id))return null;seen.add(id);return id});
  this.poolOrder=poolOrder||SequencePuzzle.shuffle(cards.map(card=>card.id));
  root.classList.add('sequence-puzzle');root.setAttribute('role','group');root.setAttribute('aria-label',label);
  root.innerHTML='<p class="sequence-help">Drag a card into a numbered slot. On touch screens, drag using the grip. You can also tap a card, then tap a slot. With a keyboard, use Tab and Enter. Select a placed card to move or swap it.</p><div class="sequence-layout"><section><h4>Available cards</h4><div class="sequence-bank" data-bank></div><button class="secondary sequence-return" type="button" data-return>Return selected card</button></section><section><h4>First to last</h4><ol class="sequence-slots"></ol></section></div><p class="sequence-status" role="status" aria-live="polite"></p>';
  listen('click',e=>this.click(e));
  listen('dragstart',e=>{const card=e.target.closest('[data-card]');if(!card||this.disabled)return;e.dataTransfer.setData('text/plain',card.dataset.card);e.dataTransfer.effectAllowed='move';this.dragged=card.dataset.card});
  listen('dragover',e=>{if(this.dragged&&e.target.closest('[data-slot],[data-bank]')){e.preventDefault();e.dataTransfer.dropEffect='move'}});
  listen('drop',e=>{if(!this.dragged)return;const id=this.dragged,target=e.target.closest('[data-slot],[data-bank]');this.dragged=null;if(!target)return;e.preventDefault();this.place(id,target.hasAttribute('data-slot')?Number(target.dataset.slot):null)});
  listen('dragend',()=>{this.dragged=null});
  listen('pointerdown',e=>this.pointerStart(e));
  listen('keydown',e=>{if(e.key==='Escape'&&this.selected){e.preventDefault();e.stopPropagation();this.selected=null;this.render();this.announce('Selection cleared.')}});
  this.render();
 }
 static shuffle(ids){const result=[...ids];for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]]}return result}
 destroy(){this.events.abort();this.cancelDrag?.();this.root._cyberSequence=null}
 announce(message){this.root.querySelector('.sequence-status').textContent=message}
 cardHTML(id){const card=this.cards.find(card=>card.id===id);return `<button class="sequence-card ${this.selected===id?'is-selected':''}" type="button" data-card="${escape(id)}" draggable="${!this.disabled}" aria-pressed="${this.selected===id}" ${this.disabled?'disabled':''}><span class="sequence-grip" aria-hidden="true">⠿</span><span><strong>${escape(card.title)}</strong><small>${escape(card.text)}</small></span></button>`}
 render(focus){
  const bank=this.poolOrder.filter(id=>!this.order.includes(id));
  this.root.querySelector('[data-bank]').innerHTML=bank.map(id=>this.cardHTML(id)).join('')||'<p class="sequence-empty">All cards placed. Check your sequence when ready.</p>';
  this.root.querySelector('.sequence-slots').innerHTML=this.order.map((id,i)=>`<li class="sequence-slot" data-slot="${i}" aria-label="Step ${i+1}"><span class="sequence-number" aria-hidden="true">${i+1}</span><div>${id?this.cardHTML(id):`<button class="sequence-empty-slot" type="button" aria-label="Place selected card in step ${i+1}" ${this.disabled?'disabled':''}>Step ${i+1} · Drop a card here</button>`}</div></li>`).join('');
  this.root.querySelector('[data-return]').disabled=this.disabled||!this.selected||!this.order.includes(this.selected);
  if(focus){const node=[...this.root.querySelectorAll('[data-card]')].find(node=>node.dataset.card===focus);node?.focus({preventScroll:true})}
 }
 click(e){if(this.disabled||this.suppressClick)return;
  if(e.target.closest('[data-return]')){if(this.selected)this.place(this.selected,null);return}
  const card=e.target.closest('[data-card]'),slot=e.target.closest('[data-slot]');
  if(this.selected&&slot){this.place(this.selected,Number(slot.dataset.slot));return}
  if(card){const id=card.dataset.card;this.selected=this.selected===id?null:id;this.render(id);this.announce(this.selected?'Card selected. Choose a numbered slot.':'Selection cleared.')}
 }
 place(id,target){if(this.disabled||!this.cards.some(card=>card.id===id)||target!==null&&(!Number.isInteger(target)||target<0||target>=this.order.length))return;
  const from=this.order.indexOf(id);if(from===target)return;
  const displaced=target===null?null:this.order[target];if(from>=0)this.order[from]=displaced;if(target!==null)this.order[target]=id;
  this.selected=null;this.render(id);this.onChange([...this.order]);this.announce(target===null?'Card returned to available cards.':`Card placed in step ${target+1}. ${this.order.filter(Boolean).length} of ${this.order.length} steps filled.`);
 }
 pointerStart(e){if(this.disabled||this.cancelDrag||e.button!==0||!e.target.closest('.sequence-grip'))return;
  const card=e.target.closest('[data-card]');if(!card)return;e.preventDefault();
  const id=card.dataset.card,startX=e.clientX,startY=e.clientY;let ghost=null,dragging=false,scrollFrame=null,pointerY=startY;
  const scroll=()=>{const panel=this.root.closest('.dialog');if(panel){const bounds=panel.getBoundingClientRect();if(pointerY>bounds.bottom-65)panel.scrollTop+=10;else if(pointerY<bounds.top+150)panel.scrollTop-=10}scrollFrame=requestAnimationFrame(scroll)};
  const move=event=>{if(event.pointerId!==e.pointerId)return;pointerY=event.clientY;if(!dragging&&Math.hypot(event.clientX-startX,event.clientY-startY)>6){dragging=true;this.suppressClick=true;ghost=card.cloneNode(true);ghost.classList.add('sequence-ghost');ghost.style.width=Math.min(card.offsetWidth,320)+'px';document.body.append(ghost);scrollFrame=requestAnimationFrame(scroll)}
   if(!ghost)return;event.preventDefault();ghost.style.left=event.clientX+12+'px';ghost.style.top=event.clientY+12+'px';
   this.root.querySelectorAll('.is-drop-target').forEach(node=>node.classList.remove('is-drop-target'));
   const target=document.elementFromPoint(event.clientX,event.clientY)?.closest('[data-slot],[data-bank]');if(target&&this.root.contains(target))target.classList.add('is-drop-target');
  };
  const cleanup=()=>{window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',end);window.removeEventListener('pointercancel',end);cancelAnimationFrame(scrollFrame);ghost?.remove();this.root.querySelectorAll('.is-drop-target').forEach(node=>node.classList.remove('is-drop-target'));this.cancelDrag=null};
  const end=event=>{if(event.pointerId!==e.pointerId)return;cleanup();
   if(dragging&&event.type!=='pointercancel'){const target=document.elementFromPoint(event.clientX,event.clientY)?.closest('[data-slot],[data-bank]');if(target&&this.root.contains(target))this.place(id,target.hasAttribute('data-slot')?Number(target.dataset.slot):null)}
   setTimeout(()=>{this.suppressClick=false},0);
  };
  this.cancelDrag=cleanup;
  window.addEventListener('pointermove',move,{passive:false});window.addEventListener('pointerup',end);window.addEventListener('pointercancel',end);
 }
}
window.CyberSequencePuzzle=SequencePuzzle;
})();
