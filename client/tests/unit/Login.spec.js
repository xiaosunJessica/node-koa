import Login from '../../src/views/Login.vue';
import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';

describe('when login initial value is provided', () => {
	it('it is rendered by the component', () => {
		const wrapper = shallowMount(Login, {
			propsData: {msg: '我是测试'}
		});
		expect(wrapper.text()).to.include('我是测试');
	})
})

describe('when omitting the initial value', () => {
	it('the default value is rendered by the component', () => {
		const wrapper = shallowMount(Login, {
			propsData: {}
		})
		expect(wrapper.html()).to.include('<h1 data-v-26084dc2=""></h1>')
	})
})

describe('when omitting the initial value', () => {
	it('the default value initial value', () => {
		const wrapper = shallowMount(Login)
		const componentInstance = wrapper.vm;
		expect(componentInstance.ruleForm.username).to.be.equal('')
		expect(componentInstance.ruleForm.password).to.be.equal('')
	})
})

describe('the setData ruleForm', () => {
	let wrapper;
	let componentInstance;
	beforeEach(() => {
		wrapper = shallowMount(Login, {

		});
		componentInstance = wrapper.vm;
	})
	it('setData formRule', () => {
		wrapper.setData({
			ruleForm: {
				username: 'sun',
				password: 123
			}
		})
		expect(componentInstance.ruleForm.username).to.be.equal('sun');
	})
})
