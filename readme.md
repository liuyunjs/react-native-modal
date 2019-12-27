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

## 组件 Props

---

### ModalView

_Modal 组件是对此组件的封装_

| 名称                    |     默认值     |                                     类型                                      | 描述                                     |
| ----------------------- | :------------: | :---------------------------------------------------------------------------: | :--------------------------------------- |
| visible                 |      true      |                                    boolean                                    | 模态框显示隐藏                           |
| onChange                |       -        |                           (visible: boolean) => any                           | 模态框状态已经改变时调用的回调           |
| onWillChange            |       -        |                           (visible: boolean) => any                           | 模态框状态将要改变时调用的回调           |
| animationIn             |  _slideInUp_   | [react-native-animatable](https://github.com/oblador/react-native-animatable) | 进场动画                                 |
| animationOut            | _slideOutDown_ | [react-native-animatable](https://github.com/oblador/react-native-animatable) | 出场动画                                 |
| animationInTiming       |     _300_      |                                    number                                     | 进场动画时间                             |
| animationOutTiming      |     _300_      |                                    number                                     | 出场动画时间                             |
| maskAnimationInTiming   |     _300_      |                                    number                                     | 遮罩进场动画时间                         |
| maskAnimationOutTiming  |     _300_      |                                    number                                     | 遮罩出场动画时间                         |
| mask                    |     _true_     |                                    boolean                                    | 是否渲染遮罩                             |
| maskCloseable           |     _true_     |                                    boolean                                    | 遮罩是否可点击关闭                       |
| maskBackgroundColor     |     _#000_     |                                    string                                     | 遮罩背景颜色                             |
| style                   |       -        |                                   ViewStyle                                   | 容器样式                                 |
| useNativeDriver         |     _true_     |                                    boolean                                    | 是否使用原生动画                         |
| avoidKeyboard           |    _false_     |                                    boolean                                    | 是否响应键盘弹出收起时，自动推动内容位置 |
| keyboardDismissWillHide |    _false_     |                                    boolean                                    | 在模态框关闭的时候收起键盘               |
| verticalLayout          |       -        |                            'center' 'top' 'bottom'                            | 垂直方向内容位置 上 中 下                |
| horizontalLayout        |       -        |                            'center' 'left' 'right'                            | 水平方向内容位置 左中右                  |
| children                |       -        |                              React.ReactElement                               | 要展示的组件                             |

---

### Modal

_创建一个模态框_

| 名称       | 默认值 |  类型   | 描述                                                         |
| ---------- | :----: | :-----: | :----------------------------------------------------------- |
| fullScreen |  true  | boolean | 是否全屏展示，全屏展示时在根节点创建元素，否则在父元素下创建 |

**其余同 ModalView**

---

### ModalProvider

_提供一个根节点，必须包裹在组件外层_

| 名称     | 默认值 |        类型        | 描述                 |
| -------- | :----: | :----------------: | :------------------- |
| children |   -    | React.ReactElement | React.ReactElement[] | 子组件 |

**从 react-native-portal-view 导入，如果使用了 react-native-portal-view，请不要重复使用**

## 方法

### createModal

_创建一个 Modal 组件_

```
    createModal: () => {
        Modal,
        portal, // 查看下方 portal
    }
```

## 其余导出

### portal

_静态方法集合，可用来创建、更新、隐藏 Modal_
