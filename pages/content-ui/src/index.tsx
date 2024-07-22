import { createRoot } from 'react-dom/client';
import Recommendation from '@src/recommendation';
import Popup from './popup';
// eslint-disable-next-line
// @ts-ignore
import tailwindcssOutput from '@src/tailwind-output.css?inline';

function injectOpenseaIndexRecommendation() {
  const root = document.createElement('div');
  root.id = 'non-fungible-enthusiast-view-root';
  root.style.setProperty('--grid-item-col-span', '12');
  root.style.setProperty('grid-column', 'span var(--grid-item-col-span)');

  // document.body.append(root);
  const parent = document.querySelector('#main > main > div > div');
  parent?.insertBefore(root, parent.children[2]);

  const rootIntoShadow = document.createElement('div');
  rootIntoShadow.id = 'shadow-root';

  const shadowRoot = root.attachShadow({ mode: 'open' });
  shadowRoot.appendChild(rootIntoShadow);

  /** Inject styles into shadow dom */
  const globalStyleSheet = new CSSStyleSheet();
  globalStyleSheet.replaceSync(tailwindcssOutput);

  shadowRoot.adoptedStyleSheets = [globalStyleSheet];
  shadowRoot.appendChild(rootIntoShadow);

  createRoot(rootIntoShadow).render(<Recommendation />);
}

function injectOpenseaItemRating() {
  const root = document.createElement('div');
  root.id = 'non-fungible-enthusiast-popup-root';
  root.hidden = true;
  root.style.position = 'fixed';
  root.style.zIndex = '9999';
  root.style.backgroundColor = 'white';
  root.style.border = '1px solid #ccc';
  root.style.padding = '10px';
  root.style.borderRadius = '5px';
  root.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
  root.style.maxWidth = '400px';
  root.style.minWidth = '200px';
  root.style.minHeight = '100px';
  root.style.maxHeight = '300px';
  root.style.overflow = 'auto';
  root.style.whiteSpace = 'normal';
  root.style.wordWrap = 'break-word';
  document.body.append(root); // append to the end of the body

  const rootIntoShadow = document.createElement('div');
  rootIntoShadow.id = 'shadow-root';

  const shadowRoot = root.attachShadow({ mode: 'open' });
  shadowRoot.appendChild(rootIntoShadow);

  /** Inject styles into shadow dom */
  const globalStyleSheet = new CSSStyleSheet();
  globalStyleSheet.replaceSync(tailwindcssOutput);

  shadowRoot.adoptedStyleSheets = [globalStyleSheet];
  shadowRoot.appendChild(rootIntoShadow);

  createRoot(rootIntoShadow).render(<Popup />);

  // create onhover event listener for a tag which href prefix is https://opensea.io/assets/ethereum/0x0483b0dfc6c78062b9e999a82ffb795925381415/405
  // when hover, show the popup
  // when leave, hide the popup

  // 创建一个MutationObserver实例

  // const aTags = document.querySelectorAll('a');
  // aTags.forEach(aTag => {
  //   const href = aTag.getAttribute('href');
  //   if (href && href.startsWith('https://opensea.io/assets/' || href.startsWith('/assets/'))) {
  //     console.log('aTag', aTag);
  //     aTag.addEventListener('mouseover', event => {
  //       console.log('mouseover', event);
  //       root.hidden = false;
  //       root.style.left = `${event.clientX + 10}px`;
  //       root.style.top = `${event.clientY + 10}px`;
  //     });
  //     aTag.addEventListener('mouseleave', event => {
  //       root.hidden = true;
  //     });
  //   }
  // });

  const aTags = document.querySelectorAll('article > a');
  aTags.forEach(aTag => {
    console.log('aTag', aTag);
    aTag.addEventListener('mouseover', event => {
      const href = aTag.getAttribute('href');
      console.log('mouseover', event, href);
      root.hidden = false;
      root.style.left = `${event.clientX + 10}px`;
      root.style.top = `${event.clientY + 10}px`;
    });
    aTag.addEventListener('mouseleave', event => {
      root.hidden = true;
    });
  });

  // 创建一个MutationObserver实例
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        // 遍历新增的节点
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            if (node.nodeName === 'A') {
              // 检查是否是元素节点
              // 在新增的节点上绑定鼠标事件
              const aTag = node as Element;
              const href = aTag.getAttribute('href');
              if (href) {
                console.log('aTag', aTag);
                aTag.addEventListener('mouseover', event => {
                  console.log('mouseover', event);
                  root.hidden = false;
                  root.style.left = `${event.clientX + 10}px`;
                  root.style.top = `${event.clientY + 10}px`;
                });
                aTag.addEventListener('mouseleave', event => {
                  root.hidden = true;
                });
              }
            }
            // console.log(node)
            const tag = node as Element;
            tag.querySelectorAll('a').forEach(aTag => {
              const href = aTag.getAttribute('href');
              console.log('aTag', aTag);
              if (href) {
                console.log('aTag', aTag);
                aTag.addEventListener('mouseover', event => {
                  console.log('mouseover', event);
                  root.hidden = false;
                  root.style.left = `${event.clientX + 10}px`;
                  root.style.top = `${event.clientY + 10}px`;
                });
                aTag.addEventListener('mouseleave', event => {
                  root.hidden = true;
                });
              }
            });
          }
        });
      }
    });
  });

  // 配置观察选项
  const config = { childList: true, subtree: true };

  // 开始观察目标节点
  observer.observe(document.body, config);
}

if (window.location.host === 'opensea.io') {
  let db;
  const request = indexedDB.open('localforage');
  request.onerror = event => {
    console.error("Why didn't you allow my web app to use IndexedDB?!");
  };
  request.onsuccess = event => {
    db = event.target.result;
    console.log('got db', db);

    const transaction = db.transaction(['keyvaluepairs'], 'readwrite');
    const objectStore = transaction.objectStore('keyvaluepairs');

    const request = objectStore.get('selection_assetSelectionKey');
    request.onerror = event => {
      // Handle errors!
      console.error('NFE error getting value', event);
    };
    request.onsuccess = event => {
      // Do something with the request.result!
      // console.log(value.result);
      console.log('NFE got value', request.result);
      // if is index
      if (window.location.pathname === '/') {
        injectOpenseaIndexRecommendation();
      }

      injectOpenseaItemRating();
    };
  };
}
