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
import { memo, useMemo } from 'react';
import { t, useTruncation, css } from '@superset-ui/core';
import { List } from '@superset-ui/core/components/List';
import { useFilterScope } from './useFilterScope';
import { Row, RowLabel, RowTruncationCount, RowValue } from './Styles';
import { FilterCardRowProps } from './types';
import { TooltipWithTruncation } from './TooltipWithTruncation';

const getTooltipSection = (items: string[] | undefined, label: string) =>
  Array.isArray(items) && items.length > 0 ? (
    <>
      <span
        css={theme => css`
          font-weight: ${theme.fontWeightStrong};
        `}
      >
        {label}:
      </span>
      <List
        size="small"
        split={false}
        dataSource={items}
        renderItem={item => (
          <List.Item
            compact
            css={theme => css`
              && .scope-item {
                color: ${theme.colorWhite};
              }
            `}
          >
            <span className="scope-item">• {item} </span>
          </List.Item>
        )}
      />
    </>
  ) : null;
export const ScopeRow = memo(({ filter }: FilterCardRowProps) => {
  const scope = useFilterScope(filter);

  const [scopeRef, plusRef, elementsTruncated, hasHiddenElements] =
    useTruncation();
  const tooltipText = useMemo(() => {
    if (elementsTruncated === 0 || !scope) {
      return null;
    }
    if (scope.all) {
      return <span>{t('All charts')}</span>;
    }
    return (
      <div>
        {getTooltipSection(scope.tabs, t('Tabs'))}
        {getTooltipSection(scope.charts, t('Charts'))}
      </div>
    );
  }, [elementsTruncated, scope]);

  return (
    <Row>
      <RowLabel>{t('Scope')}</RowLabel>
      <TooltipWithTruncation title={tooltipText}>
        <RowValue ref={scopeRef}>
          {scope
            ? Object.values(scope)
                .flat()
                .map((element, index) => (
                  <span key={element}>
                    {index === 0 ? element : `, ${element}`}
                  </span>
                ))
            : t('None')}
        </RowValue>
        {hasHiddenElements && (
          <RowTruncationCount ref={plusRef}>
            +{elementsTruncated}
          </RowTruncationCount>
        )}
      </TooltipWithTruncation>
    </Row>
  );
});
