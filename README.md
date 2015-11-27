# autoimgsizes
基于七牛图片的最佳展示，对于存储在七牛CDN上的图片，利用其现有的 API 对图片的展示进行最优展示处理。

## 用法
```
bower install autoimgsizes
```

导入 `autoimgsizes.js` 

- requirejs 方式
	
	```
	require(["./autoimgsizes"],function(){
		
	})
	```
	
- script 方式

	```
    <script type="text/javascript" src="autoimgsizes.js"></script>
	```

然后在 `img` 元素上添加 `class` 为 `autoImgSizes`，属性 `data-src` 原始图片路径、`data-origin-size` 原始图片大小、 `data-auto` 是否按原图等比例缩放，没有时则是图片父容器的大小

### 例子

- 根据父类容器大小 

	```
	<div>
		<img class="autoImgSizes" src="" data-src="http://xxxxxx.png" data-origin-size="300x300"/>
	</div>
	```
- 更具图片比例

	```
	<div>
		<img class="autoImgSizes" src="" data-src="http://xxxxxx.png" data-origin-size="300x300" data-auto="auto"/>
	</div>
	```
	

## 属性设置
图片自适应的 autoImgSizeConfig：

- `srcAttr` value: `data-src`
- `autoAttr` value: `data-auto`
- `originSizeAttr` value `data-origin-size`
- `autoImgClass` value `autoImgSizes`

更改已定义的值，例如需要更改 `autoImgSizes` 为 `imgSizes`，则需要在页面上加以下代码即可：（注：其他属性的更改同理）

```
<script type="text/javascript">
	window.autoImgSizeConfig = window.autoImgSizeConfig || {};
	window.autoImgSizeConfig.autoImgClass = "imgSizes";
</script>
```
