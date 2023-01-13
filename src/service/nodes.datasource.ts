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

import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable} from "rxjs";
import {NodesService} from "./nodes.service";

export class NodesDataSource implements DataSource<String> {

  private nodesSubject = new BehaviorSubject<String[]>([]);

  private loadingNodes = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingNodes.asObservable();

  constructor(private nodesService: NodesService) {}

  connect(collectionViewer: CollectionViewer): Observable<String[]> {
    return this.nodesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.nodesSubject.complete();
    this.loadingNodes.complete();
  }

  getNodes(path: String) {
    this.loadingNodes.next(true);
    this.nodesService.getNodes(path).subscribe((nodes: String[]) => {
      this.nodesSubject.next(nodes);
      this.loadingNodes.next(false);
    });
  }

}
