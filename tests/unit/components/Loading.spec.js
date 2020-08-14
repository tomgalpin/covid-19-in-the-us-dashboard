import { createLocalVue, shallowMount } from '@vue/test-utils';
import Loading from '@/components/Loading.vue';

const localVue = createLocalVue();

describe('Loading.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Loading, {
      localVue
    });
  });

  it('renders correct elements', () => {
    expect(wrapper.find('i').exists()).toBe(true);
    expect(wrapper.find('i').classes()).toContain('fa-circle-notch');
  });
});
