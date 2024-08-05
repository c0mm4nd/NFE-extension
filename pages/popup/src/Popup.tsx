import '@src/Popup.css';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { exampleThemeStorage, createStorage } from '@chrome-extension-boilerplate/storage';

import { ComponentPropsWithoutRef } from 'react';

const Popup = () => {
  return (
    <div className={`App bg-gray-800`}>
      <header className="text-gray-100">
        <p>Fast Mode Switch</p>
        <ToggleButton>Toggle recommendation mode to frontend only</ToggleButton>
      </header>
    </div>
  );
};

const ToggleButton = (props: ComponentPropsWithoutRef<'button'>) => {
  return (
    <button
      className={
        props.className + ' ' + 'font-bold mt-4 py-1 px-4 rounded shadow hover:scale-105 ' + 'bg-black text-white'
      }>
      {props.children}
    </button>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
