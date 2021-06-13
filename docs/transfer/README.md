<!-- # element-date

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader). -->

## 基于 element-ui 左侧树右侧数组穿梭框

### 使用方式

import proElement from "pro-element";
Vue.use(proElement);

### 基础用法

```
<template>
    <div>
       <pro-asyn-tree-transfer
        ref="tree"
        :props="defaultProps"
        :data="datas"
     ></pro-asyn-tree-transfer>
    </div>
</template>
<script>
export default {
  data() {
    return {
      defaultProps: {
        label: "label",
        children: "children",
      },
      datas: [
        {
          id: 1,
          parentId: 0,
          label: "一级 1",
        },
      ]
    };
  }
};
</script>
```

### 内置接口懒加载用法

```
<template>
    <div>
       <pro-asyn-tree-transfer
        ref="tree"
        :props="defaultProps"
        lazy
        :request="request"
     ></pro-asyn-tree-transfer>
    </div>
</template>
<script>
export default {
  data() {
    return {
      defaultProps: {
        label: "label",
        children: "children",
      }
    };
  },
  methods: {
    request: {
        nodeId: "node",
        url: "http://localhost:80/getTree",
        res: {
          userId: 1,
        },
        req: "data",
    },
  },
};
</script>
```

### 外置懒加载用法

```
<template>
    <div>
       <pro-asyn-tree-transfer
        ref="tree"
        :props="defaultProps"
        lazy
        :httpRequest="httpRequest"
     ></pro-asyn-tree-transfer>
    </div>
</template>
<script>
export default {
  data() {
    return {
      defaultProps: {
        label: "label",
        children: "children",
      },
       httpRequest: function(node, resolve) {
        return new Promise((res, rej) => {
          if (node.level == 0) {
            axios.get("http://localhost:80/getTree").then((resp) => {
              let _data = resp.data.data;

              res(_data);
            });
          } else {
            axios.get("http://localhost:80/getTree").then((resp) => {
              let _data = resp.data.data;

              res(_data);
            });
          }
        });
      },
    };
  },
  methods: {

  },
};
</script>
```

### 默认勾选节点

```
<template>
    <div>
       <pro-asyn-tree-transfer
        ref="tree"
        :props="defaultProps"
        :data="datas"
        :defaultCheckedKeys="[2]"
     ></pro-asyn-tree-transfer>
    </div>
</template>
<script>
export default {
  data() {
    return {
      defaultProps: {
        label: "label",
        children: "children",
      },
      datas: [
        {
          id: 1,
          parentId: 0,
          label: "一级 1",
        },
      ]
    };
  }
};
</script>
```

### 自定义渲染节点

```
<template>
    <div>
       <pro-asyn-tree-transfer
        ref="tree"
        :props="defaultProps"
        :data="datas"
        :defaultCheckedKeys="[2]"
        :renderContent="renderContent"
     ></pro-asyn-tree-transfer>
    </div>
</template>
<script>
export default {
  data() {
    return {
      defaultProps: {
        label: "label",
        children: "children",
      },
      datas: [
        {
          id: 1,
          parentId: 0,
          label: "一级 1",
        },
      ]
    };
  },
  methods:{
      renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      );
    },
  }
};
</script>

```

### 展示内置过滤条件

```
<template>
    <div>
       <pro-asyn-tree-transfer
        ref="tree"
        :props="defaultProps"
        :data="datas"
         :filterables="filterables"
     ></pro-asyn-tree-transfer>
    </div>
</template>
<script>
export default {
  data() {
    return {
      filterables: [true, false],
      defaultProps: {
        label: "label",
        children: "children",
      },
      datas: [
        {
          id: 1,
          parentId: 0,
          label: "一级 1",
        },
      ]
    };
  },
  methods:{

    },
};
</script>

```

### 外部过滤

```
<template>
    <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="filterText" placeholder="审批人"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
       <pro-asyn-tree-transfer
        ref="tree"
        :props="defaultProps"
        :data="datas"
        outFilter
        :filterNode="filterNode"
     ></pro-asyn-tree-transfer>
    </div>
</template>
<script>
export default {
  data() {
    return {

      defaultProps: {
        label: "label",
        children: "children",
      },
      datas: [
        {
          id: 1,
          parentId: 0,
          label: "一级 1",
        },
      ],
       formInline: {
        user: "",
        region: "",
      },
      filterText: "",
    };
  },
    watch: {
    filterText(val) {
        this.$refs.tree.filter(val);
    }

  },
  methods:{
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
    },
};
</script>
```

### 内置懒加载外部查询

```
<template>
    <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="filterText" placeholder="审批人"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
       <pro-asyn-tree-transfer
        ref="tree"
        :props="defaultProps"
        :data="datas"
        outFilter
        :filterNode="filterNode"
        :request="request"
     ></pro-asyn-tree-transfer>
    </div>
</template>
<script>
export default {
  data() {
    return {

      defaultProps: {
        label: "label",
        children: "children",
      },
      datas: [
        {
          id: 1,
          parentId: 0,
          label: "一级 1",
        },
      ],
       formInline: {
        user: "",
        region: "",
      },
      filterText: "",
    };
  },
  watch: {},
  methods:{
    search() {
      this.request.res={
        hhh:12
      }
      this.$refs.tree.roladData();
    },

    }
};
</script>
```

### 外置懒加载外部查询

```
<template>
    <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="filterText" placeholder="审批人"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
       <pro-asyn-tree-transfer
        ref="tree"
        :props="defaultProps"
        outFilter
        :filterNode="filterNode"
         :httpRequest="httpRequest"
     ></pro-asyn-tree-transfer>
    </div>
</template>
<script>
export default {
  data() {
    return {

      defaultProps: {
        label: "label",
        children: "children",
      },
       formInline: {
        user: "",
        region: "",
      },
      httpRequest: function(node, resolve) {
        return new Promise((res, rej) => {
          if (node.level == 0) {
            axios.get("http://localhost:80/getTree",{
              params:{hh:1}
            }).then((resp) => {
              let _data = resp.data.data;

              res(_data);
            });
          } else {
            axios.get("http://localhost:80/getTree").then((resp) => {
              let _data = resp.data.data;

              res(_data);
            });
          }
        });
      },
    };
  },
  watch: {},
  methods:{
    search() {
      this.$refs.tree.roladData();
    },

    }
};
</script>
```

### 数据格式 Attributes

| 参数               | 说明                                          | 类型                              | 可选值 | 默认值        |
| ------------------ | --------------------------------------------- | --------------------------------- | ------ | ------------- |
| data               | 展示数据                                      | Array                             | -      | -             |
| props              | 配置选项，具体看下表                          | Object                            | -      | -             |
| defaultCheckedKeys | 默认勾选的节点的 key 的数组                   | Array                             | -      | -             |
| renderContent      | 树节点的内容区的渲染 Function                 | Function(h, { node, data, store } | -      | -             |
| lazy               | 开启懒加载                                    | Boolean                           | -      | false         |
| request            | 接口请求对象,配置选项，具体看下表 (lazy=true) | Object                            | -      | -             |
| filterables        | 显示内置过滤表单                              | Array                             | -      | [false,false] |
| placeholder        | 对树节点进行筛选的 placeholder 属性           | Sring                             | -      |               |
| outFilter          | 对树节点进行执行外部过滤                      | Boolean                           | -      | false         |

### props

| 参数      | 说明                                         | 类型    | 可选值 | 默认值 |
| --------- | -------------------------------------------- | ------- | ------ | ------ |
| label     | 指定节点标签为节点对象的某个属性值           | String  |        |        |
| key       | 指定节点 id 为节点对象的某个属性值           | String  |        |        |
| parentKey | 指定节点父 id 为节点对象的某个属性值         | String  |        |        |
| disabled  | 指定节点选择框是否禁用为节点对象的某个属性值 | Boolean |        |        |
| children  | 指定子树为节点对象的某个属性值               | Strng   |        |        |

### request （仅支持 get 请求）

| 参数   | 说明                               | 类型   | 可选值 | 默认值 |
| ------ | ---------------------------------- | ------ | ------ | ------ |
| nodeId | 接口按需加载子节点传值父节点字段名 | Object |        |        |
| url    | 接口名                             | String |        |        |
| res    | 接口请求参数                       | Object |        |        |
| req    | 接口返回参数解析                   | Strng  |        |        |

### 方法

| 参数        | 说明                                      | 类型                    | 可选值 | 默认值 |
| ----------- | ----------------------------------------- | ----------------------- | ------ | ------ |
| roladData   | 重新加载节点                              | Function                |        |        |
| filterNode  | 对树节点进行执行外部过滤( outFilter=true) | Function(value, data)   | -      |        |
| httpRequest | 自定义接口请求 (lazy=true)                | Function(node, resolve) | -      | -      |

### Events

| 参数        | 说明               | 类型     | 可选值 | 默认值 |
| ----------- | ------------------ | -------- | ------ | ------ |
| checkedList | 节点被穿梭时的回调 | Function |        |        |
