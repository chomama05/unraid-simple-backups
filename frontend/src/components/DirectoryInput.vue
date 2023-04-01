<template>
  <v-autocomplete
    clearable
    v-model="select"
    v-model:search="search"
    :loading="loading"
    :items="directories"
    class="mx-4"
    density="comfortable"
    hide-no-data
    hide-details
    :label="select"
  ></v-autocomplete>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loading: false,
      select: '/mnt/',
      search: '',
      directories: [],
    };
  },
  watch: {
		// search (val) {
    //   val && val !== this.select && this.querySelections(val)
    // },
    select (val) {
      this.fetchDirectories(val);
    }
	},
  methods: {
    async querySelections (v) {
      this.loading = true
      try {
				if(v !== ''){
					const response = await axios.get('/api/directories', { params: { search: v } });
        	this.directories = response.data;
				}
      } catch (error) {
        console.error(error);
      }
      finally{
        this.loading = false
      }
      // setTimeout(() => {
      //   this.items = this.states.filter(e => {
      //     return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
      //   })
      //   this.loading = false
      // }, 500)
    },
    async fetchDirectories(searchVal) {
			console.log('search: ', searchVal);
      try {
				if(searchVal !== ''){
					const response = await axios.get('/api/directories', { params: { search: searchVal } });
        	this.directories = response.data;
				}
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchDirectories('/mnt/');
  }
};
/*
label="Directory"
    :items="directories"
		v-model="search"
    @update:search="fetchDirectories($event)"
*/
</script>
