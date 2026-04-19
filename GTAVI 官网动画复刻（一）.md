# GTAVI 官网动画复刻（一）

[TOC]

## 一.项目简介

该项目是来自JSMastery https://jsmastery.com/course/gsap-animations-course。

本文的目的是记录学习过程。

## 二.文件结构与层级

### 2.1简单项目目录结构介绍

```
src/
├── sections/
│   ├── Hero.jsx
│   └── ComingSoon.jsx
|   └── NavBar.jsx
├── App.jsx
└── index.css
constants/
├── index.js
```

声明：constants/index.js 和 src/index.css 都来自JSMastery直接提供的文件，学习目标主要是GSAP动画

- APP.jsx只负责加载NavBar和Hero组件
- Hero组件负责第一个100%页面高度的内容，ComingSoon组件负责第二个100%页面高度的内容，NavBar组件负责加载顶部导航栏，所以的GSAP动画都写在Hero组件中
- index组件负责根据用户的屏幕宽度来判定用户使用设备来实现响应式动画效应
- index.css使用tailwind负责提供css样式


### 2.2组件层级图

```
App
└── Hero (section.hero-section)
    ├── .mask-wrapper (div)
    │   ├── hero-bg.webp (img)
    │   ├── hero-text.webp (img)
    │   ├── watch-trailer.png (img)
    │   └── .play-img (div)
    │       └── play.png (img)
    ├── .fake-logo-wrapper (div)
    │   └── big-hero-text.svg (img)
    └── ComingSoon (section)
        └── .entrance-message (div)
        	└── logo.webp (img)
            └── .text-wrapper(div)
            	└── text(h3)
            └── center div
            	└── ps-logo.svg (img)
            	└── x-logo.svg (img)
```

### 2.3层级与CSS

- 首先介绍.hero-section。 主要作用为占据全屏

- 然后是一个包含四个img的div元素。.mask-wrapper css样式

- ```css
  .mask-wrapper {
    mask-image: url("/images/big-hero-text.svg");
    mask-repeat: no-repeat;
  }
  ```

- 只显示 SVG 形状内的内容，其他部分被裁剪

- img1显示背景图片，屏幕宽度大于768时放大1.25倍，为了之后的动画缩小做准备

- img2显示gta的logo覆盖在背景图上，绝对定位在顶部（为了和下面的LOGO区分，特此说明，此LOGO中auto没有o，为了和背景图完美贴合）

- img3显示一个图片覆盖在背景图上，离底部20px，水平居中

- img4显示一个白色圆形按钮在页面中间，也是覆盖在背景图上

- 接下来的div显示GTA的logo，但是css设置不可见（opacity：0），通过GSAP动画展示。
  到此为止，前100%的页面就结束了（Hero组件的初始状态）

- 让我们来讨论Comingsoon组件，首先还是section的css属性，entrance-message占据全屏

- 然后是带有彩色图案的GTALOGO，我们通过一些css样式固定他，最后是一段渐变的文字和两个LOGO，分别来自PS和XBOX

## 三.GSAP动画

终于我们来到了相对重要的部分，我们先来总结一下在这个阶段我们的动画都包含什么流程：
（1）初始化 -> (2).fade-out元素逐渐淡出 -> (3)背景图片从1.25倍缩小到1倍 -> (4) 笼罩部分从极大缩小 ->
（5）笼罩层消失  ->(6)新的GTA LOGO出现 -> (7)COMINGSOON组件 从中心圆形展开

```jsx
useGSAP(() => {
    gsap.set(".mask-wrapper", {
      maskPosition: initialMaskPos,
      maskSize: initialMaskSize,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        pin: true,
        start: "top top",
        end: "+=200%",
        scrub: 2.5,
      },
    });

    tl.to(".fade-out", { opacity: 0, ease: "power1.inOut" })
      .to(".scale-out", { scale: 1, ease: "power1.inOut" })
      .to(
        ".mask-wrapper",
        {
          maskSize,
          ease: "power1.inOut",
        },
        "<",
      )
      .to(".mask-wrapper", { opacity: 0 })
      .to(".overlay-logo", { opacity: 1 }, "<")
      .to(
        ".entrance-message",
        {
          duration: 1,
          ease: "power1.inOut",
          maskImage:
            "radial-gradient(circle at 50% 0vh,black 50%,transparent 100%)",
        },
        "<",
      );
```

还记得我们之前说过mask-wrapper笼罩下面的内容，所以我们先通过设置maskSize为元素高度的35倍，这样我们就可以看见笼罩的背景图+3个img。下一步我们开始设置timeline，按顺序执行动画，通过scrollTrigger绑定.hero-section来保证下滑前200%高度前背景图都一直存在。然后通过设置opacity：0使img2，3，4都渐渐消失，再使初始缩放倍数为1.25倍的背景图缩回1倍。同时通过改变maskSize为20%（不同设备数值不同），配合opacity为0切换到之前css被设置opacity:0的logo。最后从中心圆形展开comingsoon组件，圆心位置水平居中，垂直0vh，同时圆形内部黑色可见，圆形外部不可见。有趣的设计是hero组件中的最后显示的LOGO被comingsoon展示的LOGO覆盖，使动画看起来非常美观。