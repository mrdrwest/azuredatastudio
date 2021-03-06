/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {
	ChangeDetectorRef, ElementRef
} from '@angular/core';

import { ITitledComponent } from 'sql/workbench/browser/modelComponents/interfaces';
import * as azdata from 'azdata';
import { ComponentBase } from 'sql/workbench/browser/modelComponents/componentBase';


export abstract class TitledComponent<T extends azdata.TitledComponentProperties> extends ComponentBase<T> implements ITitledComponent {

	constructor(
		protected _changeRef: ChangeDetectorRef,
		protected _el: ElementRef) {
		super(_changeRef, _el);
	}

	public get title(): string {
		return this.getPropertyOrDefault<string>((props) => props.title, '');
	}

	public set title(newTitle: string) {
		this.setPropertyFromUI<string>((properties, title) => { properties.title = title; }, newTitle);
	}
}
