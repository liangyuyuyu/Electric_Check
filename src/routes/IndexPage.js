import React,{Component, PropTypes} from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { InputItem, Toast, WingBlank, ImagePicker, SegmentedControl, WhiteSpace, ActionSheet, Modal, NoticeBar, SearchBar, NavBar, Icon, List, Drawer, Tabs, TabBar, Badge , Carousel , Accordion  } from "antd-mobile";

// react-bmap:基于百度地图JavaScript Api封装的React组件库
import {Map, Marker, NavigationControl, InfoWindow ,  MapTypeControl, ScaleControl, OverviewMapControl , TrafficLayer} from 'react-bmap'

function renderHeader(type){
    return <>
      { /**
      * 组件NavBar：导航栏，位于 app 内容区的上方，系统状态栏的下方，并且提供在一系列页面中的导航能力
      *      mode：	模式	可选dark、light，默认值dark
      *      icon：	出现在最左边的图标占位符	类型ReactNode
      *      leftContent：	导航左边内容
      *      rightContent：	导航右边内容
      *      onLeftClick：	导航左边点击回调	类型(e: Object): void
      */}
      <NavBar style={{height:'8%'}} icon={<Icon type="left" />} onLeftClick={() => this.goBack()}
        rightContent={<Icon type="search"  /> }>
        {type}
      </NavBar>
      {/* <SegmentedControl
          values={['单选图片上传', '多选图片上传']}
          selectedIndex={lyy.multipleState? 0:1 }
          onChange={() => dispatch({ type: "lyy/changeMultipleState", data: { multipleState: lyy.multipleState } })}  // 改变multiple的值，让下面的图片上传可以单上传也可以多上传
        />  */}
    </> 
}
function renderNoticeBar(dispatch,content){
    return <>
      {/*       
        组件NoticeBar：通告栏，在导航栏下方，一般用作系统提醒、活动提醒等通知
            mode	提示类型，可选 closable,link	String	''
            icon	在开始位置设置图标	ReactNode	<Icon type={require('./trips.svg')} size="xxs" />
            onClick	点击关闭或者操作区域的回调函数	(): void
            marqueeProps	marquee 参数	Object	{loop: false, leading: 500, trailing: 800, fps: 40, style: {}}
            action	用于替换操作 icon 的文案	ReactElement
      */}
      <NoticeBar 
            style={{height:'6%'}}
            mode={"closable"} 
            marqueeProps={{ loop: true, style: { color: "red" } }}
            onClick={() =>{  // 用户点击关闭通知栏时，修改地图的大小，以填充满整个页面
                dispatch({ type: "lyy/changeNoticeBarState" , data:{noticeBarState:true}})}
              }
            >
        <span style={{fontSize:"1px"}}>{content}</span>
      </NoticeBar>
    </> 
}

function renderCarousel(){ // 首页
    const data=[1, 2, 3, 4, 5, 6]

    return <>
      {/* 
          selectedIndex	手动设置当前显示的索引	number	0
          dots	是否显示面板指示点	Boolean	true
          vertical	垂直显示	Boolean	false
          autoplay	是否自动切换	Boolean	false
          autoplayInterval	自动切换的时间间隔	Number	3000
          infinite	是否循环播放	Boolean	false
          afterChange	切换面板后的回调函数	(current: number): void	无
          dotStyle	指示点样式	Object	无
          dotActiveStyle	当前激活的指示点样式	Object	无
          frameOverflow	设置 slider frame 的 overflow 样式	string	hidden | visible
          cellSpacing	项目之间的间距，以px为单位	number	-
          slideWidth	手动设置项目宽度. 可以是slideWidth="20px"，也可以是相对容器的百分比slideWidth={0.8}	string / number	-
          easing	缓动函数，你可以使用这里提供的其他函数	Function	easeOutCirc
          swipeSpeed	滑动灵敏度	number	12
          beforeChange	切换面板前的回调函数	(from: number, to: number): void	无
      */}

      <Carousel
          frameOverflow="hidden"
          cellSpacing={8}
          slideWidth={0.8}
          autoplay
          autoplayInterval={2000}
          infinite
          swipeSpeed={12}
          // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          // afterChange={index => this.setState({ slideIndex: index })}
        >
          {data.map((val, index) => (
            <a
              key={val}
              href="#"
              style={{
                display: 'block',
                position: 'relative',
                // top: this.state.slideIndex === index ? -10 : 0,
                // height: this.state.imgHeight,
                boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
              }}
            >
              <img
                src={`../assets/first_icon/show${val}.jpg`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  // this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
    </>
}

function renderContactChild(url,name,vip,online,message){ // 联系人界面中每一个联系人的样式
  return <> 
          <List.Item
              thumb={<div style={{ backgroundImage: `url(${url})`, width: "50px", height: "50px", borderRadius: "50%" }}></div>}
              extra={
                <div>
                  <div style={{ fontSize: "1px" }}>11:15</div>
                </div>
              }
            >
              <span style={{ fontSize: "16px" }}>{name}{vip?<span>&nbsp;&nbsp;<Badge text={"vip"} /></span>:' '}</span>
              <List.Item.Brief>
                <span style={{ fontSize: "1px" }}>
                    [{online}]{vip?<span style={{color:"#FF5B05"}}>☆</span>:' '}{message}
                </span>
              </List.Item.Brief>
          </List.Item>
  </>
}

function renderContact(){ // 联系人界面
    return <>
    <SearchBar placeholder="搜索" />
    {/* 
    Accordion
        activeKey	当前激活 tab 面板的 key	Array or String	默认无，accordion模式下默认第一个元素
        defaultActiveKey	初始化选中面板的 key	String	无
        onChange	切换面板的回调	(key: string): void	noop
        accordion	手风琴模式	Boolean	false
        openAnimation	设置自定义切换动画，禁止动画可设为{}	Object	参考 rc-collapse/lib/openAnimationFactory.js 文件
    Accordion.Panel
        key	对应 activeKey	String	无
        header	面板头内容	React.Element or String	无
    注意: 目前暂不支持嵌套使用        
    */}
      <Accordion accordion >
          <Accordion.Panel header={<span style={{ fontSize: "16px" }}>特别关心</span>}>
            <List>
              {renderContactChild("../assets/second_icon/bitech.jpg","瑞谷拜特",true,"WIFI在线","更新了说说")}
              {renderContactChild("../assets/second_icon/qq.png","梁宇宇",true,"4G在线","发表了视频")}
              {renderContactChild("../assets/second_icon/qq.png","王倩倩",false,"iPhone在线","最新分享：陪你成长，")}
              {renderContactChild("../assets/second_icon/qqLink.png","孙老师",true,"离线","更新了说说")}
            </List>
          </Accordion.Panel>
          <Accordion.Panel header={<span style={{ fontSize: "16px" }}>我的好友</span>}>
            <List>
              <List.Item>content 1</List.Item>
              <List.Item>content 2</List.Item>
              <List.Item>content 3</List.Item>
            </List>
          </Accordion.Panel>
          <Accordion.Panel header={<span style={{ fontSize: "16px" }}>朋友</span>}>
            <List>
              <List.Item>content 1</List.Item>
              <List.Item>content 2</List.Item>
              <List.Item>content 3</List.Item>
            </List>
          </Accordion.Panel>
          <Accordion.Panel header={<span style={{ fontSize: "16px" }}>家人</span>}>
            <List>
              <List.Item>content 1</List.Item>
              <List.Item>content 2</List.Item>
              <List.Item>content 3</List.Item>
            </List>
          </Accordion.Panel>
        </Accordion>
    </>
}

function getMapMarkerCurrentAddress(dispatch, point){
  const { BMap } = window
  var geoc = new BMap.Geocoder();
  geoc.getLocation(point, function(rs){
    
    dispatch({ type: "lyy/changeMarkerCurrentAddressState" , data:{markerCurrentAddress: rs.address}})
  });
}

// function renderMapControl(){
    
//     const { BMap, BMAP_STATUS_SUCCESS } = window

//     var map = new BMap.Map("mapdiv");
//     // 创建地图实例  
//     var point = new BMap.Point(121.53, 31.22);
//     // 创建点坐标  
//     map.centerAndZoom(point, 15);
//     // 初始化地图，设置中心点坐标和地图级别
//     map.addControl(new BMap.NavigationControl()); // 导航控制
//     map.addControl(new BMap.ScaleControl()); // 规模控制
//     map.addControl(new BMap.OverviewMapControl()); // 概述地图控制
//     map.addControl(new BMap.MapTypeControl()); // 地图类型控制
//     map.setCurrentCity("上海"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
//     var mapStyle={  style : "midnight" }   // 设置地图样式
//     map.setMapStyle(mapStyle);
//     map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
// }

function getGPSLocation(dispatch){

  const { BMap, BMAP_STATUS_SUCCESS } = window

  let geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition(function(r){
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
      const point= {lng: r.point.lng , lat: r.point.lat}
      console.log('您的位置：'+r.point.lng+','+r.point.lat);
      dispatch({ type: "lyy/changeCurrentPointState" , data:{point: point}})
    }
    else {
      console.log('failed'+this.getStatus());
    }        
  });
}

function IndexPage({location, dispatch, lyy}) {
  const { BMAP_ANCHOR_TOP_LEFT, BMAP_ANCHOR_TOP_RIGHT, 
    BMAP_ANCHOR_BOTTOM_LEFT, BMAP_ANCHOR_BOTTOM_RIGHT, 
    BMAP_MAPTYPE_CONTROL_MAP, BMAP_NAVIGATION_CONTROL_SMALL} = window

  // console.log(location,dispatch,lyy)
  return <>
    <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={false}
      >
        <TabBar.Item
            title="地图"
            key="map"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
            }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
            }}
            />
            }
            selected={ lyy.tabBarChoice === 1 } // 是否选择首页
            badge={"hot"}
            onPress={() => {
              dispatch({ type: "lyy/changeTabBarChoice", data: { tabBarChoice: 1 } })
            }}
          >
              {renderHeader("首页")}
              {renderNoticeBar(dispatch,"注意：此地图调用Google Maps API接口，在地图上，您可以查询到达目的地最优路线，并提供相应交通工具的服务")}
              {/* <WhiteSpace /> */}
              {/* {renderCarousel()} */}
              {/* <WhiteSpace /> */}
              {/* {getGPSLocation(dispatch)} */}
              {
                <div style={lyy.noticeBarState? { height:'86%' } : { height:'92%' } }>
                    <Map  center={{lng: 121.611425, lat: 31.184133}}
                          // mapStyle={simpleMapStyle}
                          zoom="20"
                          style={{height: '100%',width:'100%'}}
                          enableDragging={true} // 启用地图拖拽，默认启用
                          enableScrollWheelZoom={true}  // 启用滚轮放大缩小，默认禁用
                          enableDoubleClickZoom={true}  // 启用双击放大，默认启用
                          enableKeyboard={true}  // 启用键盘操作，默认禁用。键盘的上、下、左、右键可连续移动地图。
                          enableInertialDragging={true} // 启用地图惯性拖拽，默认禁用
                          enableContinuousZoom={true} // 	启用连续缩放效果，默认禁用
                          enablePinchToZoom={true}  // 启用双指操作缩放，默认启用
                          enableAutoResize={true} // 启用自动适应容器尺寸变化，默认启用

                          >
                      <Marker 
                          enableClicking={true} // 是否响应点击事件。默认为true
                          position={lyy.point} // 设置标注的地理坐标
                          icon={'loc_red'} // 可配置一些我们事先配置好的icon样式，'simple_red','simple_blue','loc_red','loc_blue','start','end', 'number1', 'number2', ``` 'number10',或者可以自定义icon
                          // title={"你好"}
                          // text={"标签"}
                          rotation={0}  // 图标偏移的角度
                          shadow={'loc_red'} // 设置标注阴影图标
                          enableDragging={true}  // 启动拖拽
                          raiseOnDrag={true} // 拖拽标注时，标注是否开启离开地图表面效果。默认为false
                          draggingCursor={'move'} // 拖拽图标是显示的光标，默认，参考http://www.w3school.com.cn/cssref/pr_class_cursor.asp
                          events={
                              {
                                click:()=>{
                                    dispatch({ type: "lyy/changeInfoWindowState" , data:{infoWindowState:lyy.infoWindowState}})
                                },
                                dragend:(e)=>{
                                  dispatch({ type: "lyy/changeInfoWindowState" , data:{infoWindowState:false}})
                                  dispatch({ type: "lyy/changeCurrentPointState" , data:{point:e.point}})
                                  getMapMarkerCurrentAddress(dispatch, e.point)
                              }
                            }
                          }
                        />
                      <NavigationControl 
                        anchor={BMAP_ANCHOR_BOTTOM_RIGHT}
                        offset={{width: 3, height: 3}}
                        type={BMAP_NAVIGATION_CONTROL_SMALL}
                        />
                      <MapTypeControl 
                        offset={{width: 0, height: 0}}
                        anchor={BMAP_ANCHOR_TOP_RIGHT}
                        type={BMAP_MAPTYPE_CONTROL_MAP}
                        />
                      <OverviewMapControl 
                        anchor={BMAP_ANCHOR_TOP_LEFT}
                        isOpen={false}
                        />
                      
                      <TrafficLayer />
                      { lyy.infoWindowState? <InfoWindow 
                                  position={lyy.point}
                                  title="地址："
                                  text={lyy.markerCurrentAddress}
                                  offset={{width: 8, height: -12}}
                                  /> : ''}
                  </Map>
                </div>
              }

        </TabBar.Item>

        <TabBar.Item
          icon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
            }}
            />
          }
          selectedIcon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
            }}
            />
          }
          title="消息"
          key="xiaoxi"
          badge={100}
          selected={lyy.tabBarChoice === 2} // 是否选择好友
          onPress={() => {
            dispatch({ type: "lyy/changeTabBarChoice", data: { tabBarChoice: 2 } })
          }}
        // data-seed="logId1"
        >
          {renderHeader("消息")}

          {/*
            组件List列表：
              单个连续模块垂直排列，显示当前的内容、状态和可进行的操作。eg：联系人列表
              当你需要一个 infinite scroll 列表时，请使用 ListView。
            子组件List.Item：
              wrap：是否换行，默认情况下，文字超长会被隐藏，默认（false）不换行
              extra：右边内容，类型string
              thumb：缩略图(当为 string 类型时作为 img src)，类型String/React.Element
              arrow：箭头方向(右,上,下), 可选horizontal,up,down,empty，如果是empty则存在对应的dom,但是不显示
              align：子元素垂直对齐，可选top,middle,bottom
              multipleLine：多行，默认值false
            子组件List.Item.Brief：辅助说明
         */}
          <SearchBar placeholder="搜索" />
          <List>
            <List.Item
              thumb={<div style={{ backgroundImage: "url(../assets/second_icon/bitech.jpg)", width: "50px", height: "50px", borderRadius: "50%" }}></div>}
              extra={
                <div>
                  <div style={{ fontSize: "1px" }}>11:15</div>
                  <Badge overflowCount={99} text={100} />
                </div>
              }
            >
              <span style={{ fontSize: "16px" }}>瑞谷拜特</span>
              <List.Item.Brief>
                <span style={{ fontSize: "1px" }}>
                  @全体成员 共享平台已经切换成功，登录地址 http://oa.bitech.cn。目前共享平台可访问的系统有：oa、禅道、售前支持文档、内部论坛、外部邮件、相册等，支持单点登录的系统有：oa、售前支持文档。登录账号为新oa账号  密码为新oa密码，请各位小主知悉！
                </span>
                <Badge text={'促'} />
              </List.Item.Brief>
            </List.Item>

            <List.Item
              thumb={<div style={{ backgroundImage: "url(../assets/second_icon/qq.png)", width: "50px", height: "50px", borderRadius: "50%" }}></div>}
              extra={
                <div>
                  <div style={{ fontSize: "1px" }}>10:59</div>
                  <Badge overflowCount={99} text={6} />
                </div>
              }
            >
              <span style={{ fontSize: "16px" }}>梁宇宇</span>
              <List.Item.Brief>
                <span style={{ fontSize: "1px" }}>
                  今晚吃什么？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
                </span>
              </List.Item.Brief>
            </List.Item>

            <List.Item
              thumb={<div style={{ backgroundImage: "url(../assets/second_icon/qqLink.png)", width: "50px", height: "50px", borderRadius: "50%" }}></div>}
              extra={
                <div>
                  <div style={{ fontSize: "1px" }}>10:30</div>
                  <Badge overflowCount={99} text={8} />
                </div>
              }
            >
              <span style={{ fontSize: "16px" }}>我的其他QQ账号</span>
              <List.Item.Brief>
                <span style={{ fontSize: "1px" }}>
                  风：[图片]
                </span>
              </List.Item.Brief>
            </List.Item>

            <List.Item
              thumb={<div style={{ backgroundImage: "url(../assets/second_icon/qq.png)", width: "50px", height: "50px", borderRadius: "50%" }}></div>}
              extra={
                <div>
                  <div style={{ fontSize: "1px" }}>昨天</div>
                  <Badge overflowCount={99} text={18} />
                </div>
              }
            >
              <span style={{ fontSize: "16px" }}>闲聊小队</span>
              <List.Item.Brief>
                <span style={{ fontSize: "1px" }}>
                  今晚吃什么？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
                </span>
              </List.Item.Brief>
            </List.Item>

            <List.Item
              thumb={<div style={{ backgroundImage: "url(../assets/second_icon/qq.png)", width: "50px", height: "50px", borderRadius: "50%" }}></div>}
              extra={
                <div>
                  <div style={{ fontSize: "1px" }}>昨天</div>
                </div>
              }
            >
              <span style={{ fontSize: "16px" }}>王倩倩</span>
              <List.Item.Brief>
                <span style={{ fontSize: "1px" }}>
                  今晚吃什么？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
                </span>
              </List.Item.Brief>
            </List.Item>
          </List>
        </TabBar.Item>



        <TabBar.Item
          icon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
            }}
            />
          }
          selectedIcon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
            }}
            />
          }
          title="联系人"
          key="lianxiren"
          badge={2}
          selected={lyy.tabBarChoice === 3} // 是否选择朋友
          onPress={() => {
            dispatch({ type: "lyy/changeTabBarChoice", data: { tabBarChoice: 3 } })
          }}
        >
          {renderHeader("联系人")}
          {renderNoticeBar(dispatch,"注意：此地图调用Google Maps API接口，在地图上，您可以查询到达目的地最优路线，并提供相应交通工具的服务")}
          {renderContact()}
        </TabBar.Item>

        <TabBar.Item
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
          title="我"
          key="my"
          dot
          selected={lyy.tabBarChoice === 4} // 是否选择我
          onPress={() => {
            dispatch({ type: "lyy/changeTabBarChoice", data: { tabBarChoice: 4 } })
          }}
        >
          {renderHeader("我的")}
          {renderNoticeBar(dispatch,"注意：此地图调用Google Maps API接口，在地图上，您可以查询到达目的地最优路线，并提供相应交通工具的服务")}

        </TabBar.Item>
      </TabBar>
  </>
}

// const App = (props) => ({});

// IndexPage.propTypes = {
//   lyy:PropTypes
// };

function mapStateToProps({lyy}) {// 获取state
  return { lyy };
} 

export default connect(mapStateToProps)(IndexPage);
