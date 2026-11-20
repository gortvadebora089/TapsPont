(() => {
  function colorStars(root) {
    if (!(root instanceof Element) || root.closest('script, style, textarea, select, option, svg, .star-gold')) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode(text) {
      return /[★☆]/.test(text.nodeValue) && !text.parentElement.closest('script, style, textarea, select, option, svg, .star-gold') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }});
    const texts = []; while (walker.nextNode()) texts.push(walker.currentNode);
    for (const text of texts) {
      const fragment = document.createDocumentFragment();
      for (const part of text.nodeValue.split(/([★☆])/)) {
        if (part === '★' || part === '☆') { const star = document.createElement('span'); star.className = 'star-gold'; star.textContent = part; fragment.append(star); }
        else if (part) fragment.append(document.createTextNode(part));
      }
      text.replaceWith(fragment);
    }
  }
  colorStars(document.body);
  new MutationObserver(records => { for (const record of records) { if (record.type === 'characterData') { if (record.target.parentElement) colorStars(record.target.parentElement); } else for (const child of record.addedNodes) { if (child.nodeType === Node.ELEMENT_NODE) colorStars(child); else if (child.nodeType === Node.TEXT_NODE && child.parentElement) colorStars(child.parentElement); } } }).observe(document.body, {childList: true, subtree: true, characterData: true});
})();
