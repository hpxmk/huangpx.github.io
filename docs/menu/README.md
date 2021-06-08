## 包含左侧菜单可伸缩顶部叶子菜单的菜单组件

### 使用方式 main.js 引用 文件放置 views 文件中

npm install menu-main
import menuMain from 'menu-main'
Vue.use(menuMain)

### 创建自己的主组件

### menu-man Attributes 菜单数据格式

| 参数           | 说明             | 类型   | 可选值    | 默认值 |
| -------------- | ---------------- | ------ | --------- | ------ |
| menuHeaderName | 菜单左侧顶部标题 | String |           |        |
| slot           | 菜单顶部右侧插槽 |        | headTitle |        |

### 例句 views/layout/index.vue

```
<menuMain :menuHeaderName="'视频云平台'">
    <template slot="headTitle">
    </template>
  </menuMain>
</template>
```

### 创建菜单配置 router/index.js(main.js 引用的文件)

```

import mainRouter from 'menu-main/lib/router/router' //创建主路由对象
const $mainRouter = mainRouter(VueRouter, Vue,option)

```

| 参数      | 说明       | 类型   | 可选值 | 默认值 |
| --------- | ---------- | ------ | ------ | ------ |
| VueRouter | 路由       | Vue    |        |        |
| Vue       | vue        | Vue    |        |        |
| option    | 主应用配置 | Object | 见下文 |        |

### option 参数

| 参数      | 说明                       | 类型   | 可选值 | 默认值 |
| --------- | -------------------------- | ------ | ------ | ------ |
| url       | 主应用路由字段             | String |        |        |
| name      | 主应用名称字段             | String |        |        |
| path      | 主应用文件路径 字段        | String |        |        |
| component | 主应用文件引用真实路径字段 | file   |        |        |

### 路由 mainRouter 事件

```
  $mainRouter.getRoutes(menu,config)
```

| 参数      | 说明           | 类型 | 可选值 | 默认值 |
| --------- | -------------- | ---- | ------ | ------ |
| getRoutes | 获取主应用路由 | [{}] | 见下文 |        |

### getRoutes 参数

| 参数   | 说明         | 类型   | 可选值           | 默认值 |
| ------ | ------------ | ------ | ---------------- | ------ |
| menu   | 菜单数据     | [{}]   | 详见 option 参数 |        |
| config | 菜单数据动态 | Object | 见下文           |        |

### config 参数

| 参数      | 说明             | 类型                | 可选值             | 默认值    |
| --------- | ---------------- | ------------------- | ------------------ | --------- |
| label     | 菜单名称         | String              |                    | name      |
| path      | 菜单路径字段     | Sting               |                    | path      |
| icon      | 菜单图标         | css 选择器/图片路径 |                    | icon      |
| children  | 菜单子节点字段   | Array               |                    | children  |
| meta      | 菜单额外字段     | Object              | 详见下文 meta 参数 | meta      |
| component | 菜单具体路径字段 | file                |                    | component |

### 路由具体配置例句

```
const $mainRouter = new mainRouter(VueRouter, Vue, {
  url: "/index",
  name: "/index",
  path: "/iframe/index",
  component: (resolve) => require([`@/views/layout/index.vue`], resolve),
});
let array = [].concat(staticRouter.childrenRouter, [])
const routes: Array<RouteConfig> = [
  ...staticRouter.mainRouter,
  ...$mainRouter.getRoutes(array, {
        label: 'label',
    }), //传静态菜单数据
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});
```

### 菜单具体数据

| 参数      | 说明                                      | 类型                                | 可选值 | 默认值 |
| --------- | ----------------------------------------- | ----------------------------------- | ------ | ------ |
| path      | qiankun 子应用路由地址                    | String                              |        |        |
| meta      | 是否为静态路由以及 qiankun 路由           | Object                              | 见下文 |        |
| name      | 菜单名称                                  | String                              |        |        |
| icon      | 菜单图标                                  | 字体图标/图片的具体地址/图片 base64 |        |        |
| path      | 菜单路径                                  | String                              |        |        |
| component | 菜单组件路径                              | 不可为空 (微前端不可填写)           |        |        |
| children  | 子节点（参数与该表格一致） 该字段不能忽略 | Array                               |        |        |

### meta 参数

| 参数     | 说明               | 类型   | 可选值     | 默认值 |
| -------- | ------------------ | ------ | ---------- | ------ |
| isMicro  | 是否为微前端路由   | Boolen | true/false |        |
| isStatic | 是否为静态前端路由 | Boolen | true/false |        |
| isHidden | 是否展示在菜单中   | Boolen | true/false |        |

### 菜单具体数据格式

```
const childrenRouter: any = [
    {
        path: '/app-vue',
        label: '子应用2',
        meta: {
            isMicro: true,
        },
        children: [],
    },
    {
        path: '/workbench/index',
        label: '工作台',
        component: (resolve) => require([`@e/views/workbench/index.vue`], resolve),
        children: [
            {
                path: '/notice/index',
                label: '代办',
                meta: {
                    isHidden: true,
                },
                component: (resolve) => require([`@e/views/notice/index.vue`], resolve),
                children: [
                    {
                        path: '/site/index',
                        meta: {
                            isHidden: true,
                        },
                        component: (resolve) => require([`@e/views/site/index.vue`], resolve),
                        label: '站点跳转',
                        children: [],
                    },
                ],
            },
        ],
    },
]
const mainRouter = [
    {
        path: '/',
        name: 'login',
        component: (resolve) => require(['@e/views//login/index.vue'], resolve),
    },
]
export default {
    mainRouter: mainRouter,
    childrenRouter: childrenRouter,
}

```

### 项目路由文件例句

```

import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import menu from '@/views/iframe/api/menu.js' //菜单动态数据
import staticRouter from './staticRouter' //菜单静态路由
Vue.use(VueRouter)
const $mainRouter = new mainRouter(VueRouter, Vue, {
  url: "/index",
  name: "/index",
  path: "/layout/index",
  component: (resolve) => require([`@/views/layout/index.vue`], resolve),
});
let array = [].concat(staticRouter.childrenRouter, [])
const routes: Array<RouteConfig> = [
  ...staticRouter.mainRouter,
  ...$mainRouter.getRoutes(array, {
        label: 'label',
    }), //传静态菜单数据
];

const router = new VueRouter({
mode: 'hash',
base: process.env.BASE_URL,
routes,
})

export default router

```

## 菜单顶部右侧额外数据

```

<menuMain :menuHeaderName="'视频云平台'">
        <template slot="headTitle">
            <span class="sc_head-title">欢迎</span>
        </template>
    </menuMain>
<script lang="ts">
</script>

```
