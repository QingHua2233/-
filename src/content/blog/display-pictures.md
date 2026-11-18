---
draft: true
title: 图片展示
date: 2024-03-21
description: 使用多种布局，展示你喜爱的图片！
tags: [功能]
category: 主题使用
---

### 显示网络图片

```md
![](https://astro-yi.obs.cn-east-3.myhuaweicloud.com/avatar.png)
```

![](https://astro-yi.obs.cn-east-3.myhuaweicloud.com/avatar.png)

### 显示本地图片

```md
![](/avatar.png)
```

![](/avatar.png)

### 自定义本地图片

使用 HTML，并设置 `style="width: 200px;"`。

```html
<img src="/spinner.gif" data-src="/avatar.png" style="width:200px;">
```

<img src="/spinner.gif" data-src="/avatar.png" style="width:200px;">

### 一行两列

```html

<div class="image-cols-2">
  <img src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-photo-8536415.jpeg">
  <img src="/spinner.gif" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-kyle-miller-20582700.jpg">
</div>
```

<div class="image-cols-2">
  <img src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-photo-8536415.jpeg">
  <img src="/spinner.gif" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-kyle-miller-20582700.jpg" >
</div>


使用懒加载时，将 `src` 设置为 `/spinner.gif`，并将图片的真实地址填入 `data-src`。如果不使用懒加载，直接把真实图片地址填入 `src` 即可。

### 一行三列

```html

<div class="image-cols-3">
  <img src="/spinner.gif" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-photo-8536415.jpeg">
  <img src="/spinner.gif" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-kyle-miller-20582700.jpg">
  <img src="/spinner.gif" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-photo-20523844.jpeg">
</div>
```

<div class="image-cols-3">
  <img src="/spinner.gif" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-photo-8536415.jpeg">
  <img src="/spinner.gif" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-kyle-miller-20582700.jpg" >
  <img src="/spinner.gif" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-photo-20523844.jpeg" >
</div>

### 一行四列

```html

<div class="image-cols-4">
  <img src="/spinner.gif" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-photo-8536415.jpeg">
  <img src="/spinner.gif" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-kyle-miller-20582700.jpg">
  <img src="/spinner.gif" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-photo-20523844.jpeg">
  <img src="/spinner.gif" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-photo-8536415.jpeg">
</div>
```

<div class="image-cols-4">
  <img class="object-fill" src="/spinner.gif" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-photo-8536415.jpeg">
  <img class="object-fill" src="/spinner.gif" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-kyle-miller-20582700.jpg" >
  <img class="object-fill" src="/spinner.gif" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-photo-20523844.jpeg" >
  <img src="/spinner.gif" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-photo-8536415.jpeg">
</div>

### 自由组合图片布局

了解一些 Tailwind CSS，就可以按自己的想法组合图片布局。

```html
<div class="image-cols-2">
  <img src="/spinner.gif" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-photo-8536415.jpeg">
  <img class="row-span-2" src="/spinner.gif" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-jeffer-berrire-9027257.jpg">
  <img src="/spinner.gif" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-kyle-miller-20582700.jpg">
</div>
```

<div class="image-cols-2">
<img src="/spinner.gif" class="object-fill" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-photo-8536415.jpeg">
<img class="row-span-2 object-fill" src="/spinner.gif" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-photo-8907866.jpeg">
<img src="/spinner.gif" class="object-fill" data-src="https://astro-yi.obs.cn-east-3.myhuaweicloud.com/pexels-photo-20523844.jpeg">
</div>

### 使用提示

主题提供了三个可以直接使用的布局样式类。

+ 一行两列： `class="image-cols-2"`.
+ 一行三列： `class="image-cols-3"`.
+ 一行四列： `class="image-cols-4"`.

如需更复杂的布局，可以参考 Tailwind CSS。