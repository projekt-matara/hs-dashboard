<template lang="jade">
.mdl-cell--4-col
	.mdl-card.mdl-shadow--2dp.card-size.plugin_link
		.mdl-card__title
			.mdl-card__title-text {{name}}
		.mdl-card__media
			a(v-bind:href="link")
				img(v-bind:src="image", alt="image")
		.mdl-card__supporting-text
			{{description}}
</template>

<script>
export default {
	props: [
		'name',
		'link',
		'image',
		'description'
	]
}
</script>
