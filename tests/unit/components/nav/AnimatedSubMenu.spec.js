import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import AnimatedSubMenu from '@/components/nav/AnimatedSubMenu.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const propsData = {
  content: {
    menuItems: [
      { route: 'AL', text: 'Alabama' },
      { route: 'AK', text: 'Alaska' },
      { route: 'AS', text: 'American Samoa' },
      { route: 'AZ', text: 'Arizona' }
    ],
    title: 'Test title'
  }
};

describe('AnimatedSubMenu.vue', () => {
  let wrapper;

  beforeEach(() => {
    const store = new Vuex.Store();
    store.commit = jest.fn();
    store.state.showStatesDropdown = false;

    wrapper = shallowMount(AnimatedSubMenu, {
      store,
      localVue,
      propsData,
      stubs: ['router-link']
    });
  });

  it('mounts without crashing with valid data', () => {
    const lis = wrapper.findAll('router-link-stub');

    expect(wrapper.find('.menu-title span').text()).toEqual(
      propsData.content.title
    );

    expect(lis.length).toEqual(4);

    lis.wrappers.forEach((item, index) => {
      const states = propsData.content.menuItems;
      const route = `/state/${states[index].route}`;
      const text = states[index].text;

      expect(item.attributes('to')).toEqual(route);
      expect(item.find('span').text()).toEqual(text);
    });
  });

  it('commits "toggleStatesDropdown" to the store', () => {
    wrapper.vm.toggleMenu();
    expect(wrapper.vm.$store.commit).toHaveBeenCalledWith(
      'toggleStatesDropdown'
    );
  });

  it('sets a stringed route', () => {
    expect(wrapper.vm.setMenuItemRoute('CA')).toEqual('/state/CA');
  });

  it('sets State text', () => {
    expect(wrapper.vm.setStateText('California')).toEqual('California');
    expect(wrapper.vm.setStateText('District Of Columbia')).toEqual(
      'The District Of Columbia'
    );
  });
});
