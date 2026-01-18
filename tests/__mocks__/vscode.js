// vscode mock for testing
module.exports = {
  window: {
    showErrorMessage: () => Promise.resolve(undefined),
    showQuickPick: () => Promise.resolve(undefined),
    showInputBox: () => Promise.resolve(undefined),
    showWarningMessage: () => Promise.resolve(undefined),
    showInformationMessage: () => Promise.resolve(undefined),
    setStatusBarMessage: () => {},
    activeTextEditor: null,
    createOutputChannel: () => ({
      appendLine: () => {},
      show: () => {},
      clear: () => {},
      dispose: () => {}
    }),
    createStatusBarItem: () => ({
      show: () => {},
      hide: () => {},
      dispose: () => {},
      text: '',
      tooltip: '',
      command: ''
    })
  },
  commands: {
    registerCommand: () => ({ dispose: () => {} }),
    executeCommand: () => Promise.resolve()
  },
  languages: {
    createDiagnosticCollection: () => ({
      set: () => {},
      clear: () => {},
      dispose: () => {}
    })
  },
  workspace: {
    workspaceFolders: null,
    onDidChangeTextDocument: () => ({ dispose: () => {} })
  },
  StatusBarAlignment: { Left: 1, Right: 2 },
  DiagnosticSeverity: { Error: 0, Warning: 1, Information: 2, Hint: 3 },
  ThemeColor: class ThemeColor { constructor(id) { this.id = id; } },
  Range: class Range { constructor(sl, sc, el, ec) { this.start = { line: sl, character: sc }; this.end = { line: el, character: ec }; } },
  Diagnostic: class Diagnostic { constructor(range, message, severity) { this.range = range; this.message = message; this.severity = severity; } },
  Uri: { file: (f) => ({ fsPath: f }) }
};
