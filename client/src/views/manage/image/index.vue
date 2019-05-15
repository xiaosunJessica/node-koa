<template>
  <div>
		<img :src="img" alt="" />
		<input 
			class="syq-upload" 
			type="file" 
			ref="input" 
			@change="handleChange"
			multiple="true"
			accept="image/*" />
	</div>
</template>

<script>
import {fileToImage, imageToCanvas} from 'syq-image-compression';
import defaultImg from "../../../assets/logo.png";
export default {
	data: () => {
		return {
			img: defaultImg
		}
	},
	methods: {
		handleChange: (e) => {
			console.info(this, 'this---')
			fileToImage(e.target.files[0])
				.then((imgObj) => imageToCanvas(imgObj))
				.then((canvas) => {
					console.info(canvas, '----canvas---')
				})
		}
	},
}
</script>




