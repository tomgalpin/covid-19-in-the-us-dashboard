import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import SideNav from '@/components/nav/SideNav.vue';
import { STATE_CODES } from '@/constants/stateCodes.js';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('SideNav.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SideNav, {
      localVue,
      stubs: ['router-link']
    });
  });

  it('mounts without crashing with valid data', () => {
    const lis = wrapper.findAll('li');

    expect(lis.length).toEqual(3);
    expect(lis.wrappers[0].find('router-link-stub').attributes('to')).toEqual(
      '/'
    );
    expect(lis.wrappers[2].find('router-link-stub').attributes('to')).toEqual(
      '/about'
    );
    expect(lis.wrappers[0].find('i').classes()).toContain('fa-home');
    expect(lis.wrappers[2].find('i').classes()).toContain('fa-desktop');
    expect(lis.wrappers[0].find('span').text()).toEqual('Home');
    expect(lis.wrappers[2].find('span').text()).toEqual('About');
  });

  it('computes the States menu', () => {
    expect(wrapper.vm.statesMenu.title).toEqual('US States');

    expect(wrapper.vm.setMenuItems(STATE_CODES).length).toEqual(56);
    expect(wrapper.vm.setMenuItems(STATE_CODES)[0]).toEqual({
      route: 'AL',
      text: 'Alabama'
    });
    expect(wrapper.vm.setMenuItems(STATE_CODES)[27]).toEqual({
      route: 'MO',
      text: 'Missouri'
    });
    expect(wrapper.vm.setMenuItems(STATE_CODES)[55]).toEqual({
      route: 'WY',
      text: 'Wyoming'
    });
  });

  it('sorts an array of object alphabetically by key', () => {
    const testArray = [
      {
        firstName: 'Peppa',
        lastName: 'Pig'
      },
      {
        firstName: 'Danny',
        lastName: 'Dog'
      },
      {
        firstName: 'Suzie',
        lastName: 'Sheep'
      },
      {
        firstName: 'Mrs.',
        lastName: 'Rabbit'
      }
    ];

    expect(wrapper.vm.sortAlphabetically(testArray, 'firstName')).toEqual([
      {
        firstName: 'Danny',
        lastName: 'Dog'
      },
      {
        firstName: 'Mrs.',
        lastName: 'Rabbit'
      },
      {
        firstName: 'Peppa',
        lastName: 'Pig'
      },
      {
        firstName: 'Suzie',
        lastName: 'Sheep'
      }
    ]);

    expect(wrapper.vm.sortAlphabetically(testArray, 'lastName')).toEqual([
      {
        firstName: 'Danny',
        lastName: 'Dog'
      },
      {
        firstName: 'Peppa',
        lastName: 'Pig'
      },
      {
        firstName: 'Mrs.',
        lastName: 'Rabbit'
      },
      {
        firstName: 'Suzie',
        lastName: 'Sheep'
      }
    ]);
  });
});
