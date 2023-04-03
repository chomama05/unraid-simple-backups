// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    alert: {
      show: false,
      title: 'Test Title',
      text: 'This is a text. It will be here.',
      type: 'info',
      icon: 'mdi-information'
    }
  }),
  actions: {
    closeAlert(){
      this.alert.show = false;
    },
    showError(title, message, timeout = 5000) {
      this.alert.type = 'error';
      this.alert.title = title;
      this.alert.text = message;
      this.alert.icon = 'mdi-alert-circle'
      this.alert.show = true;
      setTimeout(() => {
        this.alert.show = false;
      }, timeout)
    },
    showSuccess(title, message, timeout = 5000) {
      console.log('hello');
      this.alert.type = 'success';
      this.alert.title = title;
      this.alert.text = message;
      this.alert.icon = 'mdi-check-circle'
      this.alert.show = true;
      setTimeout(() => {
        this.alert.show = false;
      }, timeout)
    }
  }
})
