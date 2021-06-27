export const sources = [
  {
    filename: 'calendar-header.full-calendar.component.ts',
    contents: {
      raw: require('!!raw-loader!./calendar-header.component'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=typescript!./calendar-header.component'),
    },
  },
  {
    filename: 'full-calendar.module.ts',
    contents: {
      raw: require('!!raw-loader!./module'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=typescript!./module'),
    },
  },
];
