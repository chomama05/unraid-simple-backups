<template>
  <create-new-directory-dialog v-model="showNewDirDialog" :rootDir="newDirRoot" @close="dialogClose($event)"></create-new-directory-dialog>
  <v-autocomplete
    clearable
    class="py-5"
    :variant="variant"
    v-model="select"
    v-model:search="search"
    :loading="loading"
    :items="directories"
    density="comfortable"
    hide-no-data
    hide-details
    :label="label"
    :prepend-icon="leftIcon"
    @input="onInput()"
  >
  <template v-slot:item="{ props, item }">
    <v-list-item
      v-bind="props"
      :prepend-icon="item.value === 'Create New Directory' ? 'mdi-folder-plus-outline' : 'mdi-folder'"
      :title="item.value"
    ></v-list-item>
  </template>

  <template v-slot:append>
    <v-tooltip location="bottom">
      <template v-slot:activator="{ props }">
        <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
      </template>

      {{ tooltipMessage }}
    </v-tooltip>
  </template>
  </v-autocomplete>
</template>

<script>
import axios from 'axios';
import createNewDirectoryDialog from './CreateDirectoryDialog.vue';

export default {
  props: {
    modelValue: 'String',
    label: 'String',
    variant: 'String',
    leftIcon: 'String',
    tooltipMessage: 'String'
  },
  emits: ['update:modelValue'],
  components:{
    createNewDirectoryDialog
  },
  computed: {
    select: {
      get() {
        return this.modelValue === '' ? '/mnt' : this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  data() {
    return {
      loading: false,
      search: '',
      directories: [],
      newDirRoot: '/mnt',
      showNewDirDialog: false
    };
  },
  watch: {
    select (val) {
      if(val === 'Create New Directory'){
        console.log('Create new dir...');
        this.showNewDirDialog = true;
        return;
      }
      return this.fetchDirectories(val);
    },
	},
  methods: {
    onInput(value) {
      console.log('onInput!');
      this.fetchDirectories(this.search);
    },
    dialogClose(dir){
      console.log('dir: ', dir);
      this.select = dir;
    },
    async fetchDirectories(searchVal) {
			console.log('directories: ', this.directories);
			console.log('search: ', searchVal);
			console.log('select: ', this.select);
      try {
				if(searchVal !== ''){
          let response = {};
          if(import.meta.env.MODE === 'development'){
            response.data = JSON.parse('[{"value":"/mnt/addons","text":"addons"},{"value":"/mnt/cache","text":"cache"},{"value":"/mnt/disk1","text":"disk1"},{"value":"/mnt/disks","text":"disks"},{"value":"/mnt/rapidapps","text":"rapidapps"},{"value":"/mnt/remotes","text":"remotes"},{"value":"/mnt/rootshare","text":"rootshare"},{"value":"/mnt/user","text":"user"},{"value":"/mnt/user0","text":"user0"}]');
          }
          else{
            response = await axios.get('/api/directories', { params: { search: searchVal } });
          }
					console.log('response: ', response);
          if(response.data && response.data.length > 0){
            this.directories = response.data.map(dir => {
              return dir.value;
            });
            this.newDirRoot = searchVal;
            this.directories.push('Create New Directory')
          }
				}
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchDirectories('/mnt');
  }
};
</script>
