import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error("Root element missing");

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (err) {
  console.error("Mount Error:", err);
  const el = document.getElementById('root');
  if (el) el.innerHTML = `<div style="color:red; text-align:center; padding:20px;">Error crítico de montaje: ${(err as Error).message}</div>`;
}
