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

import { FC, ReactNode } from 'react';
import { InfoTooltip } from '@superset-ui/core/components';
import { StyledFormItem } from './styles';

interface StyledFormItemWithTipProps {
  label: string;
  tip: string;
  name: string;
  children: ReactNode;
  rules?: any[];
}

const StyledFormItemWithTip: FC<StyledFormItemWithTipProps> = ({
  label,
  tip,
  children,
  name,
  rules,
}) => (
  <StyledFormItem
    label={
      <div>
        {label}
        <InfoTooltip tooltip={tip} />
      </div>
    }
    name={name}
    rules={rules}
  >
    {children}
  </StyledFormItem>
);

export default StyledFormItemWithTip;
