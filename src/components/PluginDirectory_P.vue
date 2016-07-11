<template lang="jade">
Topbar(title="Plugin Directory")
Navbar
main.mdl-layout__content.mdl-color--grey-100
  .mdl-grid.demo-content
    #plugin_directory
      .headliner
        h1 Plugin Directory
          p Here is a catered list of plugins that are confirmed to work with Halfstak and run on both Windows and Mac. We know there are many out there so we focused on a few key favorites of ours. Stay tuned as more will be added here. Click the names of any plugin to be directed to their download page. Remember, if you're given the choice, always download and install the VST version. Halfstak reads VST only.
      .mdl-tabs.mdl-js-tabs.mdl-js-ripple-effect
        .mdl-tabs__tab-bar
          a.mdl-tabs__tab.is-active(href='#free-panel', @click="stopLink('stop', $event)") Free
          a.mdl-tabs__tab(href='#paid-panel', @click="stopLink('stop', $event)") Paid
        #free-panel.mdl-tabs__panel.is-active
          .mdl-grid
            // Amp Sims
            .mdl-cell--12-col
              h3.light.center.nudge_down Amp Simulation
            plugin-link(v-for="item in free.ampSim",  
                        :name="item.name", 
                        :description="item.description", 
                        :image="item.image", 
                        :link="item.link")
              
            // Cab IR Loader
            .mdl-cell--12-col
              h3.light.center.nudge_down Cab Impulse Response Loaders
            plugin-link(v-for="item in free.cabImpulseLoader",  
                        :name="item.name", 
                        :description="item.description", 
                        :image="item.image", 
                        :link="item.link")

            // Cab Impulse Responses  
            .mdl-cell--12-col
              h3.light.center.nudge_down Cab Impulse Responses
            plugin-link(v-for="item in free.cabImpulseResponses",  
                        :name="item.name", 
                        :description="item.description", 
                        :image="item.image", 
                        :link="item.link")
              
            // Delay/Echo
            .mdl-cell--12-col
              h3.light.center.nudge_down Delay/Echo
            plugin-link(v-for="item in free.delayEcho",  
                        :name="item.name", 
                        :description="item.description", 
                        :image="item.image", 
                        :link="item.link")
            
            // Reverb
            .mdl-cell--12-col
              h3.light.center.nudge_down Reverb
            plugin-link(v-for="item in free.reverb",  
                        :name="item.name", 
                        :description="item.description", 
                        :image="item.image", 
                        :link="item.link")
              
            // EQ
            .mdl-cell--12-col
              h3.light.center.nudge_down EQ
            plugin-link(v-for="item in free.eq",  
                        :name="item.name", 
                        :description="item.description", 
                        :image="item.image", 
                        :link="item.link")
              
            // Compression
            .mdl-cell--12-col
              h3.light.center.nudge_down Compression
            plugin-link(v-for="item in free.compression",  
                        :name="item.name", 
                        :description="item.description", 
                        :image="item.image", 
                        :link="item.link")
              
            // Gain/Overdrive
            .mdl-cell--12-col
              h3.light.center.nudge_down Gain/Overdrive
            plugin-link(v-for="item in free.gain",  
                        :name="item.name", 
                        :description="item.description", 
                        :image="item.image", 
                        :link="item.link")
              
            // Tremolo
            .mdl-cell--12-col
              h3.light.center.nudge_down Tremolo
            plugin-link(v-for="item in free.tremolo",  
                        :name="item.name", 
                        :description="item.description", 
                        :image="item.image", 
                        :link="item.link")
              
            // Chorus
            .mdl-cell--12-col
              h3.light.center.nudge_down Chorus
            plugin-link(v-for="item in free.chorus",  
                        :name="item.name", 
                        :description="item.description", 
                        :image="item.image", 
                        :link="item.link")
              
            // Flanger
            .mdl-cell--12-col
              h3.light.center.nudge_down Flanger
            plugin-link(v-for="item in free.flanger",  
                        :name="item.name", 
                        :description="item.description", 
                        :image="item.image", 
                        :link="item.link")
              
            // Phaser
            .mdl-cell--12-col
              h3.light.center.nudge_down Phaser
            plugin-link(v-for="item in free.phaser",  
                        :name="item.name", 
                        :description="item.description", 
                        :image="item.image", 
                        :link="item.link")
            
            // Other
            .mdl-cell--12-col
              h3.light.center.nudge_down Other
            plugin-link(v-for="item in free.other",  
                        :name="item.name", 
                        :description="item.description", 
                        :image="item.image", 
                        :link="item.link")
              
        //
          Paid Panel
        #paid-panel.mdl-tabs__panel
          .mdl-grid
            // Paid Amp Sims/MultiFX
            .mdl-cell--12-col
              h3.light.center.nudge_down Amp Simulation/Multi FX
            plugin-link(v-for="item in paid.multiFx",  
                        :name="item.name", 
                        :description="item.description", 
                        :image="item.image", 
                        :link="item.link")
              
            // Paid Amp Sims
            .mdl-cell--12-col
              h3.light.center.nudge_down Amp Simulation
            plugin-link(v-for="item in paid.ampSim",  
                        :name="item.name", 
                        :description="item.description", 
                        :image="item.image", 
                        :link="item.link")
              
        .mdl-grid
          #plugin_dir_bottom
            h4 New to VST plugins?
            p
              | Not all of these will have the normal installers you may be accustomed to. If you aren't sure where to drag the files then fear not, these links will show you what to do. Just click for 
              a(href='http://www.genuinesoundware.com/?a=page&p=how_to_install_a_plugin') Windows
              |  and 
              a(href='http://www.ehow.com/how_8540532_install-vst-plugins-mac.html', title='') Mac
              | .
</template>

<script>
import Navbar from './Navbar'
import Topbar from './Topbar'
import PluginLink from './PluginLink'
import {PluginDirectory} from '../PluginDirectory'

const obj = PluginDirectory()

export default {
	components: {
		Navbar,
		Topbar,
    PluginLink
	},

  methods: {
    stopLink (msg, e) {
      e.stopPropagation()
    }
  },

  data: () => {
    return {
      free: obj.free,
      paid: obj.paid
    }
  },

  ready () {
    this.$nextTick(() => {
      componentHandler.upgradeDom()
      componentHandler.upgradeAllRegistered()
    })
  }
}
</script>
