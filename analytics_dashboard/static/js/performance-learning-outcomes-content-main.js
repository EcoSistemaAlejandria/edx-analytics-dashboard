require(['load/init-page'], (page) => {
  'use strict';

  require(
    ['d3', 'underscore', 'views/data-table-view', 'views/stacked-bar-view'],
    (d3, _, DataTableView, StackedBarView) => {
      const model = page.models.courseModel;
      const graphSubmissionColumns = [
        {
          key: 'average_correct_submissions',
          percent_key: 'correct_percent',
          title: gettext('Average Correct'),
          className: 'text-right',
          type: 'number',
          fractionDigits: 1,
          color: '#4BB4FB',
        },
        {
          key: 'average_incorrect_submissions',
          percent_key: 'incorrect_percent',
          title: gettext('Average Incorrect'),
          className: 'text-right',
          type: 'number',
          fractionDigits: 1,
          color: '#CA0061',
        },
      ];
      let tableColumns = [
        {
          key: 'index', title: gettext('Order'), type: 'number', className: 'text-right',
        },
        { key: 'name', title: model.get('contentTableHeading'), type: 'hasNull' },
      ];
      let performanceLoContentChart;

      tableColumns = tableColumns.concat(graphSubmissionColumns);

      tableColumns.push({
        key: 'average_submissions',
        title: gettext('Average Submissions per Problem'),
        className: 'text-right',
        type: 'number',
        fractionDigits: 1,
      });

      tableColumns.push({
        key: 'correct_percent',
        title: gettext('Percentage Correct'),
        className: 'text-right',
        type: 'percent',
      });

      if (model.get('hasData')) {
        performanceLoContentChart = new StackedBarView({
          el: '#chart-view',
          model,
          modelAttribute: 'tagsDistribution',
          trends: graphSubmissionColumns,
        });
        performanceLoContentChart.renderIfDataAvailable();
      }

      const performanceLoContentTable = new DataTableView({
        el: '[data-role=data-table]',
        model,
        modelAttribute: 'tagsDistribution',
        columns: tableColumns,
        sorting: ['index'],
        replaceZero: '-',
      });
      performanceLoContentTable.renderIfDataAvailable();
    },
  );
});
