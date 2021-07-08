# react-native-smart-modal

## 特性

1. javascript 编写，不涉及原生代码
2. 支持 Android 以及 IOS
3. 支持自定义进出场动画
4. 支持多个 Modal 同时存在

## 安装

> npm

```
npm i react-native-smart-modal -S
```

> yarn

```
yarn add react-native-smart-modal
```

## Modal

| 名称                    |          默认值          |                                      类型                                       | 描述                                                         |
| ----------------------- | :----------------------: | :-----------------------------------------------------------------------------: | :----------------------------------------------------------- |
| visible                 |           true           |                                     boolean                                     | 模态框显示隐藏                                               |
| onChange                |            -             |                           (visible: boolean) => void                            | 模态框状态已经改变时调用的回调                               |
| onWillChange            |            -             |                           (visible: boolean) => void                            | 模态框状态将要改变时调用的回调                               |
| animation               | _animations.slideInDown_ | {from: rmotion['from'], animate: rmotion['animate'], exit?: rmotion['animate']} | 进场动画                                                     |
| animationConf           |           _-_            |                                rmotion['config']                                | 出场动画                                                     |
| mask                    |          _true_          |                                     boolean                                     | 是否渲染遮罩                                                 |
| maskCloseable           |          _true_          |                                     boolean                                     | 遮罩是否可点击关闭                                           |
| maskBackgroundColor     |          _#000_          |                                     string                                      | 遮罩背景颜色                                                 |
| style                   |            -             |                                    ViewStyle                                    | 容器样式                                                     |
| avoidKeyboard           |         _false_          |                                     boolean                                     | 是否响应键盘弹出收起时，自动推动内容位置                     |
| keyboardDismissWillHide |         _false_          |                                     boolean                                     | 在模态框关闭的时候收起键盘                                   |
| verticalLayout          |         'bottom'         |                             'center' 'top' 'bottom'                             | 垂直方向内容位置 上 中 下                                    |
| horizontalLayout        |            -             |                             'center' 'left' 'right'                             | 水平方向内容位置 左中右                                      |
| children                |            -             |                               React.ReactElement                                | 要展示的组件                                                 |
| fullScreen              |           true           |                                     boolean                                     | 是否全屏展示，全屏展示时在根节点创建元素，否则在父元素下创建 |
| backHandlerType         |        'reaction'        |                          'none' 'reaction' 'disabled'                           | android 物理返回键的响应策略                                 |

---

## **animations**
