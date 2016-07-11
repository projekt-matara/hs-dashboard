<template lang="jade">
.mdl-card.mdl-shadow--2dp.card-size#downloader
		.mdl-card__title.mdl-card--expand
			h4 Download Halfstak
		.mdl-card__actions.mdl-card--border
			a(class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect") Download
			i.material-icons get_app
</template>

<script>
export default {
}
</script>

<style lang="stylus">
#downloader
  background-color indigo_500
  color #fff
  .mdl-card__title
    height 10em
    color #fff
    align-items flex-start
    h4
      margin-top 0
  .mdl-card__actions
    border-color rgba(255, 255, 255, 0.2)
    display flex
    box-sizing border-box
    align-items center
    color #fff
    .material-icons
      padding-right 10px
      color #fff
    a.mdl-button
      color #fff
</style>

<style lang="stylus">
@import '../main.styl'
</style>
