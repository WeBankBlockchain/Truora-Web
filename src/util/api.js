/*
 * Copyright 2014-2019 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import url from './url'
import { post, get, patch, put, deleted } from './http'
import { reviseParam } from './util'
import qs from 'qs'

export function historyQuery(id) {
    return get({
        url: `${url.ORACLE}/history/query/${id}`,
        method: 'get'
    })
}

export function historyList(data) {
    return get({
        url: `${url.ORACLE}/history/list`,
        method: 'get',
        params: data
    })
}
export function getChainAndGroup() {
    return get({
        url: `${url.ORACLE}/chain/group/list`,
        method: 'get'
    })
}
export function getAddress(data) {
    return get({
        url: `${url.ORACLE}/oracle/address`,
        method: 'get',
        params: data
    })
}

export function getServer(data) {
    return get({
        url: `${url.ORACLE}/center/list`,
        method: 'get',
        params: data
    })
}

export function getTrialUrl() {
    return get({
        url: `${url.ORACLE}/trial/oracleCore/url/list`,
        method: 'get'
    })
}

export function trialApiReq(id) {
    return get({
        url: `${url.ORACLE}/trial/oracleCore/api/request/${id}`,
        method: 'get'
    })
}

export function trialVrfReq(id) {
    return get({
        url: `${url.ORACLE}/trial/vrf/api/request/${id}`,
        method: 'get'
    })
}