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

import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import BACKEND_HOST from "../constant";
import GetNodesResp from "../module/GetNodesResp";
import {Injectable} from "@angular/core";
import GetNodeResp from "../module/GetNodeResp";
import SupportDecodeComponentListResp from "../module/SupportDecodeComponentListResp";
import SupportDecodeNamespaceListResp from "../module/SupportDecodeNamespaceListResp";
import DiffPartitionTopicsResp, {DiffPartitionTopic} from "../module/DiffPartitionTopicsResp";

@Injectable({providedIn: "root"})
export class NodesService {

  constructor(private http: HttpClient) { }

  getNodes(path: String): Observable<String[]> {
    return this.http.post<GetNodesResp>(BACKEND_HOST + '/api/zookeeper/get-nodes?recursive=false', {
      path: path
    }).pipe(map(resp => resp.nodes));
  }

  getNodeContent(path: String): Observable<String> {
    return this.http.post<GetNodeResp>(BACKEND_HOST + '/api/zookeeper/get-node', {
      path: path
    }).pipe(map(resp => resp.data));
  }

  getNodeHexContent(path: String): Observable<String> {
    return this.http.post<GetNodeResp>(BACKEND_HOST + '/api/zookeeper/get-node?codec=hex', {
      path: path
    }).pipe(map(resp => resp.data));
  }

  getNodeDecodeContent(path: String, decodeComponent: string, decodeNamespace: string): Observable<String> {
    return this.http.post<GetNodeResp>(BACKEND_HOST +
      '/api/zookeeper/get-node-decode?decodeComponent=' + decodeComponent + '&decodeNamespace=' + decodeNamespace, {
      path: path
    }).pipe(map(resp => resp.data))
  }

  getDecodeComponents(): Observable<String[]> {
    return this.http.get<SupportDecodeComponentListResp>(BACKEND_HOST + '/api/zookeeper/decode-components')
      .pipe(map(resp => resp.supportDecodeComponents))
  }

  getDecodeNamespaces(): Observable<String[]> {
    return this.http.get<SupportDecodeNamespaceListResp>(BACKEND_HOST + '/api/zookeeper/decode-namespaces')
      .pipe(map(resp => resp.supportDecodeNamespaces))
  }

  getRecursiveNodes(path: String): Observable<String[]> {
    return this.http.post<GetNodesResp>(BACKEND_HOST + '/api/zookeeper/get-nodes?recursive=true', {
      path: path
    }).pipe(map(resp => resp.nodes));
  }

  checkPulsarPartitionTopicMetadata(): Observable<DiffPartitionTopic[]> {
    return this.http.post<DiffPartitionTopicsResp>(BACKEND_HOST +
      '/api/zookeeper/check-pulsar-partition-topic-metadata', {})
      .pipe(map(resp => resp.diffs))
  }
}
