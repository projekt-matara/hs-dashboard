<template lang="jade">
header(class="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600")
	.mdl-layout__header-row
		span.mdl-layout-title {{title}}
		.mdl-layout-spacer
		.mdl-textfield.mdl-js-textfield.mdl-textfield--expandable
				label(class="mdl-textfield__label", for="search")
			button(class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon", id="hdrbtn")
				i.material-icons more_vert
			ul(class="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="hdrbtn")
				li.mdl-menu__item About
				li.mdl-menu__item Contact
				li.mdl-menu__item Legal Information
</template>

<script>
export default {
	props: ['title']
}
</script>
