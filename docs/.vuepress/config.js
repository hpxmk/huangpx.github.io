module.exports = {
  title: "前端组件",
  description: "组件文档",
  head: [],
  host: "127.0.0.1",
  base: "/myDocs/",
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
      { text: "菜单组件", link: "/menu/" },
      { text: "树穿梭框组件", link: "/transfer/" },
    ],
    sidebar: {
      "/menu": [
        {
          title: "菜单组件",
          collapsable: false,
        },
      ],
      "/transfer": [
        {
          title: "树穿梭框组件",
          collapsable: false,
        },
      ],
    },
  },
};
