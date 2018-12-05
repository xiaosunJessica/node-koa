import Login from '../../src/views/Login.vue';
import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';

describe('Login', () => {
	it('has a created hook', () => {
		const msg = '你好'
		const wrapper = shallowMount(Login, {
			propsData: {msg}
		});
		expect(wrapper.text()).to.include(msg);
	})
})
