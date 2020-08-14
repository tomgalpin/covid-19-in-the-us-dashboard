import { createLocalVue, shallowMount } from '@vue/test-utils';
import HeaderNav from '@/components/nav/HeaderNav.vue';

const localVue = createLocalVue();

describe('HeaderNav.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(HeaderNav, {
      localVue
    });
  });

  it('renders correct elements with correct content', () => {
    const lis = wrapper.findAll('li');
    expect(wrapper.find('p').text()).toEqual('Tom Galpin');

    expect(lis.length).toEqual(3);
    expect(lis.wrappers[1].find('a').attributes('href')).toEqual(
      'https://github.com/tomgalpin'
    );
    expect(lis.wrappers[2].find('a').attributes('href')).toEqual(
      'https://www.linkedin.com/in/tom-galpin-10b66a7'
    );
    expect(lis.wrappers[1].find('i').classes()).toContain('fa-github');
    expect(lis.wrappers[2].find('i').classes()).toContain('fa-linkedin');
  });
});
