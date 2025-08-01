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
export interface UsersListProps {
  user: {
    userId: string | number;
    firstName: string;
    lastName: string;
    roles: object;
  };
}

export type Role = {
  id: number;
  name: string;
};

export type Group = {
  id: number;
  name: string;
};

export type UserObject = {
  active: boolean;
  changed_by: string | null;
  changed_on: string;
  created_by: string | null;
  created_on: string;
  email: string;
  fail_login_count: number;
  first_name: string;
  id: number;
  last_login: string;
  last_name: string;
  login_count: number;
  roles: Role[];
  username: string;
  groups: Group[];
};
