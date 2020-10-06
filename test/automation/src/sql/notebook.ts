/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Code } from '../code';
import { QuickAccess } from '../quickaccess';
import { QuickInput } from '../quickinput';
import { Editors } from '../editors';

const activeCellSelector = `.notebook-editor .notebook-cell.active`;
const ctrl = process.platform === 'darwin' ? 'ctrl' : 'win';

export class Notebook {

	constructor(private code: Code, private quickAccess: QuickAccess, private quickInput: QuickInput, private editors: Editors) {
	}

	async openFile(fileName: string): Promise<void> {
		await this.quickAccess.openQuickAccess(fileName);
		await this.quickInput.waitForQuickInputElements(names => names[0] === fileName);
		await this.code.dispatchKeybinding('enter');
		await this.editors.waitForActiveTab(fileName);
		await this.code.waitForElement('.notebookEditor');
	}

	async newUntitledNotebook(): Promise<void> {
		await this.code.dispatchKeybinding(ctrl + '+alt+n');

	}

	async executeAction(selector: string): Promise<void> {
		await this.code.waitAndClick(selector);
	}

	async addCell(cellType: 'markdown' | 'code'): Promise<void> {
		if (cellType === 'markdown') {
			await this.code.dispatchKeybinding(ctrl + '+shift+t');
		} else {
			await this.code.dispatchKeybinding(ctrl + '+shift+c');
		}
		await this.code.waitForElement('.notebook-cell.active');
	}

	async runActiveCell(): Promise<void> {
		await this.code.dispatchKeybinding('F5');
	}

	async waitForTypeInEditor(text: string) {
		const editor = `${activeCellSelector}`;
		await this.code.waitForElement(editor);

		await this.code.waitForTypeInEditor(editor, text);

		await this._waitForActiveCellEditorContents(c => c.indexOf(text) > -1);
	}

	private async _waitForActiveCellEditorContents(accept: (contents: string) => boolean): Promise<any> {
		const selector = `${activeCellSelector} .monaco-editor .view-lines`;
		return this.code.waitForTextContent(selector, undefined, c => accept(c.replace(/\u00a0/g, ' ')));
	}

	private static readonly RESULT_SELECTOR = '.notebookEditor .monaco-table';
	public async waitForResults(): Promise<void> {
		await this.code.waitForElement(Notebook.RESULT_SELECTOR);
	}
}
