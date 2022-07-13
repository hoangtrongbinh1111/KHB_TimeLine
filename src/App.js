import './App.css';
import { time, generate } from './large';
import React, { useState } from 'react';

import { SvelteGanttReact } from './SvelteGanttReact';
import { SvelteGanttTable, SvelteGanttDependencies } from 'svelte-gantt';

const currentStart = time('00:00');
const currentEnd = time('23:55');

const { rows, tasks, dependencies } = generate();

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
    
    let popup;
    function onHover() {
        
        popup = createPopup(task, node);
    }
    function onLeave() {
        
        if(popup) {
            popup.remove();
        }
    }
    node.addEventListener('mouseenter', onHover);
    node.addEventListener('mouseleave', onLeave);
    return {
        destroy() {
            console.log('[task] destroy');
            node.removeEventListener('mouseenter', onHover);
            node.removeEventListener('mouseleave', onLeave);
        }
    }
  },
  // taskContent: (task) => `${task.label} ${task.from.format('HH:mm')}`
}
function createPopup(task, node) {
  
  const rect = node.getBoundingClientRect();
  const div = document.createElement('div');
  div.className = 'sg-popup';
  div.innerHTML = `
     
      <div class="sg-popup-item">
          <div class="sg-popup-item-label">Chuyến bay: TM22/58. Máy bay:846. Tổ bay: BINHHT, HIEUDO</div>
          
      </div>
      <div class="sg-popup-item">
          <div class="sg-popup-item-label">Đường bay: VT-BK20-P1-CTK3. Nhiệm vụ: . Công ty: Nam</div>
          
      </div>
      <div class="sg-popup-item">
          <div class="sg-popup-item-label">ETD: 09:45:00. ETA: 11:25:00</div>
          
      </div>
      
      <div class="sg-popup-item">
          <div class="sg-popup-item-label">ATD: 09:50:00. ATA: 11:25:00</div>
          
      </div>
      <div class="sg-popup-item">
          <div class="sg-popup-item-label">Hoạt động 95 min. Còn lại 0 min</div>
          
      </div>
      <div class="sg-popup-item">
          <div class="sg-popup-item-label">Giờ thân máy bay: 121097h43</div>
          
      </div>
      <div class="sg-popup-item">
          <div class="sg-popup-item-label">Ngày nhập giờ thân máy bay: 09/01/2009</div>
          
      </div>
      <div class="sg-popup-item">
          <div class="sg-popup-item-label">Thời gian dừng: 0h</div>
          
      </div>
      <div class="sg-popup-item">
          <div class="sg-popup-item-label">Ghi chú:</div>
          
      </div>
      
  `;
  div.style.backgroundColor='white'
  div.style.margin='10px'
  div.style.zIndex=99;
  div.style.position = 'absolute';
  div.style.top = `${rect.bottom}px`;
  div.style.left = `${rect.left + rect.width / 2}px`;
  document.body.appendChild(div);
  return div;
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
