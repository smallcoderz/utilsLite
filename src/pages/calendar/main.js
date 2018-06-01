import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
    config: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#14142C',
        navigationBarTitleText: '万年历',
        navigationBarTextStyle: '#fdfdfd'
    }
}