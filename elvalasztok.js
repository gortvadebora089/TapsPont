(() => {
  function fix(root) {
    if (!(root instanceof Element) || root.closest('script,style,textarea,select,svg')) return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){return node.nodeValue.includes(' · ')&&!node.parentElement.closest('script,style,textarea,select,svg')?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);for(const node of nodes)node.nodeValue=node.nodeValue.replaceAll(' · ',' - ');
  }
  fix(document.body);
  new MutationObserver(records=>{for(const record of records){if(record.type==='characterData'){const node=record.target;if(node.parentElement&&!node.parentElement.closest('script,style,textarea,select,svg')&&node.nodeValue.includes(' · '))node.nodeValue=node.nodeValue.replaceAll(' · ',' - ')}else for(const child of record.addedNodes){if(child.nodeType===Node.ELEMENT_NODE)fix(child);else if(child.nodeType===Node.TEXT_NODE&&child.nodeValue.includes(' · ')&&child.parentElement&&!child.parentElement.closest('script,style,textarea,select,svg'))child.nodeValue=child.nodeValue.replaceAll(' · ',' - ')}}}).observe(document.body,{childList:true,subtree:true,characterData:true});
})();
