# autoimgsizes ([中文](https://github.com/ZacksTsang/autoimgsizes/blob/master/Chinese_README.md))
Base on qiniu cdn, use API of qiniu to show image the best size on container.  

## Usage
```
bower install autoimgsizes
```

import `autoimgsizes.min.js` 

- requirejs 
	
	```
	require(["./autoimgsizes"],function(){
		
	})
	```
	
- script 

	```
    <script type="text/javascript" src="autoimgsizes.js"></script>
	```

Then on `img` add `class`:`autoImgSizes` , `data-src`: url of image on qiniu, `data-origin-size`:image size widthxheight

### Example

- Size of parent 

	```
	<div>
		<img class="autoImgSizes" src="" data-src="http://xxxxxx.png" data-origin-size="300x300"/>
	</div>
	```
- Scale by image size

	```
	<div>
		<img class="autoImgSizes" src="" data-src="http://xxxxxx.png" data-origin-size="300x300" data-auto="auto"/>
	</div>
	```
	

## Attributes
autoImgSizeConfig：

- `srcAttr` value: `data-src`
- `autoAttr` value: `data-auto`
- `originSizeAttr` value `data-origin-size`
- `autoImgClass` value `autoImgSizes`

Want to redefine the attribute value，for change `autoImgSizes` to `imgSizes`, just like blow:

```
<script type="text/javascript">
	window.autoImgSizeConfig = window.autoImgSizeConfig || {};
	window.autoImgSizeConfig.autoImgClass = "imgSizes";
</script>
```
