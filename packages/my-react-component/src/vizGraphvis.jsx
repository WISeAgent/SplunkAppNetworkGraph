//-----------------------------------------------------------------------------
//=                                                                           =
//= Copyright (c) 2000-2022 WANG Infonology Systems Pty Ltd, Sydney Austalia  =
//=              --->  http://www.wiseagent.com.au  <---                      =
//= Author : Wenjie Wang (wenjie.wang@wiseagent.com.au)                       =
//= Change Hisory                                                             =
//= 20220418 Wenjie Wang     Initial                                          =
//=                                                                           =
//-----------------------------------------------------------------------------
import Graph from "react-graph-vis";
import React, { useState } from "react";
import ReactDOM from "react-dom";

const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  }
};

function randomColor() {
  const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  return `#${red}${green}${blue}`;
}

const vizGraphvis = () => {
  const createNode = (x, y) => {
    const color = randomColor();
    setState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter + 1;
      const from = Math.floor(Math.random() * (counter - 1)) + 1;
      return {
        graph: {
          nodes: [
            ...nodes,
            { id, label: `Node ${id}`, color, x, y }
          ],
          edges: [
            ...edges,
            { from, to: id }
          ]
        },
        counter: id,
        ...rest
      }
    });
  }
  const [state, setState] = useState({
    counter: 5,
    graph: {
      nodes: [
        { id: 1, label: "Load Balance 1", color: "#e04141" },
        { id: 2, label: "WebServer 1", color: "#e09c41" },
        { id: 3, label: "WebServer 2", color: "#e0df41" },
        { id: 4, label: "MSSQL", color: "#7be041" },
        { id: 5, label: "REST API", color: "#41e0c9" }
      ],
      edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 }
      ]
    },
    events: {
      select: ({ nodes, edges }) => {
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
      },
      doubleClick: ({ pointer: { canvas } }) => {
        createNode(canvas.x, canvas.y);
      }
    }
  })
  const { graph, events } = state;
  return (
    <div>
      <Graph graph={graph} options={options} events={events} style={{ height: "320px" }} />
    </div>
  );

}

export default vizGraphvis;