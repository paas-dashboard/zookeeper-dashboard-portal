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

import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DiffPartitionTopic} from "../../module/DiffPartitionTopicsResp";

@Component({
  selector: 'app-animations-list-dialog',
  templateUrl: './animations-diff-partition-topic-list-dialog.component.html',
  styleUrls: ['./animations-diff-partition-topic-list-dialog.component.css']
})
export class AnimationsDiffPartitionTopicListDialogComponent {
  diffs: DiffPartitionTopic[] = [];

  constructor(
    public dialogRef: MatDialogRef<AnimationsDiffPartitionTopicListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: DiffPartitionTopic[]) {
      this.diffs = data;
  }
}
