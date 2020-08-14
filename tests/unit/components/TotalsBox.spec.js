import { createLocalVue, shallowMount } from '@vue/test-utils';
import TotalsBox from '@/components/TotalsBox.vue';

const localVue = createLocalVue();

const propsData = {
  num: '5,224,214',
  totalsMeta: {
    icon: 'fa-frown-o',
    iconBG: 'rgb(221, 75, 58)',
    text: 'Confirmed Deaths'
  }
};

describe('TotalsBox.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TotalsBox, {
      localVue,
      propsData
    });
  });

  it('mounts without crashing with valid data', () => {
    expect(wrapper.find('.container__icon').attributes('style')).toEqual(
      `background-color: ${propsData.totalsMeta.iconBG};`
    );

    expect(wrapper.find('i').classes()).toContain(propsData.totalsMeta.icon);

    expect(wrapper.find('p').text()).toEqual(propsData.num);

    expect(wrapper.find('h3').text()).toEqual(propsData.totalsMeta.text);
  });
});
