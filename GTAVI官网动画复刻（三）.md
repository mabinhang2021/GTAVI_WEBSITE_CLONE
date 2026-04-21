# GTAVI官网动画复刻（三）

[TOC]



## 一.新增组件介绍

```
      <FirstVideo />
      <Jason />
      <ShootVideo />
      <NextJason />

      <SecondVideo />
      <Lucia />
      <CarVideo />
      <NextLucia />

      <Hotel />
      <Text/>
```

教程里只教了<SecondVideo/>和<Lucia/>组件。今天的主要精力放在实现 <ShootVideo />和<NextJason />两个组件中。
https://www.rockstargames.com/VI/downloads/artwork-wallpapers
我在官网找到了本项目需要用的所有素材，感谢官方开源。

对比昨天的进度，今天快了一些。如果你观察我写的结构你就会发现前四个组件和第4-8个组件的结构非常相似，在GTA官网的动画中这两组都是以这样的结构发生的。显示一段动画，然后展示人物，再来一段动画，详细介绍人物。这两组的展示方法很多时候是对称的，比如在Jason组件中，主要分为两列，左侧列是文字+小图，右侧列是大图。而在Lucia组件中，还是两列，只是调换了位置，左侧列是大图，右侧列是文字+小图。在NextJason组件中，结构就是一个h1+两列，左侧是文字+大图，右侧是文字+小图。在NextLucia组件中，结构也是非常相似的。所以本文将主要介绍 <ShootVideo />和<NextJason />两个组件。

## 1.1 ShootVideo组件

其实这个组件和上文中介绍过的FirstVideo组件非常相似，只需要替换一些ref名等内容。动画也基本没有变

## 1.2 NextJason组件

**布局结构：**

```
<section className="next-jason">          // 根容器
  ├── <div className="next-jason-title">  // 引言标题区
  │     └── <h1>引言文本</h1>
  └── <div className="grid md:grid-cols-2 gap-20 w-full px-4">  // 双栏网格
        ├── <div className="flex flex-col left-column">  // 左栏
        │     ├── <div className="next-jason-content">   // 副标题
        │     │     └── <h2>Another day in paradise...</h2>
        │     ├── <div className="next-jason-1">        // 图片1
        │     │     └── <img src="/images/jason-5.webp">
        │     └── <div className="next-jason-2">        // 图片2
        │           └── <img src="/images/jason-6.webp">
        └── <div className="flex flex-col">            // 右栏
              ├── <div className="next-jason-text">    // 剧情文字
              │     └── <p>Meeting Lucia could be...</p>
              └── <div className="next-jason-3">       // 图片3
                    └── <img src="/images/jason-4.webp">
```

今天的样式写的并不好，为了还原官网的效果，我大量使用devtools去查看大屏时的各个组件的状态与属性，导致了现在的响应式完全失效了，但介于我们复刻的目的是学习GSAP技术，暂时放下响应式页面的设计。

**GSAP动画：**

```jsx
useGSAP(() => {
    gsap.set(".next-jason", { marginTop: "-100vh" });
    gsap.set(".next-jason-title", {
      x: 500,
      y: -150,
    });
    gsap.set(".next-jason-content", {
      x: 350,
      y: -100,
    });
    gsap.set(".next-jason-text", {
      y: -50,
    });
    
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".next-jason",
          start: "top 90%",
          end: "40% center",
          scrub: 2,
        },
      })
      .to(".shoot-vd", {
        opacity: 0,
        scale: 1,
        duration: 1,
        ease: "power1.inOut",
      })
      .to(
        ".next-jason ",
        {
          scrollTrigger: {
            trigger: ".next-jason",
            start: "top center",
            end: "80% center",
            scrub: 2,
          },
          y: -300,
          duration: 1,
          ease: "power1.inOut",
        },
        "<",
      );
  });
```

由于我的css水平实在太差，所以我使用了大量的set方法让我的动画效果看起来像官网一样。

如果你仔细阅读我的动画，你会发现和前面实现过的动画基本相同，只是根据官网的效果对start end等属性做轻微改动。实在是没有什么技术含量。

## 1.3  Hotel和Text组件

其实这部分应该和下一段Cal Hampton一起介绍的，但这两个组件实在太过简单。

Hotel组件是一张完全的背景图片，加了一点GSAP动画

```jsx
useGSAP(() => {
    gsap.fromTo(
      ".hotel-img",
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 95%, 0 100%)",
        scrollTrigger: {
          trigger: ".hotel-wrapper",
          start: "top 90%",
          end: "top 50%",
          scrub: true,
        },
      }
    );
  }, []);
```

我在查看官网的动画实现效果时，我实在觉得官网根本没有写动画，而是他的设计师对图片做了裁剪。我用GSAP模拟了一个画线的状态。而Text组件只是两列grid布局居中的渐变色文字。
明天将继续实现Cal Hampton部分，这个部分我看到了一个很有趣的动画，暂时没想到布局该怎么写。今天就结束把。