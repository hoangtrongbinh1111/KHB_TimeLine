import './App.css';
import { time, generate } from './large';
import React, { useState } from 'react';

import { SvelteGanttReact } from './SvelteGanttReact';
import { SvelteGanttTable, SvelteGanttDependencies } from 'svelte-gantt';

const currentStart = time('00:00');
const currentEnd = time('23:55');

const { rows, tasks, dependencies } = generate();
function createPopup(task, node) {
  const rect = node.getBoundingClientRect();
  const div = document.createElement('div');
  div.className = 'sg-popup';
  div.innerHTML = `
      <div class="sg-popup-title">${task.label}</div>
      <div class="sg-popup-item">
          <div class="sg-popup-item-label">From:</div>
          <div class="sg-popup-item-value">${new Date(task.from).toLocaleTimeString()}</div>
      </div>
      <div class="sg-popup-item">
          <div class="sg-popup-item-label">To:</div>
          <div class="sg-popup-item-value">${new Date(task.to).toLocaleTimeString()}</div>
      </div>
  `;
  div.style.position = 'absolute';
  div.style.top = `${rect.bottom}px`;
  div.style.left = `${rect.left + rect.width / 2}px`;
  document.body.appendChild(div);
  return div;
}
const options = {
  rows,
  tasks,
  timeRanges: [],
  headers: [{ unit: 'day', format: 'MMMM Do' }, { unit: 'hour', format: 'H:mm' }],
  fitWidth: true,
  from: currentStart,
  to: currentEnd,
  tableHeaders: [{ title: '', property: 'label', width: 20, type: 'tree' }],
  tableWidth: 240,
  rowHeight: 40,
  columnOffset: 5,
  dependencies: dependencies,
  ganttTableModules: [SvelteGanttTable],
  ganttBodyModules: [SvelteGanttDependencies],
  taskElementHook: (node, task) => {
    console.log(111111111111111111);
    // let popup;
    // function onHover() {
    //   console.log('[task] hover', task);
    //   popup = createPopup(task, node);
    // }
    // function onLeave() {
    //   console.log('[task] hover', task);
    //   if (popup) {
    //     popup.remove();
    //   }
    // }
    // node.addEventListener('mouseenter', onHover);
    // node.addEventListener('mouseleave', onLeave);
    // return {
    //   destroy() {
    //     console.log('[task] destroy');
    //     node.removeEventListener('mouseenter', onHover);
    //     node.removeEventListener('mouseleave', onLeave);
    //   }
    // }
  },
  // taskContent: (task) => `${task.label} ${task.from.format('HH:mm')}`
}

function App() {
  const [opts, setOptions] = useState(options);

  function regenerate() {
    const { rows, tasks } = generate();
    console.log(rows, tasks);
    options.rows = rows;
    options.tasks = tasks;
    setOptions({ ...options });
  }

  return (
    <div style={{ margin: "0px 100px" }}>
      <header>
        {/* <button onClick={regenerate}>Regenerate</button> */}
      </header>
      <div>
        <h2 style={{ textAlign: "center" }}>Báo cáo hoạt động bay trong ngày</h2>
        <div style={{ display: "flex" }}>
          <div>
            <h3>Xem</h3>
            <select>
              <option value="0">Công ty trực thăng miền Bắc</option>
              <option value="1">Công ty trực thăng miền Trung</option>
              <option value="2">Công ty trực thăng miền Nam</option>
              <option value="3">Trung tâm huấn luyện</option>
              <option value="4">Tất cả</option>
            </select>
          </div>
          <div style={{ marginLeft: "1rem" }}>
            <h3>Ngày hoạt động</h3>
            <input type="date" />
          </div>
        </div>


      </div>
      <div className="App" style={{ height: '700px' }}>
        <SvelteGanttReact {...opts} />
      </div>
    </div>
  );
}

export default App;
