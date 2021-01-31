# mall
## 项目结构划分
```
src
    --assets        用于存放css和img等静态资源文件夹
    --base.css  基本样式文件
        --normalize.css 初始化样式文件
  --common      存放一些公共的js文件，如utils工具类文件
  --components  存放一些公共的vue组件
    --common    和业务无关的组件，可以直接丢到别的项目里用的组件
    --context  和本次项目有关的文件，无法直接放在别的项目里的组件
  --network     存放自己封装的网络请求库
  --router      存放vue-router路由组件
  --store           存放Vuex状态管理文件
  --views           存放大分支Vue视图文件
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
