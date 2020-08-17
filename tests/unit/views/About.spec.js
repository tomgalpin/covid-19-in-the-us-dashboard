import { createLocalVue, shallowMount } from '@vue/test-utils';
import About from '@/views/About.vue';
import VueRouter from 'vue-router';

const h2Texts = ['API Used:', 'File Structure:', 'Dependencies Used:'];
const mockDependencies = [
  {
    name: 'Vue.js',
    icon: 'fa-sitemap',
    url: 'https://vuejs.org/'
  },
  {
    name: 'Vue Router',
    icon: 'fa-space-shuttle',
    url: 'https://router.vuejs.org/'
  }
];

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('About.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(About, {
      localVue
    });
  });

  it('mounts without crashing with valid data', () => {
    const h2s = wrapper.findAll('h2');
    const lis = wrapper.find('.dependencies').findAll('li');

    expect(wrapper.find('h1').text()).toBe('United States Covid-19 Data');

    expect(h2s.length).toBe(3);
    h2Texts.forEach((item, index) => {
      const h2Element = h2s.at(index);

      expect(h2Element.text()).toBe(h2Texts[index]);
    });

    expect(wrapper.find('code').text()).toContain('├── /public');

    expect(lis.length).toBe(6);
    mockDependencies.forEach((item, index) => {
      const liElement = lis.at(index);

      expect(liElement.find('i').classes()).toContain(
        mockDependencies[index].icon
      );
      expect(liElement.find('span').text()).toEqual(
        mockDependencies[index].name
      );
      expect(liElement.find('a').attributes('href')).toEqual(
        mockDependencies[index].url
      );
    });
  });

  it('imports & returns the API', () => {
    expect(wrapper.vm.covidAPI).toEqual('https://api.covidtracking.com');
  });

  it('trims white space from a string', () => {
    const testString = `  
        test`;
    // eslint-disable-next-line no-use-before-define
    const trimmedString = `  
test`;

    expect(wrapper.vm.trimNewLines(testString)).toEqual(trimmedString);
  });
});
