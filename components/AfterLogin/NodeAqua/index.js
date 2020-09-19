/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Progress } from 'antd';
import { get, } from 'lodash';
import { Drawer } from 'antd';
import moment from 'moment';
import ChartNodeAqua from '../ChartNodeAqua';

function NodeAqua(props) {
  const [visible, setVisible] = useState(false);
  const showDrawer = (nodeID) => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const {  data } = props;
  const lengthAmoni = data.aamoni.length - 1;
  const lengthPh = data.pph.length - 1;
  const lengthNitrite = data.nnitrite.length - 1;
  const lengthNitrate = data.nnitrate.length - 1;
  return (
    <div className="info-news" style={{ padding: "10px", background: "#20011059", borderRadius: "2%", boxShadow: "inherit" }}>
      <div className="row">
        <div
          className="col-sm-12"
        >
          <img
            style={{ width: '100%', objectFit: "contain", textAlign: "center" }}
            src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Aqua_Spout.jpg"
            alt="aqua"
          />
        </div>
        <div className="col-sm-12" onClick={() => showDrawer(data.nodeID)} style={{ color: "white", cursor: "pointer", paddingTop: "10px", paddingBottom: "10px", textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>Node{data.nodeID}</div>
        <div className="col-sm-4">
          <div className="name-title" style={{ textTransform: "uppercase", fontWeight: "bold", color: "green" }}>Device</div>
          <div className="name-value" style={{ color: "white" }}>{data.deviceID}</div>
        </div>
        <div className="col-sm-4">
          <div className="name-title" style={{ textTransform: "uppercase", fontWeight: "bold", color: "green" }}>Date</div>
          <div className="name-value" style={{ color: "white" }}>{
            get(data, 'aamoni', [])[lengthAmoni].timeGet
          }</div>
        </div>
        <div className="col-sm-4">
          <div className="name-title" style={{ textTransform: "uppercase", fontWeight: "bold", color: "green" }}>Status</div>
          <div className="name-value" style={{ color: "white" }}>Life</div>
        </div>

        <div className="col-sm-12" style={{ textTransform: "uppercase", fontWeight: "bold", color: "green" }}>Details</div>
        <div className="col-sm-12">
          <div className="name" style={{ color: "white" }}>Amoni</div>
          <Progress percent={get(data, 'aamoni', [])[lengthAmoni].value} status="active" showInfo={false} />
        </div>
        <div className="col-sm-12" style={{ color: "white" }}>
          <div className="name">Ph</div>
          <Progress percent={get(data, 'pph', [])[lengthPh].value} status="active" showInfo={false} />
        </div>
        <div className="col-sm-12" style={{ color: "white" }}>
          <div className="name">Nitrite</div>
          <Progress percent={get(data, 'nnitrite', [])[lengthNitrite].value} status="active" showInfo={false} />
        </div>
        <div className="col-sm-12" style={{ color: "white" }}>
          <div className="name">Nitrate</div>
          <Progress percent={get(data, 'nnitrate', [])[lengthNitrate].value} status="active" showInfo={false} />
        </div>
      </div>

      <Drawer
        title="Data chart"
        width={800}
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <ChartNodeAqua data2={data} />
      </Drawer>

    </div>
  );
}
function mapStateToProps(state) {
  const { referred } = state;
  return {
    referred,
  };
}
export default connect(mapStateToProps, null)(NodeAqua);
