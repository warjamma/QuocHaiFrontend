import React, { Component, useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import NodeTree from '../../components/AfterLogin/NodeTree';
import NodeAqua from '../../components/AfterLogin/NodeAqua';
import { get, debounce } from 'lodash';
import { connect } from 'react-redux';
import {
  getListNode,
  getListNodeAqua,
  deleteCandidate,
} from '../../containers/referred/actions';
const initQuery = {
  key_word: '',
  // status: null,
  offset: 0,
  limit: 10,
};

const index = (props) => {
  const [query, setQuery] = useState(initQuery);
  const { dispatch, referred } = props;
  setTimeout(() => {
    dispatch(getListNode(query));
    dispatch(getListNodeAqua(query));
  }, 100000);
  useEffect(() => {
    dispatch(getListNode(query));
    dispatch(getListNodeAqua(query));
  }, []);
  return (
    <div >
      <div className="container-full" style={{  padding: "10px" }}>
        <div className="row">
          <div className="col-sm-12" style={{ background: "#fff", fontSize: 20, fontWeight: "bold", padding:"10px" }}>
            MANAGER TREE LIST
      </div>
          {get(referred, 'list_node.data', []).map((index, key) => {
            return (
              <div className="col-sm-3" key={index.nodeID} style={{ marginTop: '10px', }}>
                <NodeTree key={index.nodeID} data={index} />
              </div>
            );
          })}
        </div>
        <div className="row" style={{ marginTop: "30px" }}>
          <div className="col-sm-12" style={{ fontSize: 20, fontWeight: "bold", background: "#fff", padding:"10px" }}>
            MANAGER AQUA LIST
      </div>
          {get(referred, 'list_node_aqua.data', []).map((index, key) => {
            return (
              <div className="col-sm-3" key={index.nodeID} style={{ marginTop: '10px'}}>
                <NodeAqua key={index.nodeID} data={index} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  const { referred } = state;
  return { referred };
}

export default connect(mapStateToProps, null)(index);
