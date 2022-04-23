//-----------------------------------------------------------------------------
//=                                                                           =
//= Copyright (c) 2000-2022 WANG Infonology Systems Pty Ltd, Sydney Austalia  =
//=              --->  http://www.wiseagent.com.au  <---                      =
//= Author : Wenjie Wang (wenjie.wang@wiseagent.com.au)                       =
//= Change Hisory                                                             =
//= 20220418 Wenjie Wang     Initial                                          =
//=                                                                           =
//-----------------------------------------------------------------------------
import React, { useEffect, useRef } from "react";
import { Network } from "vis-network";

const VisNetwork = () => {
	const nodes = [
		{ id: 1, label: "Node 1" },
		{ id: 2, label: "Node 2" },
		{ id: 3, label: "Node 3" },
		{ id: 4, label: "Node 4" },
		{ id: 5, label: "Node 5" },
	];
	const edges = [
		{ from: 1, to: 3 },
		{ from: 1, to: 2 },
		{ from: 2, to: 4 },
		{ from: 2, to: 5 },
		{ from: 3, to: 3 },
	];

	const visJsRef = useRef(null);
	useEffect(() => {
		const network =
			visJsRef.current &&
			new Network(visJsRef.current, { nodes, edges } );
		// Use `network` here to configure events, etc
	}, [visJsRef, nodes, edges]);

	return <div ref={visJsRef} />;
};

export default VisNetwork;