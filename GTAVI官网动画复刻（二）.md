# GTAVI官网动画复刻（二）

# 一.新增组件介绍

```
src/sections/
├── ViceCity.jsx      # 新增
├── FirstVideo.jsx    # 新增
└── Jason.jsx         # 新增
```

## 1.1 viceCity组件

- 在GTAVI官网动画中，结束上次文章中介绍的hero组件后显示了一段文字，然后接上了一段视频。由于教程里没有这段文字动画组件的部分，所以自己写。
- （声明：由于GTAVI官网的动画从下到上圆形扩散的渲染效果没有做出来，就做了一个别的替代品）
- 从GTA官网的devtools偷了两部分的字体大小等css属性，并在google搜索并下载了同款字体（来自https://gta.com.ua/en/file_gta6_details.phtml?id=4），我猜教程的作者应该也是在这个网页上下载了一些资源。
- 在制作完这部分后我理所当然的把vicecity组件添加到app.jsx中，所有的GSAP动画也都写在这一个文件中，然而我再次去到GTA官网查看官方的动画后发现官方的文字部分是接着hero组件的，不是独立的一个100%高度。于是开始合并。

**合并过程中发现问题：ViceCity DOM 存在但页面不可见**
**排查错误过程：（此部分主要由AI指导并编写）**

（一）确认元素存在和位置

```js
document.querySelector('.vice-city-section').getBoundingClientRect()

{
  "x": 0,
  "y": 970.0009765625,  // ← top 在视口下方
  "width": 2560,
  "height": 1246,
  "top": 970.0009765625,
  "bottom": 2216.0009765625,
  "left": 0
}
```

分析： ViceCity 的 top: 970，而视口高度是 1246，说明 ViceCity 只有很小一部分在视口内（底部）。

（二）检查 Hero 的位置

```js
document.querySelector('.hero-section').getBoundingClientRect()
{
  "top": -275.9990234375,
  "bottom": 970.0009765625,  // ← Hero 底部正好是 970
  "height": 1246
}
```

关键发现： Hero 的 bottom: 970，ViceCity 的 top: 970。两者紧贴在一起，但 ViceCity 在 Hero 下方，不在内部

（三）确认 ViceCity 是否是 Hero 的子元素

```js
document.querySelector('.vice-city-section').parentElement.className
 "hero-section"
```

确认： ViceCity 确实是 Hero 的子元素，但它被渲染到了 Hero 外部。

（四）查看 Hero 所有子元素的位置

```js
Array.from(document.querySelector('.hero-section').children).forEach((child, i) => {
  const rect = child.getBoundingClientRect();
  console.log(`[${i}] ${child.className}: top=${rect.top}, height=${rect.height}`);
});

[0] size-full mask-wrapper: top=-276, height=1246
[1] fake-logo-wrapper: top=-84, height=214
[2] entrance-message: top=-276, height=1246
[3] vice-city-section: top=970, height=1246  // ← 超出 Hero 范围！
```

问题显现： ViceCity 的 top: 970，正好等于 Hero 的 bottom。它被"推出"了 Hero 的渲染范围。

（五）检查是否有 CSS 裁剪

```js
console.log('Hero overflow:', window.getComputedStyle(
  document.querySelector('.hero-section')
).overflow);
 "hidden"
```

结论： Hero 有 overflow: hidden，而 ViceCity 超出 Hero 高度范围，被裁剪了。

（六）确认具体数值

```js
const vc = document.querySelector('.vice-city-section');
console.log('VC offsetTop:', vc.offsetTop);
console.log('Hero height:', vc.parentElement.offsetHeight);

VC offsetTop: 1246
Hero height: 1246
```

根本原因确认：

ViceCity 的 offsetTop: 1246 等于Hero 的高度，ViceCity 紧贴在 Hero 的底部边界，而overflow: hidden 把超出的部分完全隐藏

```
问题根源
Hero (h-dvh = 1246px, overflow: hidden)
├── [0] mask-wrapper (top: -276, 1246px)
├── [1] fake-logo-wrapper (top: -84, 214px)
├── [2] entrance-message (top: -276, 1246px)
└── [3] vice-city-section (top: 1246) ← 被裁剪！

offsetTop: 1246 = Hero height: 1246
超出部分被 overflow: hidden 隐藏
```

（七）解决思路
要让 ViceCity 可见，需要让它不受 Hero 固定高度的影响：position: absolute 可以让元素脱离文档流，不受 overflow 裁剪。absolute inset-0 让元素填满父元素
最终方案：

```js
.vice-city-section {
  @apply absolute inset-0 flex flex-col justify-center items-center overflow-hidden;
}
```

这样 ViceCity 覆盖在 Hero 内部，而不是被推出边界。

（八）后续添加了一些过度动画实现了与官网相似的动画结构。

```jsx
.to(".vice-city-same-text", {
	scale: 0.7,
    opacity: 1,
    duration: 1,
    maskImage:
    	"radial-gradient(circle at 50% 100%, black 100%, transparent 100%)",
        ease: "power1.inOut",
	})
    .to(".vice-city-same-text", {
        opacity: 0,
        duration: 0.5,
    });
// 圆心在底部中央 (50% 水平, 100% 底部)
 // 黑色 (100%) 填充内部，透明色显示外部
 // 效果：半圆从下往上逐渐展开
```

## 1.2 FirstVideo组件

- firstvideo组件的结构非常简单，只有section嵌套div嵌套的video元素。重点介绍一下GSAP动画
- 初始使用set方法让video不可见，且处于上方。
- 核心在于保证了视频播放和Timeline同步

```
videoRef.current.onloadedmetadata = () => {
  tl.to(
    videoRef.current,
    {
      currentTime: videoRef.current.duration,  
      ease: "power1.inOut",
      duration: 3,
    },
    "<",  
  );
};
```

`onloadedmetadata`：等待视频元数据加载完成（获取视频时长）

currentTime`：GSAP 控制视频的播放进度（从 0 到视频时长）

## 1.3 Jason组件

组件结构分析：

```
┌─────────────────────────────────────────┐
│  .jason                                 │  ← display: flex
│  flex-direction: row                    │    水平排列两个子元素
├───────────────────┬─────────────────────┤
│  .jason-content   │  .img-box           │
│  flex-direction:  │  flex-direction:    │
│    column (垂直)  │    column (垂直)    │
│                   │                     │
│   ┌───────────┐   │   ┌───────────┐     │
│   │   h1      │   │   │ jason-1  │     │
│   └───────────┘   │   └───────────┘     │
│   ┌───────────┐   │   ┌───────────┐     │
│   │   h2      │   │   │ jason-3  │     │
│   └───────────┘   │   └───────────┘     │
│   ┌───────────┐   │                     │
│   │    p      │   │                     │
│   └───────────┘   │                     │
└───────────────────┴─────────────────────┘
```



教程里的实现结果跟官网不太相似，我猜是怕版权问题哈哈。我在GTAVI官网复制了一些元素属性，最终做到了相似的程度。官网用的是grid布局，而教程里是flex布局，我就在教程的基础上做了一些修改。

总之这不是本文的重点，让我们来看看GSAP中的动画是怎么实现的：

```jsx
useGSAP(() => {
    gsap.set(".jason", { marginTop: "-80vh" });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".jason",
          start: "top 90%",
          end: "10% center",
          scrub: 2,
        },
      })
      .to(".first-vd", {
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
      });

    gsap.to(
      ".jason .img-box",
      {
        scrollTrigger: {
          trigger: ".jason",
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

我们使用了两个动画（共用一个 scrollTrigger）监视 jason section：
1. 初始设置 section 位于屏幕上方（marginTop: -80vh）
2. 滚动触发时，.first-vd 渐隐（上个视频消失）
3. 同时 .img-box 向上移动 300px（图片区域整体上移）
4. 请注意两个动画是同时发生