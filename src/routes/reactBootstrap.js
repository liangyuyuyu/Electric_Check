import React,{Component, PropTypes} from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { InputItem, Toast, WingBlank, ImagePicker, SegmentedControl, WhiteSpace, ActionSheet, Modal, NoticeBar, SearchBar, NavBar, Icon, List, Drawer, Tabs, TabBar, Badge } from "antd-mobile";

import { Button, ButtonToolbar } from 'react-bootstrap';



function IndexPage({location, dispatch, lyy}) {

  console.log(location,dispatch,lyy)
  return <>
        <ButtonToolbar>
            {/* 标准按钮 */}
            <Button>Default</Button>

            {/* 提供重要视觉感知及标识重要操作的按钮 */}
            <Button bsStyle="primary">Primary</Button>

            {/* 指示成功或正面操作按钮 */}
            <Button bsStyle="success">Success</Button>

            {/* 提供上下文帮助的提示信息按钮 */}
            <Button bsStyle="info">Info</Button>

            {/* 提醒操作需要小心使用 */}
            <Button bsStyle="warning">Warning</Button>

            {/* 提醒操作可能会导致危险或造成负面影响 */}
            <Button bsStyle="danger">Danger</Button>

            {/* 像一个链接但有按钮的操作行为 */}
            <Button bsStyle="link">Link</Button>
        </ButtonToolbar>
  </>
}

function mapStateToProps({lyy}) {// 获取state
  return { lyy };
} 

export default connect(mapStateToProps)(IndexPage);
