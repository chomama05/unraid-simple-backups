<template>
  <v-autocomplete
    clearable
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

export default {
  props: {
    modelValue: 'String',
    label: 'String',
    variant: 'String',
    leftIcon: 'String',
    tooltipMessage: 'String'
  },
  emits: ['update:modelValue'],
  computed: {
    select: {
      get() {
        return this.modelValue === '' ? '/mnt/' : this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
        console.log('emitted');
      }
    }
  },
  data() {
    return {
      loading: false,
      search: '',
      directories: [],
    };
  },
  watch: {
    select (val) {
      this.fetchDirectories(val);
    },
	},
  methods: {
    onInput(value) {
      console.log('onInput!');
      this.fetchDirectories(this.search);
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
          }
				}
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    console.log('label: ', this.label);
    this.fetchDirectories('/mnt/');
  }
};
</script>
