export const sources = [
  {
    filename: 'full-calendar.component.ts',
    contents: {
      raw: require('!!raw-loader!./full-calendar.component'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=typescript!./full-calendar.component'),
    },
  },
  {
    filename: 'full-calendar.template.html',
    contents: {
      raw: require('!!raw-loader!./full-calendar.template.html'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=xml!./full-calendar.template.html'),
    },
  },
  {
    filename: 'full-calendar.styles.css',
    contents: {
      raw: require('!!raw-loader!./full-calendar.styles.css'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=css!./full-calendar.styles.css'),
    },
  },
  {
    filename: 'full-calendar.module.ts',
    contents: {
      raw: require('!!raw-loader!./full-calendar.module'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=typescript!./full-calendar.module'),
    },
  },
];
