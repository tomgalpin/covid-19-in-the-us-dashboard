import { createLocalVue, shallowMount } from '@vue/test-utils';
import Error from '@/views/Error.vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('Error.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Error, {
      localVue
    });
  });

  it('mounts without crashing with valid data', () => {
    expect(wrapper.find('h1').text()).toEqual(
      `Sorry, the page you are looking for doesn't exist.`
    );

    expect(wrapper.find('img').attributes('src')).toEqual(
      '@/assets/images/gifs/lost.gif'
    );
    expect(wrapper.find('img').attributes('alt')).toEqual(
      "The little boy from the movie 'Up', eating a chocolate bar, thinking."
    );
  });
});
