/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { render, screen } from '@superset-ui/core/spec';
import '@testing-library/jest-dom';
import {
  getColumnLabelText,
  getColumnTooltipNode,
  getMetricTooltipNode,
  getColumnTypeTooltipNode,
} from '../../src/components/labelUtils';

test("should get column name when column doesn't have verbose_name", () => {
  expect(
    getColumnLabelText({
      id: 123,
      column_name: 'column name',
      verbose_name: '',
    }),
  ).toBe('column name');
});

test('should get verbose name when column have verbose_name', () => {
  expect(
    getColumnLabelText({
      id: 123,
      column_name: 'column name',
      verbose_name: 'verbose name',
    }),
  ).toBe('verbose name');
});

test('should get null as tooltip', () => {
  const ref = { current: { scrollWidth: 100, clientWidth: 100 } };
  expect(
    getColumnTooltipNode(
      {
        id: 123,
        column_name: 'column name',
        verbose_name: '',
        description: '',
      },
      ref,
    ),
  ).toBe(null);
});

test('should get null for column datatype tooltip when type is blank', () => {
  expect(
    getColumnTypeTooltipNode({
      id: 123,
      column_name: 'column name',
      verbose_name: '',
      description: '',
      type: '',
    }),
  ).toBe(null);
});

test('should get column datatype rendered as tooltip when column has a type', () => {
  render(
    <>
      {getColumnTypeTooltipNode({
        id: 123,
        column_name: 'column name',
        verbose_name: 'verbose name',
        description: 'A very important column',
        type: 'text',
      })}
    </>,
  );

  expect(screen.getByText('Column type')).toBeVisible();
  expect(screen.getByText('text')).toBeVisible();
});

test('should get column name, verbose name and description when it has a verbose name', () => {
  const ref = { current: { scrollWidth: 100, clientWidth: 100 } };
  render(
    <>
      {getColumnTooltipNode(
        {
          id: 123,
          column_name: 'column name',
          verbose_name: 'verbose name',
          description: 'A very important column',
        },
        ref,
      )}
    </>,
  );

  expect(screen.getByText('Column name')).toBeVisible();
  expect(screen.getByText('column name')).toBeVisible();
  expect(screen.getByText('Label')).toBeVisible();
  expect(screen.getByText('verbose name')).toBeVisible();
  expect(screen.getByText('Description')).toBeVisible();
  expect(screen.getByText('A very important column')).toBeVisible();
});

test('should get column name as tooltip if it overflowed', () => {
  const ref = { current: { scrollWidth: 200, clientWidth: 100 } };
  render(
    <>
      {getColumnTooltipNode(
        {
          id: 123,
          column_name: 'long long long long column name',
          verbose_name: '',
          description: '',
        },
        ref,
      )}
    </>,
  );
  expect(screen.getByText('Column name')).toBeVisible();
  expect(screen.getByText('long long long long column name')).toBeVisible();
  expect(screen.queryByText('Label')).not.toBeInTheDocument();
  expect(screen.queryByText('Description')).not.toBeInTheDocument();
});

test('should get column name, verbose name and description as tooltip if it overflowed', () => {
  const ref = { current: { scrollWidth: 200, clientWidth: 100 } };
  render(
    <>
      {getColumnTooltipNode(
        {
          id: 123,
          column_name: 'long long long long column name',
          verbose_name: 'long long long long verbose name',
          description: 'A very important column',
        },
        ref,
      )}
    </>,
  );

  expect(screen.getByText('Column name')).toBeVisible();
  expect(screen.getByText('long long long long column name')).toBeVisible();
  expect(screen.getByText('Label')).toBeVisible();
  expect(screen.getByText('long long long long verbose name')).toBeVisible();
  expect(screen.getByText('Description')).toBeVisible();
  expect(screen.getByText('A very important column')).toBeVisible();
});

test('should get null as tooltip in metric', () => {
  const ref = { current: { scrollWidth: 100, clientWidth: 100 } };
  expect(
    getMetricTooltipNode(
      {
        metric_name: 'count',
        label: '',
        verbose_name: '',
        description: '',
      },
      ref,
    ),
  ).toBe(null);
});

test('should get metric name, verbose name and description as tooltip in metric', () => {
  const ref = { current: { scrollWidth: 100, clientWidth: 100 } };
  render(
    <>
      {getMetricTooltipNode(
        {
          metric_name: 'count',
          label: 'count(*)',
          verbose_name: 'count(*)',
          description: 'Count metric',
        },
        ref,
      )}
    </>,
  );
  expect(screen.getByText('Metric name')).toBeVisible();
  expect(screen.getByText('count')).toBeVisible();
  expect(screen.getByText('Label')).toBeVisible();
  expect(screen.getByText('count(*)')).toBeVisible();
  expect(screen.getByText('Description')).toBeVisible();
  expect(screen.getByText('Count metric')).toBeVisible();
});

test('should get metric name as tooltip if it overflowed', () => {
  const ref = { current: { scrollWidth: 200, clientWidth: 100 } };
  render(
    <>
      {getMetricTooltipNode(
        {
          metric_name: 'long long long long metric name',
          label: '',
          verbose_name: '',
          description: '',
        },
        ref,
      )}
    </>,
  );
  expect(screen.getByText('Metric name')).toBeVisible();
  expect(screen.getByText('long long long long metric name')).toBeVisible();
  expect(screen.queryByText('Label')).not.toBeInTheDocument();
  expect(screen.queryByText('Description')).not.toBeInTheDocument();
});

test('should get metric name, verbose name and description in tooltip if it overflowed', () => {
  const ref = { current: { scrollWidth: 200, clientWidth: 100 } };
  render(
    <>
      {getMetricTooltipNode(
        {
          metric_name: 'count',
          label: '',
          verbose_name: 'longlonglonglonglong verbose metric',
          description: 'Count metric',
        },
        ref,
      )}
    </>,
  );
  expect(screen.getByText('Metric name')).toBeVisible();
  expect(screen.getByText('count')).toBeVisible();
  expect(screen.getByText('Label')).toBeVisible();
  expect(screen.getByText('longlonglonglonglong verbose metric')).toBeVisible();
  expect(screen.getByText('Description')).toBeVisible();
  expect(screen.getByText('Count metric')).toBeVisible();
});
