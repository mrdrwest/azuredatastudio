/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Application } from '../../../../../automation';

export function setup() {
	describe('Notebook', () => {
		it('open hello.ipynb', async function () {
			const app = this.app as Application;
			await app.workbench.sqlNotebook.openFile('hello.ipynb');
		});

		it('can open new notebook, connect and execute', async function () {
			const app = this.app as Application;
			await app.workbench.sqlNotebook.newUntitledNotebook();
			await app.workbench.sqlNotebook.addCell('markdown');
			// await app.workbench.sqlNotebook.executeAction('action-label button-menu codicon notebook-button masked-pseudo masked-pseudo-after add-new dropdown-arrow');
			// await app.workbench.sqlNotebook.waitForTypeInEditor('select * from employees');
			// await app.workbench.sqlNotebook.runActiveCell();
			// await app.workbench.connectionDialog.waitForConnectionDialog();
			// await app.workbench.connectionDialog.setProvider('Sqlite');
			// await app.workbench.connectionDialog.setTarget('File', 'chinook.db');
			// await app.workbench.connectionDialog.connect();
			// await app.workbench.sqlNotebook.waitForResults();
			// await app.workbench.quickaccess.runCommand('workbench.action.closeAllEditors');
		});
	});
}
