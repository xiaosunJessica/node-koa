# 学习 vue3

1. 初始化 npm init vue@latest

2. scss 使用 npm i sass

3. Elmenet-ui 不可以，需要使用 element-plus

4. script setup 含有 export default 效果，不能嵌套使用

5. ref 的使用，ref.value 类似 react 中的 ref.current

6. el-popover 的效果，是需要将 template 上加 popover 属性

7. watch, 第一个变量，第二个是改变执行函数，第三个接收参数，immediate 会直接先执行函数
   watch(store.state.editor, (value, oldValue) => {
   try {
   reloadProcess(value, oldValue);
   } catch (e) {
   console.log(e, '----eee----eee')
   }
   }, {immediate: true, deep: true})

8. getCurrentInstance 获取当前组件实例，类似 this 的功能
