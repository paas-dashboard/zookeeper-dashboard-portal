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

import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NodesService} from "../service/nodes.service";
import {NodesDataSource} from "../service/nodes.datasource";
import {MatDialog} from "@angular/material/dialog";
import {AnimationsDialogComponent} from "./animations-dialog/animations-dialog.component";
import {AnimationsListDialogComponent} from "./animations-list-dialog/animations-list-dialog.component";
import {AnimationsDiffPartitionTopicListDialogComponent} from "./animations-diff-partition-topic-list-dialog/animations-diff-partition-topic-list-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'zookeeper-dashboard';

  displayedColumns = ["node"];

  dataSource: NodesDataSource;

  znodePath: string = "/";

  znodeContent: String = "no content.";

  DecodeContent: String = "";

  decodeComponent = 'None';

  decodeNamespace = 'None';

  supportDecodeComponents: String[] = [];

  supportDecodeNamespaces: String[] = [];

  constructor(private http: HttpClient, private nodesService: NodesService, public dialog: MatDialog) {
    this.dataSource = new NodesDataSource(this.nodesService);
  }

  ngOnInit() {
    this.dataSource.getNodes("/");
    this.nodesService.getDecodeComponents()
      .pipe().subscribe((data: String[]) => this.supportDecodeComponents = data);
    this.nodesService.getDecodeNamespaces()
      .pipe().subscribe((data: String[]) => this.supportDecodeNamespaces = data);
  }

  homePageClicked() {
    this.znodePath = "/";
    this.znodeContent = ""
    this.dataSource.getNodes(this.znodePath)
  }

  previousNodeClicked() {
    let curNodePath = this.znodePath;
    let nodes = curNodePath.split("/");
    if ((nodes && nodes.length == 0) || !nodes) {
      return;
    }
    nodes.pop();
    let toPath = nodes.join("/");
    if (toPath.trim() === "") {
      this.znodePath = "/";
    } else {
      this.znodePath = toPath;
    }
    this.znodeContent = "no content.";
    this.dataSource.getNodes(this.znodePath);
    this.nodesService.getNodeContent(this.znodePath).subscribe(data => {
      this.znodeContent = data;
    });
  }

  onRowClicked(row: any) {
    if (this.znodePath == "/") {
      this.znodePath = "/" + row;
    } else {
      this.znodePath = this.znodePath + "/" + row;
    }
    this.dataSource.getNodes(this.znodePath)
    this.nodesService.getNodeContent(this.znodePath).subscribe(data => {
      this.znodeContent = data;
    });
  }

  onDecodeClicked() {
    this.nodesService.getNodeDecodeContent(this.znodePath, this.decodeComponent, this.decodeNamespace).subscribe(data => {
      this.DecodeContent = data;
    })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.nodesService.getNodeHexContent(this.znodePath).subscribe(data => {
      this.dialog.open(AnimationsDialogComponent, {
        width: '1000px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: data
      });
    });
  }

  checkPulsarPartitionTopicMetadataDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.nodesService.checkPulsarPartitionTopicMetadata().subscribe(data => {
      this.dialog.open(AnimationsDiffPartitionTopicListDialogComponent, {
        width: '1000px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: data
      });
    });
  }

  showNodeListDialog(enterAnimationDuration: string, exitAnimationDuration: string, znodePath: string): void {
    this.nodesService.getRecursiveNodes(znodePath).subscribe(data => {
      this.dialog.open(AnimationsListDialogComponent, {
        width: '1000px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: data
      });
    });
  }
}
