/*
  Adapted from:
  https://github.com/apertureless/vue-chartjs/blob/develop/test/unit/specs/Bar.spec.js
*/
import Vue from 'vue';
import BarChart from '@/components/BarChart.vue';
import 'jest-canvas-mock';

const propsData = {
  data: [4671, 6255, 6885],
  labels: ['Apr 22, 2020', 'Apr 23, 2020', 'Apr 24, 2020'],
  meta: {
    backgroundColor: '#afadad',
    hoverBackgroundColor: '#0596d8',
    tooltipText: 'Cases Confirmed:'
  }
};

describe('BarChart', () => {
  let el;

  beforeEach(() => {
    el = document.createElement('div');
  });

  it('should render a canvas', () => {
    const vm = new Vue({
      render: function(createElement) {
        return createElement(BarChart, {
          props: propsData
        });
      },
      components: { BarChart }
    }).$mount(el);

    expect(vm.$el.querySelector('#bar-chart').hidden).toBe(false);
  });
});
